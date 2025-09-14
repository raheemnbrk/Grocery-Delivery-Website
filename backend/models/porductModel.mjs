import mongoose from "mongoose";

const porductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    offPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
}, { timestamps: true })

const Product = mongoose.models.product || mongoose.model('product', porductSchema)

export default Product