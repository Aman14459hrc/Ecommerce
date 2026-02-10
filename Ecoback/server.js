import express from 'express';
import dotenv from 'dotenv';
import conectDB from '../Ecoback/config/db.js';
import connectCloudinary from './config/cloudnary.js';
import userRouter from './Routes/userRoutes.js';
import productRouter from './Routes/productRoute.js';
import orderRouter from './Routes/orderRoute.js';
import cors from "cors"

dotenv.config();
connectCloudinary();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL?.split(',') || '*' }))
app.use(express.json());

// Routes
app.use('/api/products', productRouter);
app.use('/api/product', productRouter); // backwards compatibility for old frontend routes
app.use('/api/users', userRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => {
  res.send("get request success");
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const dbConnected = await conectDB();
  if (!dbConnected) {
    console.warn("Starting server without database connection. Check MONGO_URI and MongoDB service.");
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
