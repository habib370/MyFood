import express from 'express';
import {addFood,listFood,deleteFoodItem,getSingleItem,searchItems,filterByCategory} from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter=express.Router();

//image storage configuration

const storage=multer.diskStorage({
  destination:"uploads",
  filename:(req,file,cb)=>{
    return cb(null,`${Date.now()} ${file.originalname}`);
  }
})

const upload=multer({storage:storage});


foodRouter.post('/add',upload.single("image"), addFood);
foodRouter.get('/list',listFood)
foodRouter.post('/remove',deleteFoodItem);
foodRouter.get('/single-item/:itemId',getSingleItem)
foodRouter.get('/search',searchItems);
foodRouter.get('/category/:itemId',filterByCategory)

export default foodRouter;
