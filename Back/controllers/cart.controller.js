import Book from '../models/book.model.js';

export const getCartBooks = async(req, res)=>{
try{
    const books = await Book.find({_id:{$in: req.user.cartItems}});

    const cartItems = books.map(book =>{
        const item = req.user.cartItems.find(cartItem => cartItem.id === book.id);
        return {...book.toJSON(), quantity:item.quantity}
    });
    res.json(cartItems);
}catch(error){
    console.log("Error in getCartBooks controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });

}
}

export const addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.id === bookId);

    if (existingItem) {
      existingItem.quatity += 1;
    } else {
      user.cartItems.push(bookId);
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeAllFromCart = async(res, req)=>{
    try{
    const {bookId} = req.body;
    const user = req.user;

    if(!bookId){
        user.cartItems=[];
    }else{
        user.cartItems = user.cartItems.filter((item)=> item.id !== bookId);
    }

    await user.save();
    res.json(user.cartItems);
}catch(error){
    console.log("Error in removeAllFromCart controller", error.message);
    res.status(500).json({message:"Server error", error:error.message});
}
}

export const updateQuantity = async(res,req)=>{
    try{
        const {id:bookId} = req.params;
        const {quantity} = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find((item)=> item.id === bookId);

        if(existingItem){
           if(quantity === 0){
            user.cartItems = user.cartItems.filter((item)=> item.id !== bookId);
            await user.save();
            return res.json(user.cartItems);
           } 
           existingItem.quantity = quantity;
           await user.save();
           res.json(user.cartItems);
        }else{
            res.status(404).json({message: "Book not found"});
        }
    }catch(error){
        console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({message:"Server error", error:error.message});

    }
}