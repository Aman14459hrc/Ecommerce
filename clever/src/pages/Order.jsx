import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaTruck, FaCheckCircle, FaBoxOpen } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const Order = () => {
  const { cartItem, addressData, products } = useContext(ShopContext);
  const [orderId] = useState(uuidv4().slice(0, 8).toUpperCase());
  const [orderDate] = useState(new Date().toLocaleString());
  const [expectedDelivery] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toDateString();
  });

  const orderItems = Object.entries(cartItem).flatMap(([productId, sizes]) =>
    Object.entries(sizes).map(([size, qty]) => {
      const product = products.find(p => p._id === productId);
      return {
        _id: productId,
        name: product?.name || 'Product',
        image: product?.image?.[0] || '',
        size,
        quantity: qty,
        price: product?.price || 0,
      };
    })
  );

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 49;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">🧾 Order Confirmation</h2>

      {/* Order Details */}
      <div className="mb-6 bg-white rounded shadow p-5">
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p><span className="font-semibold">Order ID:</span> #{orderId}</p>
            <p><span className="font-semibold">Order Date:</span> {orderDate}</p>
          </div>
          <div>
            <p><span className="font-semibold">Expected Delivery:</span> {expectedDelivery}</p>
            <p><span className="font-semibold">Payment:</span> Cash on Delivery</p>
          </div>
        </div>
      </div>

      {/* Address and Items */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Shipping Address & Items */}
        <div className="md:col-span-2 bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
          <p>{addressData?.name}</p>
          <p>{addressData?.street}</p>
          <p>{addressData?.city}, {addressData?.state} - {addressData?.pincode}</p>
          <p>📞 {addressData?.phone}</p>

          <hr className="my-4" />

          <h3 className="text-xl font-semibold mb-3">Ordered Items</h3>
          <div className="space-y-4">
            {orderItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-2">
                <img src={item.image} className="w-16 h-16 object-cover rounded" alt={item.name} />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white p-5 rounded shadow space-y-5">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Payment Logos */}
          <div>
            <h4 className="text-md font-semibold mb-1">Payment Method</h4>
            <div className="flex gap-4 items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Cash" className="w-8" />
              <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="UPI" className="w-8" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Card" className="w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Track Order */}
      <div className="mt-10 bg-white p-5 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">📦 Track Order</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center text-center">
          <div className="flex flex-col items-center text-green-600">
            <FaCheckCircle size={24} />
            <span>Ordered</span>
          </div>
          <div className="w-full h-[2px] bg-green-300 sm:w-[100px]"></div>
          <div className="flex flex-col items-center text-green-600">
            <FaBoxOpen size={24} />
            <span>Packed</span>
          </div>
          <div className="w-full h-[2px] bg-green-300 sm:w-[100px]"></div>
          <div className="flex flex-col items-center text-yellow-500">
            <FaTruck size={24} />
            <span>Shipped</span>
          </div>
          <div className="w-full h-[2px] bg-gray-300 sm:w-[100px]"></div>
          <div className="flex flex-col items-center text-gray-500">
            <FaCheckCircle size={24} />
            <span>Delivered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;




