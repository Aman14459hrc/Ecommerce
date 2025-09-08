import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { products } from '../assets/assets';
import RelatedPro from '../components/RelatedPro';

const Product = () => {
  const params = useParams();
  const { Products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === params.productID);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [params.productID]);

  const handleAddToCart = () => {
    setClicked(true);
    addToCart(productData._id, size);
    setTimeout(() => setClicked(false), 300);
  };

  if (!productData) {
    return <div className="text-center text-gray-500 py-20">Product not found</div>;
  }

  const newPrice = productData.price;
  const oldPrice = newPrice + Math.floor(Math.random() * 100);
  const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);

  return (
    <>
      <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {/* Left Section - Images */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Thumbnails */}
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[500px] w-24 shrink-0">
            {productData.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                className={`w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 object-cover border cursor-pointer ${
                  image === img ? 'border-blue-500' : 'border-gray-300'
                }`}
                onClick={() => setImage(img)}
              />
            ))}
          </div>

          {/* Main Image */}
          <img
            src={image}
            alt="main"
            className="flex-1 object-contain rounded-lg max-h-[600px]"
          />
        </div>

        {/* Right Section - Product Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">{productData.name}</h2>
          <p className="text-xl text-green-600 font-bold">
            ₹{newPrice}
            <span className="line-through text-gray-500 ml-2 text-base">₹{oldPrice}</span>
            <span className="text-sm text-green-600 ml-2">({discount}% OFF)</span>
          </p>

          {/* Color options */}
          <div>
            <p className="text-sm font-semibold mb-1">Color</p>
            <div className="flex gap-2">
              {productData.image.map((img, i) => (
                <img key={i} src={img} alt="color" className="w-12 h-20 object-cover border" />
              ))}
            </div>
          </div>

          {/* Size options */}
          <div>
            <p className="text-sm font-semibold mb-1">Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((s) => (
                <button
                  key={s}
                  className={`border px-3 py-1 rounded transition-all duration-200 ${
                    size === s
                      ? 'bg-black text-white border-black'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Offers */}
          <div>
            <p className="font-semibold">Description</p>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
              <li>{productData.description}</li>
            </ul>
            <p className="font-semibold mt-3">Available Offers</p>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
              <li>5% cashback on Axis Bank Flipkart Debit Card up to ₹750</li>
              <li>10% off up to ₹1,500 on BOBCARD EMI Transactions (Min ₹7,500)</li>
              <li>10% off on HSBC Credit Card Transactions (Min ₹5,000)</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              className={`bg-black text-white px-6 py-2 rounded flex items-center gap-2 transition-transform duration-150 ${
                clicked ? 'scale-95 bg-green-600' : ''
              }`}
              onClick={handleAddToCart}
            >
              <span className="text-lg">🛒</span> ADD TO CART
            </button>
            <button className="bg-black text-white px-6 py-2 rounded cursor-pointer">
              BUY NOW
            </button>
          </div>

          {/* Delivery Check */}
          <div className="mt-4">
            <p className="font-semibold">Delivery</p>
            <input
              type="text"
              placeholder="Enter delivery pincode"
              className="border px-3 py-1 mt-1 w-full max-w-xs"
            />
            <p className="text-sm text-gray-600 mt-2">
              Delivery by 6 Jul, Sunday if ordered before 11:59 AM
            </p>
            <p className="text-sm text-green-600 mt-1">Cash on Delivery available</p>
          </div>
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-4 border px-6 py-6">
          <p className="font-semibold">Product Details</p>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>{productData.description}</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit minima voluptatibus vero.</li>
          </ul>
        </div>

        {/* Review Section */}
        <div className="flex flex-col gap-4 border px-6 py-6">
          <p className="font-semibold">Reviews</p>
          <ul className="list-inside ml-5 text-gray-700 space-y-2">
            <li><strong>{productData.name}</strong></li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae.</li>
            <li><strong>AI-generated reviews coming soon...</strong></li>
          </ul>
        </div>
      </div>

      {/* Related Products */}
      <RelatedPro categories={productData.category} subcategories={productData.subCategory} />
    </>
  );
};

export default Product;
