import React, { useEffect, useMemo } from "react";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import { getProducts } from "../../redux/slices/products.slice";
import { useSelector } from "react-redux";
import { isEmptyObject } from "../../assets/utils/helper";
import ProductCard from "../../shared/product-card";
import ProductSkeleton from "../../shared/product-skeleton";
import { PRODUCTS_LOADER } from "../../assets/utils/constant";
import { api } from "../../api";

const RelatedProducts = ({ product, open, setOpen, isUserLogged, ...props }) => {
  const [fetchAllProducts] = useDispatchWithAbort(getProducts);

  const user = useSelector(({ auth }) => auth.user);
  const { isLoading, data, loader } = useSelector(
    ({ products }) => products?.products
  );

  const isProductEnabled = useMemo(() => {
    return !isEmptyObject(product);
  }, [product]);

  useEffect(() => {
    const params = {
      user_id: user?.id,
      pageSize: 8,
      pageNumber: 1,
      cat_id: product?.cat_id,
      sub_cat_id: product?.sub_cat_id,
      sub_sub_cat_id: product?.sub_sub_cat_id,
    };

    isProductEnabled &&
      fetchAllProducts({
        isInitial: true,
        query: {
          pageSize: 8,
          pageNumber: 1,
        },
        isLoader: false,
        params,
      });
  }, [isProductEnabled, user?.id, product, fetchAllProducts]);

  const products = useMemo(() => {
    if (isLoading) return [];
    const clone = [...data];
    return clone || [];
  }, [isLoading, data]);

  const handleWishlist = async(id, isWishlist) => {
    if (!isUserLogged) {
      setOpen(true)
      return
    }
      try {
        const response = await api.wishlists.update({
          data: {
            user_id: user?.id,
            product_id: id,
            isWishlist: !isWishlist,
          },
        });
        if(response?.data){

          const params = {
            user_id: user?.id,
            pageSize: 8,
            pageNumber: 1,
            cat_id: product?.cat_id,
            sub_sub_cat_id: product?.sub_sub_cat_id,
          };

          fetchAllProducts({
            isInitial: true,
            query: {
              pageSize: 8,
              pageNumber: 1,
            },
            isLoader: false,
            params,
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }

  return (
    <div className="w-full mt-4 grid grid-cols-12 gap-4">
      {isLoading
        ? PRODUCTS_LOADER.map((id) => (
            <div
              key={id}
              className="w-full col-span-6 md:col-span-4 lg:col-span-3"
            >
              <ProductSkeleton imgClass="!h-[280px]" />
            </div>
          ))
        : products.map((product) => (
            <div
              key={product?.id}
              className="w-full col-span-6 md:col-span-4 lg:col-span-3"
            >
              <ProductCard
                imgClass="!min-h-[auto]"
                handleWishlist={handleWishlist}
                {...product}
                {...{ id: product?.id, variant: product?.variantData?.[0] }}
              />
            </div>
          ))}
    </div>
  );
};

export default RelatedProducts;
