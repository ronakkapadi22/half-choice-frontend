import React from "react";
import offer_1 from "../../assets/images/boys_discount.jpeg";
import offer_2 from "../../assets/images/girls_discount.jpeg";
import { ICONS } from "../../assets/icons";

const Offers = ({ ...props }) => {
  const offers = [
    {
      img: offer_1,
      title: "Get 40% Off",
      category: "Women’s New Collection",
    },
    {
      img: offer_2,
      title: "Stay Upto Date",
      category: "Men’s Trendy Fashion",
    },
  ];

  return (
    <section className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
      <div className="grid w-full grid-cols-12 gap-4">
        {offers?.map((item, index) => {
          return (
            <div
              className="relative col-span-12 cursor-pointer lg:col-span-6"
              key={index}
            >
              <div className="flex justify-center whitespace-nowrap bg-gradient-to-r rounded-3xl from-slate-800 to-slate-700 hover:bg-slate-100 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
                <img className="w-full h-auto rounded-3xl" src={item.img} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Offers;
