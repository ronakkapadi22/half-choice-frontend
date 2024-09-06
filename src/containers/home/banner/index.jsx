import React from "react";
import { useSelector } from "react-redux";// Use curly braces for named exports
import ReactOwlCarousel from "react-owl-carousel";

const HomeBanner = () => {
  const { isLoading, data } = useSelector(({ commerce }) => commerce);

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
          margin: 8,
          dots: false,
        }}
      >
        <div className="item w-full h-9 bg-pink"></div>
        <div className="item w-full h-9 bg-yellow"></div>
        <div className="item w-full h-9 bg-green"></div>
      </ReactOwlCarousel>
    </div>
  );
};

export default HomeBanner;
