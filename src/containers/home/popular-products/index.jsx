import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { classNames, isTokenActivated } from "../../../assets/utils/helper";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../../assets/utils/urls";
import { PRODUCTS_LOADER } from "../../../assets/utils/constant";
import ProductSkeleton from "../../../shared/product-skeleton";
import ProductCard from "../../../shared/product-card";
import { api } from "../../../api";
import { getCommerce } from "../../../redux/slices/commerce.slice";
import useDispatchWithAbort from "../../../hooks/useDispatchWithAbort";
import Modal from "../../../shared/modal";
import Button from "../../../shared/button";
import { ICONS } from "../../../assets/icons";

const PopularProducts = ({ title, className, disabledMeta, ...props }) => {
  const navigate = useNavigate();
  const [fetchHome] = useDispatchWithAbort(getCommerce);
  const { isLoading, data } = useSelector(({ commerce }) => commerce);
  const user = useSelector(({ auth }) => auth.user);

  const [open, setOpen] = useState(false);

  const trending = useMemo(() => {
    if (isLoading) return [];
    const clone = [...data.trendings];
    return clone || [];
  }, [isLoading, data.trendings]);

  const isUserLogged = useMemo(() => {
    return Boolean(user?.id) && isTokenActivated(user?.authtoken);
  }, [user]);

  const handleWishlist = useCallback(
    async (id, isWishlist) => {
      if (!isUserLogged) {
        setOpen(true);
        return;
      }
      try {
        const response = await api.wishlists.update({
          data: {
            user_id: user?.id,
            product_id: id,
            isWishlist: !isWishlist,
          },
        });
        if (response?.data) {
          fetchHome({
            params: {
              user_id: user?.id,
            },
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    [user?.id, fetchHome]
  );

  const handleRedirect = useCallback(
    (path = "") => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <div
      className={classNames(
        "relative container mx-auto lg:px-4 p-4 max-w-7xl",
        className
      )}
    >
      <div className="flex items-start md:items-end mb-12 justify-between w-full">
        <div className="flex flex-col">
          <h3 className="text-lg md:text-xl font-semibold text-pink">Our</h3>
          <h2 className="mb-4 md:mb-6 text-2xl md:text-4xl font-bold">
            {title || ""}
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Explore our range of Popular Products to find the latest and most
            sought-after items that everyone is talking about!
          </p>
        </div>
      </div>
      <div className="w-full mt-10 grid grid-cols-12 gap-4 lg:gap-8">
        {isLoading ? (
          PRODUCTS_LOADER.map((id) => (
            <div
              key={id}
              className="w-full col-span-6 md:col-span-4 lg:col-span-3"
            >
              <ProductSkeleton />
            </div>
          ))
        ) : trending?.length ? (
          trending.map((product) => (
            <div
              key={product?.id}
              className="w-full col-span-6 md:col-span-4 lg:col-span-3"
            >
              <ProductCard
                handleWishlist={handleWishlist}
                {...product}
                {...{
                  id: product?.id,
                  variant: product?.variantData?.[0],
                  disabledMeta,
                }}
              />
            </div>
          ))
        ) : (
          <div className="w-full col-span-12">
            <div className="w-full flex flex-col items-center justify-center">
              No data
            </div>
          </div>
        )}
      </div>
      <Modal {...{ open, setOpen }}>
        <div className="w-full relative flex flex-col items-start justify-center">
          <Button className="!bg-slate-200 !border-none !rounded-full !p-1 !absolute right-0 top-0 !text-text">
            <ICONS.CLOSE
              onClick={() => setOpen(false)}
              className="w-8 h-8 text-s"
            />
          </Button>
          <h3 className="text-xl mb-4 mt-3 font-medium text-text">Sign In</h3>
          <p className="text-slate-400 mb-3 mt-1 text-base leading-normal">
            To access this feature, please sign in to your account first. Once
            you're logged in, you can continue to add items to your wishlist
            seamlessly.
          </p>
          <Button
            label="Sign In"
            handleClick={() => {
              localStorage.setItem("redirect", location.pathname);
              handleRedirect(PAGES.LOGIN.path);
            }}
            className="!rounded-full min-w-[140px] !border-green hover:!bg-pink hover:!border-pink !bg-green"
          />
        </div>
      </Modal>
    </div>
  );
};

export default PopularProducts;
