import React from "react";

const WhatWeDo = () => {
  const features = [
    { color: "bg-[#ebf9da]", borderColor: "border-[#ebf9da]" },
    { color: "bg-[#ffd4e8]", borderColor: "border-[#ffd4e8]" },
    { color: "bg-[#ffefcf]", borderColor: "border-[#ffefcf]" },
    { color: "bg-blue-100", borderColor: "border-blue-100" },
  ];

  return (
    <section className="w-full">
      <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
        <div className="">
          <h2 className="text-xl font-semibold text-pink">What</h2>
          <h3 className="mb-6 text-4xl font-bold">We do</h3>
          <p className="mb-12 text-lg text-gray-600">
            At HalfChoice we don't just provide children's clothing; we
            celebrate the art of childhood fashion. Here's what sets us apart:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border-2 ${feature.borderColor}`}
            >
              <div
                className={`w-20 h-20 mx-auto mb-4 rounded-full ${feature.color}`}
              ></div>
              <h4 className="mb-2 text-xl font-semibold text-left">
                Lorem Ipsum is simply dummy
              </h4>
              <p className="text-left text-gray-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
