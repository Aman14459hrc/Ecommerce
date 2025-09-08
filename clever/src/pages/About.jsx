import React from 'react';
import { FaShippingFast, FaLock, FaSmile, FaStar } from 'react-icons/fa';

const About = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
     <section
  className="relative bg-[url('https://media.istockphoto.com/id/1311600080/photo/small-shipping-packages-on-a-notebook-with-the-inscription-online-shopping.jpg?s=2048x2048&w=is&k=20&c=CoSezyFwnL_a50ED7bau6OGcp9yf_j2wFwAqMeZ7y5k=')] bg-cover bg-center h-80 flex items-center justify-center text-white"
>
  <div className=" bg-opacity-60 w-full h-full flex items-center justify-center">
    <h1 className="text-4xl text-black font-bold">About Us</h1>
  </div>
</section>


      {/* Brand Story */}
      <section className="max-w-6xl mx-auto p-6 py-12">
        <h2 className="text-3xl font-semibold mb-4 text-center">Our Story</h2>
        <p className="text-lg text-center max-w-3xl mx-auto leading-7">
          At <span className="font-bold">ShopVerse</span>, we started with a simple idea —
          to make fashion and essentials accessible, stylish, and sustainable. What began as a college dorm idea
          has grown into a platform that serves thousands of customers nationwide.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-10">Why Shop With Us?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <FaShippingFast className="text-4xl mx-auto mb-3" />
              <h4 className="text-lg font-medium">Fast Delivery</h4>
              <p className="text-sm text-gray-600">Get your orders at lightning speed, nationwide.</p>
            </div>
            <div>
              <FaLock className="text-4xl  mx-auto mb-3" />
              <h4 className="text-lg font-medium">Secure Payment</h4>
              <p className="text-sm text-gray-600">Your data and transactions are 100% protected.</p>
            </div>
            <div>
              <FaSmile className="text-4xl mx-auto mb-3" />
              <h4 className="text-lg font-medium">Customer First</h4>
              <p className="text-sm text-gray-600">24/7 support to help you with anything you need.</p>
            </div>
            <div>
              <FaStar className="text-4xl  mx-auto mb-3" />
              <h4 className="text-lg font-medium">Top Rated Products</h4>
              <p className="text-sm text-gray-600">Handpicked quality to ensure satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-sm text-gray-700 mb-4">"Amazing quality and fast delivery! I keep coming back for more."</p>
            <p className="text-orange-600 font-semibold">– Priya Sharma</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-sm text-gray-700 mb-4">"Their support team helped me instantly. Great service!"</p>
            <p className="text-orange-600 font-semibold">– Rohan Gupta</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md">
            <p className="text-sm text-gray-700 mb-4">"Stylish and affordable products. Love this store!"</p>
            <p className="text-orange-600 font-semibold">– Anjali Mehta</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white border text-black text-center py-10 mt-12">
        <h2 className="text-2xl font-bold mb-2">Join the ShopVerse Family</h2>
        <p className="mb-4">Experience shopping the smart way.</p>
        <button className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-100 transition-all">
          Start Shopping
        </button>
      </section>
    </div>
  );
};

export default About
