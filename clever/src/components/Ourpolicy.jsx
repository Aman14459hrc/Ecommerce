import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-around items-center gap-12 sm:gap-4 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
            {/* Item 1 */}
            <div className="flex flex-col items-center max-w-xs px-4">
                <img src={assets.exchange_icon} className="w-12 mb-3" alt="Exchange Icon" />
                <p className="text-black font-bold">Easy Exchange Policy</p>
                <p className="font-medium text-gray-500">We offer hassle-free exchange policy</p>
            </div>
            {/* Item 2  */}
            <div className="flex flex-col items-center max-w-xs px-4">
                <img src={assets.quality_icon} className="w-12 mb-3" alt="Exchange Icon" />
                <p className="text-black font-bold">7- Day return policy </p>
                <p className="font-medium text-gray-500">We provide 7-day return policy</p>
            </div>

            {/* Item 3  */}
            <div className="flex flex-col items-center max-w-xs px-4">
                <img src={assets.support_img} className="w-12 mb-3" alt="Exchange Icon" />
                <p className="text-black font-bold">best customer support </p>
                <p className="font-medium text-gray-500">We provide 24/7 customer support </p>
            </div>

            {/* Repeat similar structure for other icons if needed */}
        </div>

    )
}

export default Ourpolicy    