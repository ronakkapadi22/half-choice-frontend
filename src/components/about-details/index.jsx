import React from 'react'
import { classNames } from '../../assets/utils/helper'
import about_image from '../../assets/images/about.png'

const AboutDetails = ({ className }) => {
    return (
        <div
            className={classNames(
                "relative container mx-auto lg:px-4 p-4 max-w-7xl",
                className
            )}
        >
            <div className='grid gap-4 grid-cols-12' >
                <div className='col-span-12 md:col-span-5' >
                    <img alt='about_us' src={about_image} />
                </div>
                <div className='col-span-12 md:col-span-7' >
                    <div className="w-full h-full flex flex-col justify-center">
                        <h2 className="text-lg md:text-xl font-semibold text-pink">About</h2>
                        <h3 className="mb-4 md:mb-6 text-2xl md:text-4xl font-bold">HalfChoice</h3>
                        <p className="mb-4 text-lg text-gray-600">
                            Half Choice: Where Kids' Fashion Meets Adventure
                        </p>
                        <p className="mb-4 text-lg text-gray-600">
                            At Half Choice, we're your destination for stylish and durable kids' clothing. Our mission is simple: provide quality fashion that celebrates your child's individuality, all at an affordable price. We offer a diverse range of clothing that's built to last and designed to keep up with your little one's active lifestyle. With excellent customer service and hassle-free returns, we're here to make dressing your child a joy.
                        </p>
                        <p className="mb-4 text-lg text-gray-600">
                            Embark on the Half Choice adventure today and discover kids' fashion that champions individuality, creativity, and comfort. Thank you for making Half Choice your go-to destination for kids' fashion.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutDetails