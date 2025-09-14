import User from "../models/userModel.mjs"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "missing details." })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "user already exist." })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "enter a valid password." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ success: true, user: { email: user.email, name: user.name } })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ success: false, message: "email and password are required." })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user not found." })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "incorrect password." })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.json({ success: true, user: { email: user.email, name: user.name } })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const isAuth = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await User.findById(userId).select("-password")
        res.json({ success: true, user })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        })
        res.json({success : true , message : "LoggedOut"})
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}


export { register, login , isAuth , logout }