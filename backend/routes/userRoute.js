import express from 'express'

import {login,register,verifyEmail} from '../controllers/userController.js'

const uesrRouter=express.Router();

uesrRouter.post('/register',register);
uesrRouter.post('/login',login);
uesrRouter.post('/verify-email',verifyEmail);

export default uesrRouter;
