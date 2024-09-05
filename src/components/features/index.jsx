import React from "react";
import { ICONS } from "../../assets/icons";

const Features = () => {
  const feature = [
    {
      name: "Free Shipping",
      desc: "Ut enim ad minim veniam liquip ami tomader",
      icon: <ICONS.SHIPPING />,
    },
    {
      name: "Secure Payments",
      desc: "Ut enim ad minim veniam liquip ami tomader",
      icon: <ICONS.SHIELD />,
    },
    {
      name: "Easy Returns",
      desc: "Ut enim ad minim veniam liquip ami tomader",
      icon: <ICONS.PEOPLE_BOX />,
    },
    {
      name: "24/7 Support",
      desc: "Ut enim ad minim veniam liquip ami tomader",
      icon: <ICONS.USER_CLOCK />,
    },
  ];

  return (
    <section className="py-12 pb-24 featureSection">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
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
                    <h3 className="text-[#FF2189]">{item.name}</h3>
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
