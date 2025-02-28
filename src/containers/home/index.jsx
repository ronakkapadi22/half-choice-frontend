import React, { useEffect, useCallback } from "react";
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
  const { seo = {} } = useSelector(({ common }) => common);

  const fetchHomeData = useCallback(() => {
    fetchHome({
      params: {
        user_id: user?.id,
      },
    });
  }, [fetchHome, user?.id]);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Home");
    }
  }, []);

  return (
    <ReactHelmet
      keywords={seo.home?.meta_keywords || "Buy kids clothes online in India, Best kids clothing shopping app, Trendy kids wear online, Online kids fashion shopping India, Kids party wear dresses India, Girls dresses online shopping, Boys ethnic wear India, Buy baby clothes online India, Kids clothing brands India, Online shopping kids wear India, Best shopping app for kids clothes, Comfortable kids clothes India"}
      description={seo.home?.meta_description || "Shop the Best Kids & Baby Clothes Online in India at Halfchoice – Up to 70% OFF on Trendy T-Shirts, Stylish Tops, Party Dresses, Ethnic Wear, Nightwear & More. Enjoy Free Shipping & Exclusive Deals!"}
      title={seo.home?.meta_title || "Buy Kids & Baby Clothes Online in India – Up to 70% OFF | Free Shipping at Halfchoice"}
    >
      <main className="relative w-full">
        <HomeBanner />
        <LatestArrival disabledMeta className="py-16" title="Latest Arrival" />
        <Offers />
        <PopularProducts disabledMeta className="py-16" title="Popular Products" />
        <SocialFeed />
        <WhatWeDo />
        <OurValues />
        <OtherLinks />
      </main>
    </ReactHelmet>
  );
};

export default Home;
