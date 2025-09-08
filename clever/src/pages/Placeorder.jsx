import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaCcAmazonPay } from "react-icons/fa";
import { SiRazorpay, SiUpwork } from "react-icons/si";
import { BsCash } from "react-icons/bs";
import { assets } from "../assets/assets";

const Placeorder = () => {
  const { cartItem, products, currency, delivery_charge } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalAmount = Object.keys(cartItem).reduce((total, productId) => {
    const sizes = cartItem[productId];
    const product = products.find((p) => p._id === productId);
    if (!product) return total;

    const sizeTotal = Object.values(sizes).reduce((sum, qty) => sum + qty * product.price, 0);
    return total + sizeTotal;
  }, 0);

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert("Please fill all the address details!");
      return;
    }

    // Optionally store order info here
    navigate("/order");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-gray-50 min-h-screen">
      
      {/* Address & Payment Section */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Delivery Information</h2>
        <div className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            placeholder="Complete Address"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Payment Method */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3">Select Payment Method</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              <img  className=" h-5 w-auto"src={assets.stripe_logo} alt="" />
              {/* <BsCash className="text-xl text-green-600" />
              <span>Cash on Delivery</span> */}
            </label>
            <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                onChange={handleChange}
              />
              <img className=" h-5 w-auto" src={assets.razorpay_logo} alt="" />
              {/* <SiRazorpay className="text-xl text-blue-500" />
              <span>Razorpay (UPI/Card/Wallet)</span> */}
            </label>
            <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-100">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                onChange={handleChange}
              />
              <SiUpwork className="text-xl text-indigo-600" />
              <span>Direct UPI</span>
            </label>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-200"
        >
          Place Order
        </button>
      </div>

      {/* Cart Summary */}
      <div className="border p-6 rounded-md bg-white shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Cart Summary</h3>
        <div className="space-y-3 text-gray-700">
          {Object.keys(cartItem).map((productId) => {
            const product = products.find((p) => p._id === productId);
            if (!product) return null;
            return Object.entries(cartItem[productId]).map(([size, qty], index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{product.name} ({size}) × {qty}</span>
                <span>{currency}{qty * product.price}</span>
              </div>
            ));
          })}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-medium">
          <span>Subtotal</span>
          <span>{currency}{totalAmount}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Delivery Charge</span>
          <span>{currency}{delivery_charge}</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>
            {currency}
            {parseInt(totalAmount) + parseInt(delivery_charge)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;
