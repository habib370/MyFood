import express from 'express'
import {authMiddleWare} from '../middleware/auth.js'
import {login,register,verifyEmail,toChangeName,toChagePass} from '../controllers/userController.js'

const uesrRouter=express.Router();

uesrRouter.post('/register',register);
uesrRouter.post('/login',login);
uesrRouter.post('/verify-email',verifyEmail);
uesrRouter.post('/update-name',authMiddleWare,toChangeName)
uesrRouter.post('/change-pass',authMiddleWare,toChagePass);

export default uesrRouter;
