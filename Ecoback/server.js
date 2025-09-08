import express from 'express';
import dotenv from 'dotenv';
import conectDB from '../Ecoback/config/db.js';
import connectCloudinary from './config/cloudnary.js';
import userRouter from './Routes/userRoutes.js';
import productRouter from './Routes/productRoute.js';
import cors from "cors"

dotenv.config();
conectDB();
connectCloudinary();

const app = express();
app.use(cors())
app.use(express.json());

// Routes
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.get("/", (req, res) => {
  res.send("get request success");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
