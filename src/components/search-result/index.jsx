import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import { getSearchProductList } from "../../redux/slices/products.slice";
import { PRODUCTS_LOADER } from "../../assets/utils/constant";
import ProductSkeleton from "../../shared/product-skeleton";
import ProductCard from "../../shared/product-card";
import cart_image from "../../assets/images/no_data.svg";

const SearchResult = ({ value, ...props }) => {
  const { user } = useSelector(({ auth }) => auth);
  const [fetchProductList] = useDispatchWithAbort(getSearchProductList);

  const { isLoading, data } = useSelector(
    ({ products }) => products?.searchList
  );

  
  useEffect(() => {
      fetchProductList({
          params: {
              name: value,
              pageNumber: 1,
              pageSize: 100,
              user_id: user?.id,
            },
        });
    }, [fetchProductList, value, user?.id]);
    
    const products = useMemo(() => {
        if (isLoading) return []
        const clone = { ...data }
      return clone?.productData || []
    }, [isLoading, data])

  return <div className="w-full grid grid-cols-12 gap-4 mt-8 mb-4">
    {isLoading ? (
                PRODUCTS_LOADER.map((id) => (
                  <div
                    key={id}
                    className="w-full col-span-6 md:col-span-4 lg:col-span-3"
                  >
                    <ProductSkeleton imgClass='!h-[280px]' />
                  </div>
                ))
              ) : products?.length ? <div className='w-full col-span-12' >
                <div className='w-full flex flex-col justify-center items-center' >
                  <div className='w-full grid grid-cols-12 gap-4' >
                    {
                      products.map((product) => (
                        <div
                          key={product?.id}
                          className="w-full col-span-6 md:col-span-4 lg:col-span-3"
                        >
                          <ProductCard imgClass='!min-h-[auto]' handleWishlist={() => {}}
                            {...product}
                            {...{ id: product?.id, variant: product?.variantData?.[0] }}
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div> : (
                <div className="w-full col-span-12">
                  <div className="w-full flex flex-col items-center justify-center">
                    <img
                      alt="cart_image"
                      src={cart_image}
                      className="object-cover max-w-[180px] md:max-w-[280px] w-auto"
                    />
                    <div className="mt-10 flex flex-col items-center justify-center">
                      <h2 className="text-center text-xl md:text-2xl text-text mb-1 font-semibold">
                        Products not found!!
                      </h2>
                      <p className="text-center text-slate-400 text-md my-0.5">
                        Explore more and another some items.
                      </p>
                    </div>
                  </div>
                </div>
              )}
  </div>;
};

export default SearchResult;
