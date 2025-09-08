# Admin Panel Project

A full-stack admin panel built with **React** (frontend) and **Node.js/Express** (backend), integrated with **MongoDB** for data storage and **Cloudinary** for image handling. This project allows admins to manage products, view orders, and handle users.

---

## Features

- Admin login with JWT authentication
- Protected routes for admin pages
- Add, list, and manage products
- View customer orders
- Cloud-based image storage with Cloudinary
- Responsive and modern UI

---

## Tech Stack

**Frontend:**

- React
- React Router v6
- Axios
- React Toastify (notifications)
- CSS (custom styling)

**Backend:**

- Node.js / Express.js
- MongoDB / Mongoose
- dotenv (environment variables)
- bcrypt (password hashing)
- JWT (authentication)
- Cloudinary (image upload)

---

## Installation

### Backend

1. Clone the repository:

```bash
git clone https://github.com/your-username/project-name.git
cd project-name/Ecoback
npm install
PORT=1112
MONGO_URI=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret
JWT_SECRET=your_jwt_secret
npm run dev
```
cd project-name/frontend
npm install
VITE_URL=http://localhost:1112
npm run dev


project-name/
├─ Ecoback/                  # Backend
│  ├─ config/                # Database and Cloudinary config
│  ├─ Controllers/           # API controllers
│  ├─ Models/                # Mongoose models
│  ├─ Routes/                # Express routes
│  ├─ server.js              # Entry point
├─ frontend/                 # React frontend
│  ├─ src/
│     ├─ components/         # Navbar, Sidebar, Login
│     ├─ pages/              # Add, List, Order pages
│     ├─ App.jsx
│     ├─ index.css
│     ├─ App.css



PORT=1112
MONGO_URI=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret
JWT_SECRET=your_jwt_secret
VITE_URL=http://localhost:1112
