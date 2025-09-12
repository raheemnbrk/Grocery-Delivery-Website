import { useState } from "react";
import { assets } from "../assets/assets";

export default function AddAddress() {
    const [address , setAddress] = useState({

    })
    return (
        <div className="flex flex-col space-y-6" >
            <h1 className="text-2xl font-medium capitalize text-gray-600" >
                add shipping <span className="text-primary" >address</span>
            </h1>
            <div className="flex flex-col space-y-8 md:flex-row justify-between" >
            <div>
                <form action="" className="flex flex-col space-y-4" >
                    <div className="flex flex-col md:flex-row gap-4">
                        <input type="text" placeholder="first name" className="px-4 py-2 rounded-md border-1 border-gray-300" />
                        <input type="text" placeholder="last name" className="px-4 py-2 rounded-md border-1 border-gray-300" />
                    </div>
                    <input type="email" placeholder="email address" className="px-4 py-2 rounded-md border-1 border-gray-300" />
                    <input type="text" placeholder="street"  className="px-4 py-2 rounded-md border-1 border-gray-300"/>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input type="text" placeholder="city" className="px-4 py-2 rounded-md border-1 border-gray-300" />
                        <input type="text" placeholder="state" className="px-4 py-2 rounded-md border-1 border-gray-300"  />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4" >
                        <input type="number" placeholder="zip code" className="px-4 py-2 rounded-md border-1 border-gray-300" />
                        <input type="text" placeholder="country" className="px-4 py-2 rounded-md border-1 border-gray-300" />
                    </div>
                    <input type="text" placeholder="phone number"  className="px-4 py-2 rounded-md border-1 border-gray-300" />
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