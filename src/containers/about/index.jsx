import React from "react";
import SocialFeed from "../../components/social-feed";
import WhatWeDo from "../../components/whatWeDo";
import OurValues from "../../components/value-proposition";
import AboutDetails from "../../components/about-details";

const About = () => {
  return <div className="relative w-full">
    <OurValues />
    <AboutDetails />
    <WhatWeDo />
    <SocialFeed />
  </div>;
};

export default About;
