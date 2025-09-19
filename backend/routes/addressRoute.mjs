import express from "express"
import { addAddress, getAddress } from "../controllers/addressController.mjs"
import authuser from "../middlewares/authUser.mjs"

const addressRouter = express.Router()

addressRouter.post('/add' , authuser , addAddress)

addressRouter.get('/get' , authuser , getAddress)

export default addressRouter