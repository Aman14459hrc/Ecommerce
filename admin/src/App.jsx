// App.js
import React, { useEffect, useState } from 'react';
import './index.css';

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import Login from './components/Login';
import './App.css'; // CSS import
 export const backendurl = import.meta.env.VITE_URL
 console.log(backendurl)

 
import { ToastContainer, toast } from 'react-toastify';
import SingleProduct from './pages/Single';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

useEffect(()=>{
  localStorage.setItem("token",token)
},[token])
  

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="app-container">
      <ToastContainer/>
      <Navbar setToken={setToken} />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Routes>
  <Route path="/" element={<Add token={token} />} /> {/* default landing page */}
  <Route path="/add" element={<Add token={token} />} />
  <Route path="/list" element={<List token={token} />} />
  <Route path="/order" element={<Order token={token} />} />
  <Route path="/order/:id" element={<SingleProduct token={token} />} />
</Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
