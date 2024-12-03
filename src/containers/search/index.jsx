import React, { useCallback, useMemo, useState } from "react";
import Breadcrumb from "../../shared/breadcrumb";
import search_image from "../../assets/images/search.svg";
import cart_image from "../../assets/images/no_data.svg";
import { ICONS } from "../../assets/icons";
import { useSelector } from "react-redux";
import useDispatchWithAbort from "../../hooks/useDispatchWithAbort";
import { getSearchProducts } from "../../redux/slices/products.slice";
import { debounce, getTitle } from "../../assets/utils/helper";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../assets/utils/urls";
import ReactHelmet from "../seo/helmet";

const ProductSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isLoading, data } = useSelector(({ products }) => products?.search);
  const navigate = useNavigate()

  const [fetchAllProducts] = useDispatchWithAbort(getSearchProducts);

  const handleSearch = useCallback((value) => {
    debounce(fetchAllProducts({
      params: {
        name: value,
      },
    }), 500);
  }, [fetchAllProducts, debounce]);

  const productData = useMemo(() => {
    if (isLoading || !data?.length) return [];
    const clone = [...data];
    return clone || [];
  }, [isLoading, data]);

  const handleChange = useCallback(
    (e) => {
      const { value } = e.target;
      setSearchValue(value);
      handleSearch(value);
    },
    [handleSearch, setSearchValue]
  );

  const handleRemove = useCallback(() => {
    setSearchValue("");
  }, []);

  const links = useMemo(
    () => [
      {
        id: "search",
        label: "Search",
      },
    ],
    []
  );

  return (
    <ReactHelmet {...{
      title: "Search Kids' Fashion - Dresses, Ethnic Wear, Tops & More at Halfchoice",
      description: "Search for trendy kids' clothing at Halfchoice. Discover dresses, ethnic wear, tops, shirts, jeans, and more for boys and girls. Shop the latest styles and trends",
      keywords: "Kids fashion search, trendy kids clothing, search kids dresses, kids ethnic wear, kids clothes online"
    }} >
      <div className="relative container mx-auto lg:px-4 px-2 py-4 md:py-4 md:px-4 max-w-7xl">
        <div className="w-full">
          <Breadcrumb links={links} />
        </div>
        <div className="relative container mx-auto lg:px-4 py-4 max-w-4xl">
          <div className="w-full flex flex-col items-start justify-start mb-10 md:my-9">
            <div className="relative w-full">
              <ICONS.SEARCH className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="search"
                value={searchValue}
                onChange={handleChange}
                type="text"
                placeholder="Search here"
                className="outline-none border w-full py-3 pl-10 rounded-full text-sm"
              />
              {searchValue ? (
                <ICONS.CLOSE
                  onClick={handleRemove}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-[30px] h-[30px] text-gray-400 cursor-pointer"
                />
              ) : null}
            </div>
            <div className="w-full mt-12 grid grid-cols-12 gap-6">
              <div className="w-full col-span-12">
                {!searchValue ? (
                  <div className="w-full flex flex-col items-center justify-center">
                    <img
                      alt="search_image"
                      src={search_image}
                      className="object-cover max-w-[180px] md:max-w-[280px] w-auto"
                    />
                    <div className="mt-10 flex flex-col items-center justify-center">
                      <h2 className="text-center text-xl md:text-2xl text-text mb-1 font-semibold">
                        Waiting for search
                      </h2>
                      <p className="text-center text-slate-400 text-md my-0.5">
                        Explore more and shortlist some items.
                      </p>
                    </div>
                  </div>
                ) : isLoading ? (
                  [1, 2, 3, 4]?.map((item) => (
                    <div
                      className="w-full mb-2 animate-pulse h-[40px] rounded-full bg-slate-200"
                      key={item}
                    ></div>
                  ))
                ) : productData?.length ? (
                  productData?.map((value, i) => (
                    <div onClick={() => navigate(`${PAGES.PRODUCTS.path}/${value?.id}/${getTitle(value?.name)}`)}
                      className="w-full mb-2 rounded-full py-[10px] px-4 border cursor-pointer text-sm border-slate-200"
                      key={i}
                    >
                      {value?.name}
                    </div>
                  ))
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactHelmet>
  );
};

export default ProductSearch;
