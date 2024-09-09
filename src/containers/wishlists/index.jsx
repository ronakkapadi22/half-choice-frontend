import React, { useCallback, useEffect, useMemo, useState } from "react";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import { getWishlist } from "../../redux/slices/wishlist.slice";
import { useSelector } from "react-redux";
import { CAROUSEL_LOADER } from "../../assets/utils/constant";
import ProductSkeleton from "../../shared/product-skeleton";
import ProductCard from "../../shared/product-card";
import cart_image from "../../assets/images/cart.svg";
import Button from "../../shared/button";
import Confirmation from "../../shared/confirmation";
import { api } from "../../api";

const Wishlists = () => {
  const user = useSelector(({ auth }) => auth.user);
  const { isLoading, wishlist } = useSelector(({ wishlist }) => wishlist);
  const [fetchWishlist] = useDispatchWithAbort(getWishlist);
  const [confirm, setConfirm] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchWishlist({
      params: {
        user_id: user?.id,
      },
    });
  }, [user?.id, fetchWishlist]);

  const my_wishlist = useMemo(() => {
    if (isLoading) return [];
    const clone = [...wishlist];
    return clone || [];
  }, [isLoading, wishlist]);

  const handleWishlist = useCallback((id) => {
    setConfirm(id)
  }, [])

  const handleAction = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.wishlists.update({
        data: {
          user_id: user?.id,
          product_id: confirm,
          isWishlist: false
        }
      })
      if (response?.data) {
        setLoading(false)
        fetchWishlist({
          params: {
            user_id: user?.id,
          },
        })
        setConfirm(null)
      }
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  }, [confirm, user?.id, fetchWishlist])

  return (
    <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
      <div className="w-full flex flex-col items-start justify-start my-9">
        <h2 className="text-3xl text-text mb-1.5 font-semibold">My Wishlist</h2>
        <p className="text-slate-400 text-md">
          A collection of favorite items saved for future purchase or
          inspiration.
        </p>
        <div className="w-full mt-16 grid grid-cols-12 gap-4 lg:gap-8">
          {isLoading ? (
            CAROUSEL_LOADER.map((id) => (
              <div
                key={id}
                className="w-full col-span-6 md:col-span-4 lg:col-span-3"
              >
                <ProductSkeleton />
              </div>
            ))
          ) : my_wishlist?.length ? (
            my_wishlist.map((product) => (
              <div
                key={product?.id}
                className="w-full col-span-6 md:col-span-4 lg:col-span-3"
              >
                <ProductCard handleWishlist={handleWishlist}
                  {...product}
                  {...{ id: product?.id, variant: product?.variantData?.[0] }}
                />
              </div>
            ))
          ) : (
            <div className="w-full col-span-12">
              <div className="w-full flex flex-col items-center justify-center">
                <img
                  alt="cart_image"
                  src={cart_image}
                  className="object-cover max-w-[280px] w-auto"
                />
                <div className="mt-10 flex flex-col items-center justify-center">
                  <h2 className="text-center text-2xl text-text mb-1 font-semibold">
                    Your wishlist is empty !!
                  </h2>
                  <p className="text-center text-slate-400 text-md my-0.5">
                    Explore more and shortlist some items.
                  </p>
                  <Button
                    label="Explore"
                    className="!w-auto mt-6 !min-w-36 !rounded-full mb-1 flex items-center justify-center !bg-pink !border-pink hover:!border-yellow hover:!bg-yellow transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Confirmation handleAction={handleAction}
        loading={loading}
        loaderClass='!text-yellow-dark'
        actionClass='!text-yellow-dark !bg-yellow-light'
        actionLabel='Yes, Remove'
        title="Remove Wishlist"
        description="Are you sure you want to remove this from your Wishlist?"
        open={Boolean(confirm)}
        setOpen={setConfirm}
      />
    </div>
  );
};

export default Wishlists;
