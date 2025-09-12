import { useContext, useEffect } from "react"
import { AppContext } from "../../context/appContext"

export default function SellerLogin() {
    const { isSeller, setIsSeller, navigate } = useContext(AppContext)
    useEffect(() => {
        if (isSeller) {
            navigate("/seller")
        }
    }, [isSeller])
    return (
        <form className="min-h-screen flex items-center text-sm text-gray-600 justify-center" >
            <div className="flex flex-col gap-5 px-8 py-12 min-w-80 md:min-w-80 rounded-lg border border-gray-200 shadow-xl" >
                <p className="text-2xl font-medium capitalize" >
                    <span className="text-primary" >seller</span>
                    <span>login</span>
                </p>
                <div className="w-full" >
                    <p>Email</p>
                    <input type="email" placeholder="enter your email" className="border border-gray-200 p-2 mt-1 outline-primary rounded-md w-full" />
                </div>
                <div className="w-full" >
                    <p>Password</p>
                    <input type="password" placeholder="enter your password" className="border border-gray-200 p-2 mt-1 outline-primary rounded-md w-full" />
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer w-full" >login</button>
            </div>
        </form>
    )
}