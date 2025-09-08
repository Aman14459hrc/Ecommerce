import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const Cart = () => {
  const {
    products,
    currency,
    cartItem,
    delivery_charge,
    increaseQty,
    decreaseQty,
    removeFromCart,
    navigate
  } = useContext(ShopContext);

  // Create a usable array from cartItem structure
  const cartArray = [];

  for (const itemId in cartItem) {
    for (const size in cartItem[itemId]) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        cartArray.push({
          ...product,
          size,
          quantity: cartItem[itemId][size]
        });
      }
    }
  }

  const subtotal = cartArray.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + Number(delivery_charge);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">🛒 Your Cart</h1>

      {cartArray.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cartArray.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded shadow-sm"
              >
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-24 h-28 object-cover rounded"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">Price: {currency}{item.price}</p>
                  <p className="text-sm font-semibold">
                    Total: <span className="text-orange-600">{currency}{item.price * item.quantity}</span>
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item._id, item.size)}
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item._id, item.size)}
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      <FaPlus size={12} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id, item.size)}
                      className="text-red-500 ml-4"
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>{currency}{subtotal}</span>
              </p>
              <p className="flex justify-between">
                <span>Delivery Charges:</span>
                <span>{currency}{delivery_charge}</span>
              </p>
              <hr />
              <p className="flex justify-between text-base font-bold">
                <span>Total:</span>
                <span>{currency}{total}</span>
              </p>
            </div>

            <div className="text-center mt-6">
              <button onClick={()=>navigate('/placeorder')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow-md transition-all duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
