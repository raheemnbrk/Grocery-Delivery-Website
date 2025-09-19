import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/appContext"
import toast from "react-hot-toast"

export default function MyOrders() {
    const { axios } = useContext(AppContext)
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/user')
            if (data.success) {
                setOrders(data.orders)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast(err.message)
        }
    }

    useEffect(()=>{
        fetchOrders()
    }
     , [])
    return (
        <div className="flex flex-col space-y-8" >
            <div className="flex flex-col w-max items-end" >
                <h1 className="text-2xl font-medium uppercase" >my orders</h1>
                <div className="w-16 h-0.5 bg-primary" ></div>
            </div>

            <div className="flex flex-col space-y-4" >
                {orders.map((ele, ind) => (
                    <div key={ind} className={`border border-gray-300 rounded-md px-6 py-5 space-y-6`} >
                        <p className="flex flex-col md:flex-row md:items-center justify-between text-gray-400" >
                            <span>orderId : {ele._id}</span>
                            <span>payment : {ele.paymentType}</span>
                            <span>total amount : ${ele.amount.toFixed(2)}</span>
                        </p>

                        {ele.items.map((item, ind) => (
                            <div key={ind} className={`${ele.items.length !== ind + 1 && "border-b border-b-gray-300"}`} >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-4" >
                                    <div className="flex gap-4 items-center" >
                                        <img src={item.product.image[0]} className="w-24 h-24 rounded-sm" alt="" />
                                        <div>
                                            <p>{item.product.name}</p>
                                            <p className="capitalize text-gray-400" >category : {item.product.category}</p>
                                        </div>
                                    </div>
                                    <div className="capitalize text-gray-400" >
                                        <p>quantity : {item.quantity}</p>
                                        <p>status : {ele.status}</p>
                                        <p>date : {new Date(ele.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="capitalize text-primary font-medium text-lg" >amount : ${(item.product.offPrice * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}