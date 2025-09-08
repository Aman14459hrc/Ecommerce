import React from 'react'
import { Route ,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import Collection from './pages/Collection'
import Login from './pages/Login'
import Order from './pages/Order'
import Placeorder from './pages/Placeorder'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Searchbar from './components/Searchbar'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <div className='font-sans'>
<ToastContainer/>
    <Navbar/>
    <Searchbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/About' element={<About/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/collection' element={<Collection/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/order' element={<Order/>}/>
    <Route path='/placeorder' element={<Placeorder/>}/>
    <Route path='/product/:productID' element={<Product/>}/>

    </Routes>
    <Footer/>
    
    </div>
  
  )
}

export default App