import Orders from "../models/ordersModel.mjs"
import Product from "../models/porductModel.mjs"

const placeOrderCod = async (req, res) => {
    try {
        const { items, address } = req.body
        const { userId } = req
        if (!address || items.length === 0) {
            return res.json({ success: true, message: "invalid data" })
        }
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            amount += product.offPrice * item.quantity;
        }

        amount += Math.floor(amount * 0.02)
        await Orders.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        })

        res.json({ success: true, message: "order placed successfully." })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const getUserOrders = async (req, res) => {
    try {
        const { userId } = req
        const orders = await Orders.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 })

        res.json({ success: true, orders })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find({
            $or: [{ isPaid: true }, { paymentType: "COD" }]
        }).populate("items.product address").sort({ createdAt: -1 })
        res.json({ success: true, orders })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export {
    placeOrderCod, getUserOrders, getAllOrders
}