import React, { useCallback, useEffect, useMemo } from 'react'
import { classNames } from '../../assets/utils/helper'
import { useSelector } from 'react-redux'
import useDispatchWithAbort from '../../hooks/useDispatchWithAbort'
import { getSocialFeeds } from '../../redux/slices/feed.slice'
import { CAROUSEL_LOADER } from '../../assets/utils/constant'

const SocialFeed = ({ className, ...props }) => {

    const { isLoading, data } = useSelector(({ feeds }) => feeds?.feeds)

    const [fetchFeeds] = useDispatchWithAbort(getSocialFeeds)

    const feeds = useMemo(() => {
        if (isLoading) return [];
        const clone = [...data];
        return clone?.slice(0, 6) || [];
    }, [isLoading, data]);

    useEffect(() => {
        fetchFeeds({
            params: {
                access_token: process.env.INSTA_ACCESS,
                fields: 'caption,media_url,permalink,thumbnail_url,media_type,username'
            }
        })
    }, [])

    const handleRedirect = useCallback((url = '') => {
        window.location.href = url
    }, [])

    return (
        <div
            className={classNames(
                "relative container mx-auto lg:px-4 p-4 max-w-7xl",
                className
            )}
        >
            <div className="flex items-end mb-12 justify-between w-full">
                <div className="flex flex-col">
                    <h2 className="mb-6 text-4xl font-bold">Follow Us in Instagram <a target='_blank' href='https://www.instagram.com/half.choice' className='text-pink no-underline' >@halfchoice</a></h2>
                    <p className="text-gray-600 text-lg">
                        Discover trendy and comfortable kids' wear at @halfchoice – where style meets playtime!
                    </p>
                </div>
            </div>
            <div className="w-full my-10 grid grid-cols-12 gap-4 lg:gap-8">
                {
                    isLoading ? CAROUSEL_LOADER.map(item => <div
                        key={item}
                        className="w-full col-span-6 md:col-span-4 lg:col-span-3"
                    >
                        <div className='w-full mx-auto space-y-4' >
                            <div className={classNames("animate-pulse min-h-[280px] rounded-xl bg-slate-200")} />
                        </div>
                    </div>) : feeds?.length ? feeds?.map(feed => <div className='w-full col-span-6 md:col-span-4' key={feed?.id} >
                        <div className='w-full flex flex-col items-center justify-center relative h-auto cursor-pointer' onClick={() => handleRedirect(feed?.permalink)} >
                            <div className="w-full">
                                <img
                                    alt={feed?.id}
                                    src={feed?.media_url || ''}
                                    className={classNames("rounded-xl xl:min-h-[280px] object-cover object-center hover:opacity-55 transition-all duration-300")}
                                />
                            </div>
                        </div>
                    </div>) : <div className="w-full flex flex-col items-center justify-center" >
                        No data
                    </div>
                }
            </div>
        </div>
    )
}

export default SocialFeed