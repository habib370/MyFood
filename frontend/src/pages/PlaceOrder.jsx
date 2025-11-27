import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext.jsx";
import { useNavigate } from 'react-router-dom';

export const PlaceOrder = () => {
  const { food_list, cartItems, removeAllFromCart ,url} = useContext(StoreContext);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    city: '',
    street: '',
    extraInfo: ''
  });

  // Calculate total price
  const totalPrice = food_list.reduce((total, item) => {
    if (cartItems[item._id] > 0) {
      return total + cartItems[item._id] * item.price;
    }
    return total;
  }, 0);

  const deliveryFee = totalPrice > 0 ? 5 : 0;
  const grandTotal = totalPrice + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order data to your backend
    console.log('Order submitted:', { ...formData, cartItems, grandTotal });
    removeAllFromCart();
    navigate('/order');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Place Your Order
          </h1>
          <p className="text-gray-600 text-lg">
            Almost there! Just a few details to complete your order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
          {/* Delivery Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center mb-6">
             
              <h2 className="text-2xl font-bold text-gray-900">Delivery Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    required
                    name="fullname"
                    type="text"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    required
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street *
                  </label>
                  <input
                    required
                    name="street"
                    type="text"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Street name and number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    name="extraInfo"
                    value={formData.extraInfo}
                    onChange={handleInputChange}
                    placeholder="Apartment number, floor, building name, or any special delivery instructions..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center mb-6">
                
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
              </div>

              {/* Cart Items Preview */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Items in your cart:</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                      return (
                        <div key={item._id} className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <img
                              src={url+"/images/"+item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium text-sm text-gray-800">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {cartItems[item._id]}</p>
                            </div>
                          </div>
                          <p className="font-semibold text-gray-800">
                            ${(cartItems[item._id] * item.price).toFixed(2)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-800">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-medium text-gray-800">${deliveryFee.toFixed(2)}</span>
                </div>
                
                <hr className="border-gray-300" />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-800">Grand Total:</span>
                  <span className="text-orange-600 text-xl">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSubmit}
                disabled={totalPrice === 0}
                className="w-full mt-6 h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span className="mr-2">Place Order</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Security Badge */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Secure checkout · 100% protected</span>
                </div>
              </div>
            </div>

            {/* Support Card */}
           
          </div>
        </div>
      </div>
    </div>
  );
};