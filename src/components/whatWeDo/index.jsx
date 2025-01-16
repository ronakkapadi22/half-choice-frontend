import React, { useMemo } from "react";
import IMG_1 from "../../assets/images/image1.png";
import IMG_2 from "../../assets/images/image2.png";
import IMG_3 from "../../assets/images/image3.png";
import IMG_4 from "../../assets/images/image4.png";
import VECTOR_1 from "../../assets/images/vector1.png";
import VECTOR_2 from "../../assets/images/vector2.png";
import VECTOR_3 from "../../assets/images/vector3.png";
import VECTOR_4 from "../../assets/images/vector4.png";
import { useSelector } from "react-redux";

const image = {
  0: IMG_1,
  1: IMG_2,
  2: IMG_3,
  3: IMG_4
}

const vectors = {
  0: VECTOR_1,
  1: VECTOR_2,
  2: VECTOR_3,
  3: VECTOR_4
}

const borders = {
  0: 'border-[#ebf9da]',
  1: 'border-[#ffd4e8]',
  2: 'border-[#ffefcf]',
  3: 'border-blue-100'
}

const WhatWeDo = () => {

  const { what_we_do } = useSelector(({ common }) => common)

  const features = useMemo(() => {
    if (!what_we_do || !what_we_do?.length) return []
    return what_we_do?.map((item, i) => ({
      ...item, img: image?.[i], vec: vectors?.[i], borderColor: borders?.[i]
    }))
  }, [what_we_do])

  return (
    <section className="w-full">
      <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
        <div className="w-full">
          <h2 className="text-lg md:text-xl font-semibold text-pink">What</h2>
          <h3 className="mb-4 md:mb-6 text-2xl md:text-4xl font-bold">We do</h3>
          <p className="mb-12 text-lg text-gray-600">
            At HalfChoice we don't just provide children's clothing; we
            celebrate the
            <br />
            art of childhood fashion. Here's what sets us apart:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border-2 ${feature.borderColor}`}
            >
              <div className={`w-24 h-24 mx-0 mb-8 relative`}>
                <img src={feature.vec} alt={feature.title} />
                <img src={feature.img} alt={feature.sub_title} className="absolute top-0" />
              </div>
              <h4 className="mb-2 text-xl font-semibold text-left">
                {feature.title}
              </h4>
              <p className="text-left text-gray-600">{feature.sub_title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
