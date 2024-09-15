import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useDispatchWithAbort from '../../hooks/useDispatchWithAbort'
import { getProducts } from '../../redux/slices/products.slice'
import { useSelector } from 'react-redux'
import Breadcrumb from '../../shared/breadcrumb'
import cart_image from "../../assets/images/no_data.svg";
import { PRODUCTS_LOADER } from '../../assets/utils/constant'
import ProductSkeleton from '../../shared/product-skeleton'
import ProductCard from '../../shared/product-card'
import Modal from '../../shared/modal'
import Button from '../../shared/button'
import { ICONS } from '../../assets/icons'
import { api } from '../../api'
import { classNames, getCurrentPage, restructureCategories, totalPages } from '../../assets/utils/helper'
import Spinner from '../..'
import CustomAccordion from '../../shared/accordion'
import { PAGES } from '../../assets/utils/urls'

const Products = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [fetchAllProducts] = useDispatchWithAbort(getProducts)

  const [open, setOpen] = useState(false)

  const user = useSelector(({ auth }) => auth.user);
  const { total, isLoading, data, pagination, loader } = useSelector(({ products }) => products?.products)
  const { data: categoryData, isLoading: categoryLoading } = useSelector(({ category }) => category);


  const handleRedirect = useCallback((path = '') => {
    navigate(path)
  }, [navigate])

  const getParams = useCallback((key = '') => {
    return searchParams.get(key)
  }, [searchParams])


  const links = useMemo(() => [
    {
      id: 'products',
      label: 'Products'
    }
  ], [])

  const products = useMemo(() => {
    if (isLoading) return []
    const clone = [...data]
    return clone || []
  }, [isLoading, data])

  useEffect(() => {
    fetchAllProducts({
      isInitial: true,
      isLoader: true,
      query: {
        pageSize: 8,
        pageNumber: 1
      },
      params: {
        user_id: user?.id,
        cat_id: getParams('cat_id'),
        sub_sub_cat_id: getParams('sub_sub_cat_id'),
        pageNumber: 1,
        pageSize: 8
      }
    })
  }, [fetchAllProducts, getParams])

  const isUserLogged = useMemo(() => {
    return Boolean(user?.id);
  }, [user]);

  const handleWishlist = useCallback(async (id, isWishlist) => {
    if (!isUserLogged) {
      setOpen(true)
      return
    }
    try {
      const response = await api.wishlists.update({
        data: {
          user_id: user?.id,
          product_id: id,
          isWishlist: !isWishlist
        }
      })
      if (response?.data) {
        fetchAllProducts({
          isInitial: true,
          query: {
            pageSize: products?.length,
            pageNumber: getCurrentPage(products?.length, 8)
          },
          isLoader: false,
          params: {
            user_id: user?.id,
            cat_id: getParams('cat_id'),
            sub_sub_cat_id: getParams('sub_sub_cat_id'),
            pageSize: products?.length,
            pageNumber: 1
          }
        });
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [user?.id, fetchAllProducts, getParams, getCurrentPage, products?.length])

  const handlePaginationData = async ({ pageNumber, pageSize }) => {
    fetchAllProducts({
      isInitial: false,
      isLoader: false,
      query: {
        pageNumber: pageNumber + 1,
        pageSize
      },
      params: {
        user_id: user?.id,
        cat_id: getParams('cat_id'),
        sub_sub_cat_id: getParams('sub_sub_cat_id'),
        pageNumber: pageNumber + 1,
        pageSize: 8
      }
    })
  }

  const isLimitExist = useMemo(() => {
    const value = totalPages(total, 8)
    return value === pagination.pageNumber
  }, [totalPages, pagination])

  const categories = useMemo(() => {
    if (categoryLoading) return []
    const clone = [...categoryData]
    return restructureCategories(clone)?.map(({ id, name, sub, ...val }) => ({
      id,
      label: name,
      items: sub?.map(({ id, ids, name }) => ({
        label: name, id, ids
      })),
      ...val
    }))
  }, [categoryLoading, data])

  return (
    <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
      <div className="w-full" >
        <Breadcrumb links={links} />
      </div>
      <div className="w-full flex flex-col items-start justify-start my-9">
        <h2 className="text-3xl text-text mb-1.5 font-semibold">Products</h2>
        <p className="text-slate-400 text-md">
          Vibrant and durable clothing for kids of all ages, designed to inspire play and comfort. From cozy pajamas to adventure-ready outfits, we dress young imaginations with style and practicality.
        </p>
        <div className='w-full mt-16 grid grid-cols-12 gap-6' >
          <div className='col-span-3' >
            <CustomAccordion {...{ cat_id: getParams('cat_id'), sub_sub_cat_id: getParams('sub_sub_cat_id') }} handleValue={(main, sub) => handleRedirect(`${PAGES.PRODUCTS.path}/?cat_id=${main?.is_parent ? "" : main?.id}&sub_sub_cat_id=${sub?.ids ? sub?.ids?.join(',') : sub?.id}`)} accordion={categories} />
          </div>
          <div className='col-span-9' >
            <div className="w-full grid grid-cols-12 gap-4">
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
                          <ProductCard imgClass='!min-h-[auto]' handleWishlist={handleWishlist}
                            {...product}
                            {...{ id: product?.id, variant: product?.variantData?.[0] }}
                          />
                        </div>
                      ))
                    }
                  </div>
                  {!isLimitExist ? <div className='w-full mt-6 flex justify-center items-center' >
                    <Button handleClick={() => handlePaginationData(pagination)} disabled={loader} className={classNames('!bg-white !text-pink flex justify-center items-center', loader ? 'cursor-not-allowed' : '')} >
                      <span>{!loader ? "Load More" : "Loading"}</span>
                      {loader ? <Spinner className="ml-1 !w-4 !h-4 !text-pink" /> : null}
                    </Button>
                  </div> : null}
                </div>
              </div> : (
                <div className="w-full col-span-12">
                  <div className="w-full flex flex-col items-center justify-center">
                    <img
                      alt="cart_image"
                      src={cart_image}
                      className="object-cover max-w-[280px] w-auto"
                    />
                    <div className="mt-10 flex flex-col items-center justify-center">
                      <h2 className="text-center text-2xl text-text mb-1 font-semibold">
                        Products not found!!
                      </h2>
                      <p className="text-center text-slate-400 text-md my-0.5">
                        Explore more and another some items.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal {...{ open, setOpen }} >
        <div className="w-full relative flex flex-col items-start justify-center" >
          <Button className='!bg-slate-200 !border-none !rounded-full !p-1 !absolute right-0 top-0 !text-text' >
            <ICONS.CLOSE onClick={() => setOpen(false)} className="w-8 h-8 text-s" />
          </Button>
          <h3 className="text-xl mb-4 mt-3 font-medium text-text">Sign In</h3>
          <p className="text-slate-400 mb-3 mt-1 text-base leading-normal">
            To access this feature, please sign in to your account first. Once you're logged in, you can continue to add items to your wishlist seamlessly.
          </p>
          <Button label='Sign In' handleClick={() => handleRedirect(PAGES.LOGIN.path)} className='!rounded-full min-w-[140px] !border-green hover:!bg-pink hover:!border-pink !bg-green' />
        </div>
      </Modal>
    </div>
  )
}

export default Products