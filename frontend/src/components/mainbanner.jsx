import { Link } from "react-router-dom"
import { assets } from "../assets/assets"

import { FaArrowRight } from "react-icons/fa";

export default function MainBanner() {
    return (
        <div className="relative" >
            <img src={assets.main_banner_bg} alt="banner" className="w-full hidden md:block" />
            <img src={assets.main_banner_bg_sm} alt="banner" className="w-full md:hidden" />
            <div className="absolute bottom-24 md:top-4 self-center md:self-start text-center md:text-start pl-8 md:pl-24 md:pt-12 flex flex-col space-y-4" >
                <h1 className="text-3xl md:text-5xl font-bold capitalize text-gray-700 leading-tight md:leading-14" >freshness you can <br /> trust , savings you <br /> will love!</h1>
                <div className="flex items-center gap-8 mt-2 font-medium self-center md:self-start" >
                    <Link to={"products"} ><button className="bg-primary hover:bg-primary-dull capitalize text-white px-8 py-3 rounded-md cursor-pointer" >shop now</button></Link>
                    <Link className="hidden md:block"  to={"deals"} >
                        <p className="flex items-center gap-2 group capitalize text-gray-700" >
                            <span className="capitalize" >explore deals</span>
                            <span className="group-hover:translate-x-1 transition-all duration-300" ><FaArrowRight /></span>
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    )
}