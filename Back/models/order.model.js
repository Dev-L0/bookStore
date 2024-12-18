import mongoose from 'mongoose';

const orderSchema = new Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
books:[
    {
        book:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Book',
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:1,
        },
        price:{
            type:Number,
            required:true,
            min:0,
        },
    },
],

totalAmount:{
    type:Number,
    required:true,
    min:0,
},
stripeSessionId:{
    type:String,
    unique:true
}
},{timestamps:true});




const Order = mongoose.model('Order', orderSchema);

export default Order;