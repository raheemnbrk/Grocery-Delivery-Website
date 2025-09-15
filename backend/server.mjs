import cookieParser from "cookie-parser"
import express from "express"
import cors from 'cors'
import connectDb from "./configs/db.mjs"
import "dotenv/config"

import userRouter from "./routes/userRoute.mjs"
import sellerRouter from "./routes/sellerRoute.mjs"
import connectCloudinary from "./configs/cloudinary.mjs"
import productRouter from "./routes/productRoute.mjs"
import cartRouter from "./routes/cartRoute.mjs"
import addressRouter from "./routes/addressRoute.mjs"
import orderRouter from "./routes/orderRoute.mjs"

const app = express()

const port = process.env.PORT || 4000

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

await connectDb()
await connectCloudinary()

app.get("/", (req, res) => {
    res.send("api is working")
})

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product' , productRouter)
app.use('/api/cart' , cartRouter)
app.use('/api/address' , addressRouter)
app.use('/api/order' , orderRouter)

app.listen(port, () => {
    console.log("server is running on port 4000")
})