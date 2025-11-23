import React from "react";
import { menu_list } from "../assets/assets.js";

export const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-6 md:gap-10 px-4 md:px-12 mt-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
          Explore Our Menu
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Discover our delicious categories and find your favorite dishes
        </p>
      </div>

      {/* Menu Categories */}
      <div className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide py-4 px-2">
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;

          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="flex flex-col items-center cursor-pointer flex-shrink-0 group"
            >
              {/* Image Container */}
              <div
                className={`
                  relative rounded-full p-1 transition-all duration-500
                  ${isActive 
                    ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-2xl shadow-orange-500/50" 
                    : "bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg hover:shadow-xl"
                  }
                  transform ${isActive ? "scale-110" : "group-hover:scale-105"}
                `}
              >
                <img
                  className={`
                    w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-full 
                    transition-all duration-500 border-4
                    ${isActive ? "border-white" : "border-transparent group-hover:border-white/50"}
                  `}
                  src={item.menu_image}
                  alt={item.menu_name}
                />
                
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Category Name */}
              <p
                className={`
                  mt-3 text-sm md:text-lg font-semibold transition-all duration-500 text-center 
                  ${isActive 
                    ? "text-orange-600 font-bold" 
                    : "text-gray-700 group-hover:text-gray-900"
                  }
                  transform ${isActive ? "scale-105" : "group-hover:scale-105"}
                `}
              >
                {item.menu_name}
              </p>

              {/* Hover Effect Line */}
              <div
                className={`
                  w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 
                  transition-all duration-500 mt-1
                  ${isActive ? "w-full" : "group-hover:w-1/2"}
                `}
              />
            </div>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};