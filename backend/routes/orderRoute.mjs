import express from "express"
import authuser from "../middlewares/authUser.mjs"
import { getAllOrders, getUserOrders, placeOrderCod, placeOrderStripe } from "../controllers/ordersController.mjs"

const orderRouter = express.Router()

orderRouter.post('/cod' , authuser , placeOrderCod)

orderRouter.get('/user' , authuser , getUserOrders)

orderRouter.get('/seller' , authuser , getAllOrders)

orderRouter.post('/stripe' , authuser , placeOrderStripe)

export default orderRouter