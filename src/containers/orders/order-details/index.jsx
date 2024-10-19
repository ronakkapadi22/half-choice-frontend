import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PAGES } from "../../../assets/utils/urls";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../shared/breadcrumb";
import useDispatchWithAbort from "../../../hooks/useDispatchWithAbort";
import { getOrder, getReasons } from "../../../redux/slices/order.slice";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  CAROUSEL_LOADER,
  IMAGE_PATH,
  ORDER_COLORS,
} from "../../../assets/utils/constant";
import { classNames, convertOrderStatus, getTitle } from "../../../assets/utils/helper";
import Button from "../../../shared/button";
import Modal from "../../../shared/modal";
import { ICONS } from "../../../assets/icons";
import Form from "../../../shared/form";
import { CancelReasonSchema } from "../../../assets/utils/validation";
import { useFormik } from "formik";
import Spinner from "../../..";
import { api } from "../../../api";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(({ auth }) => auth?.user);
  const { data, isLoading } = useSelector(({ order }) => order?.order);
  const { isLoading: reasonLoading, data: reasonData } = useSelector(
    ({ order }) => order?.reasons
  );

  const { values, errors, handleSubmit, setValues } = useFormik({
    initialValues: {
      reason: null
    },
    enableReinitialize: true,
    validationSchema: CancelReasonSchema,
    onSubmit: async (values) => {
      await handleCancelOrder(values);
    },
  });

  const handleCancelOrder = async (payload) => {
    setLoader(true)
    try {
      const response = await api.orders.cancel({
        data: {
          user_id: user?.id,
          order_id: id,
          reason: payload?.reason || '',
          reasonDes: payload?.reason || ''
        }
      })
      if (response?.data) {
        setLoader(false)
        fetchOrder({
          params: {
            user_id: user?.id,
            order_id: id,
          },
        })
        setSelected(null)
      }
    } catch (error) {
      setLoader(false)
      console.log('error', error)
    }
  }

  const [fetchOrder] = useDispatchWithAbort(getOrder);
  const [fetchReasons] = useDispatchWithAbort(getReasons);

  const [selected, setSelected] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    },
    [values]
  );

  const handleSelect = useCallback((value) => {
    setValues({ reason: value })
  }, [setValues])

  useEffect(() => {
    fetchOrder({
      params: {
        user_id: user?.id,
        order_id: id,
      },
    });
  }, [id, fetchOrder, user?.id]);

  useEffect(() => {
    fetchReasons({
      params: {
        user_id: user?.id,
      },
    });
  }, [user?.id, fetchReasons]);

  const handleSelected = useCallback((values) => {
    setSelected(values);
  }, []);

  const links = useMemo(
    () => [
      {
        id: "orders",
        label: "Orders",
        redirect: PAGES.ORDERS.path,
      },
      {
        id: "order",
        label: `Order ID - ${id}`,
      },
    ],
    [id]
  );

  const handleRedirect = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const summary = useMemo(() => {
    if (!data?.orderItems?.length || isLoading) return {};
    const clone = [...data?.orderItems];
    return {
      discount: clone
        ?.map(({ mrp, selling_price }) => mrp - selling_price)
        ?.reduce((a, b) => a + b, 0),
      total: clone?.map(({ mrp }) => mrp)?.reduce((a, b) => a + b, 0),
      subtotal: clone
        ?.map(({ selling_price }) => selling_price)
        ?.reduce((a, b) => a + b, 0),
    };
  }, [data, isLoading]);

  return (
    <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
      <div className="w-full">
        <Breadcrumb links={links} />
      </div>
      <div className="w-full flex flex-col items-start justify-start my-9">
        <h2 className="text-3xl text-text mb-1.5 font-semibold">
          Order Details
        </h2>
        <p className="text-slate-400 text-md">
          A details of my recent purchase, featuring a variety of items I've
          added to my wardrobe. From everyday essentials to statement pieces,
          these orders reflect my evolving style and personal preferences.
        </p>
        <div className="w-full mt-12">
          {isLoading ? (
            <div className="animate-pulse w-full rounded-lg h-20 bg-gray-100"></div>
          ) : data ? (
            <div className="w-full bg-gray-100 rounded-lg p-5 flex items-center justify-between">
              <div className="flex items-center justify-start">
                <div className="flex flex-col justify-start items-start">
                  <p className="font-medium text-base text-text">
                    Order ID: {data?.order_no}
                  </p>
                  <p className="text-slate-400 text-sm mt-1 ">2 Items</p>
                </div>
                <div className="w-[1px] bg-slate-300 h-10 mx-6" />
                <div className="flex flex-col justify-start items-start">
                  <p className="font-medium mb-1 text-base text-text">
                    ₹ {Number(summary?.total || 0).toFixed(2)}
                  </p>
                  <p className="font-medium text-base text-green">
                    You saved: ₹ {Number(summary?.discount || 0).toFixed(2)}
                  </p>
                </div>
                <div className="w-[1px] bg-slate-300 h-10 mx-6" />
                <div>
                  <p className="text-slate-400 text-sm">
                    {moment(data?.created_at).format("DD MMM, YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex items-end flex-col justify-end">
                <div
                  style={{
                    background: ORDER_COLORS?.[data?.status]?.bg,
                    color: ORDER_COLORS?.[data?.status]?.fill,
                    borderColor: ORDER_COLORS?.[data?.status]?.fill,
                  }}
                  className="cursor-pointer flex items-center font-medium justify-center text-danger rounded-lg border border-danger bg-danger-hover py-1 px-3 text-sm"
                >
                  <div
                    style={{
                      background: ORDER_COLORS?.[data?.status]?.fill,
                    }}
                    className={classNames(
                      "w-2 h-2 rounded-full bg-danger mr-1"
                    )}
                  />{" "}
                  {convertOrderStatus(data?.status || "")}
                </div>
                <p className="font-medium mt-2 text-sm text-text">
                  Arriving By:{" "}
                  <span className="text-green ml-1">
                    {moment(data?.delivery_date)?.format("DD MMM, YYYY")}
                  </span>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-7">
          <div className="w-full">
            <h2 className="font-medium text-text text-lg">
              Items Ordered & Delivery Details
            </h2>
            <div className="mt-4 flex flex-col w-full relative">
              {isLoading
                ? CAROUSEL_LOADER?.map((item) => (
                  <div
                    key={item}
                    className="animate-pulse bg-gray-100 mb-4 w-full rounded-md min-h-[120px]"
                  />
                ))
                : data?.orderItems?.map((product) => {
                  const image = product?.image?.split(",")?.[0];
                  return (
                    <div
                      className="rounded-md py-2 px-3 mb-3 relative bg-gray-100"
                      key={product?.id}
                    >
                      <div className="w-full flex items-center justify-start">
                        <img
                          className="w-28 rounded-md xl:max-h-[280px] object-cover object-center"
                          src={IMAGE_PATH + image}
                        />
                        <div className="w-full ml-4">
                          <h2
                            onClick={() =>
                              handleRedirect(
                                PAGES.PRODUCTS.path +
                                "/" +
                                product?.product_id + "/" + getTitle(product?.product_name)
                              )
                            }
                            className="flex cursor-pointer justify-between text-base font-medium text-text"
                          >
                            {product?.product_name || ""}
                          </h2>
                          <div className="w-full flex justify-start items-center my-1.5 text-base font-medium">
                            <ins className="no-underline">
                              ₹ {product?.selling_price}
                            </ins>
                            <del className="ml-2 line-through text-sm text-less">
                              ₹ {product?.mrp}
                            </del>
                            <div className="ml-2 py-0.5 px-1.5 text-xs text-white font-medium bg-green rounded-md">
                              {`-${product?.discount}%` || ""}
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
                                style={{ background: product?.color_code }}
                                className="w-full h-full rounded-full"
                              ></div>
                            </div>
                          </div>
                          <div className="w-full flex items-center mt-2 text-sm text-gray-500 justify-start">
                            <p>Size:</p>
                            <div className="ml-2 py-0.5 px-1.5 text-xs text-white font-medium bg-select rounded-md">
                              {product?.agegroup || ""}
                            </div>
                          </div>
                          <div className="w-full flex items-center mt-2 text-sm text-gray-500 justify-start">
                            <p>Qty:</p>
                            <div className="ml-2 font-medium">
                              {product?.quantity || ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-5">
          <div className="w-full">
            <h2 className="font-medium text-text text-lg">Delivery Address</h2>
            <div className="mt-4 flex flex-col w-full rounded-lg p-4 bg-gray-100 relative">
              <div className="py-0.5 px-1.5 text-sm w-[fit-content] text-white font-medium bg-select rounded-md">
                {data?.address_type || ""}
              </div>
              <div className="w-full my-2">
                <p>
                  {data?.address_line_1}, {data?.address_line_2}
                </p>
                <p>
                  {data?.address_city}, {data?.address_state} -{" "}
                  {data?.address_pincode}
                </p>
                <p>{data?.address_country}</p>
              </div>
              <hr />
              <div className="w-full mt-2">
                <h2 className="text-text text-md title-font font-medium">
                  {data?.address_full_name || ""}
                </h2>
                <p className="text-slate-400 text-sm title-font font-medium">
                  {data?.address_phone || ""}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-8">
            <h2 className="font-medium text-text text-lg">Order Summary</h2>
            <div className="w-full flex flex-col justify-start mt-3 bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between mb-3">
                <span className="text-slate-400">Total</span>
                <span className="text-text">
                  ₹ {summary?.total?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-green">Discount</span>
                <span className="text-green">
                  ₹ -{summary?.discount?.toFixed(2)}
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
                <span className="text-text font-semibold">
                  Your Payment
                </span>
                <span className="text-text font-semibold">
                  ₹{summary?.subtotal?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full mt-4">
            <Button disabled={data?.status !== 'PENDING'}
              handleClick={() => handleSelected(data)}
              className={classNames("w-full hover:bg-yellow hover:border-yellow transition-all duration-300", data?.status !== 'PENDING' ? 'bg-[#e2218fa6] cursor-not-allowed hover:!bg-[#fcb018a6]' : '')}
              label={data?.status !== 'PENDING' ? "Calcelled" : "Cancel Order"}
            />
          </div>
        </div>
      </div>
      <Modal
        rootClass="lg:!max-w-[680px] !overflow-auto"
        {...{
          open: Boolean(selected?.id) || Boolean(selected),
          setOpen: setSelected,
        }}
      >
        <div className="w-full relative flex flex-col items-start justify-center">
          <div className="w-full h-auto">
            <div className="flex items-center justify-between w-full">
              <h2 className="mt-3 mb-4 text-xl font-medium text-text">
                Cancel Reason
              </h2>
              <Button
                handleClick={() => setSelected(null)}
                className="!bg-slate-200 !border-none !rounded-full !p-1 !text-text"
              >
                <ICONS.CLOSE className="w-8 h-8 text-s" />
              </Button>
            </div>
            <div className="grid w-full grid-cols-12 gap-4 mt-4">
              {reasonLoading
                ? CAROUSEL_LOADER?.map((value) => <div className={"col-span-12 md:col-span-6 animate-pulse w-full rounded-lg h-10 bg-gray-100"} key={value}></div>)
                : reasonData?.map((reason) => <div onClick={() => handleSelect(reason?.name || '')} className={classNames("col-span-12 text-sm md:col-span-6 w-full p-2 cursor-pointer bg-gray-100 rounded-lg border", values['reason'] === reason?.name ? 'border-select bg-[#87ceeb6b]' : '')} key={reason?.id}>{reason?.name || ''}</div>)}
            </div>
            <Form {...{ handleSubmit }} >
              <textarea rows={5} className={classNames("text-sm focus:!ring-0 focus-visible:!ring-0 resize-none w-full mt-4 border rounded-lg p-4", errors['reason'] ? 'border-red-500' : '')} placeholder="Enter Order Cancel Reason" value={values.reason} name="reason" onChange={handleChange} />
              <Button
                type="submit"
                disabled={loader}
                className={classNames(
                  "!w-full mt-2 flex min-w-28 items-center justify-center !bg-pink !border-pink hover:!border-yellow hover:!bg-yellow transition-all duration-300",
                  loader ? "cursor-not-allowed" : ""
                )}
              >
                <span>{!loader ? 'Submit' : "Loading"}</span>
                {loader ? <Spinner className="ml-1 !w-4 !h-4" /> : null}
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetails;
