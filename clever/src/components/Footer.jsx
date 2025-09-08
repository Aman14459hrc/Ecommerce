import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="bg-gray-100 py-16 px-6">
            <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 max-w-6xl mx-auto text-sm text-gray-700">

                {/* Logo & Description */}
                <div>
                    <img src={assets.logo} alt="logo" className="w-32 mb-4" />
                    <p className="leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. A ut, necessitatibus
                        perferendis aliquid facere, iusto quos accusamus maiores vitae eum delectus, sequi
                        nesciunt? Praesentium temporibus ratione quae rerum, quisquam repellendus numquam
                        illum voluptatum tenetur nesciunt asperiores soluta quo sapiente repellat?
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <p className="font-semibold text-black mb-4">Company</p>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-black transition-all duration-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-black transition-all duration-200">About</Link>
                        </li>
                        <li>
                            <Link to="/collection" className="hover:text-black transition-all duration-200">Collection</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="hover:text-black transition-all duration-200">Profile</Link>
                        </li>
                    </ul>
                </div>

                {/* Address Info */}
                <div>
                    <p className="font-semibold text-black mb-4">Address</p>
                    <ul>
                        <li className="mb-1">Lorem ipsum dolor sit.</li>
                        <li className="text-base font-medium">+123 785 556</li>
                        <li className="text-base font-medium">support@forever.com</li>
                    </ul>
                </div>

            </div>
            <p className=' text-center'>Copyright 2005 o forever@.com-All right reserved</p>
        </div>
    );
};

export default Footer;
