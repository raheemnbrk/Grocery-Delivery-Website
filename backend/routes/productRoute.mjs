import express from "express"
import authSeller from "../middlewares/authSeller.mjs"
import { upload } from "../configs/multer.mjs"
import { addProduct } from "../controllers/productController.mjs"

const productRouter = express.Router()

productRouter.post('/add' , upload.array("images") , authSeller , addProduct)

export default productRouter