import cookieParser from "cookie-parser"
import express from "express"
import cors from 'cors'
import connectDb from "./configs/db.mjs"
import "dotenv/config"

import userRouter from "./routes/userRoute.mjs"

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

app.get("/", (req, res) => {
    res.send("api is working")
})

app.use('/api/user' , userRouter)

app.listen(port, () => {
    console.log("server is running on port 4000")
})