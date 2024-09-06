import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { classNames } from "../../../assets/utils/helper";
import { Link } from "react-router-dom";
import { PAGES } from "../../../assets/utils/urls";
import { PRODUCTS_LOADER } from "../../../assets/utils/constant";
import ProductSkeleton from "../../../shared/product-skeleton";
import ProductCard from "../../../shared/product-card";

const PopularProducts = ({ title, className, ...props }) => {
  const { isLoading, data } = useSelector(({ commerce }) => commerce);

  const trending = useMemo(() => {
    if (isLoading) return [];
    const clone = [...data.trendings];
    return clone || [];
  }, [isLoading, data.trendings]);
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
            Explore our range of Popular Products to find the latest and most
            sought-after items that everyone is talking about!
          </p>
        </div>
        <div className="flex items-center justify-end">
          <Link className="text-text text-lg mx-2" to={PAGES.HOME.path}>
            All
          </Link>
          <Link
            className="text-gray-600 hover:text-text font-normal text-lg mx-2"
            to={PAGES.HOME.path}
          >
            Boys
          </Link>
          <Link
            className="text-gray-600 hover:text-text font-normal text-lg mx-2"
            to={PAGES.HOME.path}
          >
            Girls
          </Link>
        </div>
      </div>
      <div className="w-full mt-10 grid grid-cols-12 gap-4 lg:gap-8">
          {isLoading
            ? PRODUCTS_LOADER.map((id) => (
                <div
                  key={id}
                  className="w-full col-span-6 md:col-span-4 lg:col-span-3"
                >
                  <ProductSkeleton />
                </div>
              ))
            : trending?.length ? trending.map((product) => (
                <div
                  key={product?.id}
                  className="w-full col-span-6 md:col-span-4 lg:col-span-3"
                >
                  <ProductCard
                    {...product}
                    {...{ id: product?.id, variant: product?.variantData?.[0] }}
                  />
                </div>
              )) : <div className="w-full col-span-12" >
                  <div className="w-full flex flex-col items-center justify-center" >
                        No data
                  </div>
                </div>}
        </div>
    </div>
  );
};

export default PopularProducts;
