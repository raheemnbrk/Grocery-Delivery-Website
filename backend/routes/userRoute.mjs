import express from "express"
import { isAuth, login, logout, register } from "../controllers/userController.mjs"
import authuser from "../middlewares/authUser.mjs"

const userRouter = express.Router()

userRouter.post('/register' , register)

userRouter.post('/login' , login)

userRouter.get('/isAuth' , authuser , isAuth)

userRouter.post('/logout' , authuser , logout)

export default userRouter