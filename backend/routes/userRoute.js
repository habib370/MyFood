import express from 'express'

import {login,register} from '../controllers/userController.js'

const uesrRouter=express.Router();

uesrRouter.post('/register',register);
uesrRouter.post('/login',login);

export default uesrRouter;