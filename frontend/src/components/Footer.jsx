import React from "react";
import { assets } from "../assets/assets.js";
import { Logo } from "../components/Logo.jsx";
import {Link} from 'react-router-dom'
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white w-full relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Logo size="medium" />
              </div>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                Delivering delicious meals right to your doorstep. Experience
                the finest cuisine with our fast delivery and exceptional
                service.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-4">
                {[
                  {
                    icon: assets.facebook_icon,
                    name: "Facebook",
                    color: "hover:bg-blue-600",
                  },
                  {
                    icon: assets.twitter_icon,
                    name: "Twitter",
                    color: "hover:bg-sky-500",
                  },
                  {
                    icon: assets.linkedin_icon,
                    name: "LinkedIn",
                    color: "hover:bg-blue-700",
                  },
                ].map((social, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 ${social.color} group`}
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-5 h-5 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-y-2">
            <h3 className="font-bold text-lg mb-6 relative inline-block">
              Company
            </h3>
            <Link to="/about-us"  onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-500 w-20 cursor-pointer">About us</Link>
            <Link to="/return-policy"  onClick={() => window.scrollTo(0, 0)} className="hover:text-orange-500 w-50 cursor-pointer">Return & Refund Policy</Link>
         
        
          </div>

          {/* Get in Touch */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-6 relative inline-block">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500 transform -translate-y-1"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 group-hover:text-green-400 transition-colors font-medium">
                    +088-123-456-789
                  </p>
                  <p className="text-gray-400 text-sm">Mon-Sun: 8AM-10PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 group-hover:text-green-400 transition-colors font-medium">
                    contact@myfood.com
                  </p>
                  <p className="text-gray-400 text-sm">
                    We reply within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 font-medium">123 Food Street</p>
                  <p className="text-gray-400 text-sm">
                    Akhaura, Brahman-baria
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Information */}
          <div className="lg:col-span-1">
            <div className="pb-2">
              <h3 className="font-bold text-lg mb-6 relative inline-block">
                Developed by
                <span className="  absolute bottom-0 left-0 w-1/2 h-0.5 bg-purple-500 transform -translate-y-1"></span>
              </h3>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition-all duration-300 flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">HS</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Habib Sharkar</h4>
                </div>
              </div>
              <div className="gap-y-2 text-xs">
                <div className="flex items-center gap-3 text-gray-300">
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5m-9 5v6"
                    />
                  </svg>
                  <span>B.Sc. in Computer Science & Engineering</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span className="pt-2">Chittagong University of Engineering & Technology</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-gray-400 text-xs italic">
                  "Crafting digital experiences with passion and precision"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center lg:text-left">
              © {currentYear} MyFood.com - All Rights Reserved.
              <span className="text-orange-500 mx-2">•</span>
              Made with ❤️ for food lovers
            </div>

            {/* Payment Methods */}
            <div className="flex gap-4 items-center">
              <span className="text-gray-400 text-sm mr-2">We accept:</span>
              <div className="flex gap-2">
                {["💳", "📱", "🔗", "💵"].map((method, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-sm"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
