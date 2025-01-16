import React from 'react'
import { classNames } from '../../assets/utils/helper'

const ProductSkeleton = ({ imgClass }) => {
  return (
    <div className='w-full mx-auto space-y-4' >
      <div className={classNames("animate-pulse h-[350px] rounded-xl bg-slate-200", imgClass)} />
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-slate-200 rounded-xl col-span-2"></div>
          <div className="h-4 bg-slate-200 rounded-xl col-span-1"></div>
        </div>
        <div className="h-4 bg-slate-200 rounded"></div>
      </div>
    </div>
  )
}

export default ProductSkeleton