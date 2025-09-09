import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Product from "../model/product.js";

// ✅ Add Product - Robust Version
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, size, bestseller } = req.body;

    // 🔹 Extract images safely
    const imageFiles = [
      req.files?.image1?.[0]?.path,
      req.files?.image2?.[0]?.path,
      req.files?.image3?.[0]?.path,
      req.files?.image4?.[0]?.path
    ].filter(Boolean); // remove nulls

    let imageURLs = [];

    // 🔹 Upload each image to Cloudinary safely
    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        try {
          const result = await cloudinary.uploader.upload(file, {
            resource_type: "image",
            timeout: 120000
          });
          imageURLs.push(result.secure_url);
        } catch (uploadError) {
          console.warn("⚠️ Failed to upload image:", file, uploadError.message);
          // Continue with other images
        }
      }
    }

    // 🔹 Build Product data
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      sizes: JSON.parse(size || "[]"), // fallback empty array
      Bestseller: bestseller === "true" ? true : false, 
      image: imageURLs,
      date: Date.now()
    };

    // 🔹 Save product
    const newProduct = new Product(productData);
    await newProduct.save();

    return res.status(201).json({ success: true, msg: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error);
    return res.status(500).json({ success: false, msg: "Failed to add product", error: error.message });
  }
};

// ✅ Other Product Controllers remain the same
const listProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("List Product Error:", error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    return res.status(200).json({ success: true, msg: "Product deleted successfully" });
  } catch (error) {
    console.error("Remove Product Error:", error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Single Product Error:", error);
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
