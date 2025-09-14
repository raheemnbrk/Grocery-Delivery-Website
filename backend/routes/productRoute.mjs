import express from "express"
import authSeller from "../middlewares/authSeller.mjs"
import { upload } from "../configs/multer.mjs"
import { addProduct, changeStock, productById, productlist } from "../controllers/productController.mjs"

const productRouter = express.Router()

productRouter.post('/add' , upload.array("images") , authSeller , addProduct)

productRouter.get('/productList' , productlist)

productRouter.get('/product' , productById)

productRouter.post('/stock', authSeller , changeStock )

export default productRouter