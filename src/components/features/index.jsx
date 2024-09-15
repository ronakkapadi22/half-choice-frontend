import React from "react";
import { ICONS } from "../../assets/icons";

const Features = () => {

  return (
    <section className="py-12 pb-24 featureSection">
      <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
        <div className="grid grid-cols-12 gap-6">
          {feature?.map((item, index) => {
            return (
              <div
                className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                key={index}
              >
                <div className="flex items-start justify-center w-full">
                  <i className="fa-solid fa-truck-fast t1 text-[#FCB018] text-5xl mr-5">
                    {item.icon}
                  </i>
                  <div className="iconBox01">
                    <h3 className="text-pink">{item.name}</h3>
                    <p className="text-[#84CC16]">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {/* 
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
            <div className="flex items-start justify-center w-full">
              <i className="fa-solid fa-shield-halved t1 text-[#9ebbbd] text-5xl mr-5"></i>
              <div className="iconBox01">
                <h3 className="text-[#52586d]">Secure Payments</h3>
                <p className="text-[#7f8495]">
                  Ut enim ad minim veniam liquip ami tomader
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
            <div className="flex items-start justify-center w-full">
              <i className="fa-solid fa-people-carry-box t1 text-[#9ebbbd] text-5xl mr-5"></i>
              <div className="iconBox01">
                <h3 className="text-[#52586d]">Easy Returns</h3>
                <p className="text-[#7f8495]">
                  Ut enim ad minim veniam liquip ami tomader
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
            <div className="flex items-start justify-center w-full">
              <i className="fa-solid fa-user-clock t1 text-[#9ebbbd] text-5xl mr-5"></i>
              <div className="iconBox01">
                <h3 className="text-[#52586d]">24/7 Support</h3>
                <p className="text-[#7f8495]">
                  Ut enim ad minim veniam liquip ami tomader
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Features;
