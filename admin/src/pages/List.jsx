import React, { useEffect, useState } from 'react';
import '../design/list.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl } from '../App.jsx';

const List = ({ token }) => {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    if (!token) return; // don't fetch if token is missing

    try {
      const response = await axios.get(`${backendurl}/api/products/list`, {
        headers: { token }
      });

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.msg || "Could not fetch products.");
      }
    } catch (error) {
      console.error("Fetch Products Error:", error);
      toast.error("Network Error: Could not connect to the server.");
    }
  };

  // Remove product
  const removeProduct = async (productId) => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendurl}/api/products/remove`,
        { id: productId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.msg || "Product removed successfully.");
        setProducts(prev => prev.filter(item => item._id !== productId));
      } else {
        toast.error(response.data.msg || "Could not remove product.");
      }
    } catch (error) {
      console.error("Remove Product Error:", error);
      toast.error("Network Error: Could not connect to the server.");
    }
  };

  // Fetch products when token is available
  useEffect(() => {
    fetchProducts();
  }, [token]);

  return (
    <div className="list-add flex-col">
      <h1>All Products</h1>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {products.length === 0 && (
          <div className="list-table-format">
            <p colSpan={5}>No products available.</p>
          </div>
        )}
        {products.map(item => (
          <div key={item._id} className="list-table-format">
            <img 
              src={item.image?.[0] || 'https://via.placeholder.com/50'} 
              alt={item.name} 
              className="product-img"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <button 
              className="remove-btn" 
              onClick={() => removeProduct(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
