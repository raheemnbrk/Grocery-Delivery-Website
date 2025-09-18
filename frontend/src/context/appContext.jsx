import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

import { categories } from "../assets/assets";

import toast from "react-hot-toast";

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [showUserLogin, setShowUserLogin] = useState(false)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [isSeller, setIsSeller] = useState(false)
  const [user, setUser] = useState(null)

  const getProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/productList')
      if (data.success) {
        setProducts(data.products)
      }
      else {
        toast.err(err.message)
      }
    }
    catch (err) {
      toast.error(err.message)
    }
  }

  const addToCart = (itemId) => {
    let cartData = [...cartItems]
    const existingItem = cartData.find(item => item.product === itemId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartData.push({ product: itemId, quantity: 1 });
    }

    setCartItems(cartData);
    toast.success("Added to cart")
  }

  const updateCart = (itemId, quantity) => {
    let cartData = [...cartItems];

    const existingItem = cartData.find(item => item.product === itemId);
    if (existingItem) {
      existingItem.quantity = quantity;
    }

    setCartItems(cartData);
    toast.success("Cart updated");
  }

  const removeFromCart = (itemId) => {
    let cartData = [...cartItems];

    const existingItemIndex = cartData.findIndex(item => item.product === itemId);

    if (existingItemIndex !== -1) {
      if (cartData[existingItemIndex].quantity > 1) {
        cartData[existingItemIndex].quantity -= 1
      } else {
        cartData.splice(existingItemIndex, 1)
      }
    }

    setCartItems(cartData)
    toast.success("Removed from cart")
  }

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get('/api/seller/sellerIsAuth')
      if (data.success) {
        setIsSeller(true)
      }
      else {
        setIsSeller(false)
      }
    }
    catch (err) {
      setIsSeller(false)
    }
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/isAuth')
      if (data.success) {
        setUser(data.user)
        setCartItems(data.user.cartItems)
      }
    }
    catch (err) {
      toast(err.message)
    }
  }

  useEffect(() => {
    fetchSeller()
    getProducts()
    fetchUser()
  }, [])

  useEffect(() => {
    const syncCart = async () => {
      try {
        const { data } = await axios.post('/api/cart/update', { cartItems })
        if (!data.success) {
          toast.error(data.message)
        }
      } catch (err) {
        toast.error(err.message)
      }
    }

    if (user) {
      syncCart()
    }
  }, [cartItems])

  const navigate = useNavigate()
  const value = {
    showUserLogin,
    setShowUserLogin,
    navigate,
    cartItems, setCartItems,
    addToCart, updateCart, removeFromCart,
    products, getProducts, categories,
    isSeller, setIsSeller, axios, user, setUser
  }
  return <AppContext.Provider value={value} >
    {children}
  </AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}