import React from 'react'
import { FEATURES } from '../../assets/utils/constant'
import { classNames } from '../../assets/utils/helper'

const OurValues = () => {
    return (
        <section className="w-full pt-24 pb-6">
            <div className="relative container mx-auto lg:px-4 p-4 max-w-7xl">
                <div className="w-full">
                    <h2 className="text-lg md:text-xl font-semibold text-pink">Our</h2>
                    <h3 className="mb-4 md:mb-6 text-2xl md:text-4xl font-bold">Value Propositons</h3>
                    <p className="mb-12 text-lg text-gray-600">
                        We empower kids to be themselves through high-quality, affordable clothing that combines style, comfort, and durability. Our designs celebrate childhood while giving parents peace of mind.
                    </p>
                </div>
                <div className="grid grid-cols-12 w-full gap-4">
                    {
                        FEATURES?.map(({ name, icon: ICON, desc, color, ...item }) => <div id={name} className='col-span-12 md:col-span-6 lg:col-span-3' >
                            <div className='w-full p-4 flex items-start' >
                                <div>
                                    <ICON className={classNames('w-14 h-14 opacity-70', color)} />
                                </div>
                                <div className='w-auto ml-4 flex flex-col' >
                                    <h4 className='font-medium text-text text-xl' >{name || ''}</h4>
                                    <p className='mt-1 text-gray-400' >{desc}</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </section>
    )
}

export default OurValues