import React from 'react'
import Productitem from '../components/Productitem'
import Tittle from '../components/Tittle'
import { useContext, useState } from 'react'
import { useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
const Collection = () => {

    const { products } = useContext(ShopContext);
    const [showfilter, setfilter] = useState(false)
    const [filterproduct, setfilterproduct] = useState([])
    const [category ,setcategory] = useState([])
    const [subcategory ,setsubcategory] = useState([])
    const {search ,ShowSearch} = useContext(ShopContext)
    const ToggleCategory = (e)=>{
      if (category.includes(e.target.value)) {
        setcategory(prev => prev.filter(item =>  item !== e.target.value))
      }
      else{
        setcategory(prev =>[...prev,e.target.value])
      }
    }
    const TogglesubCategory = (e)=>{
      if (subcategory.includes(e.target.value)) {
        setsubcategory(prev => prev.filter(item =>  item !== e.target.value))
      }
      else{
        setsubcategory(prev =>[...prev,e.target.value])
      }
    }

const applyfilter = () => {
  let productCopy = products.slice();
  if(search && ShowSearch){
    productCopy = productCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
  }

 if (category.length > 0) {
    productCopy = productCopy.filter(item =>
      category.includes(item.category.toLowerCase())
    );
  }

  if (subcategory.length > 0) {
    productCopy = productCopy.filter(item =>
      subcategory.includes(item.subCategory.toLowerCase())
    );
  }

  setfilterproduct(productCopy);
};


   useEffect (()=>{
applyfilter();
   },[category,subcategory, search,ShowSearch])

    useEffect(()=>{
      console.log(category)
    },[category])
    
    useEffect(()=>{
      console.log(subcategory)
    },[subcategory])


    useEffect(() => {
    setfilterproduct(products.slice(0,20))
    }, [])

    
return (
  <div className='relative flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 pl-5 border-t overflow-x-hidden'>

    {/* 🟦 Toggle Filter Button for Mobile */}
    <div className="sm:hidden flex justify-end px-4 opacity-70">
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setfilter(true)}
      >
        Show Filters
      </button>
    </div>

    {/* 🟪 Filter Sidebar */}
    {/* Hidden on mobile, visible on sm+ screens */}
    <div
      className={`${
        showfilter ? 'block' : 'hidden'
      } sm:block absolute sm:static top-0 left-0 z-10 bg-white w-3/4 sm:w-auto sm:min-w-60 h-full sm:h-auto shadow-lg sm:shadow-none p-4 sm:p-0`}
    >
      {/* Close button for mobile */}
      <div className="sm:hidden flex justify-end">
        <button
          className="text-red-500 font-bold mb-4"
          onClick={() => setfilter(false)}
        >
          ✕ Close
        </button>
      </div>

      <p className='my-2 text-xl font-semibold text-center'>Filter</p>

      {/* Category Filter */}
      <form>
        <div className='border p-4 sm:p-8 flex flex-col justify-start items-start'>
          <p className='p-3 font-medium'>Categories</p>
          <span>
            <input type="checkbox" value="men" onChange={ToggleCategory} id="mens" />
            <label htmlFor="mens" className="ml-2">Mens</label>
          </span>
          <span>
            <input type="checkbox" value="women" onChange={ToggleCategory} id="womens" />
            <label htmlFor="womens" className="ml-2">Womens</label>
          </span>
          <span>
            <input type="checkbox" value="kids" onChange={ToggleCategory} id="kids" />
            <label htmlFor="kids" className="ml-2">kids</label>
          </span>
        </div>
      </form>

      {/* Type Filter */}
      <form>
        <div className='border p-4 sm:p-8 flex flex-col justify-start items-start'>
          <p className='p-3 font-medium'>Types</p>
          <span>
            <input type="checkbox" value="topwear" onChange={TogglesubCategory} id="topwear" />
            <label htmlFor="topwear" className="ml-2">Topwear</label>
          </span>
          <span>
            <input type="checkbox" value="bottomwear" onChange={TogglesubCategory} id="bottomwear" />
            <label htmlFor="bottomwear" className="ml-2">Bottomwear</label>
          </span>
          <span>
            <input type="checkbox" value="underwear" onChange={TogglesubCategory} id="underwear" />
            <label htmlFor="underwear" className="ml-2">Underwear</label>
          </span>
        </div>
      </form>
    </div>

    {/* 🟩 Product Grid */}
    <div className='flex-1'>
      <Tittle text1="All " text2="Collection" />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 my-8 w-full px-4 sm:px-0 mx-auto'>
        {filterproduct.map((item, index) => (
          <Productitem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  </div>
);

}

export default Collection