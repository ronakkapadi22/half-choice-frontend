import React, { useCallback, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { classNames } from "../../../assets/utils/helper";
import { ICONS } from "../../../assets/icons";
import ReactOwlCarousel from "react-owl-carousel";
import { CAROUSEL_LOADER } from "../../../assets/utils/constant";
import ProductCard from "../../../shared/product-card";
import ProductSkeleton from "../../../shared/product-skeleton";

const LatestArrival = ({ title, className, ...props }) => {
  const ref = useRef();
  const { isLoading, data } = useSelector(({ commerce }) => commerce);

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

  const latest = useMemo(() => {
    if(isLoading) return []
    const clone = [...data.newArrival]
    return clone || []
  }, [isLoading, data.newArrival])

  return (
    <div
      className={classNames(
        "relative container mx-auto lg:px-4 p-4 max-w-7xl",
        className
      )}
    >
      <div className="flex items-end mb-12 justify-between w-full">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-pink">Our</h3>
          <h2 className="mb-6 text-4xl font-bold">{title || ""}</h2>
          <p className="text-gray-600 text-lg">
            Explore the latest arrivals in kids' clothing with adorable, comfy,
            and playful styles perfect for every little trendsetter.
          </p>
        </div>
        <div className="flex">
          <button className="mr-2 w-10 h-10 flex items-center justify-center rounded-full border border-text">
            <ICONS.CHEVRON_LEFT
              onClick={handlePrevious}
              className="text-text w-6 h-6"
            />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-text">
            <ICONS.CHEVRON_RIGHT
              onClick={handleNext}
              className="text-text w-6 h-6"
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
                <ProductSkeleton/>
            </div>) : latest.map(product => <div key={product?.id} className="w-full item" >
                <ProductCard {...product} {...{id: product?.id, variant: product?.variantData?.[0]}} />
            </div>)
        }
        </ReactOwlCarousel>
      </div>
    </div>
  );
};

export default LatestArrival;
