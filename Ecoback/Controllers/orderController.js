import Order from "../model/order.js";

const listOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    const normalized = orders.map((order) => ({
      _id: order._id,
      items: (order.orderItems || []).map((item) => ({
        name: item?.name || "Product",
        quantity: item?.quantity || 0,
      })),
      address: {
        firstName: "",
        lastName: "",
        street: order.shippingAddress?.address || "",
        city: order.shippingAddress?.city || "",
        state: "",
        zipcode: order.shippingAddress?.postalCode || "",
        phone: "",
      },
      amount: order.totalPrice || 0,
      status: order.isDelivered ? "Delivered" : "Food Processing",
    }));

    return res.status(200).json({ success: true, data: normalized });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, msg: "orderId and status are required" });
    }

    const isDelivered = status === "Delivered";
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        isDelivered,
        deliveredAt: isDelivered ? new Date() : undefined,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, msg: "Order not found" });
    }

    return res.status(200).json({ success: true, msg: "Order status updated" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export { listOrders, updateOrderStatus };

