import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { classNames } from "../../../assets/utils/helper";
import Button from "../../../shared/button";
import { ICONS } from "../../../assets/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const { home_banners } = useSelector(({ common }) => common);

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const banners = useMemo(() => {
    if (!home_banners || !home_banners.length) return [];
    return home_banners;
  }, [home_banners]);

  useEffect(() => {
    if (banners.length > 0) {
      banners.slice(0, 3).forEach((banner) => {
        if (banner?.image) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = banner.image; // Dynamically preload first 3 images
          link.type = "image/webp";
          document.head.appendChild(link);
        }
      });
    }
  }, [banners]); // ✅ Runs when banners update

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
    <div className="w-full md:h-[calc(100vh-122px)] relative">
      <div onClick={goNext} className="swiper-button image-swiper-button-next border p-3 rounded-full border-text">
        <ICONS.CHEVRON_RIGHT />
      </div>
      <div onClick={goPrev} className="swiper-button image-swiper-button-prev border p-3 rounded-full border-text">
        <ICONS.CHEVRON_LEFT />
      </div>
      {banners.length > 0 && (
        <Swiper
          ref={swiperRef}
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
            disabledClass: "swiper-button-disabled",
          }}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {banners.map((item, i) => (
            <SwiperSlide key={item?.id}>
              <Slide
                image={item?.image || ""}
                small={item?.title || ""}
                message={item?.sub_title || ""}
                btn={item?.action || ""}
                isActive={activeIndex === i}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

const Slide = ({ isActive, image, message, btn, small }) => {
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleMouseMove = (event) => {
    const { clientX, clientY, currentTarget } = event;
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = currentTarget;

    const xPos = (clientX - offsetLeft - offsetWidth / 2) / 50;
    const yPos = (clientY - offsetTop - offsetHeight / 2) / 50;

    setImagePosition({ x: xPos, y: yPos });
  };

  const handleRedirect = useCallback((path = "") => {
    navigate(path);
  }, [navigate]);

  return (
    <div className="slide w-full px-4 md:!px-20 h-screen md:h-[calc(100vh-122px)]" onMouseMove={handleMouseMove}>
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4 w-full h-full">
        <div className="md:col-span-6 order-2 md:order-1">
          <div className="flex h-full justify-center items-center">
            <div className="w-full md:pl-8 text-center md:text-left">
              <h2 className={isActive ? 'fade-up mb-4 md:mb-6 text-xl md:text-3xl font-medium text-pink' : ''}>{small}</h2>
              <h1 className={isActive ? 'fade-up-delay text-2xl md:text-4xl !leading-normal md:!leading-[74px]' : ''}>{message || ''}</h1>
              <Button
                handleClick={() => handleRedirect('/products?cat_id=27&sub_sub_cat_id=38,39&name=apparel&sub_cat_id=')}
                className={classNames(
                  "!w-auto mt-4 md:mt-10 text-base md:text-xl flex items-center mx-auto md:mx-0 !min-w-40 !rounded-full justify-center !bg-green !border-green hover:!border-pink hover:!bg-pink transition-all duration-300",
                  isActive ? 'fade-up-delay-btn' : ''
                )}
              >
                {btn || 'Explore Now'}
              </Button>
            </div>
          </div>
        </div>
        <div className="md:col-span-6 relative order-1 md:order-2 -mb-[80px] md:mb-0">
          <div className="relative w-full flex justify-center md:block">
            <div className="md:absolute mt-10 md:mt-0 rounded-full z-10 md:top-[150px] md:bottom-0 bg-white md:w-[700px] md:h-[700px] w-[300px] h-[300px]">
              <div className="relative">
                <img
                  className={classNames(
                    isActive ? "fade-up-delay-image" : "",
                    "z-20 w-[250px] md:w-[620px] mx-auto md:mx-0 md:absolute md:-top-[140px] transition-transform duration-300 ease-out"
                  )}
                  alt={small}
                  loading="lazy"
                  src={image}
                  srcSet={`${image}?w=250 250w, ${image}?w=620 620w, ${image}?w=1024 1024w`}
                  sizes="(max-width: 640px) 250px, (max-width: 1024px) 620px, 1024px"
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
    </div>
  );
};

export default HomeBanner;