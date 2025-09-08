import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import '../design/sidebar.css'; // Make sure path is correct

const Sidebar = () => {
    return (
        <div className="sidebar">
            <NavLink to="/add">
                <img src={assets.add_icon} alt="Add" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to="/list">
                <img src={assets.order_icon} alt="List" />
                <p>List Items</p>
            </NavLink>
            <NavLink to="/order">
                <img src={assets.order_icon} alt="Order" />
                <p>Order</p>
            </NavLink>
        </div>
    );
};

export default Sidebar;
