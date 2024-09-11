import React from "react";
import IMG_1 from "../../assets/images/image1.png";
import IMG_2 from "../../assets/images/image2.png";
import IMG_3 from "../../assets/images/image3.png";
import IMG_4 from "../../assets/images/image4.png";
import VECTOR_1 from "../../assets/images/vector1.png";
import VECTOR_2 from "../../assets/images/vector2.png";
import VECTOR_3 from "../../assets/images/vector3.png";
import VECTOR_4 from "../../assets/images/vector4.png";

const WhatWeDo = () => {
  const features = [
    {
      title: "Quality Meets Style",
      desc: "Our expertly crafted kids' clothing combines quality and style, ensuring your child stays fashionable and comfortable while being well-prepared for any adventure.",
      img: IMG_1,
      vec: VECTOR_1,
      borderColor: "border-[#ebf9da]",
    },
    {
      title: "Affordable Fashion",
      desc: "At Half Choice, affordability doesn't mean compromising on style. We make it possible for parents to dress their children in chic, durable clothing without breaking the bank.",
      img: IMG_2,
      vec: VECTOR_2,
      borderColor: "border-[#ffd4e8]",
    },
    {
      title: "Diverse Fashion Selection",
      desc: "Our diverse range of clothing allows your child's unique personality to shine. We offer a wide variety of styles, ensuring that your child can express their individuality and creativity through their fashion choices.",
      img: IMG_3,
      vec: VECTOR_3,
      borderColor: "border-[#ffefcf]",
    },
    {
      title: "Customer-Centric Care",
      desc: "Your satisfaction is our priority. Enjoy impeccable customer service, easy returns, and swift shipping, all backed by our friendly and knowledgeable team.",
      img: IMG_4,
      vec: VECTOR_4,
      borderColor: "border-blue-100",
    },
  ];

  return (
    <section className="w-full">
      <div className="container relative p-4 mx-auto lg:px-4 max-w-[84rem]">
        <div className="p-4 sm:text-center">
          <h2 className="text-xl font-semibold text-pink">What</h2>
          <h3 className="mb-6 text-4xl font-bold">We do</h3>
          <p className="mb-12 text-lg text-gray-600">
            At HalfChoice we don't just provide children's clothing; we
            celebrate the
            <br />
            art of childhood fashion. Here's what sets us apart:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2 lg:grid-cols-4 lg:p-0 md:p-8 sm:p-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-[2rem] border-2 ${feature.borderColor}`}
            >
              <div className={`w-24 h-24 mx-0 mb-8 relative`}>
                <img src={feature.vec} alt="vector" />
                <img src={feature.img} alt="img" className="absolute top-0" />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-left">
                {feature.title}
              </h4>
              <p className="text-left text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
