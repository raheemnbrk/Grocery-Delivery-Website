import mongoose, { Mongoose } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [{
        product: { type: String, required: true , ref : "product" },
        quantity: { type: Number, required: true }
    }],
    amount: { type: Number, required: true } , 
    address : {type : String , required : true , ref : 'address'} ,
    status : {type : String , default : "Order Placed"} , 
    paymentType : {type : String , required : true } , 
    isPaid : {type : Boolean , required : true , default : false}
} , {timestamps : true})

const Orders = mongoose.models.orders || mongoose.model('order', orderSchema)

export default Orders