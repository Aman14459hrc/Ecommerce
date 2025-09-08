import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_charge = "49";
  const backendurl = import.meta.env.VITE_BACKEND_URL
  const [products,setproducts] = useState([])

  const [search, setsearch] = useState(" ");
  const [ShowSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
 

const [cartItem, setcartItem] = useState(() => {
  const storedCart = localStorage.getItem("cartItem");
  return storedCart ? JSON.parse(storedCart) : {};
});

useEffect(() => {
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
}, [cartItem]);


  // ✅ Add to Cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size!");
      return;
    }

    const cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setcartItem(cartData);
    toast.success("Item added to cart!");
  };

  // ➖ Decrease quantity
  const decreaseQty = (itemId, size) => {
    const cartData = structuredClone(cartItem);
    if (cartData[itemId] && cartData[itemId][size] > 1) {
      cartData[itemId][size] -= 1;
    } else {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
    setcartItem(cartData);
  };

  // ➕ Increase quantity
  const increaseQty = (itemId, size) => {
    const cartData = structuredClone(cartItem);
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    }
    setcartItem(cartData);
  };

  // ❌ Remove from cart
  const removeFromCart = (itemId, size) => {
    const cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
    setcartItem(cartData);
  };

  const getProductData = async ()=>{
    try {
        const response = await axios.get(backendurl + '/api/product/list')
        if(response.data.success){
          setproducts(response.data.products)

        }else{
          toast.error(response.data.message)
        }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    getProductData()
  },[])

  const value = {
    products,
    currency,
    delivery_charge,
    search,
    setsearch,
    ShowSearch,
    setShowSearch,
    addToCart,
    decreaseQty,
    increaseQty,
    removeFromCart,
    cartItem,
    navigate,
    backendurl
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
