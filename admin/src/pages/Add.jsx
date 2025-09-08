import React, { useState } from 'react'
import { assets } from '../assets/assets'
import '../design/add.css'
import axios from "axios"
import { backendurl } from "../App.jsx"
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setimage1] = useState("")
  const [image2, setimage2] = useState("")
  const [image3, setimage3] = useState("")
  const [image4, setimage4] = useState("")

  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [category, setcategory] = useState("")
  const [subcategory, setsubcategory] = useState("")
  const [price, setprice] = useState("")
  const [size, setsize] = useState([]); // ✅ start with empty array
  const [bestseller, setbestseller] = useState(false)



const onsubmithandler = async (e) => {
  e.preventDefault();
  try {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("category", category);
    formdata.append("subcategory", subcategory);
    formdata.append("price", price);
    formdata.append("size", JSON.stringify(size)); // ✅ send as JSON array
    formdata.append("bestseller", bestseller);

    if (image1) formdata.append("image1", image1);
    if (image2) formdata.append("image2", image2);
    if (image3) formdata.append("image3", image3);
    if (image4) formdata.append("image4", image4);

    const response = await axios.post(
      backendurl + "/api/product/add",
      formdata,
      { headers: { token} }
    );

    if(response.data.success){
      toast.success(response.data.message)

       setimage1("");
                setimage2("");
                setimage3("");
                setimage4("");
                setname("");
                setdescription("");
                setcategory("men");
                setsubcategory("topwear");
                setprice("");
                setsize([]);
                setbestseller(false);
      "make all form data cleared "
    }
  else {
                // Handle errors reported by the API (e.g., validation errors)
                toast.error(response.data.msg || "Failed to add product.");
            }

    console.log("Product added successfully:", response.data);
  } catch (error) {
            // Handle network errors or server crashes
            console.error("Error adding product:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
};


  return (
    <div className="add-container">
      <form action="" onSubmit={onsubmithandler} >
        <h1>Add Item</h1>

        <div className="add-form-group">
          <p>Upload images</p>
          <div className="add-upload-area">
            <label htmlFor="image1">
              <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e) => setimage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e) => setimage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e) => setimage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e) => setimage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
          </div>
        </div>

        <div className="add-form-group">
          <p>Product Name</p>
          <input onChange={(e) => setname(e.target.value)} value={name} type="text" />
        </div>

        <div className="add-form-group">
          <p>Description</p>
          <textarea onChange={(e) => setdescription(e.target.value)} value={description} placeholder="Write content here" />
        </div>

        <div className="add-form-group">
          <p>Product category</p>
          <select onChange={(e) => setcategory(e.target.value)} value={category}>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="add-form-group">
          <p>Product Sub category</p>
          <select onChange={(e) => setsubcategory(e.target.value)} value={subcategory}>
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="underwear">Underwear</option>
          </select>
        </div>


        <div className="add-form-group">
          <p >Product Price</p>
          <input onChange={(e) => setprice(e.target.value)} value={price} type="number" placeholder="Enter product price" />
        </div>

        <p >Product Size</p>
        <div className="size-button-main">
          <div
            className={`size-buttons ${size.includes("S") ? "selected" : ""}`}
            onClick={() =>
              setsize((prev) =>
                prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"]
              )
            }
          >
            <p>S</p>
          </div>

          <div
            className={`size-buttons ${size.includes("M") ? "selected" : ""}`}
            onClick={() =>
              setsize((prev) =>
                prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"]
              )
            }
          >
            <p>M</p>
          </div>

          <div
            className={`size-buttons ${size.includes("L") ? "selected" : ""}`}
            onClick={() =>
              setsize((prev) =>
                prev.includes("L") ? prev.filter((item) => item !== "L") : [...prev, "L"]
              )
            }
          >
            <p>L</p>
          </div>

          <div
            className={`size-buttons ${size.includes("XL") ? "selected" : ""}`}
            onClick={() =>
              setsize((prev) =>
                prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"]
              )
            }
          >
            <p>XL</p>
          </div>

          <div
            className={`size-buttons ${size.includes("XXL") ? "selected" : ""}`}
            onClick={() =>
              setsize((prev) =>
                prev.includes("XXL") ? prev.filter((item) => item !== "XXL") : [...prev, "XXL"]
              )
            }
          >
            <p>XXL</p>
          </div>
        </div>


        <div className="bestseller-container">
          <input onChange={() => setbestseller(prev => !prev)} checked={bestseller} type="checkbox" name="" id="bestseller" />
          <label htmlFor="bestseller">Add to BestSeller</label>
        </div>

        <div>
          <button type="submit" className="add-item-btn">Add Item</button>
        </div>

      </form>
    </div>

  )
}

export default Add