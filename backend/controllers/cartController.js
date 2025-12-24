import userModel from '../models/userModel.js'

export const addToCart = async (req, res) => {
  try {
    if(!req.userId){
      return res.json({ok:false,message:"token not found"});
    }
    // Find the user
    const userData = await userModel.findById(req.userId);

    // Handle case where user is not found
    if (!userData) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    // Ensure cartData exists
    const cartData = userData.cartData || {};

    // Add item to cart
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // Update user
    await userModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({ ok: true, message: "Item added to cart" });
  } catch (error) {
    res.json({ ok: false, message: error.message });
  }
};


//remove from cart
export const removeFromCart=async(req,res)=>{
try {
  
  let userData=await userModel.findById({_id:req.userId})
  const cartData=userData.cartData;
  if(cartData[req.body.itemId]>0){
    cartData[req.body.itemId]-=1;
  }
  await userModel.findByIdAndUpdate(req.userId,{cartData})
  res.json({ok:true,message:"item removed from cart"})
} catch (error) {
  res.json({ok:false,message:error.message})
}
}

//getAllList
export const getAllCartItems=async(req,res)=>{
  try {
    const userData=await userModel.findById(req.userId);
    const cartData=await userData.cartData;

    res.json({ok:true,cartData})
  } catch (error) {
    res.json({ok:false,message:error.message})
  }
}
//remove all list from cart
export const removeALlItems = async (req, res) => {
  try {
    const userData=await userModel.findById(req.userId)
    const cartData=userData.cartData;
    if(cartData[req.body.itemId]!=0){
       delete cartData[req.body.itemId];
    }
    await userModel.findByIdAndUpdate(req.userId,{cartData})
    res.json({ ok: true, message: "All items removed from cart" });
  } catch (error) {
    res.json({ ok: false, message: error.message });
  }
};


