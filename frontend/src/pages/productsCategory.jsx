import { useContext } from "react"
import { AppContext } from "../context/appContext"
import { Link, useParams } from "react-router-dom"
import ProductsCard from "../components/productsCard"

export default function ProductsCategory() {
    const { dummyProducts, categories } = useContext(AppContext)
    const { category } = useParams()

    const searchedcategory = categories.find(ele => ele.path === category)
    const filteredProducts = dummyProducts.filter(ele => ele.category === category)
    return (
        <div className="flex flex-col gap-6" >
            {searchedcategory && (
                <div className="w-max flex flex-col items-end" >
                    <p className="uppercase font-semibold text-2xl" >{searchedcategory.text}</p>
                    <div className="bg-primary w-16 h-0.5" ></div>
                </div>
            )}
            {filteredProducts && (
                <div className="flex flex-wrap gap-6 items-center justify-center lg:justify-start" >
                    {filteredProducts.map(ele => (
                        <Link key={ele._id} >
                            <ProductsCard product={ele} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}