import express from "express"
import { addAddress, getAddress } from "../controllers/addressComtroller.mjs"
import authuser from "../middlewares/authUser.mjs"

const addressRouter = express.Router()

addressRouter.post('/update' , authuser , addAddress)

addressRouter.get('/get' , authuser , getAddress)

export default addressRouter