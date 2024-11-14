import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { classNames } from "../../../assets/utils/helper";
import Button from "../../../shared/button";
import { ICONS } from "../../../assets/icons";

const HomeBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="w-full h-screen relative">
      <div onClick={goNext} className="swiper-button image-swiper-button-next border p-3 rounded-full border-text">
        <ICONS.CHEVRON_RIGHT />
      </div>
      <div onClick={goPrev} className="swiper-button image-swiper-button-prev border p-3 rounded-full border-text">
        <ICONS.CHEVRON_LEFT />
      </div>
      <Swiper ref={swiperRef}
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled"
        }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        <SwiperSlide>
          <Slide image='https://uiuxom.com/ulina/html/images/slider/person_3.png' isActive={activeIndex === 0} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image='https://uiuxom.com/ulina/html/images/slider/person_1.png' isActive={activeIndex === 1} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image='https://uiuxom.com/ulina/html/images/slider/person_2.png' isActive={activeIndex === 2} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image='https://uiuxom.com/ulina/html/images/slider/person_3.png' isActive={activeIndex === 3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const Slide = ({ isActive, image }) => {
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const { clientX, clientY, currentTarget } = event;
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = currentTarget;

    // Calculate mouse position relative to the slide's center
    const xPos = (clientX - offsetLeft - offsetWidth / 2) / 50; // Adjust division for effect intensity
    const yPos = (clientY - offsetTop - offsetHeight / 2) / 50;

    setImagePosition({ x: xPos, y: yPos });
  };

  return <div className="slide w-full !px-20" onMouseMove={handleMouseMove}>
    <div className="grid grid-cols-12 gap-4 w-full h-full" >
      <div className="col-span-6" >
        <div className="flex h-full justify-center items-center" >
          <div className="w-full pl-8" >
            <h2 className={isActive ? 'fade-up mb-6 text-4xl font-medium text-pink' : ''}>Summer Sale is On</h2>
            <h1 className={isActive ? 'fade-up-delay text-7xl !leading-[74px]' : ''}>Discover Men's Latest Fashion</h1>
            <Button
              className={classNames(
                "!w-auto mt-10 text-xl flex items-center !min-w-40 !rounded-full justify-center !bg-green !border-green hover:!border-pink hover:!bg-pink transition-all duration-300",
                isActive ? 'fade-up-delay-btn' : ''
              )}
            >
              Explore Now
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-6 relative" >
        <div className="absolute left-0 rounded-full z-10 top-[200px] bottom-0 bg-white w-[740px] h-[740px]" >
          <div className="relative" >
            <img className={classNames(isActive ? "fade-up-delay-image" : "", "z-20 absolute -top-[100px]")}
              src={image}
              alt="Fashion Model"
              style={{
                transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>

}

export default HomeBanner;
