import React from 'react'

const ProductSkeleton = () => {
  return (
    <div className='w-full mx-auto space-y-4' >
        <div className="animate-pulse h-[350px] rounded-xl bg-slate-200"/>
        <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-4 bg-slate-200 rounded-xl col-span-2"></div>
          <div class="h-4 bg-slate-200 rounded-xl col-span-1"></div>
        </div>
        <div class="h-4 bg-slate-200 rounded"></div>
      </div>
    </div>
  )
}

export default ProductSkeleton