import React from "react";
import { assets } from "../assets/assets.js";

export const LoginPopup = ({ setShow }) => {
  const [isClose, setIsClose] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  if (isClose) return null; // Hide popup when closed

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 pt-15">
      <div className="relative bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
        {/* Close button */}
        <button
          onClick={() => {
            setIsClose(true);
            setShow(false);
          }}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 group"
        >
          <svg 
            className="w-4 h-4 text-gray-600 group-hover:text-gray-800" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {!isSignedIn ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-600 text-sm">
            {!isSignedIn ? "Join us today!" : "Log in to your account"}
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {!isSignedIn && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  type="text"
                  required
                  placeholder="John"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  type="text"
                  required
                  placeholder="Doe"
                />
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              type="email"
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              type="password"
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 mt-4"
          >
            {!isSignedIn ? "Create Account" : "Log In"}
          </button>
        </form>

        {/* Toggle auth mode */}
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setIsSignedIn((prev) => !prev)}
            className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm font-medium"
          >
            {!isSignedIn
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};