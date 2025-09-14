import jwt from "jsonwebtoken"

const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ success: false, message: "missing details" })
        }

        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
            res.cookie('sellerToken', token, {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.json({ success: true, message: "logged in" })
        }
        else {
            res.json({ success: true, message: "invalid credentiels" })
        }
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const sellerIsAuth = async (req, res) => {
    try {
        res.json({ success: true })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            secure: process.env.NODE_ENV
        })
        res.json({ success: true, message: "logged out successfully." })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export { sellerLogin , sellerIsAuth , sellerLogout }