import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Collection from '../pages/Collection'

const Searchbar = () => {
 const {search ,setsearch ,ShowSearch ,setShowSearch} = useContext(ShopContext)
 const location = useLocation()
 const [visible , setvisible] = useState(false)
 useEffect(()=>{
    console.log(location)
if (location.pathname.includes("collection") && ShowSearch) {
 setvisible(true)
}
else{
    setvisible(false)
}

 },[location])

  return ShowSearch && visible? (
    <div className=' border-t-1 '>
        <div className=' flex justify-center align-middle items-center m-auto p-3 '>
            <input type="search" placeholder='Search' value={search} onChange={(e)=>setsearch(e.target.value)} 
            className=' border h-[5vh] w-2xl rounded-2xl p-2 cursor-pointer'
            />
            <img src={assets.cross_icon} alt="" onClick={()=>setShowSearch(false)} className=' p-1 cursor-pointer' />
        </div>

    </div>
  ): null
}

export default Searchbar