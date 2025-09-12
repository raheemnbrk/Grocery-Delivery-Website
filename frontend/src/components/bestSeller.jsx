import ProductsCard from "./productsCard";
import { dummyProducts as products } from "../assets/assets";
import { Link } from "react-router-dom";

export default function BestSeller() {
    return (
        <div className="flex flex-col space-y-6" >
            <p className="text-2xl md:text-3xl text-gray-700 font-medium capitalize" >best sellers</p>
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                {products.slice(0, 8).map((product) => (
                    <Link to={`/products/${product.category}/${product._id}`} >
                    <ProductsCard key={product._id} product={product} />
                    </Link>
                ))}
            </div>
        </div>
    )
}