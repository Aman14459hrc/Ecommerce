import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For getting product ID from URL
import axios from "axios";
import { toast } from "react-toastify";
import { backendurl } from "../App.jsx";
import "../design/single.css"; // Create your CSS file

const SingleProduct = ({ token }) => {
  const { id } = useParams(); // Assuming URL is like /product/:id
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendurl}/api/product/single`, {
        headers: { token },
        params: { id } // pass id as query parameter
      });

      if (response.data.success) {
        setProduct(response.data.product);
      } else {
        toast.error(response.data.msg || "Product not found");
      }
    } catch (error) {
      console.error("Fetch Product Error:", error);
      toast.error("Network Error: Could not fetch product");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async () => {
    try {
      const response = await axios.post(
        `${backendurl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.msg || "Product removed successfully");
        navigate("/products"); // go back to products list
      } else {
        toast.error(response.data.msg || "Failed to remove product");
      }
    } catch (error) {
      console.error("Remove Product Error:", error);
      toast.error("Network Error: Could not remove product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id, token]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="single-product-container">
      <h1>{product.name}</h1>
      <div className="single-product-images">
        {product.image && product.image.length > 0
          ? product.image.map((img, index) => (
              <img key={index} src={img} alt={`Product ${index}`} />
            ))
          : <p>No images available</p>
        }
      </div>
      <p><b>Description:</b> {product.description}</p>
      <p><b>Category:</b> {product.category} / {product.subcategory}</p>
      <p><b>Price:</b> ₹{product.price}</p>
      <p><b>Sizes:</b> {product.sizes ? product.sizes.join(", ") : "N/A"}</p>
      <p><b>Bestseller:</b> {product.Bestseller ? "Yes" : "No"}</p>
      <div className="single-product-actions">
        <button onClick={removeProduct} className="remove-btn">Remove Product</button>
      </div>
    </div>
  );
};

export default SingleProduct;
