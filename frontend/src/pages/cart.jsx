import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/appContext"
import { Link } from "react-router-dom"
import { CiCircleRemove } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";

export default function Cart() {
    const { cartItems, setCartItems, removeFromcart, dummyProducts, updateCart } = useContext(AppContext)

    const [cartArray, setcartArray] = useState([])
    const [showAddress, setShowAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState("")
    const [paimentMethod, setPaimentMethod] = useState("cod")

    const getCart = () => {
        const tempArray = []
        for (const key in cartItems) {
            const product = dummyProducts.find((ele) => ele._id === key)
            product.quantity = cartItems[key]
            tempArray.push(product)
        }
        setcartArray(tempArray)
    }

    useEffect(() => {
        if (dummyProducts.length > 0 && cartItems) {
            getCart()
        }
    }, [dummyProducts, cartItems])
    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">3 Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <Link to={`porducts/${product.category}/${product._id}`} >
                                <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                    <img className="max-w-full h-full object-cover" src={product.image} alt={product.name} />
                                </div>
                            </Link>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Wright: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select className='outline-none'>
                                            {Array(5).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">${product.offerPrice * product.quantity}</p>
                        <button className="cursor-pointer mx-auto">
                            <CiCircleRemove onClick={() => removeFromcart()} className="text-red-600 cursor-pointer" />
                        </button>
                    </div>)
                )}

                <Link to={'/products'} >
                    <button className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                        <FaArrowLeft />
                        Continue Shopping
                    </button>
                </Link>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {selectedAddress ?
                                `${selectedAddress.street} , ${selectedAddress.city} , ${selectedAddress.state} , ${selectedAddress.country}`
                                : "No address found"}
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                <p onClick={() => setShowAddress(false)} className="text-gray-500 p-2 hover:bg-gray-100">
                                    New York, USA
                                </p>
                                <p onClick={() => setShowAddress(false)} className="text-primary text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none" onChange={(e) => setPaimentMethod(e.target.value)} >
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>$20</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>$20</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>$20</span>
                    </p>
                </div>

                <button className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                    Place Order
                </button>
            </div>
        </div>
    )
}