import React, { useState } from 'react';
import { assets } from '../assets/assets';
import '../design/add.css';
import axios from "axios";
import { backendurl } from "../App.jsx";
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [images, setImages] = useState({ image1: null, image2: null, image3: null, image4: null });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("men");
  const [subcategory, setSubcategory] = useState("topwear");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState([]); // array of selected sizes
  const [bestseller, setBestseller] = useState(false);

  const handleImageChange = (e, key) => {
    setImages(prev => ({ ...prev, [key]: e.target.files[0] }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("price", price);
      formData.append("size", JSON.stringify(size));
      formData.append("bestseller", bestseller);

      // append only if file exists
      Object.keys(images).forEach(key => {
        if (images[key]) formData.append(key, images[key]);
      });

      const response = await axios.post(
        `${backendurl}/api/products/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        // Clear form
        setImages({ image1: null, image2: null, image3: null, image4: null });
        setName("");
        setDescription("");
        setCategory("men");
        setSubcategory("topwear");
        setPrice("");
        setSize([]);
        setBestseller(false);
      } else {
        toast.error(response.data.msg || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const toggleSize = (s) => {
    setSize(prev => prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]);
  };

  const renderImagePreview = (img) => {
    return img instanceof File ? URL.createObjectURL(img) : assets.upload_area;
  };

  return (
    <div className="add-container">
      <form onSubmit={onSubmitHandler}>
        <h1>Add Item</h1>

        <div className="add-form-group">
          <p>Upload images</p>
          <div className="add-upload-area">
            {["image1", "image2", "image3", "image4"].map((key) => (
              <label htmlFor={key} key={key}>
                <img src={renderImagePreview(images[key])} alt="" />
                <input type="file" id={key} hidden onChange={(e) => handleImageChange(e, key)} />
              </label>
            ))}
          </div>
        </div>

        <div className="add-form-group">
          <p>Product Name</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="add-form-group">
          <p>Description</p>
          <textarea placeholder="Write content here" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="add-form-group">
          <p>Product Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="add-form-group">
          <p>Product Subcategory</p>
          <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="underwear">Underwear</option>
          </select>
        </div>

        <div className="add-form-group">
          <p>Product Price</p>
          <input type="number" placeholder="Enter product price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <p>Product Size</p>
        <div className="size-button-main">
          {["S", "M", "L", "XL", "XXL"].map(s => (
            <div
              key={s}
              className={`size-buttons ${size.includes(s) ? "selected" : ""}`}
              onClick={() => toggleSize(s)}
            >
              <p>{s}</p>
            </div>
          ))}
        </div>

        <div className="bestseller-container">
          <input type="checkbox" id="bestseller" checked={bestseller} onChange={() => setBestseller(prev => !prev)} />
          <label htmlFor="bestseller">Add to BestSeller</label>
        </div>

        <div>
          <button type="submit" className="add-item-btn">Add Item</button>
        </div>

      </form>
    </div>
  );
};

export default Add;
