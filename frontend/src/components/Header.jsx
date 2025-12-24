import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets.js';
import { FaArrowDown, FaFire, FaStar, FaBolt, FaHeart, FaUtensils } from 'react-icons/fa';

export const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] flex items-center flex-col  gap-y-4 justify-center overflow-hidden group">
      {/* Blurred Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: `url(${assets.background})`,
          filter: 'blur(2px) brightness(0.9)'
        }}
      ></div>
      
      {/* Dark Overlay for Better Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-gray-900/70 mix-blend-normal"></div>
      
      {/* Subtle Color Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-yellow-900/20 mix-blend-overlay"></div>
      
      {/* Animated Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-float-slow z-10">
        <FaUtensils className="text-white/30 text-2xl" />
      </div>
      <div className="absolute top-1/3 right-20 animate-float-medium delay-1000 z-10">
        <FaFire className="text-orange-400/40 text-2xl" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-float-fast delay-500 z-10">
        <FaHeart className="text-red-400/30 text-2xl" />
      </div>
      <div className="absolute top-1/2 right-1/3 animate-float-slow delay-1500 z-10">
        <FaStar className="text-yellow-400/40 text-2xl" />
      </div>
      
      {/* Content Container */}
      <div 
        className="relative text-center px-6 max-w-4xl z-20"
        style={{
          transform: `perspective(1000px) translateZ(${scrollProgress * 0.3}px)`,
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}
      >
        {/* Main Title with High Contrast */}
        <div className="overflow-hidden mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-white drop-shadow-lg">
              Welcome to{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] drop-shadow-lg">
                MyFood
              </span>
              <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-full"></span>
            </span>
          </h1>
        </div>
        
        {/* Subtitle with Clear Contrast */}
        <div className="relative overflow-hidden mb-10">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white mb-4 leading-relaxed drop-shadow-lg transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 ease-out">
            <span className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
              Discover amazing culinary experiences
            </span>
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-100 leading-relaxed transform translate-x-[100%] group-hover:translate-x-0 transition-transform duration-1000 ease-out delay-300 drop-shadow-lg">
            <span className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
              Explore flavors that tell a story
            </span>
          </p>
        </div>
        
        {/* Enhanced News Ticker with Better Contrast */}
        <div className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl border-2 border-white/20 py-4 mb-8 group/ticker hover:border-orange-400/50 transition-all duration-500 shadow-2xl">
          <div className="flex whitespace-nowrap animate-marquee group-hover/ticker:paused">
            {[...Array(3)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                <span className="mx-10 text-white font-bold flex items-center gap-3 hover:scale-110 transition-transform">
                  <FaBolt className="text-yellow-400 animate-pulse" /> 
                  <span className="text-yellow-300">Fresh Meals Everyday</span>
                </span>
                <span className="mx-10 text-white font-bold flex items-center gap-3 hover:scale-110 transition-transform">
                  <FaStar className="text-orange-400 animate-spin-slow" /> 
                  <span className="text-orange-300">Top Rated Restaurants</span>
                </span>
                <span className="mx-10 text-white font-bold flex items-center gap-3 hover:scale-110 transition-transform">
                  <FaFire className="text-red-400 animate-bounce" /> 
                  <span className="text-red-300">Hot Deals Available</span>
                </span>
                <span className="mx-10 text-white font-bold flex items-center gap-3 hover:scale-110 transition-transform">
                  <FaHeart className="text-pink-400 animate-pulse" /> 
                  <span className="text-pink-300">Made with Love</span>
                </span>
              </React.Fragment>
            ))}
          </div>
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent"></div>
        </div>
        
        {/* Stats with Clear Background */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 pt-4">
          {[
            { 
              value: '500+', 
              label: 'Premium Restaurants', 
              icon: FaUtensils,
              bg: 'from-orange-900/50 to-orange-800/40',
              text: 'text-orange-200'
            },
            { 
              value: '98%', 
              label: 'Happy Customers', 
              icon: FaHeart,
              bg: 'from-red-900/50 to-pink-800/40',
              text: 'text-red-200'
            },
            { 
              value: '24/7', 
              label: 'Fast Delivery', 
              icon: FaBolt,
              bg: 'from-yellow-900/50 to-yellow-800/40',
              text: 'text-yellow-200'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${stat.bg} backdrop-blur-lg border border-white/10 rounded-2xl p-6 transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group/stat shadow-lg`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col items-center">
                <stat.icon className={`text-3xl mb-3 ${stat.text} opacity-90`} />
                <div className={`text-3xl font-bold ${stat.text} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-white/90 font-medium text-sm tracking-wide">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button with Clear Contrast */}
      
      </div>
      
      {/* Scroll Indicator with Clear Visibility */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <div className="text-sm text-white/80 mb-3 font-medium tracking-wide">
            Scroll to discover
          </div>
         
        </div>
      </div>
         <div className="relative w-8 h-16 border-2 border-white/40 rounded-full flex justify-center overflow-hidden backdrop-blur-sm bg-black/20">
            <div 
              className="w-2 h-5 bg-gradient-to-b from-orange-400 to-yellow-300 rounded-full mt-3 animate-bounce"
              style={{
                animationDuration: '2s',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            ></div>
            {/* Progress Bar */}
            <div 
              className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500/40 to-transparent"
              style={{ height: `${scrollProgress}%` }}
            ></div>
          </div>
      {/* Subtle Mouse Follow Effect */}
      <div 
        className="absolute w-64 h-64 rounded-full pointer-events-none opacity-10"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,165,0,0.2) 0%, rgba(255,255,0,0.1) 30%, transparent 70%)',
          filter: 'blur(30px)'
        }}
      ></div>
    </div>
  );
};