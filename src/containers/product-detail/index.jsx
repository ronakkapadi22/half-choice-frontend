import React from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {

    const { product_id } = useParams()

  return (
    <div>Product</div>
  )
}

export default Product