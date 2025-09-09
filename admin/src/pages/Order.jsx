import React, { useEffect, useState } from 'react';
import '../design/order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl } from '../App.jsx';
import { assets } from '../assets/assets'; // Make sure parcel_icon exists

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from backend
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${backendurl}/api/order/list`, {
        headers: { token }
      });

      if (response.data.success) {
        setOrders(response.data.data || []);
      } else {
        toast.error(response.data.msg || "Could not fetch orders.");
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      toast.error("Network Error: Could not connect to the server.");
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const response = await axios.post(
        `${backendurl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        // Update status locally
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated successfully.");
      } else {
        toast.error(response.data.msg || "Could not update status.");
      }
    } catch (error) {
      console.error("Update Order Status Error:", error);
      toast.error("Network Error: Could not update status.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="order-add">
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <div key={order._id} className="order-item">
              <img
                src={assets.parcel_icon || 'https://via.placeholder.com/50'}
                alt="Parcel Icon"
                className="order-icon"
              />
              <div className="order-details">
                <p className="order-item-food">
                  {order.items.map((item, index) =>
                    index === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  )}
                </p>
                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>₹{order.amount}</p>
              <select
                onChange={event => statusHandler(event, order._id)}
                value={order.status || "Food Processing"}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
