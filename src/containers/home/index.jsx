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
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>Buy Kids Clothes Online - Trendy Dresses & Ethnic Wear for Boys & Girls | Halfchoice</title>
        <meta name="description" content="Shop trendy kids' clothes online at Halfchoice. Find dresses, ethnic wear, and casual outfits for boys and girls at the best prices in India" />
        <meta name="keywords" content="Buy kids clothes online, trendy kids wear India, kids dresses for girls, boys ethnic wear online, online kids fashion shopping, best kids clothing brands India, kids party wear dresses" />
      </Helmet>
      <HomeBanner />
      <LatestArrival disabledMeta className="py-16" title="Latest Arrival" />
      <Offers />
      <PopularProducts disabledMeta className="py-16" title='Popular Products' />
      <SocialFeed />
      <WhatWeDo />
      <OurValues />
    </div>
  );
};

export default Home;
