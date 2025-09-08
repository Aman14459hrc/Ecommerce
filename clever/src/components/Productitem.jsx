import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
const Productitem = ({id,image,name,price}) => {
    const {currency} = useContext(ShopContext)
  return (

    <Link to={`/product/${id}`}>
    <div className=' overflow-hidden rounded-lg shadow-md'>
        <img className='transition ease-in-out duration-300 hover:scale-105' src={image[0]} alt="Unable to load data" />
    </div>
     <div className="mt-2 px-2">
    <p className="text-lg font-semibold text-gray-800 group-hover:text-green-600">{name}</p>
    <p className="text-md text-gray-600">{currency}{price +2000}</p>
  </div>

    </Link>

    
  )
}

export default Productitem  