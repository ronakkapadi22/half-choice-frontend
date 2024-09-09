import React, { useMemo } from "react";
import { useSelector } from "react-redux";// Use curly braces for named exports
import ReactOwlCarousel from "react-owl-carousel";
import { BANNER_PATH, CAROUSEL_LOADER } from "../../../assets/utils/constant";

const HomeBanner = () => {
  const { isLoading, data } = useSelector(({ commerce }) => commerce);

  const promotions = useMemo(() => {
    if (isLoading) return []
    const clone = [...data.promotions]
    return clone || []
  }, [isLoading, data.promotions])

  return (
    <div className="w-full h-auto">
      <ReactOwlCarousel
        className="owl-theme !z-0"
        autoPlay={true}
        loop
        {...{
          autoplaySpeed: true,
          autoplayTimeout: 1000,
          autoplayHoverPause: true,
          items: 1,
          margin: 36,
          dots: false,
        }}
      >
        {
          isLoading ? CAROUSEL_LOADER.map(id => <div key={id} className="item w-full" >
            <div className="animate-pulse w-full rounded-xl bg-slate-200 min-h-[450px] h-auto" />
          </div>) : promotions.map(promotion => <div key={promotion?.id} className="w-full px-10 item bg-transparent" >
            <img alt="banners" className="w-full h-auto object-cover object-center" src={BANNER_PATH + promotion?.image} />
          </div>)
        }
      </ReactOwlCarousel>
    </div>
  );
};

export default HomeBanner;
