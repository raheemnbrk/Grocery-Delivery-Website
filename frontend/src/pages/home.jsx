import BestSeller from "../components/bestSeller"
import BottomBanner from "../components/bottomBanner"
import Categories from "../components/categories"
import MainBanner from "../components/mainbanner"
import NewsLetter from "../components/newsLetter"

export default function Home(){
    return(
        <div className="py-10 flex flex-col space-y-16">
         <MainBanner/>
         <Categories/>
         <BestSeller/>
         <BottomBanner/>
         <NewsLetter/>
        </div>
    )
}