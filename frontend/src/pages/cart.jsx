import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/appContext"
import { Link } from "react-router-dom"
import { CiCircleRemove } from "react-icons/ci"
import { FaArrowLeft } from "react-icons/fa6"
import toast from "react-hot-toast"

export default function Cart() {
    const { cartItems, removeFromCart, products, updateCart, axios, user, setCartItems , navigate , getCartCount } = useContext(AppContext)
    const [showAddress, setShowAddress] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentOption, setPaymentOption] = useState('COD')

    const cartArray = cartItems
        .map(ci => {
            const product = products.find(p => p._id === ci.product)
            return product ? { ...product, quantity: ci.quantity } : null
        })
        .filter(Boolean)


    const price = cartArray.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const tax = price * 0.02
    const total = price + tax

    const getAddresses = async () => {
        try {
            const { data } = await axios.get('/api/address/get')
            if (data.success) {
                setAddresses(data.addresses)
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0])
                }
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const placeOrder = async () => {
        try {
            if (!selectedAddress) {
                toast.error("Please select an address.")
            }
            if (paymentOption === "COD") {
                const { data } = await axios.post('/api/order/cod',
                    {
                        items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
                        address: selectedAddress._id
                    }
                )
                if (data.success) {
                    toast.success(data.message)
                    setCartItems([])
                    navigate('/myOrders')
                }
                else {
                    toast.error(data.message)
                }
            }
        }
        catch(err){
            toast.error(err.message)
        }
    }

    useEffect(() => {
        getAddresses()
    }, [user])

    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className="flex-1 max-w-4xl">
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product) => (
                    <div key={product._id} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <Link to={`/products/${product.category}/${product._id}`}>
                                <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                    <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                                </div>
                            </Link>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className="flex items-center">
                                        <p>Qty:</p>
                                        <select
                                            className="outline-none ml-2"
                                            value={product.quantity}
                                            onChange={(e) => updateCart(product._id, Number(e.target.value))}
                                        >
                                            {Array(5).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">${product.price * product.quantity}</p>
                        <button className="cursor-pointer mx-auto" onClick={() => removeFromCart(product._id)}>
                            <CiCircleRemove className="text-red-600 cursor-pointer" />
                        </button>
                    </div>
                ))}

                <Link to={'/products'}>
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
                        {selectedAddress ? (
                            <p className="text-gray-500">
                                {selectedAddress.street} , {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.country}
                            </p>
                        ) : (
                            <p className="text-gray-500">No address found</p>
                        )}

                        <button
                            onClick={() => setShowAddress(!showAddress)}
                            className="text-primary hover:underline cursor-pointer"
                        >
                            Change
                        </button>

                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                                {addresses.length > 0 ? (
                                    addresses.map((addr) => (
                                        <p
                                            key={addr._id}
                                            onClick={() => {
                                                setSelectedAddress(addr)
                                                setShowAddress(false)
                                            }}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {addr.street} {addr.city}, {addr.state}, {addr.country}
                                        </p>
                                    ))
                                ) : (
                                    <p className="p-2 text-gray-500">No saved addresses</p>
                                )}

                                <Link to={'/add-address'}>
                                    <p
                                        onClick={() => setShowAddress(false)}
                                        className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                                    >
                                        Add address
                                    </p>
                                </Link>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                    <select onChange={(e)=>setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>${price.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>${tax.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>${total.toFixed(2)}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary/80 transition" > 
                    Place Order
                </button>
            </div>
        </div>
    )
}
