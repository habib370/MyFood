import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdAttachMoney } from "react-icons/md";
export const Order = ({ url }) => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const deliveryOptions = ["food processing", "on the way", "delivered"];

  // Fetch all orders
  const getAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/get-all-order`, {
        headers: { token },
      });
      if (res.data.ok) setOrders(res.data.allOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  // Update order delivery/payment
  const updateOrder = async (orderId, field, value) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${url}/api/order/update`,
        { orderId, field, value },
        { headers: { token } }
      );
      if (res.data.ok) {
        toast.success("Order updated successfully!");
        getAllOrders();
      }
    } catch (err) {
      toast.error("Failed to update order");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // CSS-only enhancements
  const getStatusColor = (status) => {
    switch (status) {
      case "food processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "on the way":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getPaymentColor = (isPaid) => {
    return isPaid 
      ? "bg-green-100 text-green-800 border-green-300" 
      : "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-3 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            📦 All Orders
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Manage and track all customer orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">📭</div>
            <p className="text-sm sm:text-lg text-gray-500 mb-1">No orders found</p>
            <p className="text-xs sm:text-sm text-gray-400">Orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {orders.map((order) => ( (!order.payment || order.status!='delivered') &&
              <div
                key={order._id}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md border border-gray-200 hover:shadow-md sm:hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 sm:p-4 text-white">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                    <div>
                      <h2 className="text-sm sm:text-base font-bold">
                        🛍️ Order #{order._id.slice(-6)}
                      </h2>
                      <p className="text-xs text-blue-100 mt-0.5">
                        📅 {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-sm text-orange-600">
                      ${order.amount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  {/* Items */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2 flex items-center gap-1">
                      <span>🍕</span>
                      Order Items
                    </h3>
                    <div className="space-y-1 sm:space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-1 sm:py-2 px-2 sm:px-3 bg-gray-50 rounded-md text-xs sm:text-sm hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1">
                            <span className="font-medium text-gray-800">{item.name}</span>
                            <span className="text-gray-500 text-xs ml-1">x{item.qty}</span>
                          </div>
                          <span className="font-semibold text-gray-800">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
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

                  {/* Status Controls */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                    {/* Delivery Status */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1">
                        <span className="text-sm">🚚</span>
                        Delivery Status
                      </label>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrder(order._id, "status", e.target.value)
                        }
                        disabled={loading}
                        className={`w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-blue-300 transition-all ${
                          getStatusColor(order.status)
                        } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        {deliveryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Payment Status */}
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1">
                        <span className="text-sm">💳</span>
                        Payment Status
                      </label>
                      <select
                        value={order.payment ? "paid" : "pending"}
                        onChange={(e) =>
                          updateOrder(order._id, "payment", e.target.value === "paid")
                        }
                        disabled={loading}
                        className={`w-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-green-300 transition-all ${
                          getPaymentColor(order.payment)
                        } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                      </select>
                    </div>
                  </div>

                  {/* Loading Indicator */}
                  {loading && (
                    <div className="mt-2 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                      <span className="text-xs text-gray-500 ml-2">Updating...</span>
                    </div>
                  )}

                  {/* Order Date */}
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                      ⏰ Placed on: {new Date(order.date).toLocaleString()}
                    </p>
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
