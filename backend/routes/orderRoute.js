import express from 'express'
import {authMiddleWare} from '../middleware/auth.js'
import {placeOrder,getUserOrders,getAllOrderFromAdmin,updateOrderController,userOrderList} from '../controllers/orderController.js'

const orderRouter=express.Router();


orderRouter.post('/place',authMiddleWare,placeOrder)
orderRouter.get("/user-orders", authMiddleWare, getUserOrders);
orderRouter.get('/get-all-order',getAllOrderFromAdmin)
orderRouter.post('/update',updateOrderController)
orderRouter.get('/myOrders',authMiddleWare,userOrderList)

export default orderRouter;
