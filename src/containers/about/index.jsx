import React from "react";
import SocialFeed from "../../components/social-feed";
import WhatWeDo from "../../components/whatWeDo";
import OurValues from "../../components/value-proposition";
import AboutDetails from "../../components/about-details";
import ReactHelmet from "../seo/helmet";

const About = () => {
  return <ReactHelmet {...{
    title: "About Halfchoice - India's Top Kids Fashion Brand for Trendy, Affordable & Stylish Kids' Clothes",
    description: "Halfchoice is India's leading kids clothing brand offering trendy, stylish, and affordable kids' clothes. Enjoy free delivery and COD on all orders across India",
    keywords: "Kids fashion India, affordable kids wear, trendy kids clothing, stylish kids outfits, kids clothing brand, quality kids fashion, boys and girls clothes, free delivery India"
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
