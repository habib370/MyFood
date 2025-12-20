import React,{useState,useContext} from "react";
import { MdOutlineMail } from "react-icons/md";
import { VscVerifiedFilled } from "react-icons/vsc";
import { VscUnverified } from "react-icons/vsc";
import {StoreContext} from '../context/StoreContext.jsx'
import {Link} from 'react-router-dom'
export const Profile = () => {
  const {user}=useContext(StoreContext);
  const img_src =
    "https://static.vecteezy.com/system/resources/previews/009/749/751/original/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg";
    const [isVerified,setIsVerified]=useState(true)
  return (
    <div className="flex items-center gap-x-3">
      <div>
        <img className="h-20 w-20 rounded-full" src={img_src} alt="" />
      </div>
      <div>
        <div className="flex items-center gap-x-3">
          <h1 className="text-2xl font-semibold"><span>{user?.firstName}</span> {user?.lastName}</h1>
            {isVerified?( <p className="text-xs text-white bg-green-400 px-2 py-0.5 rounded-sm flex items-center gap-x-1"><VscVerifiedFilled/> verified</p>):( <p className="text-xs text-white bg-red-400 px-2 py-0.5 rounded-sm flex items-center gap-x-1"><VscUnverified/> not verified</p>)}
           
         
        </div>
        <div className="flex items-center gap-x-1">
          <MdOutlineMail />
          <p>{user?.email}</p>
           
        </div>
         <Link to='/edit-profile' className="underline hover:text-blue-500 cursor-pointer">Edit Profile</Link>
         <p className="font-light text-sm">Total reports:0</p>
      </div>
    
    </div>
  );
};
