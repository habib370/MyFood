import jwt from 'jsonwebtoken'

export const authMiddleWare=async(req,res,next)=>{
  try {
    const {token}=req.headers;
  if(!token) return res.json({ok:false,message:"user unauthorized"})

  const decoded_token= jwt.verify(token,process.env.JWT_SECRET);
  req.userId=decoded_token.id;
  next();

  } catch (error) {
    console.log('error from auth',error)
    res.json({ok:false,message:error.message})
  }
}