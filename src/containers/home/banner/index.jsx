import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { classNames } from "../../../assets/utils/helper";
import Button from "../../../shared/button";
import { ICONS } from "../../../assets/icons";
import banner1 from "../../../assets/images/banner1.png";
import banner2 from "../../../assets/images/banner2.png";
import banner3 from "../../../assets/images/banner3.png";
import banner4 from "../../../assets/images/banner7.png";
import banner5 from "../../../assets/images/banner5.png";
import banner6 from "../../../assets/images/banner6.png";
import banner7 from "../../../assets/images/banner4.png";
import banner8 from "../../../assets/images/banner8.png";
import banner9 from "../../../assets/images/banner9.png";
import banner10 from "../../../assets/images/banner10.png";

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
    <div className="w-full h-[calc(100vh-122px)] relative">
      <div onClick={goNext} className="swiper-button image-swiper-button-next border p-3 rounded-full border-text">
        <ICONS.CHEVRON_RIGHT />
      </div>
      <div onClick={goPrev} className="swiper-button image-swiper-button-prev border p-3 rounded-full border-text">
        <ICONS.CHEVRON_LEFT />
      </div>
      <Swiper ref={swiperRef}
        modules={[Autoplay, Pagination]}
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
        pagination={{
          clickable: true
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        <SwiperSlide>
          <Slide image={banner1} small="Trendy Kids' Fashion" message="Shop Trendy Kids' Fashion - Stylish Dresses to Ethnic Wear!" btn='Shop Now' isActive={activeIndex === 0} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={banner2} small="One-Stop Kids' Clothes" message="Explore Kids' Clothes - Casual, Party & Ethnic Wear at Best Prices!" btn='Browse Collection' isActive={activeIndex === 1} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={banner3} small="Kids' Clothing for Every Occasion" message="Find Trendy Outfits - Dresses, Ethnic Wear, T-shirts & More!" btn='Explore Now' isActive={activeIndex === 2} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={banner4} small="Stylish & Comfortable Kids' Clothes" message="Fashionable & Comfortable Kids' Clothes - T-shirts, Dresses & More!" btn="Shop Stylish Outfits" isActive={activeIndex === 3} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={banner6} small="Affordable Kids' Fashion" message="Affordable, High-Quality Kids' Clothing - Dresses, Casuals & Ethnic Wear!" btn="Start Shopping" isActive={activeIndex === 4} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={banner5} small="Kids' Fashion for Celebrations" message="Perfect Kids' Fashion for Birthdays, Festivals & Celebrations!" btn="Shop for Occasions" isActive={activeIndex === 5} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={banner7} small="Comfort & Style for Kids" message="Stylish & Comfortable Kids' Clothing for Boys & Girls!" btn="Discover Comfort" isActive={activeIndex === 6} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={banner8} small="Ethnic Wear for Kids" message="Shop Trendy Ethnic Wear for Kids - Perfect for Festivities!" btn="Explore Ethnic Wear" isActive={activeIndex === 7} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={banner9} small="Perfect Dresses for Kids" message="Elegant Party Dresses & Fun Frocks for Your Little One!" btn="Shop Dresses Now" isActive={activeIndex === 8} />
        </SwiperSlide>
        <SwiperSlide>
          <Slide small="Seasonal Kids' Fashion" image={banner10} message="New Styles in Kids' Fashion - Dresses, T-shirts & Ethnic Wear!" btn="Shop Fresh Styles" isActive={activeIndex === 9} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

const Slide = ({ isActive, image, message, btn, small }) => {
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
            <h2 className={isActive ? 'fade-up mb-6 text-4xl font-medium text-pink' : ''}>{small}</h2>
            <h1 className={isActive ? 'fade-up-delay text-5xl !leading-[74px]' : ''}>{message || ''}</h1>
            <Button
              className={classNames(
                "!w-auto mt-10 text-xl flex items-center !min-w-40 !rounded-full justify-center !bg-green !border-green hover:!border-pink hover:!bg-pink transition-all duration-300",
                isActive ? 'fade-up-delay-btn' : ''
              )}
            >
              {btn || 'Explore Now'}
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-6 relative" >
        <div className="absolute left-0 rounded-full z-10 top-[150px] bottom-0 bg-white w-[700px] h-[700px]" >
          <div className="relative" >
            <img className={classNames(isActive ? "fade-up-delay-image" : "", "z-20 absolute w-[620px] -top-[140px] ")}
              src={image}
              alt={small}
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
