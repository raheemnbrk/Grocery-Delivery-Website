import express from "express"
import { sellerIsAuth, sellerLogin, sellerLogout } from "../controllers/sellerController.mjs"
import authSeller from "../middlewares/authSeller.mjs"
import { addProduct } from "../controllers/productController.mjs"

const sellerRouter = express.Router()

sellerRouter.post('/login', sellerLogin)

sellerRouter.get('/sellerIsAuth', authSeller, sellerIsAuth)

sellerRouter.post('/logout', authSeller, sellerLogout)

export default sellerRouter