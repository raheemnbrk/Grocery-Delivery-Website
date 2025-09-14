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

const productlist = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, products })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const productById = async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.json({ success: true, product })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const changeStock = async (req, res) => {
    try {
        const { id , inStock } = req.body
        const product = await Product.findByIdAndUpdate(id, { inStock })
        res.json({success : true , message : "stcok updated."}) 
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export { addProduct, productlist, productById , changeStock }