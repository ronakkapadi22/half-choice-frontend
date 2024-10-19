import React, { useMemo } from "react";
import { useSelector } from "react-redux"; // Use curly braces for named exports
import Slider from "react-slick";
import { BANNER_PATH, CAROUSEL_LOADER } from "../../../assets/utils/constant";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeBanner = () => {
  const { isLoading, data } = useSelector(({ commerce }) => commerce);

  const promotions = useMemo(() => {
    if (isLoading) return [];
    const clone = [...data.promotions];
    return clone || [];
  }, [isLoading, data.promotions]);

  return (
    <div className="w-full h-auto">
      <Slider
        {...{
          className: "center",
          centerMode: true,
          focusOnSelect: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
          centerPadding: "80px",
          slidesToShow: 3,
          speed: 500,
        }}
      >
        {isLoading
          ? CAROUSEL_LOADER.map((id) => (
            <div key={id} className="item w-full">
              <div className="animate-pulse w-full rounded-xl bg-slate-200 min-h-[70vh] h-auto" />
            </div>
          ))
          : promotions.map((promotion) => (
            <div
              key={promotion?.id}
              className="w-full px-1 item bg-transparent"
            >
              <img
                alt="banners"
                className="w-full image h-auto object-cover object-center"
                src={BANNER_PATH + promotion?.image}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default HomeBanner;
