import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import { getCart } from "../../redux/slices/cart.slice";
import Button from "../../shared/button";
import { CAROUSEL_LOADER, IMAGE_PATH } from "../../assets/utils/constant";
import cart_image from "../../assets/images/cart.svg";
import { classNames, getTitle } from "../../assets/utils/helper";
import { ICONS } from "../../assets/icons";
import Confirmation from "../../shared/confirmation";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../assets/utils/urls";
import Breadcrumb from "../../shared/breadcrumb";
import ReactHelmet from "../seo/helmet";
import DUMMY_IMAGE from "../../assets/images/skeleton.jpeg";

const Cart = () => {
  const navigate = useNavigate();
  const user = useSelector(({ auth }) => auth.user);
  const { isLoading, cart } = useSelector(({ cart }) => cart);
  const [fetchCart] = useDispatchWithAbort(getCart);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const links = useMemo(() => [
    {
      id: 'cart',
      label: 'Cart'
    }
  ], [])


  useEffect(() => {
    fetchCart({
      isLoader: true,
      params: {
        user_id: user?.id,
      },
    });
  }, [user?.id, fetchCart]);

  const handleRedirect = useCallback(
    (path = "") => {
      navigate(path);
    },
    [navigate]
  );

  const my_cart = useMemo(() => {
    if (isLoading) return [];
    const clone = [...cart];
    return clone || [];
  }, [isLoading, cart]);

  const summary = useMemo(() => {
    if (isLoading)
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
  }, [isLoading, cart]);

  const handleDelete = ({ ...data }) => {
    setConfirm(data);
  };

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

  return (
    <ReactHelmet {...{
      title: "Your Shopping Cart - Review and Checkout Kids' Fashion at Halfchoice",
      description: "View your shopping cart at Halfchoice and review your kids' fashion choices. Enjoy easy checkout, free delivery, and COD across India",
      keywords: "Shopping cart, kids fashion cart, checkout kids clothes, kids clothing India, free delivery cart"
    }} >
      <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
        <div className="w-full" >
          <Breadcrumb links={links} />
        </div>
        <div className="w-full flex flex-col items-start justify-start my-9">
          <h2 className="text-xl md:text-3xl text-text mb-1.5 font-semibold">
            Shopping Bag
          </h2>
          <p className="text-slate-400 text-sm md:text-md">
            Explore a vibrant collection of kids' clothing that blends playful
            designs with practical comfort, perfect for all occasions.
          </p>
          <div className="w-full mt-16 grid grid-cols-12 gap-4 lg:gap-8">
            <div
              className={classNames(
                "col-span-12 md:col-span-7",
                my_cart?.length ? "" : "md:!col-span-12"
              )}
            >
              {isLoading ? (
                CAROUSEL_LOADER?.map((item) => (
                  <div
                    key={item}
                    className="animate-pulse bg-gray-100 mb-4 w-full rounded-md min-h-[120px]"
                  ></div>
                ))
              ) : my_cart?.length ? (
                my_cart?.map(({ id, variantData, ...data }) => {
                  const image = variantData?.images?.[0]?.image_file;
                  const imageAlt = variantData?.images?.[0]?.image_altertag
                  return (
                    <div key={id} className="rounded-md py-2 px-3 mb-3 relative bg-slate-50 w-full">
                      <Button
                        handleClick={() => handleDelete({ id, ...data })}
                        className="absolute !rounded !bg-red-500 !border-red-500 !py-1.5 !px-2 top-4 right-4 !text-white flex justify-center items-center z-10"
                      >
                        <ICONS.DELETE className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </Button>
                      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-start space-y-3 md:space-y-0 md:space-x-4">
                        <img
                          alt={imageAlt}
                          className="md:w-28 h-40 md:h-auto rounded-md object-cover object-center"
                          src={image ? (IMAGE_PATH + image) : DUMMY_IMAGE}
                        />
                        <div className="w-full">
                          <h2
                            onClick={() =>
                              handleRedirect(
                                PAGES.PRODUCTS.path + "/" + data?.product_id + '/' + getTitle(data?.product_name)
                              )
                            }
                            className="flex cursor-pointer justify-between text-base font-medium text-text !line-clamp-1"
                          >
                            {variantData?.name || ""}
                          </h2>
                          <div className="w-full flex flex-wrap items-center my-1.5 text-base font-medium space-x-2">
                            <ins className="no-underline">₹ {variantData?.selling_price}</ins>
                            <del className="line-through text-sm text-less">₹ {variantData?.mrp}</del>
                            <div className="py-0.5 px-1.5 text-xs text-white font-medium bg-green rounded-md">
                              {`-${variantData?.discount}%` || ""}
                            </div>
                          </div>
                          <div className="w-full space-y-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <p className="mr-2">Color:</p>
                              <div
                                className={classNames(
                                  "w-4 h-4 md:w-5 md:h-5 rounded-full p-0.5 border border-text-secondary"
                                )}
                              >
                                <div
                                  style={{ background: variantData?.color_code }}
                                  className="w-full h-full rounded-full"
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <p className="mr-2">Size:</p>
                              <div className="py-0.5 px-1.5 text-xs text-white font-medium bg-select rounded-md">
                                {variantData?.agegroup || ""}
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <p className="mr-2">Qty:</p>
                              <div className="font-medium">
                                {variantData?.qty || ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full flex flex-col items-center justify-center">
                  <img
                    alt="cart_image"
                    src={cart_image}
                    className="object-cover max-w-[180px] md:max-w-[280px] w-auto"
                  />
                  <div className="mt-10 flex flex-col items-center justify-center">
                    <h2 className="text-center text-xl md:text-2xl text-text mb-1 font-semibold">
                      Your Bag is empty !!
                    </h2>
                    <p className="text-center text-slate-400 text-md my-0.5">
                      Explore more and shortlist some items.
                    </p>
                    <Button handleClick={() => handleRedirect('/')}
                      label="Explore"
                      className="!w-auto mt-4 md:mt-6 !min-w-36 !rounded-full mb-1 flex items-center justify-center !bg-pink !border-pink hover:!border-yellow hover:!bg-yellow transition-all duration-300"
                    />
                  </div>
                </div>
              )}
            </div>
            <div
              className={classNames(
                "col-span-12 md:col-span-5",
                my_cart?.length ? "" : "hidden"
              )}
            >
              <div className="w-full flex flex-col justify-start bg-slate-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-6">Order summary</h2>
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
                <Button handleClick={() => handleRedirect(PAGES.CHECKOUT.path)}
                  className="!mt-6 hover:bg-yellow hover:border-yellow transition-all duration-300"
                  label="Checkout"
                />
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
      </div>
    </ReactHelmet>
  );
};

export default Cart;
