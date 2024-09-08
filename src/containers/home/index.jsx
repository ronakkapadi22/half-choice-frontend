import React, { useEffect } from "react";
import HomeBanner from "./banner";
import { getCommerce } from "../../redux/slices/commerce.slice";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import LatestArrival from "./latest-arrival";
import Features from "../../components/features";
import Offers from "../../components/offers";
import WhatWeDo from "../../components/whatWeDo";
import PopularProducts from "./popular-products";
import { useSelector } from "react-redux";

const Home = () => {
  const [fetchHome] = useDispatchWithAbort(getCommerce);
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    fetchHome({
      params: {
        user_id: user?.id
      }
    });

  }, [fetchHome]);

  return (
    <div className="relative w-full">
      <HomeBanner />
      <Features />
      <WhatWeDo />
      <LatestArrival className="py-12" title="Latest Arrival" />
      <Offers />
      <PopularProducts className="py-12" title='Popular Products' />
    </div>
  );
};

export default Home;
