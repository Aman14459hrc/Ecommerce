import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // brand: { type: String },
  category: { type: String , required: true},
  subcategory: { type: String , required: true},
  description: { type: String, required :true  },
  sizes: { type: Array, required :true  },
  price: { type: Number, required: true },
  // countInStock: { type: Number, default: 0 },
  image: { type: Array , required: true }, // cloudinary URL or local
  Bestseller: { type: Boolean },
  // rating: { type: Number, default: 0 },
  date:{type: Number},
  // numReviews: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
