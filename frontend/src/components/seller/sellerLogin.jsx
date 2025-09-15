import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/appContext"
import toast from "react-hot-toast"

export default function SellerLogin() {
    const { isSeller, setIsSeller, navigate, axios } = useContext(AppContext)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleLogin = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post('/api/seller/login', { email, password })
            if (data.success) {
                setIsSeller(true)
                navigate("/seller")
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        if (isSeller) {
            navigate("/seller")
        }
    }, [isSeller])

    return (
        <form className="min-h-screen flex items-center text-sm text-gray-600 justify-center"  onSubmit={handleLogin} >
            <div className="flex flex-col gap-5 px-8 py-12 min-w-80 md:min-w-80 rounded-lg border border-gray-200 shadow-xl" >
                <p className="text-2xl font-medium capitalize" >
                    <span className="text-primary" >seller</span>
                    <span>login</span>
                </p>
                <div className="w-full" >
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="border border-gray-200 p-2 mt-1 outline-primary rounded-md w-full" />
                </div>
                <div className="w-full" >
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" className="border border-gray-200 p-2 mt-1 outline-primary rounded-md w-full" />
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer w-full" >login</button>
            </div>
        </form>
    )
}