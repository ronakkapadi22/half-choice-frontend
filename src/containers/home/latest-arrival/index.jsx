import React, { useCallback, useMemo, useRef, useState } from "react";
import { classNames, isTokenActivated } from "../../../assets/utils/helper";
import { ICONS } from "../../../assets/icons";
import ReactOwlCarousel from "react-owl-carousel";
import { CAROUSEL_LOADER } from "../../../assets/utils/constant";
import ProductCard from "../../../shared/product-card";
import ProductSkeleton from "../../../shared/product-skeleton";
import { useSelector } from "react-redux";
import useDispatchWithAbort from "../../../hooks/useDispatchWithAbort";
import { getCommerce } from "../../../redux/slices/commerce.slice";
import Modal from "../../../shared/modal";
import Button from "../../../shared/button";
import { PAGES } from "../../../assets/utils/urls";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";

const LatestArrival = ({ title, className, disabledMeta, ...props }) => {
  const ref = useRef();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const user = useSelector(({ auth }) => auth.user);
  const { isLoading, data } = useSelector(({ commerce }) => commerce);
  const [fetchHome] = useDispatchWithAbort(getCommerce);

  const handleNext = useCallback(() => {
    if (ref.current) {
      ref.current.next();
    }
  }, [ref]);

  const responsive = useMemo(
    () => ({
      0: {
        items: 2
      },
      768: {
        items: 3
      },
      1280: {
        items: 4
      },
    }),
    []
  );

  const handlePrevious = useCallback(() => {
    if (ref.current) {
      ref.current.prev();
    }
  }, [ref]);

  const isUserLogged = useMemo(() => {
    return Boolean(user?.id) && isTokenActivated(user?.authtoken);
  }, [user]);

  const latest = useMemo(() => {
    if (isLoading) return []
    const clone = [...data.newArrival]
    return clone || []
  }, [isLoading, data.newArrival])

  const handleWishlist = useCallback(async (id, isWishlist) => {
    if (!isUserLogged) {
      setOpen(true)
      return
    }
    try {
      const response = await api.wishlists.update({
        data: {
          user_id: user?.id,
          product_id: id,
          isWishlist: !isWishlist
        }
      })
      if (response?.data) {
        fetchHome({
          params: {
            user_id: user?.id
          }
        });
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [user?.id, fetchHome])

  const handleRedirect = useCallback((path = '') => {
    navigate(path)
  }, [navigate])

  return (
    <div
      className={classNames(
        "relative container mx-auto lg:px-4 p-4 max-w-7xl",
        className
      )}
    >
      <div className="flex items-start md:items-end mb-12 justify-between w-full">
        <div className="flex flex-col">
          <h3 className="text-lg md:text-xl font-semibold text-pink">Our</h3>
          <h2 className="mb-4 md:mb-6 text-2xl md:text-4xl font-bold">{title || ""}</h2>
          <p className="text-gray-600 text-base md:text-lg">
            Explore the latest arrivals in kids' clothing with adorable, comfy,
            and playful styles perfect for every little trendsetter.
          </p>
        </div>
        <div className="flex">
          <button className="mr-2 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-text">
            <ICONS.CHEVRON_LEFT
              onClick={handlePrevious}
              className="text-text w-4 h-4 md:w-6 md:h-6"
            />
          </button>
          <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-text">
            <ICONS.CHEVRON_RIGHT
              onClick={handleNext}
              className="text-text w-4 h-4 md:w-6 md:h-6"
            />
          </button>
        </div>
      </div>
      <div className="mt-10">
        <ReactOwlCarousel
          responsive={responsive}
          ref={ref}
          className="owl-carousel owl-theme"
          dots={false}
          loop
          margin={32}
        >
          {
            isLoading ? CAROUSEL_LOADER.map(id => <div key={id} className="item w-full" >
              <ProductSkeleton />
            </div>) : latest.map(product => <div key={product?.id} className="w-full item" >
              <ProductCard {...product} handleWishlist={handleWishlist} {...{ id: product?.id, variant: product?.variantData?.[0], disabledMeta }} />
            </div>)
          }
        </ReactOwlCarousel>
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

export default LatestArrival;
