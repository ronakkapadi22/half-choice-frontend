import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import { getProduct } from "../../redux/slices/products.slice";
import { useSelector } from "react-redux";
import { CAROUSEL_LOADER, IMAGE_PATH } from "../../assets/utils/constant";
import { ICONS } from "../../assets/icons";
import ReactOwlCarousel from "react-owl-carousel";
import { classNames } from "../../assets/utils/helper";
import Button from "../../shared/button";
import { api } from "../../api";
import Modal from "../../shared/modal";
import { PAGES } from "../../assets/utils/urls";
import Spinner from "../..";

const Product = () => {
  const ref = useRef();
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [attributeIndex, setAttributeIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const { product_id } = useParams();
  const [fetchProduct] = useDispatchWithAbort(getProduct);
  const user = useSelector(({ auth }) => auth?.user);
  const { isLoading, data } = useSelector(({ products }) => products?.product);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchProduct({
      params: {
        product_id,
        user_id: user?.id,
      },
    });
  }, [product_id, fetchProduct]);

  const handleNext = useCallback(() => {
    if (ref.current) {
      ref.current.next();
    }
  }, [ref]);

  const handlePrevious = useCallback(() => {
    if (ref.current) {
      ref.current.prev();
    }
  }, [ref]);

  const variant = useMemo(() => {
    if (isLoading) return {};
    const clone = { ...data };
    return clone?.variantData?.[0] || {};
  }, [data, isLoading]);

  const images = useMemo(() => {
    if (isLoading) return [];
    const clone = { ...variant };
    return clone?.image?.split(",")?.filter((val) => !!val);
  }, [isLoading, variant]);

  const attribute = useMemo(() => {
    if (isLoading) return [];
    const clone = { ...data };
    const variantData = clone?.variantData?.[0];
    return variantData?.attributeData || [];
  }, [variant]);

  const handleRedirect = useCallback((path = '') => {
    navigate(path)
  }, [navigate])

  const isUserLogged = useMemo(() => {
    return Boolean(user?.id);
  }, [user]);

  const handleWishlist = useCallback(async (isWishlist) => {
    if (!isUserLogged) {
      setOpen(true)
      return
    }
    try {
      const response = await api.wishlists.update({
        data: {
          user_id: user?.id,
          product_id,
          isWishlist: !isWishlist
        }
      })
      if (response?.data) {
        fetchProduct({
          params: {
            product_id,
            user_id: user?.id,
          },
        });
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [user?.id, fetchProduct, product_id])

  const handleCartItem = async (attributeItem) => {
    if (attributeItem?.quantity) {
      handleRedirect(PAGES.CART.path)
      return
    }
    setLoader(true)
    try {
      const response = await api.cart.update({
        data: {
          user_id: user?.id,
          product_id,
          quantity: '1',
          variant_id: variant?.id,
          attribute_id: attributeItem?.id
        }
      })
      if (response?.data) {
        fetchProduct({
          params: {
            product_id,
            user_id: user?.id,
          },
        });
        handleRedirect(PAGES.CART.path)
      }
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log('error', error)
    }
  }


  return (
    <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
      <div className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-5 p-2">
          <div className="w-full flex flex-col">
            <div className="w-full relative h-auto mb-2">
              {attribute?.[attributeIndex]?.discount ? (
                <div className="absolute top-2 left-2 bg-green text-white text-xs rounded-lg px-2 py-1">
                  {attribute?.[attributeIndex]?.discount
                    ? `-${attribute?.[attributeIndex]?.discount}%`
                    : null}
                </div>
              ) : null}
              <img
                className="w-full h-auto object-cover object-center rounded-xl xl:min-h-[400px]"
                src={IMAGE_PATH + images?.[currentImageIndex]}
              />
            </div>
            <div className="w-full flex items-center justify-center h-auto p-2 relative">
              <button className="z-50 mr-1 flex items-center justify-center">
                <ICONS.CHEVRON_LEFT
                  onClick={handlePrevious}
                  className="text-text w-6 h-6"
                />
              </button>
              <ReactOwlCarousel
                items={3}
                ref={ref}
                className="owl-carousel owl-theme !mt-0"
                dots={false}
                margin={24}
              >
                {isLoading
                  ? CAROUSEL_LOADER.map((id) => (
                    <div key={id} className="item w-full">
                      <div className="animate-pulse h-[180px] rounded-xl bg-slate-200" />
                    </div>
                  ))
                  : images?.map((image, index) => (
                    <div
                      key={index}
                      className="w-full item"
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        key={image}
                        className={classNames(
                          "cursor-pointer rounded-md xl:max-h-[280px] object-cover object-center")}
                        src={IMAGE_PATH + image}
                      />
                    </div>
                  ))}
              </ReactOwlCarousel>
              <button className="ml-1 z-50 flex items-center justify-center">
                <ICONS.CHEVRON_RIGHT
                  onClick={handleNext}
                  className="text-text w-6 h-6"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-7 p-2">
          <div className="flex flex-col">
            <h2 className="text-sm title-font text-less tracking-widest">
              {variant?.name}
            </h2>
            <p className="text-green text-3xl font-medium mb-1">
              {data?.product_name || ""}
            </p>
            <div className="w-full mt-4 mb-2 flex justify-between items-center">
              <div className="w-full flex justify-start items-center my-1.5 text-2xl font-medium">
                <ins className="no-underline">
                  ₹ {attribute?.[attributeIndex]?.selling_price}
                </ins>
                <del className="ml-4 line-through text-base text-less">
                  ₹ {attribute?.[attributeIndex]?.mrp}
                </del>
              </div>
              <div className="bg-slate-100 cursor-pointer rounded-full p-2">
                {data?.wishlist ? (
                  <ICONS.HEART_FILL
                    onClick={() => handleWishlist(data.wishlist)}
                    className="w-7 h-7 text-pink"
                  />
                ) : (
                  <ICONS.HEART_EMPTY
                    onClick={() => handleWishlist(data.wishlist)}
                    className="w-7 h-7 text-pink"
                  />
                )}
              </div>
            </div>
            <div className="w-full mt-4 mb-5">
              <div className="w-full flex flex-col justify-start mb-6">
                <h2 className="title-font mb-1 font-medium text-base text-text">
                  Color
                </h2>
                <div
                  className={classNames(
                    "w-8 items-center cursor-pointer justify-center border-text-secondary border h-8 md:w-10 md:h-10 rounded-full p-0.5"
                  )}
                >
                  <div
                    style={{ background: variant?.color_code }}
                    className="w-full h-full rounded-full"
                  ></div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-start">
                <h2 className="mb-1 font-medium text-base text-text">
                  Select Size
                </h2>
                <div className="w-full flex items-center justify-start flex-wrap gap-3">
                  {attribute?.map((attributeItem, i) => (
                    <div
                      onClick={() => setAttributeIndex(i)}
                      className={classNames(
                        "border py-2 px-4 text-text font-medium border-select rounded-md cursor-pointer",
                        attributeIndex === i
                          ? "bg-select !text-white"
                          : "bg-transparent"
                      )}
                      key={i}
                    >
                      {attributeItem?.agegroup}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full my-4" >
              <Button disabled={loader} onClick={() => handleCartItem(attribute?.[attributeIndex])} className={classNames('flex w-full justify-center items-center hover:border-yellow hover:bg-yellow transition-all duration-300', loader ? 'cursor-not-allowed' : '')}>
                {loader ? <span className="mr-2" >Loading</span> : <span className="mr-2" >{attribute?.[attributeIndex]?.quantity ? 'View to Bag' : 'Add to Bag'}</span>}
                {loader ? <Spinner className="!w-4 !h-4" /> : <ICONS.BAG className="w-5 h-5" />}
              </Button>
            </div>
            <hr />
            <div className="w-full my-4">
              <div className=" w-full flex flex-col justify-start">
                <h2 className="title-font mb-1 font-medium text-base text-text">
                  Product Details
                </h2>
                <div
                  dangerouslySetInnerHTML={{ __html: data.description }}
                ></div>
              </div>
            </div>
            <hr />
            <div className="w-full my-4">
              <div className=" w-full flex flex-col justify-start">
                <h2 className="title-font mb-1 font-medium text-base text-text">
                  Returns Policy
                </h2>
                <div
                  dangerouslySetInnerHTML={{ __html: data.policy_des }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal {...{ open, setOpen }} >
        <div className="w-full relative flex flex-col items-start justify-center" >
          <Button className='!bg-slate-200 !border-none !rounded-full !p-1 !absolute right-0 top-0 !text-text' >
            <ICONS.CLOSE onClick={() => setOpen(false)} className="w-8 h-8 text-s" />
          </Button>
          <h3 className="text-xl mb-4 mt-3 font-medium text-text">Sign In</h3>
          <p className="text-slate-400 mb-3 mt-1 text-base leading-normal">
            To access this feature, please sign in to your account first. Once you're logged in, you can continue to add items to your wishlist seamlessly.
          </p>
          <Button label='Sign In' handleClick={() => handleRedirect(PAGES.LOGIN.path)} className='!rounded-full min-w-[140px] !border-green hover:!bg-pink hover:!border-pink !bg-green' />
        </div>
      </Modal>
    </div>
  );
};

export default Product;
