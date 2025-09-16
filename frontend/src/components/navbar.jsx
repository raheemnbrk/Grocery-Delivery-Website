import { useContext, useState } from "react"
import { Link } from 'react-router-dom'
import { assets } from "../assets/assets"
import { AppContext } from "../context/appContext"
import toast from "react-hot-toast"

export default function NavBar() {
    const [open, setOpen] = useState(false)
    const { setShowUserLogin, navigate, user, setUser, axios } = useContext(AppContext)

    const logOut = async () => {
        try {
            const { data } = await axios.post('/api/user/logout')
            if (data.success) {
                toast.success(data.message)
                setUser(null)
                navigate('/')
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <Link to={"/"} onClick={() => setOpen(false)} >
                <img src={assets.logo} alt="logo" className="h-9" />
            </Link>

            <div className="hidden sm:flex items-center gap-6">
                <Link to={"/"}>Home</Link>
                <Link to={"products"} >All Products</Link>
                <Link to={"contact"}>Contact</Link>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="search icon" className="w-4 h-4" />
                </div>

                <Link to={"cart"} >
                    <div className="relative cursor-pointer">
                        <img src={assets.cart_icon} alt="cart" className="w-6 opacity-80" />
                        <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">3</button>
                    </div>
                </Link>

                {
                    !user ? (
                        <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                            login
                        </button>
                    ) : (
                        <div className="relative group cursor-pointer" >
                            <img src={assets.profile_icon} alt="profile" className="w-8" />
                            <ul className="hidden group-hover:block absolute top-8 left-0 right-0 shadow bg-white z-40 border border-gray-200 py-2.5 w-30 rounded-md text-sm transition-all duration-300 " >
                                <Link to={"orders"} ><li className="capitalize py-1.5 px-4 w-full cursor-pointer hover:bg-primary/10" >my orders</li></Link>
                                <li onClick={logOut} className="capitalize py-1.5 px-4 w-full cursor-pointer hover:bg-primary/10" >logout</li>
                            </ul>
                        </div>
                    )
                }
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                <img src={assets.menu_icon} alt="menu" />
            </button>

            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-40`}>
                <Link to={"/"} onClick={() => setOpen(false)} className="block">Home</Link>
                <Link to={"products"} onClick={() => setOpen(false)} className="block">All Products</Link>
                {user && (<Link to={"orders"} onClick={() => setOpen(false)} className="block">My Orders</Link>)}
                <Link to={"contact"} onClick={() => setOpen(false)} className="block">Contact</Link>
                {
                    !user ?
                        (<button onClick={() => {
                            setOpen(false)
                            setShowUserLogin(true)
                        }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>) :
                        (
                            <button onClick={() => {
                                setOpen(false)
                                logOut()
                            }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                                logout
                            </button>
                        )
                }
            </div>

        </nav>
    )
}