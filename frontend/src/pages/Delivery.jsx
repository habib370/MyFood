import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRocketchat, FaTag } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { TbCurrencyTaka } from "react-icons/tb";

export const Delivery = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  
  const fetchOrders = async () => {
    try {
      const res = await axios.get(url + "/api/order/user-orders", {
        headers: { token },
      });

      if (res.data.ok) {
        setOrders(res.data.orders);
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

  const statusColor = (status) => {
    switch (status) {
      case "food processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "on the way":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case "food processing":
        return "👨‍🍳";
      case "on the way":
        return "🚚";
      case "delivered":
        return "✅";
      default:
        return "📦";
    }
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

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Check My Orders to view order history 
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">🍕</div>
            <p className="text-gray-500 text-lg mb-1">No orders found</p>
            <p className="text-gray-400 text-sm">
              Your orders will appear here!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => ( (!order.payment || order.status!='delivered') &&
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                {/* Order Header with Discount Info */}
                <div className="bg-gray-800 p-4 text-white relative">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-bold">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </h2>
                        <p className="text-gray-300 text-xs mt-1">
                          {new Date(order.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {statusIcon(order.status)}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColor(
                            order.status
                          )}`}
                        >
                          {order.status}...
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Discount Badge */}
                  {calculateOrderSavings(order) > 0 && (
                    <div className="absolute bottom-2 right-2">
                      <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        <FaTag className="w-2 h-2" />
                        <span>SAVED</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {(!order.payment || order.status != "delivered") &&(
                    <div className="p-4">
                      {/* Order Items */}
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                          <span className="text-base">📋</span>
                          Items
                        </h3>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => {
                            const hasDiscount = item.discount && item.discount > 0;
                            const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
                            const itemTotal = discountedPrice * item.qty;
                            const originalItemTotal = item.price * item.qty;
                            
                            return (
                              <div
                                key={idx}
                                className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md text-sm"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium text-gray-800">
                                      {item.name}
                                    </span>
                                    {hasDiscount && (
                                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                                        <FaTag className="w-2 h-2" />
                                        <span>{item.discount}%</span>
                                      </div>
                                    )}
                                    <span className="text-gray-500 text-xs ml-1">
                                      x{item.qty}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <div className={`font-semibold flex items-center ${hasDiscount ? 'text-red-600' : 'text-gray-800'}`}>
                                    {itemTotal.toFixed(2)}
                                    <TbCurrencyTaka className="text-xs ml-1" />
                                  </div>
                                  {hasDiscount && (
                                    <div className="text-xs text-gray-500 line-through flex items-center">
                                      {originalItemTotal.toFixed(2)}
                                      <TbCurrencyTaka className="text-xs ml-1" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Address Information */}
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                          <span className="text-base">🏠</span>
                          Delivery Address
                        </h3>
                        <div className="text-gray-700 text-xs space-y-1">
                          <p>
                            <strong>Name:</strong> {order.address?.fullname}
                          </p>
                          <p>
                            <strong>City:</strong> {order.address?.city}
                          </p>
                          <p className="truncate">
                            <strong>Address:</strong> {order.address?.street}
                          </p>
                          {order.address?.extraInfo && (
                            <p>
                              <strong>Note:</strong> {order.address.extraInfo}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        {/* Savings Display */}
                        {calculateOrderSavings(order) > 0 && (
                          <div className="flex justify-between items-center mb-2 p-2 bg-green-50 rounded border border-green-200">
                            <div className="flex items-center gap-2">
                              <FaTag className="text-green-500 text-sm" />
                              <span className="text-xs font-medium text-green-800">You Saved:</span>
                            </div>
                            <div className="font-bold text-green-700 flex items-center">
                              -{calculateOrderSavings(order).toFixed(2)}
                              <TbCurrencyTaka className="text-xs ml-1" />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div>
                              <p className="text-xs text-gray-600">Total Amount</p>
                              <div className="flex flex-col">
                                <p className="text-lg font-bold text-gray-800 flex items-center">
                                  {order.amount}
                                  <TbCurrencyTaka className="text-lg ml-1" />
                                </p>
                                {/* Original Amount if savings exist */}
                                {calculateOrderSavings(order) > 0 && order.originalAmount && (
                                  <p className="text-xs text-gray-500 line-through flex items-center">
                                    {order.originalAmount}
                                    <TbCurrencyTaka className="text-xs ml-1" />
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl">💳</span>
                            <div className="text-right">
                              <p className="text-xs text-gray-600">Payment</p>
                              <p
                                className={`text-sm font-semibold ${
                                  order.payment
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {order.payment ? "Paid" : "Pending"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col justify-between sm:flex-row gap-2">
                        <button
                          onClick={() => toast.info("Chat with admin coming soon!")}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                        >
                          <FaRocketchat size={20}/>
                          Chat Support
                        </button>

                        {order.status === "food processing" && (
                          <button
                            onClick={() => cancelOrder(order._id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                          >
                            <FcCancel size={20} />
                            Cancel order
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};