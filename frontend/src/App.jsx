import NavBar from "./components/navbar"
import Home from "./pages/home"

import { Routes, Route, useLocation } from "react-router-dom"

import { Toaster } from 'react-hot-toast'
import Footer from "./components/footer"

import { useContext } from "react"
import { AppContext } from "./context/appContext"
import LoginForm from "./components/loginForm"
import AllProducts from "./pages/allProducts"
import ProductsCategory from "./pages/productsCategory"
import Product from "./pages/product"
import Cart from "./pages/cart"
import AddAddress from "./pages/addAddress"
import MyOrders from "./pages/myOrders"
import SellerLogin from "./components/seller/sellerLogin"
import Layout from "./pages/seller/sellerLayout"
import AddProduct from "./pages/seller/addProducts"
import ProductList from "./pages/seller/productList"
import Orders from "./pages/seller/orders"
import Loading from "./components/loading"

export default function App() {
  const sellerPath = useLocation().pathname.includes("seller")
  const { showUserLogin, isSeller } = useContext(AppContext)
  return (
    <div>
      {sellerPath ? null : <NavBar />}
      {showUserLogin && <LoginForm />}
      <Toaster />
      <div className={sellerPath ? "" : `px-6 md:px-16 lg:px-24 xl:px-32 py-10`} >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/:category" element={<ProductsCategory />} />
          <Route path="products/:category/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="add-address" element={<AddAddress />} />
          <Route path="myOrders" element={<MyOrders />} />
          <Route path="loading" element={<Loading/>} />
          <Route path="seller" element={isSeller ? <Layout /> : <SellerLogin />} >
            <Route index element={<AddProduct />} />
            <Route path="product-list" element={<ProductList/>} />
            <Route path="orders" element={<Orders/>} />
          </Route>
        </Routes>
      </div>

      {sellerPath ? null : <Footer />}

    </div>
  )
}