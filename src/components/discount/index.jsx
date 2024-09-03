import React from 'react'
import { ICONS } from '../../assets/icons'

const Discount = ({discount, ...props}) => {
  return (
    <div {...props} className='px-4 md:px-[80px] py-5 lg:py-[9px] text-white bg-pink flex justify-center items-center flex-col-reverse md:flex-row' >
        <p className='flex items-center text-xs font-semibold' >
            <ICONS.DISCOUNT className='mr-1 w-5 h-5' /> {discount || ''}
        </p>
    </div>
  )
}

export default Discount