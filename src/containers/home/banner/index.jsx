import React from "react";
import { useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel";

const HomeBanner = () => {
  const { isLoading, data } = useSelector(({ commerce }) => commerce);

  console.log("promotions", data);

  return (
    <div className="w-full h-auto">
      <OwlCarousel
        className="owl-theme !z-0"
        autoPlay={true}
        loop
        {...{
          autoplaySpeed: true,
          autoplayTimeout: 1000,
          autoplayHoverPause: true,
          items: 1,
          margin: 8,
          dots: false,
        }}
      >
        <div className="item w-full h-9 bg-pink"></div>
        <div className="item w-full h-9 bg-yellow"></div>
        <div className="item w-full h-9 bg-green"></div>
      </OwlCarousel>
    </div>
  );
};

export default HomeBanner;
