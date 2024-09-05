import React, { useEffect } from 'react'
import useDispatchWithAbort from '../../hooks/useDispatchWithAbort'
import { getWishlist } from '../../redux/slices/wishlist.slice'
import { useSelector } from 'react-redux'

const Wishlists = () => {
    const user = useSelector(({auth}) => auth.user)
    const {isLoading, wishlist} = useSelector(({wishlist}) => wishlist)
    const [fetchWishlist] = useDispatchWithAbort(getWishlist)

    useEffect(() => {
        fetchWishlist({
            params: {
                user_id: user?.id
            }
        })
    }, [user?.id, fetchWishlist])

    console.log('wishlist', wishlist)

  return (
    <div>Wishlists</div>
  )
}

export default Wishlists