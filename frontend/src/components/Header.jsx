import React from 'react';
import { assets } from '../assets/assets.js';

export const Header = () => {
  return (
    <div
      className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] bg-cover bg-center bg-fixed flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>

      {/* Content on top of background */}
      <div className="relative text-center text-white px-6 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            MyFood
          </span>
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 text-gray-200 leading-relaxed">
          Discover amazing culinary experiences and explore new flavors
        </p>
       
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};