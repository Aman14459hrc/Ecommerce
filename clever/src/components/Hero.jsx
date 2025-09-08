import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
    return (
         <div className="w-full">
            {/* Hero Section */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 p-6 bg-red-100">
                
                {/* Left Text Section */}
                <div className="flex flex-col items-center text-[#414141] w-full sm:w-1/2 gap-2">
                    <div className="w-10 md:w-12 h-[2px] bg-gray-600"></div>
                    <p className="text-sm md:text-base font-medium">OUR BESTSELLER</p>
                    <h1 className="font-bold text-3xl md:text-4xl">Latest Arrival</h1>
                    <p className="text-sm md:text-base font-medium">SHOP MORE</p>
                    <div className="w-10 md:w-12 h-[2px] bg-gray-600"></div>
                </div>

                {/* Right Image Section */}
                <div className="w-full sm:w-1/2 flex justify-center">
                    <img
                        className="h-60 sm:h-72 md:h-[60vh] object-contain"
                        src={assets.hero_img}
                        alt="Hero"
                    />
                </div>

            </div>
        </div>
    )
}

export default Hero 