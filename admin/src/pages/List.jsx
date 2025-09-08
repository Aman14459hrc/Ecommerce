import React, { useEffect, useState } from 'react';
import '../design/list.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl } from '../App.jsx';

// ✅ FIX 1: Accept the 'token' as a prop here
const List = ({ token }) => {
    const [list, setList] = useState([]);

    // Function to fetch the list of all products from the database
    const fetchList = async () => {
        // Now 'token' will have the correct value from the props
        if (!token) {
            // Don't make a request if there's no token
            return;
        }
        try {
            const response = await axios.get(`${backendurl}/api/product/list`, {
                headers: { token }
            });
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error("Error: Could not fetch the product list.");
            }
        } catch (error) {
            toast.error("Network Error: Could not connect to the server.");
        }
    };

    // Function to remove a product
    const removeProduct = async (productId) => {
        try {
            const payload = { id: productId };
            // ✅ FIX 2: Add headers with the token to the remove request
            const response = await axios.post(`${backendurl}/api/product/remove`, payload, {
                headers: { token }
            });

            if (response.data.success) {
                toast.success(response.data.msg || "Product removed successfully.");
                setList(prev => prev.filter(item => item._id !== productId));
            } else {
                toast.error("Error: Could not remove the product.");
            }
        } catch (error) {
            toast.error("Network Error: Could not connect to the server.");
        }
    };

    // useEffect now depends on the token. It will run fetchList when the token becomes available.
    useEffect(() => {
        fetchList();
    }, [token]);

    return (
        <div className='list-add flex-col'>
            <h1>All Products List</h1>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={item._id} className='list-table-format'>
                            <img src={item.image[0]} alt="Product Image" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p onClick={() => removeProduct(item._id)} className='cursor'>X</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default List;