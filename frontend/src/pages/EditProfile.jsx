import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext.jsx";
import axios from 'axios'
export const EditProfile = () => {
  const { user ,url} = useContext(StoreContext);
  const [nameData, setNameData] = useState({
    firstName: "",
    lastName: "",
  });
  const [passData, setPassData] = useState({
    currPass: "",
    newPass: "",
  });
  const [email,setEmail]=useState("")
  const [isOtpSent,setIsOtpSent]=useState(false);
  const [otp,setOtp]=useState('');
  const otpSubmitHandler=()=>{
    //console.log("otp sent")
    
    fetchData()

  }
  const nameSubmitHandler = (e) => {
    e.preventDefault();
    console.log(nameData);
  };
  const passSubmitHandler = (e) => {
    e.preventDefault();
    console.log(passData);
    
  };

  const fetchData = async () => {
  try {
    const response = await axios.post(url + '/api/user/verify-email', { email });
    if(response.data.ok){
       setIsOtpSent(true);
    }
    console.log(response.data);
  } catch (err) {
    console.error(err.response?.data?.message || err.message);
  }
}

  return (
    <div className="flex flex-col items-center justify-center gap-y-30 pt-5 pb-5">
      <form onSubmit={(e) => nameSubmitHandler(e)}>
        <div className="max-w-xl mx-auto mt-10 ">
          <h1 className="text-2xl font-semibold pb-4">My Profile</h1>
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">First name</label>
            <input
              type="text"
              name="firstName"
              value={nameData.firstName}
              placeholder={user?.firstName}
              onChange={(e) =>
                setNameData({ ...nameData, firstName: e.target.value })
              }
              className="w-xl border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Last name</label>
            <input
              type="text"
              name="lastName"
              value={nameData.lastName}
              placeholder={user?.lastName}
              onChange={(e) =>
                setNameData({ ...nameData, lastName: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <button className="bg-pink-500 text-white font-semibold px-4 py-1 rounded-xl translate-y-2">
            save
          </button>
        </div>
      </form>
      <div className="max-w-xl mx-auto mt-10">
        {
          !isOtpSent?(<div> <div className="flex flex-col">
            <h1 className="text-2xl font-semibold pb-4">Verify email</h1>
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder={user?.email}
               name="email"
              value={email}
               onChange={(e) =>
               setEmail(e.target.value)
             }
              className="w-xl border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
             
          </div>
        <button onClick={otpSubmitHandler} className="bg-pink-500 text-white font-semibold px-4 py-1 rounded-xl translate-y-2 cursor-pointer">
            send otp
          </button>
        </div>):(<div> <div className="flex flex-col">
            <h1 className="text-2xl font-semibold pb-4">Verify email</h1>
            <label className="text-sm text-gray-600 mb-1">Otp</label>
            <input
              type="number"
              placeholder="0123..."
               name="otp"
              value={otp}
               onChange={(e) =>
               setOtp(e.target.value)
             }
              className="w-xl border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
             
          </div>
          <button onSubmit={()=>{}}  className="bg-pink-500 text-white font-semibold px-4 py-1 rounded-xl translate-y-2 cursor-pointer">
            Verify
          </button>
          </div>)
        }
          
      </div>
      <form onSubmit={passSubmitHandler}>
        <div className="max-w-xl mx-auto mt-10  ">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold pb-4">Change password</h1>
            <label className="text-sm text-gray-600 mb-1">Old password</label>
            <input
              type="password"
              placeholder="......."
              name="currPass"
              value={passData.currPass}
              onChange={(e) =>
                setPassData({ ...passData, currPass: e.target.value })
              }
              className="w-xl border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">New password</label>
            <input
              type="password"
              placeholder="......."
              name="newPass"
              value={passData.newPass}
              onChange={(e) =>
                setPassData({ ...passData, newPass: e.target.value })
              }
              className="w-xl border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <button className="bg-pink-500 text-white font-semibold px-4 py-1 rounded-xl translate-y-2">
            save
          </button>
        </div>
      </form>
    </div>
  );
};
