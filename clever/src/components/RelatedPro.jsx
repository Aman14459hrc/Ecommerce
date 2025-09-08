import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from './Tittle';
import Productitem from "../components/Productitem"

const RelatedPro = ({categories,subcategories}) => {
    const { products } = useContext(ShopContext);
    const [related ,setrelated] = useState([]);

    useEffect(() => {
      if (products.length > 0 ) {
        let productCopy = products.slice()
       productCopy = productCopy.filter(
  (item) => item.category?.toLowerCase().trim() === categories?.toLowerCase().trim()
)

productCopy = productCopy.filter(
  (item) => item.subCategory?.toLowerCase().trim() === subcategories?.toLowerCase().trim()
)

        setrelated(productCopy.slice())
      }
    }, [products])

    

  return (
    <div className=' my-24'>
        <div className=' text-center text-3xl py-2'>
       <Tittle text1={"Related "} text2={"products "} />

        </div>
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-[90vw] m-auto gap-y-6'>
{related.map((item, index) => 
    <Productitem id={item._id} image={item.image} name={item.name} price={item.price} key={index}/>
)}
        </div>
        
    </div>
  )
}

export default RelatedPro       