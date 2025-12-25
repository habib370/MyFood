import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaRocketchat, 
  FaTag, 
  FaMapMarkerAlt, 
  FaCheckCircle, 
  FaShippingFast, 
  FaMoneyBillWave, 
  FaClock,
  FaBox,
  FaFireAlt,
  FaHome,
  FaShoppingBag,
  FaReceipt,
  FaUser,
  FaListAlt
} from "react-icons/fa";
import { 
  GiCookingPot,
  GiKnifeFork
} from "react-icons/gi";
import { 
  MdOutlineFoodBank
} from "react-icons/md";
import { 
  TbCurrencyTaka
} from "react-icons/tb";
import { 
  BiPackage
} from "react-icons/bi";
import { 
  RiRestaurantFill
} from "react-icons/ri";
import { FcCancel, FcOk, FcProcess } from "react-icons/fc";
import { 
  PiCookingPotBold,
  PiMotorcycleDuotone
} from "react-icons/pi";

export const Delivery = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [activeOrdersCount, setActiveOrdersCount] = useState(0);
  const token = localStorage.getItem("token");
  
  const fetchOrders = async () => {
    try {
      const res = await axios.get(url + "/api/order/user-orders", {
        headers: { token },
      });

      if (res.data.ok) {
        const allOrders = res.data.orders;
        setOrders(allOrders);
        // Count active orders (not delivered or without payment)
        const activeOrders = allOrders.filter(order => 
          (!order.payment || order.status !== 'delivered')
        );
        setActiveOrdersCount(activeOrders.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [orders]);

  const cancelOrder = async (id) => {
    try {
      const res = await axios.post(
        url + "/api/order/cancel",
        { id },
        { headers: { token } }
      );
      if (res.data.ok) {
        toast.success("Order cancelled successfully");
        fetchOrders();
      }
    } catch (err) {
      toast.error("Failed to cancel order");
    }
  };

  const getStatusIcons = (status) => {
    switch (status) {
      case "food processing":
        return {
          icon: <GiCookingPot className="text-amber-600 animate-pulse" size={28} />,
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          textColor: "text-amber-700",
          step: 2
        };
      case "on the way":
        return {
          icon: <FaShippingFast className="text-blue-600 animate-bounce" size={28} />,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-700",
          step: 3
        };
      case "delivered":
        return {
          icon: <FaCheckCircle className="text-green-600" size={28} />,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-700",
          step: 4
        };
      default:
        return {
          icon: <FaBox className="text-gray-600" size={28} />,
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-700",
          step: 0
        };
    }
  };

  const getTimelineIcons = () => {
    return [
      { icon: <FaReceipt className="text-indigo-600" size={20} />, label: "Order Received", color: "indigo" },
      { icon: <PiCookingPotBold className="text-amber-600" size={20} />, label: "Food Processing", color: "amber" },
      { icon: <PiMotorcycleDuotone className="text-blue-600" size={20} />, label: "On the way", color: "blue" },
      { icon: <FaHome className="text-green-600" size={20} />, label: "Delivered", color: "green" }
    ];
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return price - (price * discount) / 100;
  };

  // Calculate total savings for an order
  const calculateOrderSavings = (order) => {
    if (order.savings) return order.savings;
    
    // Fallback calculation if savings not in order data
    return order.items.reduce((savings, item) => {
      const hasDiscount = item.discount && item.discount > 0;
      if (hasDiscount) {
        const originalItemTotal = item.price * item.qty;
        const discountedItemTotal = calculateDiscountedPrice(item.price, item.discount) * item.qty;
        return savings + (originalItemTotal - discountedItemTotal);
      }
      return savings;
    }, 0);
  };

  const renderTimeline = (orderStatus) => {
    const statusSteps = {
      "food processing": 2,
      "on the way": 3,
      "delivered": 4
    };
    
    const statusIndex = statusSteps[orderStatus] || 1;
    
    return (
      <div className="relative py-8">
        {/* Timeline line */}
        <div className="absolute left-4 right-4 top-10 h-1.5 bg-gray-200 rounded-full">
          {/* Animated progress */}
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-amber-500 to-blue-500 rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${(statusIndex / 4) * 100}%` }}
          ></div>
        </div>

        {/* Timeline steps */}
        <div className="relative z-10 flex justify-between">
          {getTimelineIcons().map((step, index) => {
            const isActive = index < statusIndex;
            const isCurrent = index === statusIndex - 1;
            
            return (
              <div key={index} className="flex flex-col items-center w-20">
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  ${isActive 
                    ? `bg-white border-2 ${step.color === "indigo" ? "border-indigo-300 shadow-md" : 
                      step.color === "amber" ? "border-amber-300 shadow-md" :
                      step.color === "blue" ? "border-blue-300 shadow-md" :
                      "border-green-300 shadow-md"}` 
                    : 'bg-gray-100 border-2 border-gray-300'
                  }
                  ${isCurrent ? 'ring-2 ring-opacity-50 ' + 
                    (step.color === "indigo" ? "ring-indigo-300 animate-pulse" : 
                     step.color === "amber" ? "ring-amber-300 animate-pulse" :
                     step.color === "blue" ? "ring-blue-300 animate-pulse" :
                     "ring-green-300 animate-pulse") : ''}
                  transition-all duration-300
                `}>
                  <div className={`${isActive ? 
                    (step.color === "indigo" ? "text-indigo-600" : 
                     step.color === "amber" ? "text-amber-600" :
                     step.color === "blue" ? "text-blue-600" :
                     "text-green-600") : 
                    'text-gray-400'}`}>
                    {step.icon}
                  </div>
                </div>
                <span className={`text-xs font-medium mt-3 text-center ${isActive ? 
                  (step.color === "indigo" ? "text-indigo-700 font-semibold" : 
                   step.color === "amber" ? "text-amber-700 font-semibold" :
                   step.color === "blue" ? "text-blue-700 font-semibold" :
                   "text-green-700 font-semibold") : 
                  'text-gray-600'}`}>
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="text-xs text-gray-500 mt-1 font-medium">
                    Current
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 px-4 sm:px-6">
      <ToastContainer />
      <div className="max-w-full mx-auto">
        {/* Enhanced Header Section */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 shadow-2xl mb-6 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full translate-y-16 -translate-x-10"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-2xl shadow-lg">
                    <FaShoppingBag className="text-white text-3xl" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      My Orders
                    </h1>
                    <p className="text-gray-300 text-sm">
                      Track your food journey from kitchen to doorstep
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700 min-w-[180px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">Active Orders</p>
                        <p className="text-2xl font-bold text-white mt-1">{activeOrdersCount}</p>
                      </div>
                      <div className="bg-amber-500/20 p-2 rounded-lg">
                        <FaListAlt className="text-amber-300 text-xl" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700 min-w-[180px]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">Total Orders</p>
                        <p className="text-2xl font-bold text-white mt-1">{orders.length}</p>
                      </div>
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <FaUser className="text-blue-300 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <FaClock className="text-gray-500 text-sm" />
              <span className="text-gray-600 text-sm font-medium">
                Real-time order tracking
              </span>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
              <FaBox className="text-gray-400 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No orders yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your order history will appear here once you place an order. Ready to order something delicious?
            </p>
            <button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (!order.payment || order.status !== 'delivered') && (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-900 to-black p-6 text-white relative">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-800 p-3 rounded-xl">
                          <BiPackage className="text-gray-300 text-2xl" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold">
                              Order #{order._id.slice(-8).toUpperCase()}
                            </h2>
                            <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                              ID: {order._id.slice(0, 8)}...
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-300">
                            <div className="flex items-center gap-2">
                              <FaClock className="text-xs" />
                              <span className="text-sm">
                                {new Date(order.date).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <span className="text-gray-500">•</span>
                            <div className="text-sm">
                              {order.items.length} item{order.items.length > 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status and Savings in top right */}
                    <div className="flex flex-col items-end gap-4">
                      {/* Status Badge */}
                      <div className={`px-5 py-3 rounded-xl text-sm font-bold border ${getStatusIcons(order.status).borderColor} ${getStatusIcons(order.status).bgColor} ${getStatusIcons(order.status).textColor} shadow-lg`}>
                        <div className="flex items-center gap-3">
                          {getStatusIcons(order.status).icon}
                          <div className="text-center">
                            <div className="font-bold">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
                            <div className="text-xs font-normal opacity-90">Status</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Savings Animation */}
                      {calculateOrderSavings(order) > 0 && (
                        <div className="animate-pulse">
                          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg border border-orange-300">
                            <FaFireAlt className="w-4 h-4 animate-spin" />
                            <span>Saved {calculateOrderSavings(order).toFixed(2)}৳</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="px-6 pt-8 pb-2">
                  <div className="mb-2">
                    <h3 className="text-sm font-semibold text-gray-700 mb-6 flex items-center gap-2">
                      <FaShippingFast className="text-gray-600" />
                      <span>Order Tracking Timeline</span>
                      <span className="ml-auto text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        Live Tracking
                      </span>
                    </h3>
                  </div>
                  {renderTimeline(order.status)}
                </div>

                <div className="p-6">
                  {/* Order Items */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-2 rounded-lg">
                          <MdOutlineFoodBank className="text-amber-600 text-xl" />
                        </div>
                        <span>Ordered Items</span>
                      </h3>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {order.items.map((item, idx) => {
                        const hasDiscount = item.discount && item.discount > 0;
                        const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
                        const itemTotal = discountedPrice * item.qty;
                        const originalItemTotal = item.price * item.qty;
                        
                        return (
                          <div
                            key={idx}
                            className="flex justify-between items-center py-4 px-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-amber-200 hover:shadow-md transition-all duration-200 group"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-5">
                                <div className={`p-3 rounded-lg ${hasDiscount ? 'bg-gradient-to-br from-red-50 to-orange-50 border border-red-100' : 'bg-gray-100 border border-gray-200'}`}>
                                  {hasDiscount ? (
                                    <GiKnifeFork className="text-red-500 text-xl" />
                                  ) : (
                                    <RiRestaurantFill className="text-gray-600 text-xl" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-1">
                                    <span className="font-semibold text-gray-900 text-lg">
                                      {item.name}
                                    </span>
                                    {hasDiscount && (
                                      <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-xs font-bold rounded-full border border-red-200">
                                        <FaTag className="w-2.5 h-2.5" />
                                        <span>{item.discount}% OFF</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-6 mt-2">
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <span className="text-sm">Quantity:</span>
                                      <span className="font-semibold">{item.qty}</span>
                                    </div>
                                    {hasDiscount && (
                                      <div className="text-sm text-gray-500 line-through flex items-center">
                                        <span>{originalItemTotal.toFixed(2)}</span>
                                        <TbCurrencyTaka className="text-xs ml-0.5" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-bold text-xl flex items-center ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                                <span>{itemTotal.toFixed(2)}</span>
                                <TbCurrencyTaka className="text-lg ml-1" />
                              </div>
                              {hasDiscount && (
                                <div className="text-xs text-green-600 font-medium mt-1">
                                  Saved {((originalItemTotal - itemTotal).toFixed(2))}৳
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Address & Payment Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-5">
                      <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-2 rounded-lg">
                          <FaMapMarkerAlt className="text-blue-600" />
                        </div>
                        <span>Delivery Address</span>
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-white p-3 rounded-lg border border-blue-200">
                            <FaHome className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg mb-1">{order.address?.fullname}</p>
                            <p className="text-gray-700">{order.address?.city}</p>
                            <p className="text-gray-700">{order.address?.street}</p>
                            {order.address?.extraInfo && (
                              <div className="mt-3 pt-3 border-t border-blue-200">
                                <p className="text-sm text-gray-600 italic">
                                  <span className="font-medium text-gray-700">Note:</span> {order.address.extraInfo}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-5">
                      <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-3">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-2 rounded-lg">
                          <FaMoneyBillWave className="text-green-600" />
                        </div>
                        <span>Payment Details</span>
                      </h3>
                      <div className="space-y-5">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">Payment Status</span>
                          <span className={`px-4 py-2.5 rounded-lg text-sm font-bold ${order.payment ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-amber-100 text-amber-800 border border-amber-200'} shadow-sm`}>
                            <div className="flex items-center gap-2">
                              {order.payment ? <FcOk size={18} /> : <FcProcess size={18} />}
                              <span>{order.payment ? "Paid Successfully" : "Pending Payment"}</span>
                            </div>
                          </span>
                        </div>
                        <div className="pt-4 border-t border-green-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-gray-700 font-medium">Total Amount</p>
                              <p className="text-sm text-gray-500 mt-1">Including all charges</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900 flex items-center justify-end">
                                {order.amount}
                                <TbCurrencyTaka className="text-2xl ml-1" />
                              </p>
                              {calculateOrderSavings(order) > 0 && (
                                <p className="text-sm text-green-700 font-medium flex items-center justify-end mt-2">
                                  <FaFireAlt className="w-3 h-3 mr-1.5 animate-pulse" />
                                  Total saved: {calculateOrderSavings(order).toFixed(2)}৳
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => toast.info("Chat with admin coming soon!")}
                      className="flex-1 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 border border-gray-800 group"
                    >
                      <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                        <FaRocketchat size={18} />
                      </div>
                      <span>Chat with Support</span>
                    </button>

                    <button
                      onClick={() => order.status === "food processing" ? cancelOrder(order._id) : null}
                      disabled={order.status !== "food processing"}
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 border ${
                        order.status === "food processing" 
                          ? 'bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white border-red-600 cursor-pointer'
                          : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 border-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        order.status === "food processing" 
                          ? 'bg-white/20' 
                          : 'bg-gray-400/20'
                      }`}>
                        <FcCancel size={18} />
                      </div>
                      <span>
                        {order.status === "food processing" 
                          ? "Cancel Order" 
                          : "Cannot Cancel"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};