import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from './Tittle';
import Collection from '../pages/Collection';
import Productitem from './Productitem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestproduct ,setlatestproduct] = useState([])

  useEffect(() => {
  setlatestproduct(products.slice(0,20))
  }, [])
  
  
  return (
    <div className=' my-8'>
      <Tittle text1={"Latest "} text2={"Collection"} />

  {/*  Rendering the products */}
      <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 my-8 w-[90vw]  mx-auto'>
        {
        latestproduct.map((item,index)=>(
          <Productitem key={index} id ={item._id} image ={item.image} name={item.name} price={item.price}/>
        ))
      }
      </div>
    </div>
  )
}

export default LatestCollection 