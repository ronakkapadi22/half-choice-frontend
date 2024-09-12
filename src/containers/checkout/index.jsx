import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ICONS } from '../../assets/icons'
import { getAddress } from '../../redux/slices/address.slice';
import { useSelector } from 'react-redux';
import useDispatchWithAbort from '../../hooks/useDispatchWithAbort';
import { getCart } from '../../redux/slices/cart.slice';
import { classNames, generateRandomDigitNumber } from '../../assets/utils/helper';
import { CAROUSEL_LOADER, IMAGE_PATH } from '../../assets/utils/constant';
import { PAGES } from '../../assets/utils/urls';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/button';
import Confirmation from '../../shared/confirmation';
import { api, shiprocket } from '../../api';
import moment from 'moment';
import Spinner from '../..';
import PopUp from '../../shared/popup';

const Checkout = () => {

  const navigate = useNavigate()
  const user = useSelector(({ auth }) => auth.user);
  const { isLoading, default: address } = useSelector(({ address }) => address);
  const { isLoading: isCartLoading, cart } = useSelector(({ cart }) => cart);
  const [fetchAddress] = useDispatchWithAbort(getAddress);
  const [fetchCart] = useDispatchWithAbort(getCart);

  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [estimationDate, setEstimationDate] = useState(null);

  const [order, setOrder] = useState(null)
  const [orderLoader, setOrderLoader] = useState(false);

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
    const response = await shiprocket.auth()
    const token = await response?.token
    const estimate = await shiprocket.estimate({
      pin: my_address?.pincode,
      token
    })
    return await estimate
  }

  useEffect(() => {
    if (my_address) {
      getEstimationDate().then(({ data }) => {
        setEstimationDate(data?.available_courier_companies?.[0]?.etd)
      })
    }
  }, [my_address])

  const handleRedirect = useCallback((path) => {
    navigate(path)
  }, [navigate])

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
      orderItems: cart?.map(({ user_id, attribute_id, product_id, quantity, variant_id }) => ({
        user_id: String(user_id), attribute_id: String(attribute_id), product_id: String(product_id), quantity: String(quantity), variant_id: String(variant_id), delivery_date: estimationDate
      })),
      order_discount: Number(summary.total_discount).toFixed(1),
      order_no: `${user?.id}_${generateRandomDigitNumber()}`,
      order_sub_total: Number(summary.subtotal).toFixed(1),
      order_total: Number(summary.total).toFixed(1),
      payment_method: 'COD',
      return_policy: '7 day return policy',
      status: 'PENDING',
      store_id: String(2),
      tax_slab: '',
      tax_total: '',
      transaction_id: '',
      user_id: String(user?.id)
    }
    setOrderLoader(true)
    try {
      const response = await api.orders.add({ data: payload })
      if (response?.data) {
        setOrderLoader(false)
        setOrder({ ...response?.data?.data, estimationDate })
      }
    } catch (error) {
      setOrderLoader(false)
      setOrder(null)
      console.log('error', error)
    }
  }

  return (
    <div className='relative container mx-auto lg:px-4 p-4 max-w-7xl' >
      <div className="w-full flex flex-col items-start justify-start my-9">
        <h2 className="text-3xl text-text mb-1.5 font-semibold">
          Review and Complete Your Purchase
        </h2>
        <p className="text-slate-400 text-md">
          Securely review your items, enter your shipping details, and choose your payment method to complete your purchase. Your cart is just a few steps away from being yours!
        </p>
        <div className="w-full mt-16 grid grid-cols-12 gap-4 lg:gap-8">
          <div className='col-span-12 md:col-span-7' >
            <div className='w-full' >
              <h2 className='font-medium text-text text-lg' >Shipping Information</h2>
              <div className='mt-4 w-full rounded-lg p-4 bg-slate-50 relative' >
                <p onClick={() => handleRedirect(PAGES.ADDRESS.path)} className='text-sm text-pink font-medium cursor-pointer absolute top-4 right-4' >Choose another address</p>
                <div className='w-full flex justify-between items-center' >
                  <div className='flex items-start justify-start' >
                    <ICONS.LOCATION className='w-5 h-5 mt-1 mr-1 text-pink ' />
                    <div className='w-auto' >
                      <h2 className="text-text text-lg title-font font-medium">{my_address?.full_name || ''}</h2>
                      <p className="text-slate-400 text-sm title-font font-medium">{my_address?.phone || ''}</p>
                    </div>
                  </div>
                </div>
                <div className='w-full mb-6 mt-3 ml-6' >
                  <p>{my_address?.address_line_1}, {my_address?.address_line_2}</p>
                  <p>{my_address?.city}, {my_address?.state} - {my_address?.pincode}</p>
                  <p>{my_address?.country}</p>
                </div>
                <div className='w-full flex item justify-between text-green' >
                  {
                    estimationDate ? <p className='flex items-center' ><ICONS.TRUCK className='w-5 h-5 mr-2' /> Delivery By {moment(estimationDate).format('DD MMM, YYYY')}</p> : null
                  }
                </div>
              </div>
            </div>
            <div className='w-full mt-16' >
              <div className='w-full flex items-center justify-between' >
                <h2 className='font-medium text-text text-lg' >Your Cart <span className='text-slate-400 text-sm'>{`(${my_cart?.length || 0} items)`}</span></h2>
                <p onClick={() => handleRedirect(PAGES.WISHLISTS.path)} className='flex items-center text-sm text-pink font-medium cursor-pointer'>
                  <ICONS.PLUS className='w-5 h-5 mr-1' /> Add from wishlist
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
                    const image = variantData?.image?.split(",")?.[0];
                    return (
                      <div key={id} className="rounded-lg py-2 px-3 mb-3 relative bg-slate-50 ">
                        <Button
                          handleClick={() => handleDelete({ id, ...data })}
                          className="absolute !bg-red-500 !border-red-500 !py-1.5 !px-2 top-4 right-4 !text-whie flex justify-center items-end"
                        >
                          <ICONS.DELETE className="w-5 h-5 text-white" />
                        </Button>
                        <div className="w-full flex items-center justify-start">
                          <img
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
                                  style={{ background: variantData?.color_code }}
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
          <div className='col-span-12 md:col-span-5' >
            <h2 className='font-medium text-text text-lg' >Order Summary</h2>
            <div className='mt-4 w-full rounded-lg p-4 bg-slate-50 relative' >
              <div className="flex justify-between mb-3">
                <span className="text-slate-400">Total</span>
                <span className="text-text">
                  ₹ {summary?.total?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-slate-400">Discount</span>
                <span className="text-text">
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
                <span className="text-slate-400 font-semibold">You Pay</span>
                <span className="text-text font-semibold">
                  ₹{summary?.subtotal?.toFixed(2)}
                </span>
              </div>
            </div>
            <div className='w-full mt-16' >
              <div className='w-full flex items-center justify-between' >
                <h2 className='font-medium text-text text-lg' >Payment Methods</h2>
              </div>
              <div className='w-full mt-4 p-4 rounded-lg bg-slate-50 grid grid-cols-12 gap-4' >
                <div className='cursor-pointer col-span-12 border flex items-center justify-start p-4 bg-white rounded-lg' >
                  <ICONS.CARD className='w-5 h-5 text-text mr-2' />
                  <p className='text-text font-medium text-sm' >Credit / Debit</p>
                </div>
                <div className='cursor-pointer col-span-12 md:col-span-7 border flex items-center justify-start p-4 bg-white rounded-lg' >
                  <ICONS.BANK className='w-5 h-5 text-text mr-2' />
                  <p className='text-text font-medium text-sm' >Net Banking</p>
                </div>
                <div className='cursor-pointer col-span-12 md:col-span-5 border flex items-center justify-start p-4 bg-white rounded-lg' >
                  <ICONS.LINK className='w-5 h-5 text-text mr-2' />
                  <p className='text-text font-medium text-sm' >UPI</p>
                </div>
                <div className='cursor-pointer col-span-12 border border-select flex items-center justify-start p-4 bg-select rounded-lg' >
                  <ICONS.CASH className='w-5 h-5 text-white mr-2' />
                  <p className='text-white font-medium text-sm' >Cash on Delivery</p>
                </div>
              </div>
            </div>
            <div className='w-full mt-8' >
              <Button handleClick={handleOrder}
                disabled={orderLoader}
                className={classNames(
                  "!w-full flex min-w-28 items-center justify-center hover:border-yellow hover:bg-yellow transition-all duration-300",
                  orderLoader ? "cursor-not-allowed" : ""
                )}
              >
                <span>{!orderLoader ? 'Place Order' : "Loading"}</span>
                {orderLoader ? <Spinner className="ml-1 !w-4 !h-4" /> : null}
              </Button>
            </div>
          </div>
        </div>
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

      <PopUp {...{ order, handleClose: setOrder, open: Boolean(order?.orderId) }} />
    </div>
  )
}

export default Checkout