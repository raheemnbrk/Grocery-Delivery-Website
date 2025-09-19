import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/appContext";
import toast from "react-hot-toast";

export default function AddAddress() {
    const [addressData, setAddressData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phoneNumber: ''
    })

    const { axios, user, navigate } = useContext(AppContext)

    const handleChange = (name, value) => {
        setAddressData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/address/add', { addressData })
            if (data.success) {
                toast.success(data.message)
                navigate('/cart')
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
        if (!user) {
            navigate('/cart')
        }
    }, [])

    return (
        <div className="flex flex-col space-y-6" >
            <h1 className="text-2xl font-medium capitalize text-gray-600" >
                add shipping <span className="text-primary" >address</span>
            </h1>
            <div className="flex flex-col space-y-8 md:flex-row justify-between" >
                <div>
                    <form action="" onSubmit={handleSubmit} className="flex flex-col space-y-4" >
                        <div className="flex flex-col md:flex-row gap-4">
                            <input type="text" onChange={(e) => handleChange("firstName", e.target.value)} placeholder="first name" className="px-4 py-2 rounded-md border-1 border-gray-300 outline-primary" />
                            <input type="text" onChange={(e) => handleChange("lastName", e.target.value)} placeholder="last name" className="px-4 py-2 rounded-md border-1 border-gray-300 outline-primary" />
                        </div>
                        <input type="email" onChange={(e) => handleChange("email", e.target.value)} placeholder="email address" className="px-4 py-2 rounded-md border-1 border-gray-300 outline-primary" />
                        <input type="text" onChange={(e) => handleChange("street", e.target.value)} placeholder="street" className="px-4 py-2 rounded-md border-1 border-gray-300 outline-primary" />
                        <div className="flex flex-col md:flex-row gap-4">
                            <input type="text" onChange={(e) => handleChange("city", e.target.value)} placeholder="city" className="px-4 py-2 rounded-md border-1 border-gray-300 outline-primary" />
                            <input type="text" onChange={(e) => handleChange("state", e.target.value)} placeholder="state" className="px-4 py-2 rounded-md border-1 border-gray-300 outline-primary" />
                        </div>
                        <div className="flex flex-col md:flex-row gap-4" >
                            <input type="number" onChange={(e) => handleChange("zipCode", e.target.value)} placeholder="zip code" className="px-4 py-2 rounded-md border-1 border-gray-300 outline-primary" />
                            <input type="text" onChange={(e) => handleChange("country", e.target.value)} placeholder="country" className="px-4 py-2 rounded-md border-1 border-gray-300 outline-primary" />
                        </div>
                        <input type="text" onChange={(e) => handleChange("phoneNumber", e.target.value)} placeholder="phone number" className="px-4 py-2 rounded-md border-1 border-gray-300 outline-primary" />
                        <button className="bg-primary hover:bg-primary-dull text-white cursor-pointer py-2 rounded-md capitalize" >save address</button>
                    </form>
                </div>
                <div>
                    <img src={assets.add_address_iamge} alt="" />
                </div>
            </div>
        </div>
    )
}