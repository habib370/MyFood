import express from 'express'
import {authMiddleWare} from '../middleware/auth.js'
import {toComment,getAllComments} from '../controllers/userController.js'
const commentRouter=express.Router();

commentRouter.post('/new-comment/:itemId',authMiddleWare,toComment);
commentRouter.get('/:itemId',getAllComments)
export default commentRouter;