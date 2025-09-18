import User from "../models/userModel.mjs"

const updateCart = async (req, res) => {
    try {
        const { cartItems} = req.body
        const userId = req.userId
        await User.findByIdAndUpdate(userId, { cartItems })
        res.json({ success: true, message: "cart updated" })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export { updateCart }