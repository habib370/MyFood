import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const navigate = useNavigate();
  const { user, url, setUser } = useContext(StoreContext);
  const token = localStorage.getItem("token");
  const [nameData, setNameData] = useState({
    firstName: "",
    lastName: "",
  });
  const [passData, setPassData] = useState({
    currPass: "",
    newPass: "",
  });
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  
  const otpSubmitHandler = () => {
    fetchData();
  };
  
  const nameSubmitHandler = (e) => {
    e.preventDefault();
    fetchUpdatedNameData();
  };
  
  const passSubmitHandler = (e) => {
    e.preventDefault();
    putUpdatedPassword()
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(url + "/api/user/verify-email", {
        email,
      });
      if (response.data.ok) {
        setIsOtpSent(true);
      }
      console.log(response.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const fetchUpdatedNameData = async () => {
    try {
      const response = await axios.post(
        url + "/api/user/update-name",
        { firstName: nameData.firstName, lastName: nameData.lastName },
        { headers: { token } }
      );
      if (response.data.ok) {
        setUser(response.data.user);
        navigate("/profile");
        toast.success(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const putUpdatedPassword = async () => {
    try {
      const response = await axios.post(
        url + "/api/user/change-pass",
        {
          currPass: passData.currPass,
          newPass: passData.newPass,
        },
        { headers: { token } }
      );
      if (response.data.ok) {
        navigate("/profile");
        toast.success(response.data.message);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 px-3 sm:px-4 md:px-6">
      <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
        {/* Name Update Section */}
        <form onSubmit={nameSubmitHandler} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <h1 className="text-lg md:text-2xl font-semibold text-gray-800 pb-3 md:pb-4">My Profile</h1>
          
          <div className="space-y-4 md:space-y-5">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="text-xs md:text-sm text-gray-600 mb-1">First name</label>
              <input
                type="text"
                name="firstName"
                value={nameData.firstName}
                placeholder={user?.firstName}
                onChange={(e) =>
                  setNameData({ ...nameData, firstName: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="text-xs md:text-sm text-gray-600 mb-1">Last name</label>
              <input
                type="text"
                name="lastName"
                value={nameData.lastName}
                placeholder={user?.lastName}
                onChange={(e) =>
                  setNameData({ ...nameData, lastName: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm md:text-base px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-colors duration-200 shadow-sm translate-y-2"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Email Verification Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          {!isOtpSent ? (
            <div className="space-y-4 md:space-y-5">
              <h1 className="text-lg md:text-2xl font-semibold text-gray-800 pb-3 md:pb-4">Verify Email</h1>
              <div className="flex flex-col">
                <label className="text-xs md:text-sm text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder={user?.email}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={otpSubmitHandler}
                className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm md:text-base px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-colors duration-200 shadow-sm cursor-pointer translate-y-2"
              >
                Send OTP
              </button>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-5">
              <h1 className="text-lg md:text-2xl font-semibold text-gray-800 pb-3 md:pb-4">Verify Email</h1>
              <div className="flex flex-col">
                <label className="text-xs md:text-sm text-gray-600 mb-1">Enter OTP</label>
                <input
                  type="number"
                  placeholder="Enter 6-digit OTP..."
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                />
              </div>
              <button
                onSubmit={() => {}}
                className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm md:text-base px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-colors duration-200 shadow-sm cursor-pointer translate-y-2"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>

        {/* Password Change Section */}
        <form onSubmit={passSubmitHandler} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="space-y-4 md:space-y-5">
            <h1 className="text-lg md:text-2xl font-semibold text-gray-800 pb-3 md:pb-4">Change Password</h1>
            
            <div className="flex flex-col">
              <label className="text-xs md:text-sm text-gray-600 mb-1">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                name="currPass"
                value={passData.currPass}
                onChange={(e) =>
                  setPassData({ ...passData, currPass: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-xs md:text-sm text-gray-600 mb-1">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                name="newPass"
                value={passData.newPass}
                onChange={(e) =>
                  setPassData({ ...passData, newPass: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm md:text-base px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-colors duration-200 shadow-sm"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
