import React from "react";
import { classNames } from "../../assets/utils/helper";
// import { IMAGE_PATH } from "@/app/assets/constants";
import product_1 from "../../assets/images/product_1.webp";

const ProductInformation = ({ data, className, handleOpen, ...props }) => {
  // Actual Sizes

  // const Sizes = data?.attributeData.map((size) => {
  //   return size?.size;
  // });

  // const newSize = Sizes?.reduce(
  //   (acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
  //   []
  // );

  //temporary sizes
  const newSize = ["S", "M", "X", "XL"];

  return (
    <div
      {...props}
      className={classNames("w-full relative productItem01", className)}
    >
      <div className="w-full relative overflow-hidden rounded-[4px] mb-3 pi01Thumb">
        <img
          alt="product"
          className="w-full cursor-pointer"
          src={product_1}
          // src={`${IMAGE_PATH}${data?.image.split(",")[0]}`}
        />
        <div className="absolute top-0 left-0 flex p-[12px] z-10 w-full productLabels items-center justify-between">
          <span className="bg-[#f04726] text-white text-[13px] mb-[5px] leading-[26px] rounded-[3px] h-[26px] px-[8px] text-center">
            {/* -{data?.attributeData[0]?.discount}% */}
            -35%
          </span>
          <span className="bg-[#7b9496] text-white text-[13px] mb-[5px] leading-[26px] rounded-[3px] h-[26px] px-[8px] text-center">
            SALE
          </span>
        </div>
        <div className="pi01Actions">
          <span className="pi01Cart">
            <i className="fa-solid fa-shopping-cart"></i>
          </span>
          <span className="pi01QuickView" onClick={() => handleOpen(1)}>
            <i className="fa-solid fa-arrows-up-down-left-right"></i>
          </span>
          <span className="pi01Wishlist">
            <i className="fa-solid fa-heart"></i>
          </span>
        </div>
      </div>
      <div className="relative w-full">
        <h3 className="text-xl text-[#52586d] mb-1">
          {/* {data?.name || ""} */}
          Ulina black clean t-shirt
        </h3>
        <div className="flex justify-start items-center font-medium mb-2 text-[#7b9496] text-xl">
          <ins className="mr-3 no-underline">
            {/* ₹{data?.attributeData[0]?.selling_price} */}
            ₹399.00
          </ins>
          <del className="relative text-[#aeb3c3] text-base font-normal">
            {/* ₹{data?.attributeData[0]?.mrp} */}
            ₹699.00
            <line className="absolute top-1/2 -translate-y-1/2 h-[2px]"></line>
          </del>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            <div
              className="w-[20px] cursor-pointer h-[20px] rounded-full ml-[10px] border border-[#dbdfe3]"
              style={{ background: "#6cccc6" }}
            ></div>
          </div>
          <div className="flex items-center justify-center text-[#7f8495] gap-1">
            {newSize?.map((size, index) => {
              return (
                <div
                  key={index}
                  className="border py-1 px-1.5 flex items-center justify-center cursor-pointer text-sm border-[#dbdfe3] rounded-sm"
                >
                  {size}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
