import { assets, features } from "../assets/assets";

export default function BottomBanner() {
    return (
        <div className="relative" >
            <img src={assets.bottom_banner_image} className="hidden md:block" alt="" />
            <img src={assets.bottom_banner_image_sm} className="md:hidden" alt="" />
            <div className="absolute top-8 max-sm:left-8 md:right-16 space-y-6" >
                <h1 className="capitalize text-primary text-xl md:text-3xl font-semibold" >why we are the best?</h1>
                    <div className="flex flex-col gap-3 md:gap-6" >
                        {features.map((ele, ind) => (
                        <div key={ind} className="flex gap-4"  >
                            <img src={ele.icon} className="max-sm:w-12" />
                            <div>
                                <h1 className="text-gray-700 font-medium md:text-lg" >{ele.title}</h1>
                                <h1 className="text-xs text-gray-500" >{ele.description}</h1>
                            </div>
                        </div>
                    ))}
                    </div>
            </div>
        </div>
    )
}