import NavBar from "./components/navbar"
import Home from "./pages/home"

import { Routes, Route } from "react-router-dom"

import { Toaster } from 'react-hot-toast'
import Footer from "./components/footer"

import { useContext } from "react"
import { AppContext } from "./context/appContext"
import LoginForm from "./components/loginForm"

export default function App() {
  const {showUserLogin} = useContext(AppContext)
  return (
    <div>
      <NavBar />
      {showUserLogin && <LoginForm/>}
      <Toaster />
      <div className="px-6 md:px-16 lg:px-24 xl:px-32" >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      <Footer />

    </div>
  )
}