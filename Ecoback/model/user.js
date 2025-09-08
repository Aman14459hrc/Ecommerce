import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  cartData: { type:Object , default:{}},
  address: { type: String },
  phone: { type: String }
}, { timestamps: true },{minimize:false});

export default mongoose.model("User", userSchema);
