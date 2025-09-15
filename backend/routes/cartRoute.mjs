import express from "express"
import { updateCart } from "../controllers/cartController.mjs"
import authuser from "../middlewares/authUser.mjs"

const cartRouter = express.Router()

cartRouter.post('/update' , authuser , updateCart)

export default cartRouter