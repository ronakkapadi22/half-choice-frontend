import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ICONS } from "../../assets/icons";
import { getAddress } from "../../redux/slices/address.slice";
import { useSelector } from "react-redux";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import { getCart } from "../../redux/slices/cart.slice";
import {
  classNames,
  generateRandomDigitNumber,
} from "../../assets/utils/helper";
import {
  CAROUSEL_LOADER,
  IMAGE_PATH,
  PAYMENT_OPTIONS,
} from "../../assets/utils/constant";
import { PAGES } from "../../assets/utils/urls";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/button";
import Confirmation from "../../shared/confirmation";
import { api, shiprocket } from "../../api";
import moment from "moment";
import Spinner from "../..";
import PopUp from "../../shared/popup";
import Breadcrumb from "../../shared/breadcrumb";
import { useRazorpay } from "react-razorpay";

const Checkout = () => {
  const { error, isLoading: gatewayLoading, Razorpay } = useRazorpay()
  const navigate = useNavigate();
  const user = useSelector(({ auth }) => auth.user);
  const { isLoading, default: address } = useSelector(({ address }) => address);
  const { isLoading: isCartLoading, cart } = useSelector(({ cart }) => cart);
  const [fetchAddress] = useDispatchWithAbort(getAddress);
  const [fetchCart] = useDispatchWithAbort(getCart);

  const [paymentOption, setPaymentOption] = useState('COD')
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [estimationDate, setEstimationDate] = useState(null);

  const [order, setOrder] = useState(null);
  const [orderLoader, setOrderLoader] = useState(false);

  const links = useMemo(
    () => [
      {
        id: "cart",
        label: "Cart",
        redirect: PAGES.CART.path,
      },
      {
        id: "checkout",
        label: "Checkout",
      },
    ],
    []
  );

  useEffect(() => {
    fetchAddress({
      isLoader: true,
      params: {
        user_id: user?.id,
      },
    });
  }, [user?.id, fetchAddress]);

  useEffect(() => {
    fetchCart({
      isLoader: true,
      params: {
        user_id: user?.id,
      },
    });
  }, [user?.id, fetchCart]);

  const my_cart = useMemo(() => {
    if (isCartLoading) return [];
    const clone = [...cart];
    return clone || [];
  }, [isCartLoading, cart]);

  const my_address = useMemo(() => {
    if (isLoading) return [];
    const clone = { ...address };
    return clone || {};
  }, [isLoading, address]);


  const getEstimationDate = async () => {
    const response = await shiprocket.auth();
    const token = await response?.token;
    const estimate = await shiprocket.estimate({
      pin: my_address?.pincode,
      token,
    });
    return await estimate;
  };

  useEffect(() => {
    if (my_address) {
      getEstimationDate().then(({ data }) => {
        setEstimationDate(data?.available_courier_companies?.[0]?.etd);
      });
    }
  }, [my_address]);

  const handleRedirect = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const handleDelete = ({ ...data }) => {
    setConfirm(data);
  };

  const summary = useMemo(() => {
    if (isCartLoading)
      return {
        total: 0,
        subtotal: 0,
        total_discount: 0,
      };
    const clone = [...cart];
    const total = clone
      ?.map((val) => Number(val?.variantData?.mrp || 0))
      ?.reduce((val, accum) => val + accum, 0);
    const subtotal = clone
      ?.map((val) => Number(val?.variantData?.selling_price || 0))
      ?.reduce((val, accum) => val + accum, 0);
    const total_discount = clone
      ?.map(
        (val) =>
          Number(val?.variantData?.mrp || 0) -
          Number(val?.variantData?.selling_price || 0)
      )
      ?.reduce((val, accum) => val + accum, 0);
    return { total, subtotal, total_discount };
  }, [isCartLoading, cart]);

  const handleAction = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.cart.delete({
        data: {
          user_id: user?.id,
          attribute_id: confirm?.attribute_id,
          product_id: confirm?.product_id,
          variant_id: confirm?.variant_id,
          quantity: confirm?.quantity || 1,
        },
      });
      if (response?.data) {
        setLoading(false);
        fetchCart({
          isLoader: false,
          params: {
            user_id: user?.id,
          },
        });
        setConfirm(null);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }, [user?.id, fetchCart, confirm]);

  // payment intent
  const handlePaymentIntent = async (payload) => {
    const options = {
      key: "rzp_live_KzXWN8L7Gj7FXA",
      // key: "rzp_test_kLGh3w0NxTm39x",
      amount: '420.0', // Amount in paise
      currency: payload?.currency || "INR",
      name: "Halfchoice",
      description: "HalfChoice | Stylish, comfy clothes for growing kids.",
      order_id: payload?.orderPaymentId, // Generate order_id on server
      modal: {
        ondismiss: async () => {
          const response = await api.payments.verify({
            data: {
              orderId: payload?.order_no,
              paymentStatus: 'Failed',
              user_id: user?.id
            }
          })
          if (response?.data) {
            setOrder({ ...payload, orderId: payload?.order_no, type: 'failed' })
          }
        }
      },
      handler: async (fetcher) => {
        const response = await api.payments.verify({
          data: {
            orderId: payload?.order_no,
            paymentStatus: 'Success',
            user_id: user?.id
          }
        })
        if (response?.data) {
          setOrder({ ...payload, orderId: payload?.order_no, type: 'failed' })
        }
      },
      prefill: {
        name: payload?.name || '',
        contact: payload?.mobile,
      },
      theme: {
        color: "#E2218F",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
    razorpayInstance.on('payment.failed', (response) => {
      console.log('failed', response)
    })
  }

  const handleOrder = async () => {
    const payload = {
      address_city: my_address?.city,
      address_country: my_address?.country,
      address_full_name: my_address?.full_name,
      address_id: String(my_address?.id),
      address_line_1: my_address?.address_line_1,
      address_line_2: my_address?.address_line_2,
      address_phone: my_address?.phone,
      address_pincode: my_address?.pincode,
      address_type: my_address?.address_type,
      address_state: my_address?.state,
      delivery_charge: "60",
      delivery_date: estimationDate,
      orderItems: cart?.map(
        ({ user_id, attribute_id, product_id, quantity, variant_id }) => ({
          user_id: String(user_id),
          attribute_id: String(attribute_id),
          product_id: String(product_id),
          quantity: String(quantity),
          variant_id: String(variant_id),
          delivery_date: estimationDate,
        })
      ),
      order_discount: Number(summary.total_discount).toFixed(1),
      order_no: `${user?.id}_${generateRandomDigitNumber()}`,
      order_sub_total: "420.0",
      order_total: "420.0",
      payment_method: paymentOption,
      return_policy: "7 day return policy",
      status: "PENDING",
      store_id: String(2),
      tax_slab: "",
      tax_total: "",
      transaction_id: "",
      user_id: String(user?.id),
    };
    setOrderLoader(true);
    try {
      const response = paymentOption === 'COD' ? await api.orders.add({ data: payload }) : await api.payments.session({ data: payload })
      if (response?.data) {
        setOrderLoader(false);
        if (paymentOption === 'COD') {
          setOrder({ ...response?.data?.data, estimationDate });
        } else {
          await handlePaymentIntent({ ...response?.data?.data, name: my_address?.full_name, phone: my_address?.phone, estimationDate })
        }
      }
    } catch (error) {
      setOrderLoader(false);
      setOrder(null);
      console.log("error", error);
    }
  };

  return (
    <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
      <div className="w-full">
        <Breadcrumb links={links} />
      </div>
      <div className="w-full flex flex-col items-start justify-start my-9">
        <h2 className="text-3xl text-text mb-1.5 font-semibold">
          Review and Complete Your Purchase
        </h2>
        <p className="text-slate-400 text-md">
          Securely review your items, enter your shipping details, and choose
          your payment method to complete your purchase. Your cart is just a few
          steps away from being yours!
        </p>
        {my_cart?.length ? <div className="w-full mt-16 grid grid-cols-12 gap-4 lg:gap-8">
          <div className="col-span-12 md:col-span-7">
            <div className="w-full">
              <h2 className="font-medium text-text text-lg">
                Shipping Information
              </h2>
              <div className="mt-4 w-full rounded-lg p-4 bg-slate-50 relative">
                <p
                  onClick={() =>
                    handleRedirect(`${PAGES.ADDRESS.path}?from=checkout`)
                  }
                  className="text-sm text-pink font-medium cursor-pointer absolute top-4 right-4"
                >
                  Choose another address
                </p>
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-start justify-start">
                    <ICONS.LOCATION className="w-5 h-5 mt-1 mr-1 text-pink " />
                    <div className="w-auto">
                      <h2 className="text-text text-lg title-font font-medium">
                        {my_address?.full_name || ""}
                      </h2>
                      <p className="text-slate-400 text-sm title-font font-medium">
                        {my_address?.phone || ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full mb-6 mt-3 ml-6">
                  <p>
                    {my_address?.address_line_1}, {my_address?.address_line_2}
                  </p>
                  <p>
                    {my_address?.city}, {my_address?.state} -{" "}
                    {my_address?.pincode}
                  </p>
                  <p>{my_address?.country}</p>
                </div>
                <div className="w-full flex item justify-between text-green">
                  {estimationDate ? (
                    <p className="flex items-center">
                      <ICONS.TRUCK className="w-5 h-5 mr-2" /> Delivery By{" "}
                      {moment(estimationDate).format("DD MMM, YYYY")}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="w-full mt-12">
              <div className="w-full flex items-center justify-between">
                <h2 className="font-medium text-text text-lg">
                  Your Cart{" "}
                  <span className="text-slate-400 text-sm">{`(${my_cart?.length || 0
                    } items)`}</span>
                </h2>
                <p
                  onClick={() => handleRedirect(PAGES.WISHLISTS.path)}
                  className="flex items-center text-sm text-pink font-medium cursor-pointer"
                >
                  <ICONS.PLUS className="w-5 h-5 mr-1" /> Add from wishlist
                </p>
              </div>
              <div
                className={classNames(
                  "mt-4 w-full",
                  my_cart?.length ? "" : "md:w-full"
                )}
              >
                {isCartLoading ? (
                  CAROUSEL_LOADER?.map((item) => (
                    <div
                      key={item}
                      className="animate-pulse bg-gray-100 mb-4 w-full rounded-lg min-h-[120px]"
                    ></div>
                  ))
                ) : my_cart?.length ? (
                  my_cart?.map(({ id, variantData, ...data }) => {
                    const image = variantData?.images?.[0]?.image_file;
                    const imageAlt = variantData?.images?.[0]?.image_altertag;
                    return (
                      <div
                        key={id}
                        className="rounded-lg py-2 px-3 mb-3 relative bg-slate-50 "
                      >
                        <Button
                          handleClick={() => handleDelete({ id, ...data })}
                          className="absolute !bg-red-500 !border-red-500 !py-1.5 !px-2 top-4 right-4 !text-whie flex justify-center items-end"
                        >
                          <ICONS.DELETE className="w-5 h-5 text-white" />
                        </Button>
                        <div className="w-full flex items-center justify-start">
                          <img alt={imageAlt}
                            className="w-28 rounded-lg xl:max-h-[280px] object-cover object-center"
                            src={IMAGE_PATH + image}
                          />
                          <div className="w-full ml-4">
                            <h2
                              onClick={() =>
                                handleRedirect(
                                  PAGES.PRODUCTS.path + "/" + data?.product_id
                                )
                              }
                              className="flex cursor-pointer justify-between text-base font-medium text-text"
                            >
                              {variantData?.name || ""}
                            </h2>
                            <div className="w-full flex justify-start items-center my-1.5 text-base font-medium">
                              <ins className="no-underline">
                                ₹ {variantData?.selling_price}
                              </ins>
                              <del className="ml-2 line-through text-sm text-less">
                                ₹ {variantData?.mrp}
                              </del>
                              <div className="ml-2 py-0.5 px-1.5 text-xs text-white font-medium bg-green rounded-md">
                                {`-${variantData?.discount}%` || ""}
                              </div>
                            </div>
                            <div className="w-full flex items-center mt-2 text-sm text-gray-500 justify-start">
                              <p>Color:</p>
                              <div
                                className={classNames(
                                  "w-4 ml-2 items-center cursor-pointer justify-center border-text-secondary border h-4 md:w-5 md:h-5 rounded-full p-0.5"
                                )}
                              >
                                <div
                                  style={{
                                    background: variantData?.color_code,
                                  }}
                                  className="w-full h-full rounded-full"
                                ></div>
                              </div>
                            </div>
                            <div className="w-full flex items-center mt-2 text-sm text-gray-500 justify-start">
                              <p>Size:</p>
                              <div className="ml-2 py-0.5 px-1.5 text-xs text-white font-medium bg-select rounded-md">
                                {variantData?.agegroup || ""}
                              </div>
                            </div>
                            <div className="w-full flex items-center mt-2 text-sm text-gray-500 justify-start">
                              <p>Qty:</p>
                              <div className="ml-2 font-medium">
                                {variantData?.qty || ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full flex flex-col items-center justify-center">
                    <div className="mt-10 flex flex-col items-center justify-center">
                      <h2 className="text-center text-2xl text-text mb-1 font-semibold">
                        Your Bag is empty !!
                      </h2>
                      <p className="text-center text-slate-400 text-md my-0.5">
                        Explore more and shortlist some items.
                      </p>
                      <Button
                        label="Explore"
                        className="!w-auto mt-6 !min-w-36 !rounded-full mb-1 flex items-center justify-center !bg-pink !border-pink hover:!border-yellow hover:!bg-yellow transition-all duration-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <h2 className="font-medium text-text text-lg">Order Summary</h2>
            <div className="mt-4 w-full rounded-lg p-4 bg-slate-50 relative">
              <div className="flex justify-between mb-3">
                <span className="text-slate-400">Total</span>
                <span className="text-text">
                  ₹ {summary?.total?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-green">Discount</span>
                <span className="text-green">
                  ₹ -{summary?.total_discount?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-text">
                  ₹ {summary?.subtotal?.toFixed(2)}
                </span>
              </div>
              <hr />
              <div className="flex justify-between my-3">
                <span className="text-text font-semibold">You Pay</span>
                <span className="text-text font-semibold">
                  ₹{summary?.subtotal?.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="w-full mt-16">
              <div className="w-full flex items-center justify-between">
                <h2 className="font-medium text-text text-lg">
                  Payment Methods
                </h2>
              </div>
              <div className="w-full mt-4 p-4 rounded-lg bg-slate-50 grid grid-cols-12 gap-4">
                {PAYMENT_OPTIONS.map(({ id, label, className, icon: ICON }) => (
                  <div onClick={() => setPaymentOption(id)}
                    key={id}
                    className={classNames(
                      "cursor-pointer border text-text flex items-center justify-start p-4 bg-white rounded-lg",
                      className, id === paymentOption ? '!bg-select !text-white border-select' : ''
                    )}
                  >
                    <ICON className="w-5 h-5 mr-2" />
                    <p className="font-medium text-sm">
                      {label || ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full mt-8">
              <Button
                handleClick={handleOrder}
                disabled={orderLoader}
                className={classNames(
                  "!w-full flex min-w-28 items-center justify-center hover:border-yellow hover:bg-yellow transition-all duration-300",
                  orderLoader ? "cursor-not-allowed" : ""
                )}
              >
                <span>{!orderLoader ? "Place Order" : "Loading"}</span>
                {orderLoader ? <Spinner className="ml-1 !w-4 !h-4" /> : null}
              </Button>
            </div>
          </div>
        </div> : <div className="w-full mt-16 grid grid-cols-12 gap-4 lg:gap-8" >
          <div className="col-span-12">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="mt-10 flex flex-col items-center justify-center">
                <h2 className="text-center text-2xl text-text mb-1 font-semibold">
                  Your Bag is empty !!
                </h2>
                <p className="text-center text-slate-400 text-md my-0.5">
                  Explore more and shortlist some items.
                </p>
                <Button handleClick={() => handleRedirect('/')}
                  label="Explore"
                  className="!w-auto mt-6 !min-w-36 !rounded-full mb-1 flex items-center justify-center !bg-pink !border-pink hover:!border-yellow hover:!bg-yellow transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>}
      </div>
      <Confirmation
        handleAction={handleAction}
        loading={loading}
        loaderClass="!text-yellow-dark"
        actionClass="!text-yellow-dark !bg-yellow-light"
        actionLabel="Yes, Remove"
        title="Remove Product"
        description="Are you sure you want to remove this from your Cart?"
        open={Boolean(confirm?.id)}
        setOpen={setConfirm}
      />

      <PopUp
        {...{ order, handleClose: setOrder, open: Boolean(order?.orderId) }}
      />
    </div>
  );
};

export default Checkout;
