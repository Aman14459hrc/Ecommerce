import React, { useEffect, useState } from 'react';
import '../design/order.css'; // We will create this CSS file next
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl } from '../App.jsx';
import { assets } from '../assets/assets'; // Assuming you have a parcel icon in your assets

const Orders = ({ token }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        if (!token) return;
        try {
            const response = await axios.get(`${backendurl}/api/order/list`, {
                headers: { token }
            });
            if (response.data.success) {
                setOrders(response.data.data);
            } else {
                toast.error("Error: Could not fetch orders.");
            }
        } catch (error) {
            toast.error("Network Error: Could not connect to the server.");
        }
    };

    const statusHandler = async (event, orderId) => {
        const newStatus = event.target.value;
        try {
            const response = await axios.post(`${backendurl}/api/order/status`, 
                { orderId, status: newStatus },
                { headers: { token } }
            );

            if (response.data.success) {
                // Update the status locally to reflect the change immediately
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
                toast.success("Order status updated successfully.");
            } else {
                toast.error("Error: Could not update status.");
            }
        } catch (error) {
            toast.error("Network Error: Could not update status.");
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [token]);

    return (
        <div className='order-add'>
            <h1>Order Page</h1>
            <div className="order-list">
                {orders.map((order) => (
                    <div key={order._id} className='order-item'>
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                        <div>
                            <p className='order-item-food'>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return `${item.name} x ${item.quantity}`;
                                    } else {
                                        return `${item.name} x ${item.quantity}, `;
                                    }
                                })}
                            </p>
                            <p className='order-item-name'>
                                {order.address.firstName} {order.address.lastName}
                            </p>
                            <div className='order-item-address'>
                                <p>{order.address.street},</p>
                                <p>{order.address.city}, {order.address.state}, {order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items: {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;