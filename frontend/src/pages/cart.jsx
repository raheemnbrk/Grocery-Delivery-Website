import { useContext } from "react"
import { AppContext } from "../context/appContext"
import { Link } from "react-router-dom"
import { CiCircleRemove } from "react-icons/ci"
import { FaArrowLeft } from "react-icons/fa6"

export default function Cart() {
  const { cartItems, removeFromCart, products, updateCart } = useContext(AppContext)

  const cartArray = cartItems
    .map(ci => {
      const product = products.find(p => p._id === ci.product)
      return product ? { ...product, quantity: ci.quantity } : null
    })
    .filter(Boolean)

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-primary">{cartArray.length} Items</span>
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
            <p className="text-center">${product.offPrice * product.quantity}</p>
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
    </div>
  )
}
