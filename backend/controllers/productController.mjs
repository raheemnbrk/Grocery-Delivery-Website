import Product from "../models/porductModel.mjs"
import { v2 as cloudinary } from "cloudinary"

const addProduct = async (req, res) => {
    try {
        let productData = req.body
        const images = req.files
        let images_url = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { ressource_type: "image" })
                return result.secure_url
            })
        )

        await Product.create({ ...productData, image: images_url })
        res.json({ success: true, message: "product added." })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export {addProduct}