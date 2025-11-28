import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Delivery = () => {
  const navigate=useNavigate();
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
        alert("Order cancelled");
        fetchOrders();
      }
    } catch (err) {
      alert("Failed to cancel order");
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

  const handleEmojiOnClick=()=>{
     toast.success("thanks for your believe")
     navigate('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track your food orders
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
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-800 p-4 text-white">
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
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {!order.payment || order.status != "delivered" ? (
                    <div className="p-4">
                      {/* Order Items */}
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                          <span className="text-base">📋</span>
                          Items
                        </h3>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md text-sm"
                            >
                              <div className="flex-1">
                                <span className="font-medium text-gray-800">
                                  {item.name}
                                </span>
                                <span className="text-gray-500 text-xs ml-1">
                                  x{item.qty}
                                </span>
                              </div>
                              <span className="font-semibold text-gray-800">
                                ${(item.price * item.qty).toFixed(2)}
                              </span>
                            </div>
                          ))}
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
                      <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">💰</span>
                          <div>
                            <p className="text-xs text-gray-600">Total</p>
                            <p className="text-lg font-bold text-gray-800">
                              ${order.amount}
                            </p>
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

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => alert("Chat with admin coming soon!")}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                        >
                          <span>💬</span>
                          Chat Support
                        </button>

                        {order.status === "food processing" && (
                          <button
                            onClick={() => cancelOrder(order._id)}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1"
                          >
                            <span>❌</span>
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200 shadow-sm">
                      <div className="mb-6">
                        {/* Animated Checkmark */}
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <div className="text-2xl text-white">✓</div>
                        </div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">
                          Order Delivered! 🎉
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          How did you feel about our service?
                        </p>
                      </div>

                      {/* Feeling Options */}
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {[
                          { emoji: "😠", label: "Angry" },
                          { emoji: "😞", label: "Poor" },
                          { emoji: "😐", label: "Okay" },
                          { emoji: "😊", label: "Happy" },
                          { emoji: "🤩", label: "Excellent" },
                        ].map((feeling, index) => (
                          <button
                            key={index}
                            onClick={handleEmojiOnClick}
                            className="flex flex-col items-center px-3 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md min-w-[70px]"
                          >
                            <span className="text-xl mb-1">
                              {feeling.emoji}
                            </span>
                            <span className="text-xs font-medium text-gray-700">
                              {feeling.label}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() => {
                            const receiptHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Receipt - ${order._id.slice(-6).toUpperCase()}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .receipt {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            padding: 40px;
            max-width: 500px;
            width: 100%;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 20px;
        }
        .logo-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #f97316, #dc2626);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
        }
        .logo-text h1 {
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(135deg, #f97316, #dc2626);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
        }
        .logo-text p {
            font-size: 12px;
            color: #6b7280;
            margin: 0;
            font-weight: 600;
            margin-top: -2px;
        }
        .header h1 {
            color: #2d3748;
            font-size: 28px;
            margin-bottom: 10px;
        }
        .order-id {
            color: #667eea;
            font-weight: bold;
            font-size: 18px;
        }
        .date {
            color: #718096;
            font-size: 14px;
            margin-top: 5px;
        }
        .section {
            margin-bottom: 25px;
            padding: 20px;
            background: #f7fafc;
            border-radius: 12px;
            border-left: 4px solid #667eea;
        }
        .section-title {
            color: #2d3748;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .items-list {
            space-y: 10px;
        }
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .item:last-child {
            border-bottom: none;
        }
        .item-name {
            color: #4a5568;
            font-weight: 500;
        }
        .item-qty {
            color: #718096;
            font-size: 12px;
        }
        .item-price {
            color: #2d3748;
            font-weight: bold;
        }
        .total-section {
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            margin-top: 20px;
        }
        .total-amount {
            font-size: 32px;
            font-weight: bold;
            margin: 10px 0;
        }
        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            background: #48bb78;
            color: white;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin-top: 10px;
        }
        .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px dashed #e2e8f0;
            text-align: center;
        }
        .signature-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-bottom: 10px;
        }
        .signature-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #f97316, #dc2626);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .signature-text {
            font-size: 16px;
            font-weight: bold;
            background: linear-gradient(135deg, #f97316, #dc2626);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #718096;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <div class="logo">
                <div class="logo-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                </div>
                <div class="logo-text">
                    <h1>MyFood</h1>
                    <p>Fresh & Fast</p>
                </div>
            </div>
            <h1>🍕 Food Order Receipt</h1>
            <div class="order-id">Order #${order._id
              .slice(-6)
              .toUpperCase()}</div>
            <div class="date">${new Date(order.date).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</div>
        </div>

        <div class="section">
            <div class="section-title">📦 Order Items</div>
            <div class="items-list">
                ${order.items
                  .map(
                    (item) => `
                    <div class="item">
                        <div>
                            <span class="item-name">${item.name}</span>
                            <span class="item-qty">x${item.qty}</span>
                        </div>
                        <span class="item-price">$${(
                          item.price * item.qty
                        ).toFixed(2)}</span>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>

        <div class="section">
            <div class="section-title">🏠 Delivery Address</div>
            <div style="color: #4a5568; line-height: 1.6;">
                <strong>${order.address?.fullname}</strong><br>
                ${order.address?.street}<br>
                ${order.address?.city}<br>
                ${
                  order.address?.extraInfo
                    ? `Note: ${order.address.extraInfo}`
                    : ""
                }
            </div>
        </div>

        <div class="total-section">
            <div>Total Amount</div>
            <div class="total-amount">$${order.amount}</div>
            <div class="status-badge">
                ${order.payment ? "✅ Payment Completed" : "⏳ Payment Pending"}
            </div>
        </div>

        <div class="signature">
            <div class="signature-logo">
                <div class="signature-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                </div>
                <div class="signature-text">MyFood</div>
            </div>
            <div style="color: #718096; font-size: 12px;">Thank you for your order!</div>
        </div>

        <div class="footer">
            We hope to see you again soon! 🎉
        </div>
    </div>
</body>
</html>
        `;

                            const blob = new Blob([receiptHTML], {
                              type: "text/html",
                            });
                            const link = document.createElement("a");
                            link.href = URL.createObjectURL(blob);
                            link.download = `MyFood_Receipt_${order._id.slice(
                              -6
                            )}.html`;
                            link.click();
                            URL.revokeObjectURL(link.href);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md text-sm"
                        >
                          <span>📥</span>
                          Download Receipt
                        </button>

                        <button
                          onClick={handleEmojiOnClick
                          }
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md text-sm"
                        >
                          <span>🔄</span>
                          Order Again
                        </button>
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
