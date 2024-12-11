import React, { useMemo } from "react";
import offer_1 from "../../assets/images/boys_discount.jpeg";
import offer_2 from "../../assets/images/girls_discount.jpeg";
import { ICONS } from "../../assets/icons";
import { useSelector } from "react-redux";

const Offers = ({ ...props }) => {

  const { home_posters } = useSelector(({ common }) => common)

  const offers = useMemo(() => {
    if (!home_posters || !home_posters?.length) return []
    return home_posters || []
  }, [home_posters])

  return (
    <section className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
      <div className="grid w-full grid-cols-12 gap-4 lg:gap-12">
        {offers?.map((item) => {
          return (
            <div
              className="relative col-span-12 sm:col-span-6 cursor-pointer"
              key={item?.id}
            >
              <div className="flex justify-center whitespace-nowrap bg-gradient-to-r rounded-3xl from-slate-800 to-slate-700 hover:bg-slate-100 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
                <img className="w-full h-auto rounded-3xl" alt={item?.title} src={item.image} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Offers;
