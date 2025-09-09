// Login.jsx
import React, { useState } from 'react';
import '../design/login.css';
import axios from 'axios';
import { backendurl } from '../App';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendurl}/api/users/admin`, { email, password });

      if (response.data.token) {
        const token = response.data.token; // Match backend response
        setToken(token);
        localStorage.setItem("token", token);
        console.log("Login successful:", response.data, token);

        toast.success("Login successful!");
        navigate("/add"); // Redirect to /add after login
      } else {
        console.error(response.data.msg);
        toast.error(response.data.msg || "Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      toast.error("Login failed! Please check credentials or server.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password" // Fixed type
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
