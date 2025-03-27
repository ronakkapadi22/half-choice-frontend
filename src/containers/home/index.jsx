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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the return policy for kids' clothes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept returns only if the wrong item was delivered or if the product is defective. Items must be reported within 48 hours of delivery with proof (images/videos)."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer cash on delivery (COD)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer COD across India. Additional charges may apply."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer free delivery in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer free delivery on all orders across India. No minimum purchase required."
        }
      },
      {
        "@type": "Question",
        "name": "What sizes are available for kids' clothes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer sizes for kids from 1 to 15 years."
        }
      },
      {
        "@type": "Question",
        "name": "How long does delivery take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Delivery takes 2 to 7 days depending on your location."
        }
      },
      {
        "@type": "Question",
        "name": "What payment methods do you accept?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We accept UPI, PhonePe, GPay, net banking, and COD."
        }
      }
    ]
  };

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


  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://halfchoice.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Party Wear",
        "item": "https://halfchoice.in/products?cat_id=27&sub_sub_cat_id=35,31&name=party-wear&sub_cat_id="
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Western Wear",
        "item": "https://halfchoice.in/products?cat_id=27&sub_sub_cat_id=36,32&name=western-wear&sub_cat_id="
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Apparel",
        "item": "https://halfchoice.in/products?cat_id=27&sub_sub_cat_id=38,39&name=apparel&sub_cat_id="
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Casual Wear",
        "item": "https://halfchoice.in/products?cat_id=27&sub_sub_cat_id=37,33&name=casual-wear&sub_cat_id="
      }
    ]
  };



  return (
    <ReactHelmet
      keywords={seo.home?.meta_keywords || "Buy kids clothes online in India, Best kids clothing shopping app, Trendy kids wear online, Online kids fashion shopping India, Kids party wear dresses India, Girls dresses online shopping, Boys ethnic wear India, Buy baby clothes online India, Kids clothing brands India, Online shopping kids wear India, Best shopping app for kids clothes, Comfortable kids clothes India"}
      description={seo.home?.meta_description || "Shop the Best Kids & Baby Clothes Online in India at Halfchoice – Up to 70% OFF on Trendy T-Shirts, Stylish Tops, Party Dresses, Ethnic Wear, Nightwear & More. Enjoy Free Shipping & Exclusive Deals!"}
      title={seo.home?.meta_title || "Buy Kids & Baby Clothes Online in India – Up to 70% OFF | Free Shipping at Halfchoice"}>

      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(breadcrumb)}
      </script>

      <main className="relative w-full">
        <HomeBanner />
        <LatestArrival disabledMeta className="py-16" title="Latest Arrival" />
        <Offers />
        <PopularProducts disabledMeta className="py-16" title="Popular Products" />
        <SocialFeed />
        <WhatWeDo />
        <OurValues />
        <OtherLinks />
        <section className="faq-section py-16 bg-gradient-to-b from-white to-gray-100">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>

            <div className="space-y-6">
              {[
                {
                  question: "What is the return policy for kids' clothes?",
                  answer: "We accept returns only if the wrong item was delivered or if the product is defective. Items must be reported within 48 hours of delivery with proof (images/videos).",
                },
                {
                  question: "Do you offer cash on delivery (COD)?",
                  answer: "Yes, we offer COD across India. Additional charges may apply.",
                },
                {
                  question: "Do you offer free delivery in India?",
                  answer: "Yes, we offer free delivery on all orders across India. No minimum purchase required.",
                },
                {
                  question: "What sizes are available for kids' clothes?",
                  answer: "We offer sizes for kids from 1 to 15 years.",
                },
                {
                  question: "How long does delivery take?",
                  answer: "Delivery takes 2 to 7 days depending on your location.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept UPI, PhonePe, GPay, net banking, and COD.",
                },
              ].map((faq, index) => (
                <details key={index} className="group bg-white p-5 rounded-lg shadow-lg cursor-pointer transition-all">
                  <summary className="flex justify-between items-center font-medium text-lg text-gray-800 group-open:text-primary">
                    {faq.question}
                    <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </ReactHelmet>
  );
};

export default Home;
