import express from 'express'
import {authMiddleWare} from '../middleware/auth.js'
import {toComment,getAllComments,toLike,toDislike,toReply,getAllReplies} from '../controllers/userController.js'
const commentRouter=express.Router();

commentRouter.post('/new-comment/:itemId',authMiddleWare,toComment);
commentRouter.get('/:itemId',getAllComments)
commentRouter.post('/like/:commentId',authMiddleWare,toLike)
commentRouter.post('/dislike/:commentId',authMiddleWare,toDislike)
commentRouter.post('/reply/:commentId',authMiddleWare,toReply)
commentRouter.get('/all-replies/:commentId',getAllReplies)
export default commentRouter;