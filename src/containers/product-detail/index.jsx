import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import { getProduct } from "../../redux/slices/products.slice";
import { useSelector } from "react-redux";
import { CAROUSEL_LOADER, IMAGE_PATH } from "../../assets/utils/constant";
import { ICONS } from "../../assets/icons";
import ReactOwlCarousel from "react-owl-carousel";
import { classNames, isTokenActivated } from "../../assets/utils/helper";
import Button from "../../shared/button";
import { api } from "../../api";
import Modal from "../../shared/modal";
import { PAGES } from "../../assets/utils/urls";
import Spinner from "../..";
import ReactHelmet from "../seo/helmet";
import DUMMY_IMAGE from "../../assets/images/skeleton.jpeg";
import RelatedProducts from "../../components/related-products";

const Product = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [attributeIndex, setAttributeIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const { product_id } = useParams();
  const [fetchProduct] = useDispatchWithAbort(getProduct);
  const user = useSelector(({ auth }) => auth?.user);
  const { isLoading, data } = useSelector(({ products }) => products?.product);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchProduct({
      isInitial: true,
      params: {
        product_id,
        user_id: user?.id,
      },
    });
  }, [product_id, fetchProduct]);

  useEffect(() => {
    window.fbq('track', 'Product', { product_id });
  }, [product_id]);

  const handleNext = useCallback(() => {
    if (ref.current) {
      ref.current.next();
    }
  }, [ref]);

  const handlePrevious = useCallback(() => {
    if (ref.current) {
      ref.current.prev();
    }
  }, [ref]);

  const variant = useMemo(() => {
    if (isLoading) return {};
    const clone = { ...data };
    return clone?.variantData?.[0] || {};
  }, [data, isLoading]);

  const images = useMemo(() => {
    if (isLoading) return [];
    const clone = { ...variant };
    return clone?.images?.filter((val) => !!val);
  }, [isLoading, variant]);

  const attribute = useMemo(() => {
    if (isLoading) return [];
    const clone = { ...data };
    const variantData = clone?.variantData?.[0];
    return variantData?.attributeData || [];
  }, [variant]);

  const handleRedirect = useCallback(
    (path = "") => {
      navigate(path);
    },
    [navigate]
  );

  const isUserLogged = useMemo(() => {
    return Boolean(user?.id) && isTokenActivated(user?.authtoken);
  }, [user]);

  const handleWishlist = useCallback(
    async (isWishlist) => {
      if (!isUserLogged) {
        setOpen(true);
        return;
      }
      try {
        const response = await api.wishlists.update({
          data: {
            user_id: user?.id,
            product_id,
            isWishlist: !isWishlist,
          },
        });
        if (response?.data) {
          fetchProduct({
            isInitial: false,
            params: {
              product_id,
              user_id: user?.id,
            },
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    [user?.id, fetchProduct, product_id]
  );

  const handleCartItem = async (attributeItem) => {
    if (attributeItem?.quantity) {
      handleRedirect(PAGES.CART.path);
      return;
    }
    if (!isUserLogged) {
      setOpen(true);
      return;
    }
    setLoader(true);
    try {
      const response = await api.cart.update({
        data: {
          user_id: user?.id,
          product_id,
          quantity: "1",
          variant_id: variant?.id,
          attribute_id: attributeItem?.id,
        },
      });
      if (response?.data) {
        fetchProduct({
          params: {
            product_id,
            user_id: user?.id,
          },
        });
        handleRedirect(PAGES.CART.path);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("error", error);
    }
  };
  // Handle the share action
  const handleShare = async (productTitle, productUrl) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productTitle, // Dynamic product title
          text: `Check out this amazing product: ${productTitle}`, // Custom message
          url: productUrl, // Product details page URL
        });
        console.log('Share was successful.');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported on this browser.');
    }
  };

  const schemaMarkup = useMemo(() => {
    if (!data) return null;

    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": data?.product_name || "",
      "image": images?.map(img => IMAGE_PATH + img?.image_file) || [],
      "description": data?.meta_description || "",
      "sku": data?.sku || "",
      "brand": {
        "@type": "Brand",
        "name": data?.brand || "HalfChoice"
      },
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "INR",
        "price": attribute?.[attributeIndex]?.selling_price || "",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": Number(attribute?.[attributeIndex]?.qty) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "HalfChoice"
        }
      }
    };
  }, [data, images, attribute, attributeIndex]);

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
  

  return (
    <ReactHelmet {...{ title: data?.meta_title, description: data?.meta_description, keywords: data?.meta_keywords }} >
     {/* Injecting Schema Markup */}
     <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      <div className="container relative p-4 mx-auto lg:px-4 max-w-7xl">
        <div className="grid w-full grid-cols-12 gap-4">
          <div className="col-span-12 px-0 md:p-2 md:col-span-5">
            <div className="flex flex-col w-full">
              <div className="relative w-full h-auto mb-2">
                {attribute?.[attributeIndex]?.discount ? (
                  <div className="absolute px-2 py-1 text-xs text-white rounded-lg top-2 left-2 bg-green">
                    {attribute?.[attributeIndex]?.discount
                      ? `-${attribute?.[attributeIndex]?.discount}%`
                      : null}
                  </div>
                ) : null}
                <img alt={images?.[currentImageIndex]?.image_altertag}
                  className="w-full h-auto object-cover object-center rounded-xl xl:min-h-[400px]"
                  src={images?.[currentImageIndex]?.image_file ? (IMAGE_PATH + images?.[currentImageIndex]?.image_file) : DUMMY_IMAGE}
                />
              </div>
              {images?.length ? <div className="relative flex items-center justify-center w-full h-auto p-2">
                <button className="z-50 flex items-center justify-center mr-1">
                  <ICONS.CHEVRON_LEFT
                    onClick={handlePrevious}
                    className="w-6 h-6 text-text"
                  />
                </button>
                {images?.length ? <ReactOwlCarousel
                  items={3}
                  ref={ref}
                  className="owl-carousel owl-theme !mt-0"
                  dots={false}
                  margin={24}
                >
                  {isLoading
                    ? CAROUSEL_LOADER.map((id) => (
                      <div key={id} className="w-full item">
                        <div className="animate-pulse h-[180px] rounded-xl bg-slate-200" />
                      </div>
                    ))
                    : images?.map((image, index) => (
                      <div
                        key={index}
                        className="w-full item"
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img alt={image?.image_altertag || ''}
                          key={image}
                          className={classNames(
                            "cursor-pointer rounded-md xl:max-h-[280px] object-cover object-center"
                          )}
                          src={image?.image_file ? (IMAGE_PATH + image?.image_file) : DUMMY_IMAGE}
                        />
                      </div>
                    ))}
                </ReactOwlCarousel> : null}
                <button className="z-50 flex items-center justify-center ml-1">
                  <ICONS.CHEVRON_RIGHT
                    onClick={handleNext}
                    className="w-6 h-6 text-text"
                  />
                </button>
              </div> : null}
            </div>
          </div>
          <div className="col-span-12 p-2 md:col-span-7">
            <div className="flex flex-col">
              <h2 className="text-sm tracking-widest title-font text-less">
                {variant?.name}
              </h2>
              <h1 className="mb-1 text-lg md:text-3xl font-medium text-green">
                {data?.product_name || ""}
              </h1>
              <div className="flex items-center justify-between w-full md:mt-4 mb-2">
                <div className="w-full flex justify-start items-center my-1.5 text-xl md:text-2xl font-medium">
                  <ins className="no-underline">
                    ₹ {attribute?.[attributeIndex]?.selling_price}
                  </ins>
                  <del className="ml-4 text-base line-through text-less">
                    ₹ {attribute?.[attributeIndex]?.mrp}
                  </del>
                </div>
                <div className="p-2 rounded-full cursor-pointer bg-slate-100 mr-3">
                  <ICONS.SHARE
                    onClick={() => handleShare(data?.product_name, window.location.href)} // Pass the current page URL
                    className="w-7 h-7"
                    style={{ fill: '#ec4899' }} // Directly applying the pink color (hex: #ec4899)
                  />
                </div>
                <div className="p-2 rounded-full cursor-pointer bg-slate-100">
                  {data?.wishlist ? (
                    <ICONS.HEART_FILL
                      onClick={() => handleWishlist(data.wishlist)}
                      className="w-7 h-7 text-pink"
                    />
                  ) : (
                    <ICONS.HEART_EMPTY
                      onClick={() => handleWishlist(data.wishlist)}
                      className="w-7 h-7 text-pink"
                    />
                  )}
                </div>
              </div>
              <div className="w-full mt-4 mb-5">
                <div className="flex flex-col justify-start w-full mb-6">
                  <h2 className="mb-1 text-base font-medium title-font text-text">
                    Color
                  </h2>
                  <div
                    className={classNames(
                      "w-8 items-center cursor-pointer justify-center border-text-secondary border h-8 md:w-10 md:h-10 rounded-full p-0.5"
                    )}
                  >
                    <div
                      style={{ background: variant?.color_code }}
                      className="w-full h-full rounded-full"
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col justify-start w-full">
                  <h2 className="mb-1 text-base font-medium text-text">
                    Select Size
                  </h2>
                  <div className="flex flex-wrap items-center justify-start w-full gap-3">
                    {attribute?.map((attributeItem, i) => (
                      <div
                        onClick={() => setAttributeIndex(i)}
                        className={classNames(
                          "border md:py-2 py-1 px-2 md:px-4 text-sm md:text-base text-text font-medium border-select rounded-md cursor-pointer",
                          attributeIndex === i
                            ? "bg-select !text-white"
                            : "bg-transparent"
                        )}
                        key={i}
                      >
                        {attributeItem?.agegroup}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-full md:my-4">
                <Button
                  disabled={loader || Number(attribute?.[attributeIndex]?.qty) === 0}
                  onClick={() => handleCartItem(attribute?.[attributeIndex])}
                  className={classNames(
                    "flex w-full justify-center py-6 md:py-2.5 items-center hover:border-yellow hover:bg-yellow transition-all duration-300 fixed md:relative bottom-0 left-0 rounded-none md:rounded-lg z-50",
                    loader || Number(attribute?.[attributeIndex]?.qty) === 0 ? "cursor-not-allowed" : ""
                  )}
                >
                  {loader ? (
                    <span className="mr-2">Loading</span>
                  ) : (
                    <span className="mr-2">
                      {attribute?.[attributeIndex]?.quantity
                        ? "View to Bag" : Number(attribute?.[attributeIndex]?.qty) === 0 ? 'Out of Stock'
                          : "Add to Bag"}
                    </span>
                  )}
                  {loader ? (
                    <Spinner className="!w-4 !h-4" />
                  ) : (
                    <ICONS.BAG className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <hr />
              <div className="w-full my-4">
                <div className="flex flex-col justify-start w-full ">
                  <h2 className="mb-1 text-base font-medium title-font text-text">
                    Product Details
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></div>
                </div>
              </div>
              <hr />
              <div className="w-full my-4">
                <div className="flex flex-col justify-start w-full ">
                  <h2 className="mb-1 text-base font-medium title-font text-text">
                    Returns Policy
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: data.policy_des }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 p-2" >
            <div className="mb-2 text-2xl font-medium" >Related Products</div>
            <RelatedProducts product={data} {...{ open, setOpen, isUserLogged }} />
          </div>
        </div>
        <Modal {...{ open, setOpen }}>
          <div className="relative flex flex-col items-start justify-center w-full">
            <Button className="!bg-slate-200 !border-none !rounded-full !p-1 !absolute right-0 top-0 !text-text">
              <ICONS.CLOSE
                onClick={() => setOpen(false)}
                className="w-8 h-8 text-s"
              />
            </Button>
            <h3 className="mt-3 mb-4 text-xl font-medium text-text">Sign In</h3>
            <p className="mt-1 mb-3 text-base leading-normal text-slate-400">
              To access this feature, please sign in to your account first. Once
              you're logged in, you can continue to add items to your wishlist
              seamlessly.
            </p>
            <Button
              label="Sign In"
              handleClick={() => {
                localStorage.setItem('redirect', location.pathname)
                handleRedirect(PAGES.LOGIN.path)
              }
              }
              className="!rounded-full min-w-[140px] !border-green hover:!bg-pink hover:!border-pink !bg-green"
            />
          </div>
        </Modal>
      </div>

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
    </ReactHelmet>
  );
};

export default Product;
