import { useContext, useState } from "react"
import { AppContext } from "../../context/appContext"
import toast from "react-hot-toast"

export default function AddProduct() {

    const [files, setFiles] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [offPrice, setOffPrice] = useState('')
    const [loading , setLoading] = useState(false)
    const { axios } = useContext(AppContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offPrice
            }
            const formData = new FormData()
            formData.append('productdata', JSON.stringify(productData))
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i])
            }

            const { data } = await axios.post('/api/product/add', formData)
            if (data.success) {
                toast.success(data.message)
                setName('')
                setDescription('')
                setCategory('')
                setPrice('')
                setOffPrice('')
                setFiles([])
                setLoading(false)
            }
            else {
                toast.error(data.message)
            }
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className="flex flex-col justify-between bg-white">
            <form className="md:p-10 p-4 space-y-5 max-w-lg" onSubmit={handleSubmit}>
                <div>
                    <p className="text-base font-medium text-gray-600">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input accept="image/*" type="file"  id={`image${index}`} hidden onChange={(e) => setFiles([...files, e.target.files[0]])} />
                                <img className="max-w-24 cursor-pointer" src={files[index] ? URL.createObjectURL(files[index]) : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium text-gray-600" htmlFor="product-name">Product Name</label>
                    <input id="product-name" type="text" value={name} placeholder="Type here" onChange={(e) => setName(e.target.value)} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium text-gray-600" htmlFor="product-description">Product Description</label>
                    <textarea id="product-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium text-gray-600" htmlFor="category">Category</label>
                    <select id="category" onChange={(e) => setCategory(e.target.value)} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 text-gray-600">
                        <option value="">Select Category</option>
                        {[{ name: 'Vegetables' }, { name: 'Fruits' }, { name: 'Drinks' }, { name: 'Instant' }, { name: 'Dairy' }, { name: 'Bakery' }, { name: 'Grains ' }].map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium text-gray-600" htmlFor="product-price">Product Price</label>
                        <input id="product-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium text-gray-600" htmlFor="offer-price">Offer Price</label>
                        <input id="offer-price" type="number" value={offPrice} onChange={(e) => setOffPrice(e.target.value)} placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className={`px-8 py-2.5 ${ loading ? "bg-green-700" : "bg-primary"} cursor-pointer text-white font-medium rounded`}>{loading ? "ADDING" : "ADD"}</button>
            </form>
        </div>
    )
}