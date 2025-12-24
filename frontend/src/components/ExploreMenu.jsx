import React, { useContext } from "react";
import { menu_list } from "../assets/assets.js";
import { StoreContext } from '../context/StoreContext.jsx';

export const ExploreMenu = () => {
  const { category, setCategory } = useContext(StoreContext);

  return (
    <div className="w-full bg-white border-y border-yellow-100 shadow-sm py-2">
      <div className="max-w-full mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Browse Categories
          </h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-1"></div>
        </div>

        {/* Categories - No buttons, just clickable text */}
        <div className="flex justify-between items-center">
          {menu_list.map((item, index) => {
            const isActive = category === item.menu_name;

            return (
              <div
                key={index}
                onClick={() =>
                  setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)
                }
                className={`
                  relative px-2 py-1.5 cursor-pointer transition-all duration-300
                  ${isActive 
                    ? "text-orange-600 font-semibold" 
                    : "text-gray-600 hover:text-orange-500"
                  }
                  group
                `}
              >
                {/* Text */}
                <span className="text-sm md:text-base">
                  {item.menu_name}
                </span>
                
                {/* Underline effect on hover/active */}
                <div className={`
                  absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300
                  ${isActive 
                    ? "bg-orange-500 scale-x-100" 
                    : "bg-orange-400 scale-x-0 group-hover:scale-x-100"
                  }
                  transform origin-center
                `}></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};