import Orders from "../models/ordersModel.mjs"
import User from "../models/userModel.mjs"
import Product from "../models/porductModel.mjs"
import stripe from "stripe"

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

const placeOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body
        const { userId } = req
        const { origin } = req.headers

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "invalid data" })
        }

        let productData = []
        let amount = 0
        for (const item of items) {
            const product = await Product.findById(item.product)
            productData.push({
                name: product.name,
                price: product.offPrice,
                quantity: item.quantity
            })
            amount += product.offPrice * item.quantity
        }

        amount += Math.floor(amount * 0.02)

        const order = await Orders.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
            isPaid: false
        })

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        const line_items = productData.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId
            }
        })

        res.json({ success: true, url: session.url })
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

const stripeWebHook = async () => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook error:", err.message)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object
            const { orderId, userId } = session.metadata

            await Orders.findByIdAndUpdate(orderId, { isPaid: true })
            await User.findByIdAndUpdate(userId, { cartItems: [] })

            console.log(`Order ${orderId} marked as paid.`)
            break;
        }

        case "checkout.session.async_payment_failed": {
            const session = event.data.object
            const { orderId } = session.metadata

            await Orders.findByIdAndDelete(orderId)

            console.log(`Payment failed, order ${orderId} deleted.`)
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`)
    }

    res.json({ received: true })
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
    placeOrderCod, placeOrderStripe, getUserOrders, getAllOrders, stripeWebHook
}