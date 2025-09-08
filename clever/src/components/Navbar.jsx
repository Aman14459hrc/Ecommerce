import React, { useContext } from 'react'
import {assets} from "../assets/assets"
import { useState } from 'react';
import {Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';




const Navbar = () => {
  const {ShowSearch ,setShowSearch } = useContext(ShopContext) 
  const navigate = useNavigate();
const [visible ,setvisible] = useState(false)
  return (
    <nav className='w-full flex items-center justify-between px-8 py-3 bg-white shadow-md'>
      {/* Logo */}
      <div className='flex items-center'>
       <Link to='/'> <img src={assets.logo} alt='Logo' className='h-8 w-auto' /> </Link>
      </div>

      {/* Nav Links */}
      <ul className='hidden sm:flex  gap-8  text-sm text-gray-700 '>
        <li>

        <NavLink to='/' className='flex flex-col items-center gap-1  hover:text-black'>
          <p className=''>HOME</p>
          <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        </li>
<li>

        <NavLink to='/collection' className='flex flex-col items-center gap-1  hover:text-black'>
          <p>COLLECTION</p>
          <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
</li>
<li>

        <NavLink to='/about' className='flex flex-col items-center gap-1  hover:text-black'>
          <p>ABOUT</p>
          <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
</li>
  <li>
     <NavLink to='/contact' className='flex flex-col items-center gap-1  hover:text-black'>
          <p>CONTACT</p>
          <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
    </li>     
      </ul>

      {/* Right Icons */}
      <div className='flex items-center gap-4 text-gray-700 text-sm'>
     <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' onClick={()=>setShowSearch(true)} />
     <Link to='/cart'>
     <img src={assets.cart_icon} alt="" className='w-5 cursor-pointer' />
     </Link>
     <div className='group relative'>
     <img src={assets.profile_icon} alt=""   className='w-5 cursor-pointer' />
     <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
        <div className=' flex flex-col gap-2 w-36 px-5 bg-slate-200 text-gray-500 rounded'>
            <p  className='cursor-pointer hover:text-black'>My profile</p>
            <p className='cursor-pointer hover:text-black'>Product</p>
           {/* <Link to="/Order"> */}
            <p onClick={()=>navigate('/order')} className='cursor-pointer hover:text-black'>Order</p>
           {/* </Link> */}

        </div>
     </div>

     </div>
      <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      {/* side menu for small screns  */}
<div className= {`absolute left-0 transition-all top-0 bottom-0 overflow-hidden bg-amber-50 ${visible ? `w-full`:`w-0`}`}>
  <div className=' flex flex-col text-gray-600 cursor-pointer '>
    <div onClick={()=>setvisible(false)} className=' flex p-2 cursor-pointer'>
      <img className='h-5 rotate-180 pl-3'  src={assets.dropdown_icon} alt="drop down" />
        <p>Back</p>
    </div>
    <NavLink onClick={()=>setvisible(false)} className=" items-center pl-5"  to="/">Home</NavLink>
    <hr className=' bg-gray-600  opacity-[0.2] ' />
    <NavLink onClick={()=>setvisible(false)} className="py-2 items-center pl-5" to="/About">About</NavLink>
    <hr  className=' bg-gray-600  opacity-[0.2]'/>
    <NavLink onClick={()=>setvisible(false)} className="py-2 items-center pl-5" to="/Collection">Collection</NavLink>
    <hr className=' bg-gray-600  opacity-[0.2]  '/>
    <NavLink onClick={()=>setvisible(false)} className="py-2 items-center pl-5" to="/contact">Contact</NavLink>
    <hr className=' bg-gray-600  opacity-[0.2] ' />
  </div>
</div>



    </nav>
  );
};

export default Navbar;
