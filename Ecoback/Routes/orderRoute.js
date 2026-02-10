import express from "express";
import { listOrders, updateOrderStatus } from "../Controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateOrderStatus);

export default orderRouter;

