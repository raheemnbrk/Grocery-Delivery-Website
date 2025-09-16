import { MdLibraryAdd } from "react-icons/md";
import { LuListCheck } from "react-icons/lu";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import toast from "react-hot-toast";

export default function Layout() {
    const sidebarLinks = [
        { name: "add product", path: "/seller", icon: <MdLibraryAdd /> },
        { name: "product list", path: "/seller/product-list", icon: <LuListCheck /> },
        { name: "orders", path: "/seller/orders", icon: <AiOutlineDeliveredProcedure /> },
    ];

    const { axios, setIsSeller, navigate } = useContext(AppContext)

    const logout = async () => {
        try {
            const { data } = await axios.post('/api/seller/logout')
            if (data.success) {
                toast.success(data.message)
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
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300 w-full">
                <Link to={"/"}>
                    <img className="h-9" src={assets.logo} />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
                </div>
            </div>

            <div className="flex" >
                <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col">
                    {sidebarLinks.map((item, index) => (
                        <NavLink to={item.path} key={index} end={item.path === "/seller"}
                            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-text-primary text-primary"
                                    : "hover:bg-gray-100/90 border-white0"
                                }`
                            }
                        >
                            {item.icon}
                            <p className="md:block hidden text-center capitalize">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <Outlet />
            </div>
        </>
    )
}