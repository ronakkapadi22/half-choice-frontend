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
import ReactHelmet from "../seo/helmet";
import OtherLinks from "../../components/other-links";

const Home = () => {
  const [fetchHome] = useDispatchWithAbort(getCommerce);
  const user = useSelector(({ auth }) => auth.user);

  const { seo } = useSelector(({ common }) => common);

  useEffect(() => {
    fetchHome({
      params: {
        user_id: user?.id,
      },
    });
  }, [fetchHome]);

  useEffect(() => {
    window.fbq("track", "Home");
  }, [])

  return (
    <ReactHelmet
      keywords={seo?.home?.meta_keywords || ''}
      description={seo?.home?.meta_description || ''}
      title={seo?.home?.meta_title || ''}
    >
      <div className="relative w-full">
        <HomeBanner />
        <LatestArrival disabledMeta className="py-16" title="Latest Arrival" />
        <Offers />
        <PopularProducts
          disabledMeta
          className="py-16"
          title="Popular Products"
        />
        <SocialFeed />
        <WhatWeDo />
        <OurValues />
        <OtherLinks/>
      </div>
    </ReactHelmet>
  );
};

export default Home;
