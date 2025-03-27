import React from "react";
import { useSelector } from "react-redux";
import { PAGES } from "../../assets/utils/urls";
import { getTitle } from "../../assets/utils/helper";

const OtherLinks = ({ label, ...props }) => {
  const { popular_link } = useSelector(({ common }) => common);

  const handleOtherLink = (item) => {
    if(item?.is_open_search_or_details_page){
        window.open(String(PAGES.SEARCH.path + '?type=' + getTitle(item?.title)), '_blank')
    }else{
        window.open(item?.link, '_blank')
    }
  }

   // Generate structured data for SiteNavigationElement
   const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Other Related Links",
    "url": "https://halfchoice.in",
    "about": "Find other related links for kids' fashion, latest arrivals, and more.",
    "potentialAction": popular_link?.map((item) => ({
      "@type": "ReadAction",
      "target": item?.link,
      "name": item?.title,
    })),
  };


  return (
    <div className="w-full pt-2 pb-6">
      <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
        <div className="w-full mb-2">
          <h2 className="text-lg font-semibold text-text">
            Other Related Links
          </h2>
        </div>
        <div className="w-full p-1 flex flex-wrap items-center justify-start">
          {popular_link?.map((item, index) => (
            <div onClick={() => handleOtherLink(item)}
              className="flex cursor-pointer flex-wrap items-center gap-2 md:gap-3 mr-2 md:mr-3"
              key={item?.title || ""}
            >
              <p className="text-sm text-gray-600 font-normal">{item?.title}</p>{" "}
              {popular_link?.length !== index + 1 ? (
                <div className="w-[1px] h-4 bg-gray-600" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
        {/* Add Schema Markup */}
        <script type="application/ld+json">
        {JSON.stringify(navigationSchema)}
      </script>
    </div>
  );
};

export default OtherLinks;
