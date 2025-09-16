import { Link } from "react-router-dom"
import ProductsCard from "../components/productsCard"
import { useContext , useEffect } from "react"
import { AppContext } from "../context/appContext"

export default function AllProducts() {
    const {products , getProducts} = useContext(AppContext)

    useEffect(()=>{
        getProducts()
    } , [products])
    return (
        <div className="flex flex-col gap-8" >
            <div className="items-end flex flex-col w-max" >
                <h1 className="text-2xl font-semibold uppercase" >all products</h1>
                <div className="w-16 h-0.5 bg-primary rounded-full" ></div>
            </div>
            <div className="flex flex-wrap gap-6 items-center justify-center lg:justify-start" >
                {products.map(product => (
                    <Link to={`/products/${product.category}/${product._id}`} key={product._id}  >
                        <ProductsCard product={product} />
                    </Link>
                ))}
            </div>
        </div>
    )
}