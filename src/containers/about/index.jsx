import React from "react";
import SocialFeed from "../../components/social-feed";
import WhatWeDo from "../../components/whatWeDo";
import OurValues from "../../components/value-proposition";
import AboutDetails from "../../components/about-details";
import ReactHelmet from "../seo/helmet";
import { useSelector } from "react-redux";

const About = () => {

  const { seo } = useSelector(({ common }) => common);

  return <ReactHelmet {...{
    title: seo?.about_us?.meta_title || '',
    description: seo?.about_us?.meta_description || '',
    keywords: seo?.about_us?.meta_keywords || '',
  }} >
    <div className="relative w-full">
      <OurValues />
      <AboutDetails />
      <WhatWeDo />
      <SocialFeed />
    </div>
  </ReactHelmet>
};

export default About;
