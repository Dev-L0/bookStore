import {stripe} from '../utils/stripe.js';
export const createCheckoutSession = async (req,res)=>{
    try{
        const {books} = req.body;
        if(!Array.isArray(books) || books.length === 0){
            return res.status(400).json({error:"Invalid or empty books array"});
        }

        let totalAmount = 0;

        const lineItems = books.map(book=>{
            const amount = Math.round(book.price * 100); // stripe wants you to send the amount in cents
            totalAmount += amount * book.quantity;
            
            return{
                price_data:{
                    currency:"usd",
                    book_data:{
                        name:book.name,
                        image:[book.image],
                    },
                    unit_amount: amount,
                }
            }
        });
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:lineItems,
            mode:'payment',
            success_url:`${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${process.env.CLIENT_URL}/purchase-cancelled,`

        })
    }catch(error){
        console.log("Error");

    }
}