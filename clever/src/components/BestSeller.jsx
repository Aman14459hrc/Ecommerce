import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from './Tittle';
import Productitem from './Productitem';

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    console.log(products)

    const [bestSeller, setbestSeller] = useState([]);

    useEffect(() => {
        const bestproduct = products.filter((item)=>item.bestseller);
        setbestSeller(bestproduct.slice(0,5));
        console.log(bestproduct)
    }, [products]); // <-- important


    return (
        <div>
            <Tittle text1={"Best"} text2={"Seller"} />
            <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 my-8 w-[90vw]  mx-auto'>
                {
                    bestSeller.map((item, index) => (
                        <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }

            </div>


        </div>


    )
}

export default BestSeller   