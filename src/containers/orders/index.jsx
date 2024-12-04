import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import cart_image from "../../assets/images/cart.svg";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import { getOrders } from "../../redux/slices/order.slice";
import {
  CAROUSEL_LOADER,
  IMAGE_PATH,
  ORDER_COLORS,
  ORDER_STATUS,
} from "../../assets/utils/constant";
import { ICONS } from "../../assets/icons";
import Button from "../../shared/button";
import { classNames, convertOrderStatus } from "../../assets/utils/helper";
import moment from "moment/moment";
import Breadcrumb from "../../shared/breadcrumb";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../assets/utils/urls";
import ReactHelmet from "../seo/helmet";

const Orders = () => {
  const navigate = useNavigate()
  const user = useSelector(({ auth }) => auth.user);
  const { isLoading, orders } = useSelector(({ order }) => order);
  const [fetchOrders] = useDispatchWithAbort(getOrders);

  const handleRedirect = useCallback((path = '') => {
    navigate(path)
  }, [navigate])

  const links = useMemo(() => [
    {
      id: 'orders',
      label: 'Orders'
    }
  ], [])


  useEffect(() => {
    fetchOrders({
      params: {
        user_id: user?.id,
      },
    });
  }, [user?.id, fetchOrders]);

  const currentData = useCallback((items = []) => {
    if (!items?.length) return {}
    const clone = [...items]?.[0]
    const image = clone?.image?.split(',')?.filter(val => !!val)?.[0]
    const variant = clone?.variant_name
    return {
      image: IMAGE_PATH + image,
      variant,
      name: clone?.product_name,
      total: items?.map(({ selling_price }) => selling_price)?.reduce((a, b) => a + b, 0)
    }
  }, [])

  return (
    <ReactHelmet {...{
      title: "Your Order History - View Past Orders at Halfchoice",
      description: "View your order history and track past purchases on Halfchoice. Access details on kids' fashion orders, delivery status, and more",
      keywords: "Order history, view past orders, kids fashion orders, track order history, past purchases kids clothes"
    }} >
      <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
        <div className="w-full" >
          <Breadcrumb links={links} />
        </div>
        <div className="w-full flex flex-col items-start justify-start my-9">
          <h2 className="text-xl md:text-3xl text-text mb-1.5 font-semibold">My Orders</h2>
          <p className="text-slate-400 text-sm md:text-md">
            A list of my recent purchases, featuring a variety of items I've added
            to my wardrobe. From everyday essentials to statement pieces, these
            orders reflect my evolving style and personal preferences.
          </p>
          <div className="w-full mt-12 grid grid-cols-12 gap-4 lg:gap-8">
            {orders?.length ? <div className="col-span-12">
              <div className="w-full flex flex-wrap items-center gap-y-2 gap-2">
                {ORDER_STATUS.map((status) => (
                  <div
                    key={status.id}
                    className="cursor-pointer flex items-center justify-center rounded-lg border border-slate-400 py-1 px-4 text-xs md:text-sm"
                  >
                    {status.label || ""}
                  </div>
                ))}
              </div>
            </div> : null}
            {isLoading ? (
              CAROUSEL_LOADER?.map((item) => (
                <div key={item} className="col-span-12 md:col-span-6" >
                  <div className="animate-pulse bg-gray-100 mb-4 w-full rounded-md min-h-[180px]" />
                </div>
              ))
            ) : orders?.length ? (
              orders?.map((order) => {
                return (
                  <div onClick={() => handleRedirect(PAGES.ORDERS.path + '/' + order?.id)} key={order?.id} className="col-span-12 md:col-span-6">
                    <div className="border relative border-slate-300 flex flex-col items-start justify-start rounded-lg p-4 cursor-pointer h-full">
                      <ICONS.RIGHT className="absolute text-slate-400 w-8 h-8 right-2 top-7 md:top-1/2 -translate-y-1/2" />
                      <div className="w-full flex items-center">
                        <div
                          style={{
                            background: ORDER_COLORS?.[order?.status]?.bg,
                            color: ORDER_COLORS?.[order?.status]?.fill,
                            borderColor: ORDER_COLORS?.[order?.status]?.fill,
                          }}
                          className="cursor-pointer flex items-center font-medium justify-center text-danger rounded-lg border border-danger bg-danger-hover py-1 px-3 text-xs md:text-sm"
                        >
                          <div
                            style={{
                              background: ORDER_COLORS?.[order?.status]?.fill,
                            }}
                            className={classNames(
                              "w-2 h-2 rounded-full bg-danger mr-1"
                            )}
                          />{" "}
                          {convertOrderStatus(order?.status || "")}
                        </div>
                        <div className="divide-x-2 w-[1px] mx-2 h-6 bg-slate-300" />
                        <p className="font-medium text-text text-sm">
                          {moment(order?.created_at).format("DD MMM, YYYY")}
                        </p>
                      </div>
                      <div className="w-full flex items-center mt-4">
                        <div className="w-full max-w-20 relative h-auto">
                          <span className="absolute right-1 bottom-1 text-xs text-white">
                            +{order?.orderItems?.length}
                          </span>
                          <img
                            className="w-full rounded-md"
                            src={currentData(order?.orderItems).image}
                          />
                        </div>
                        <div className="ml-4 flex flex-col justify-start">
                          <h4 className="text-pink font-medium text-base mb-1">
                            Order ID: #{order?.order_no}
                          </h4>
                          <p className="text-slate-400 font-medium text-xs my-2 mb-1">
                            {currentData(order?.orderItems)?.name}
                          </p>
                          <p className="text-text text-sm mb-1">
                            {currentData(order?.orderItems)?.variant}
                          </p>
                          <p className="text-text font-semibold text-base">
                            ₹ {Number(currentData(order?.orderItems).total || 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-12" >
                <div className="w-full flex flex-col items-center justify-center">
                  <img
                    alt="cart_image"
                    src={cart_image}
                    className="object-cover max-w-[180px] md:max-w-[280px] w-auto"
                  />
                  <div className="mt-10 flex flex-col items-center justify-center">
                    <h2 className="text-center text-xl md:text-2xl text-text mb-1 font-semibold">
                      No Orders!
                    </h2>
                    <p className="text-center text-slate-400 text-md my-0.5">
                      Explore more and shortlist some items.
                    </p>
                    <Button
                      label="Explore"
                      className="!w-auto mt-4 md:mt-6 !min-w-36 !rounded-full mb-1 flex items-center justify-center !bg-pink !border-pink hover:!border-yellow hover:!bg-yellow transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ReactHelmet>
  );
};

export default Orders;
