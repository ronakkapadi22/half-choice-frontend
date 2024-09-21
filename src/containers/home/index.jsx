import React, { useEffect } from "react";
import HomeBanner from "./banner";
import { getCommerce } from "../../redux/slices/commerce.slice";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import LatestArrival from "./latest-arrival";
import Offers from "../../components/offers";
import WhatWeDo from "../../components/whatWeDo";
import PopularProducts from "./popular-products";
import { useSelector } from "react-redux";
import OurValues from "../../components/value-proposition";
import SocialFeed from "../../components/social-feed";

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
      <OurValues />
      <WhatWeDo />
      <LatestArrival className="py-16" title="Latest Arrival" />
      <Offers />
      <PopularProducts className="py-16" title='Popular Products' />
      <SocialFeed />
    </div>
  );
};

export default Home;
