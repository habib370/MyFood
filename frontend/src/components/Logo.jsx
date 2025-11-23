import React from 'react';

export const Logo = ({ size = "medium", className = "" }) => {
  const sizes = {
    small: "w-24",
    medium: "w-32", 
    large: "w-40"
  };

  return (
    <div className={`flex items-center space-x-2 ${sizes[size]} ${className}`}>
      {/* Logo Icon */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        </div>
      </div>
      
      {/* Logo Text */}
      <div className="flex-shrink-0 pl-2">
        <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
          MyFood
        </h1>
        <p className="text-xs text-gray-500 -mt-1 font-medium">Fresh & Fast</p>
      </div>
    </div>
  );
};