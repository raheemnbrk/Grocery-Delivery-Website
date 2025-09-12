import { useState } from "react";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { dummyProducts, categories } from "../assets/assets";

import toast from "react-hot-toast";

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [showUserLogin, setShowUserLogin] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const [isSeller  , setIsSeller] = useState(!false)

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      cartData[itemId] += 1
    }
    else {
      cartData[itemId] = 1
    }
    setCartItems(cartData)
    toast.success("added to cart")
  }

  const updateCart = (itemId, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId] = quantity
    setCartItems(cartData)
    toast.success("added to cart")
  }

  const removeFromcart = (itemId) => {
    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      cartData[itemId] -= 1
      if (cartData[itemId] === 0) {
        delete cartData[itemId]
      }
    }
    setCartItems(cartData)
    toast.success("removed from cart.")
  }

  const navigate = useNavigate()
  const value = {
    showUserLogin,
    setShowUserLogin,
    navigate,
    cartItems, setCartItems,
    addToCart, updateCart, removeFromcart,
    dummyProducts, categories ,
    isSeller  , setIsSeller
  }
  return <AppContext.Provider value={value} >
    {children}
  </AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}