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

const Home = () => {
  const [fetchHome] = useDispatchWithAbort(getCommerce);
  const user = useSelector(({ auth }) => auth.user);

  const { seo } = useSelector(({ common }) => common)

  console.log('seo', seo)

  useEffect(() => {
    fetchHome({
      params: {
        user_id: user?.id
      }
    });
  }, [fetchHome]);

  return (
    <ReactHelmet keywords="Buy kids clothes online, trendy kids wear India, kids dresses for girls, boys ethnic wear online, online kids fashion shopping, best kids clothing brands India, kids party wear dresses" description="Shop trendy kids' clothes online at Halfchoice. Find dresses, ethnic wear, and casual outfits for boys and girls at the best prices in India" title="Buy Kids Clothes Online - Trendy Dresses & Ethnic Wear for Boys & Girls | Halfchoice" >
      <div className="relative w-full">
        <HomeBanner />
        <LatestArrival disabledMeta className="py-16" title="Latest Arrival" />
        <Offers />
        <PopularProducts disabledMeta className="py-16" title='Popular Products' />
        <SocialFeed />
        <WhatWeDo />
        <OurValues />
      </div>
    </ReactHelmet>
  );
};

export default Home;
