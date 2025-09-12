import { Link } from "react-router-dom"
import { categories } from "../assets/assets"

export default function Categories() {
    return (
        <div className="flex flex-col space-y-6" >
            <p className="text-2xl md:text-3xl text-gray-700 font-medium" >Categories</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6" >
                {categories.map((ele, ind) => (
                    <Link key={ind} to={`/products/${ele.path}`} >
                        <div className={`h-40 flex flex-col items-center gap-2 py-5 px-3 group cursor-pointer rounded-md`} style={{ backgroundColor: ele.bgColor }} >
                            <img className={`max-w-28 overflow-hidden group-hover:scale-105`} src={ele.image} alt="image" />
                            <p> {ele.text}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}