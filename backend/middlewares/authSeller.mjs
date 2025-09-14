import jwt from "jsonwebtoken"

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies
    if (!sellerToken) {
        return res.json({ success: false, message: "not authorized" })
    }
    try {
        const tokrnDecode = jwt.verify(sellerToken, process.env.JWT_SECRET_KEY)
        if (tokrnDecode.email === process.env.SELLER_EMAIl) {
            next()
        }
        else {
            res.json({ success: false, message: "email is incorrect!" })
        }
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export default authSeller