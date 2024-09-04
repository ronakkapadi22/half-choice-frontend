import React, { useEffect } from 'react'
import useDispatchWithAbort from '../../hooks/useDispatchWithAbort'
import { getCommerce } from '../../redux/slices/commerce.slice'
import { useSelector } from 'react-redux'

const Home = () => {

  const [fetchHome] = useDispatchWithAbort(getCommerce)
  const commerce = useSelector(({commerce}) => commerce)

  console.log('commerce', commerce)

  useEffect(() => {
    fetchHome({})
  }, [fetchHome])

  return (
    <div>Home</div>
  )
}

export default Home