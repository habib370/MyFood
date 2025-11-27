import express from 'express'
import {addToCart,removeFromCart,getAllCartItems,removeALlItems} from '../controllers/cartController.js'
import {authMiddleWare} from '../middleware/auth.js'

const cartRouter=express.Router();

cartRouter.post('/add',authMiddleWare,addToCart);
cartRouter.post('/remove',authMiddleWare,removeFromCart);
cartRouter.get('/get',authMiddleWare,getAllCartItems)
cartRouter.post('/deleteAll',authMiddleWare,removeALlItems)
export default cartRouter;