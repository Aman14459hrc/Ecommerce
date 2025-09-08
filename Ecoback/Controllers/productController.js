import multer from "multer"
import {v2 as cloudinary} from "cloudinary"
import Product from "../model/product.js"
//function for add product 

const addProduct = async (req,res)=>{
    try {
        
const { name, description, price, category, subcategory, size, bestseller } = req.body;

     const image1 = req.files?.image1?.[0]?.path || null;
    const image2 = req.files?.image2?.[0]?.path || null;
    const image3 = req.files?.image3?.[0]?.path || null;
    const image4 = req.files?.image4?.[0]?.path || null;
        console.log(name, description , price , category ,subcategory ,size ,bestseller)
        console.log(image1)
        console.log(image2)
        console.log(image3)
        console.log(image4)

          const images = [image1, image2, image3, image4].filter(Boolean); // remove nulls
        let imageURL = await Promise.all(
            images.map(async (item )=>{
                let result = await cloudinary.uploader.upload(item,{resource_type : "image",
                  timeout: 120000
                })
                return result.secure_url
            })
        )
console.log(imageURL);

   const Productdata = {
      name,
      description,
      price:Number(price),
      category,
      subcategory,
      sizes: JSON.parse(size),
      Bestseller: bestseller === "true"?"true":"false", // since req.body sends strings
      image: imageURL,
      date:Date.now()
    }
   const newProduct = new Product(Productdata);
await newProduct.save()
        res.json({success: "true " ,msg  : "product added"})
    } catch (error) {
        console.log(error);
        res.json({msg:error.message})
        
        
    }
}



    const listProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

    


const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("remove logger" , req.body)
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    res.status(200).json({ success: true, msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


const singleProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export {addProduct , listProduct ,removeProduct ,singleProduct }