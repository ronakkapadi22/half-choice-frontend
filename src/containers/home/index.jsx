import React, { useEffect } from 'react'
import HomeBanner from './banner';
import { getCommerce } from '../../redux/slices/commerce.slice';
import useDispatchWithAbort from '../../hooks/useDispatchWithAbort';
import LatestArrival from './latest-arrival';

const Home = () => {
    const [fetchHome] = useDispatchWithAbort(getCommerce)

    useEffect(() => {
        fetchHome({})
    }, [fetchHome])

  return (
    <div className='relative w-full' >
        <HomeBanner/>
        <LatestArrival className='py-12' title='Latest Arrival' />
    </div>
  )
}

export default Home;
