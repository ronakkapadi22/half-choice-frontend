import React from "react";
import SocialFeed from "../../components/social-feed";
import WhatWeDo from "../../components/whatWeDo";
import OurValues from "../../components/value-proposition";
import AboutDetails from "../../components/about-details";
import ReactHelmet from "../seo/helmet";
import { useSelector } from "react-redux";

const About = () => {

  const { seo } = useSelector(({ common }) => common);


  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HalfChoice",
    "url": "https://halfchoice.in",
    "logo": "https://halfchoice.in/assets/logo-Cm-CM6YC.png",
    "description": "HalfChoice is a top kids' clothing website and the best kids' shopping app in India, offering trendy fashion for children aged 1-15 years. Shop stylish T-shirts, party dresses, ethnic wear, and more at great prices. Enjoy free shipping, exclusive deals & a seamless shopping experience. Download now!",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61551765577969&mibextid=ZbWKwL",
      "https://www.instagram.com/half.choice/",
      "https://x.com/HalfChoice01",
      "https://x.com/HalfChoice01",
      "https://www.youtube.com/@halfchoice",
      "https://blog.halfchoice.in/",
      "https://play.google.com/store/apps/details?id=com.half.choice"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-8160678824",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    ],
    "keywords": [
      "Top kids clothes website",
      "Top kids shopping clothes app",
      "Best kids shopping clothes app",
      "Top kids shopping clothes app in India",
      "Top kids shopping clothes app free",
      "Top kids shopping clothes app download",
      "Best app for baby clothes in India",
      "Online shopping for kidswear in India",
      "HalfChoice kids clothing online shopping",
      "Kids shopping app India",
      "HalfChoice kids clothing online shopping India",
      "Best kids clothing online shopping India",
      "Online shopping for kids clothes in India",
      "HalfChoice kids clothing online shopping India"
    ]
  };


  return <ReactHelmet {...{
    title: seo?.about_us?.meta_title || '',
    description: seo?.about_us?.meta_description || '',
    keywords: seo?.about_us?.meta_keywords || '',
  }} >
    <script type="application/ld+json">
      {JSON.stringify(organizationSchema)}
    </script>

    <div className="relative w-full">
      <OurValues />
      <AboutDetails />
      <WhatWeDo />
      <SocialFeed />
    </div>
  </ReactHelmet>
};

export default About;
