import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaBoxOpen,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaCity,
  FaRoad,
  FaStickyNote,
  FaDollarSign,
  FaShoppingCart,
  FaReceipt,
  FaStar,
  FaRegStar,
  FaTimes,
} from "react-icons/fa";
import { TbCurrencyTaka, TbPackage, TbTruckDelivery } from "react-icons/tb";
import { GiFoodTruck, GiKnifeFork } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";

export const Myorders = () => {
  const { url } = useContext(StoreContext);
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [orderReviews, setOrderReviews] = useState({});

  const fetchOrder = async () => {
    try {
      const res = await axios.get(url + "/api/order/myOrders", {
        headers: { token },
      });
      if (res.data.ok) {
        setOrders(res.data.orders);
        const reviews = {};
        res.data.orders.forEach((order) => {
          if (order.review) {
            reviews[order._id] = order.review;
          }
        });
        setOrderReviews(reviews);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered" && order.payment
  );

  const totalSpent = deliveredOrders.reduce(
    (sum, order) => sum + order.amount,
    0
  );
  const totalItems = deliveredOrders.reduce(
    (sum, order) =>
      sum + order.items.reduce((itemSum, item) => itemSum + item.qty, 0),
    0
  );

  const handleReviewClick = (order) => {
    setSelectedOrder(order);
    
    // Check if this order already has a review
    const existingReview = orderReviews[order._id];
    
    if (existingReview) {
      // Pre-fill with existing review data
      setReviewRating(existingReview.rating || 0);
    } else {
      // Reset for new review
      setReviewRating(0);
    }
    
    setShowReviewModal(true);
  };

  const handleSubmitReview = async () => {
    if (reviewRating === 0) {
      alert("Please select a rating");
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await axios.post(
        url + "/api/order/submit-review",
        {
          itemId: selectedOrder._id,
          rating: reviewRating,
        },
        {
          headers: { token },
        }
      );
      console.log(res.data)

      if (res.data.ok) {
        // Update local state with the new review
        setOrderReviews((prev) => ({
          ...prev,
          [selectedOrder._id]: {
            rating: reviewRating,
            date: new Date().toISOString(),
          },
        }));

        // Show success message and close modal
        setTimeout(() => {
          setShowReviewModal(false);
          setSubmittingReview(false);
          // Reset form for next use
          setReviewRating(0);
          setSelectedOrder(null);
        }, 1500);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
      setSubmittingReview(false);
    }
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
    setSelectedOrder(null);
    setReviewRating(0);
    setSubmittingReview(false);
  };

  // Review Modal Component
  const ReviewModal = () => {
    if (!showReviewModal || !selectedOrder) return null;

    const hasExistingReview = orderReviews[selectedOrder._id];
    const canEdit = !hasExistingReview || !submittingReview;

    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 border border-white/20">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-t-2xl border-b border-emerald-100">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {hasExistingReview ? "Your Rating" : "Rate Your Order"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <p className="text-gray-600 mt-2">
              Order #{selectedOrder._id.slice(-8).toUpperCase()}
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {/* Stars Rating */}
            <div className="mb-8">
              <p className="text-gray-700 font-medium mb-6 text-center text-lg">
                {hasExistingReview ? "Your Rating" : "How was your experience?"}
              </p>
              <div className="flex justify-center gap-3 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => canEdit && setReviewRating(star)}
                    disabled={!canEdit}
                    className={`text-5xl transition-transform duration-200 ${
                      canEdit
                        ? "hover:scale-110 cursor-pointer active:scale-95"
                        : "cursor-default"
                    }`}
                  >
                    {star <= reviewRating ? (
                      <FaStar className="text-amber-500 drop-shadow-lg" />
                    ) : (
                      <FaRegStar className="text-gray-300" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-center text-base font-medium text-gray-700">
                {reviewRating === 0 && "Select your rating"}
                {reviewRating === 1 && "⭐ Poor"}
                {reviewRating === 2 && "⭐⭐ Fair"}
                {reviewRating === 3 && "⭐⭐⭐ Good"}
                {reviewRating === 4 && "⭐⭐⭐⭐ Very Good"}
                {reviewRating === 5 && "⭐⭐⭐⭐⭐ Excellent"}
              </p>
            </div>

            {/* Success Message */}
            {submittingReview && (
              <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 rounded-xl text-center border border-emerald-100">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Submitting your rating...</span>
                </div>
              </div>
            )}

            {hasExistingReview && !submittingReview && (
              <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 rounded-xl text-center border border-emerald-100">
                <div className="flex items-center justify-center gap-3">
                  <FaCheckCircle className="text-emerald-600" />
                  <span className="font-medium">Thank you for your rating!</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {hasExistingReview ? "Close" : "Cancel"}
              </button>
              
              {!hasExistingReview ? (
                <button
                  onClick={handleSubmitReview}
                  disabled={reviewRating === 0 || submittingReview}
                  className={`flex-1 py-3 px-4 font-medium rounded-xl transition-all duration-200 ${
                    reviewRating === 0 || submittingReview
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                  }`}
                >
                  {submittingReview ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Rating"
                  )}
                </button>
              ) : (
                <button
                  onClick={handleSubmitReview}
                  disabled={submittingReview}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                >
                  {submittingReview ? "Updating..." : "Update Rating"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-8">
      {/* Review Modal */}
      <ReviewModal />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Order History
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View all your completed and paid orders in one place
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {deliveredOrders.length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FaShoppingBag className="text-green-600 text-2xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Delivered & Paid</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Items</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {totalItems}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <GiKnifeFork className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Across all orders</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 mt-2 flex items-center">
                  {totalSpent.toFixed(2)}
                  <TbCurrencyTaka className="text-2xl ml-1" />
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaDollarSign className="text-purple-600 text-2xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">All time total</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        ) : deliveredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
              <FaBoxOpen className="text-gray-400 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No completed orders yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your delivered and paid orders will appear here. Keep ordering
              delicious food!
            </p>
            <div className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <FaCheckCircle className="text-gray-400" />
              <span>Orders must be delivered and paid to appear here</span>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {deliveredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-6 text-white">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                          <TbPackage className="text-white text-2xl" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold mb-2">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </h2>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-100">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-sm" />
                              <span>
                                {new Date(order.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                            <span className="text-white/50">•</span>
                            <div className="flex items-center gap-2">
                              <FaShoppingCart className="text-sm" />
                              <span>
                                {order.items.length} item
                                {order.items.length > 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="bg-white/20 px-4 py-2.5 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <FaCheckCircle className="text-white" />
                          <span className="font-semibold">Delivered</span>
                        </div>
                      </div>
                      <div className="bg-white/20 px-4 py-2.5 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <FaReceipt className="text-white" />
                          <span className="font-semibold">Paid</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Review Button */}
                  <div className="mb-6 flex justify-end">
                    <button
                      onClick={() => handleReviewClick(order)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg ${
                        orderReviews[order._id]
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                          : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700"
                      }`}
                    >
                      {orderReviews[order._id] ? (
                        <>
                          <FaStar />
                          <span>Change Rating</span>
                        </>
                      ) : (
                        <>
                          <FaRegStar />
                          <span>Give Rating</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Items Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-2 rounded-lg">
                        <GiFoodTruck className="text-amber-600 text-xl" />
                      </div>
                      <span>Ordered Items</span>
                      <span className="ml-auto text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                        {order.items.length} item
                        {order.items.length > 1 ? "s" : ""}
                      </span>
                    </h3>

                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-4 px-5 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-xl border border-gray-200 hover:border-amber-200 hover:shadow-md transition-all duration-200 group"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-5">
                              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-lg border border-gray-300">
                                <GiKnifeFork className="text-gray-600 text-xl" />
                              </div>
                              <div className="flex-1">
                                <div className="mb-2">
                                  <span className="font-semibold text-gray-900 text-lg">
                                    {item.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-6">
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <span className="text-sm">Quantity:</span>
                                    <span className="font-semibold bg-gray-100 px-2 py-1 rounded">
                                      {item.qty}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Unit Price:
                                    <span className="font-semibold text-gray-700 ml-1">
                                      {item.price.toFixed(2)}
                                      <TbCurrencyTaka className="inline text-xs ml-0.5" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-xl text-gray-900 flex items-center">
                              <span>{(item.price * item.qty).toFixed(2)}</span>
                              <TbCurrencyTaka className="text-lg ml-1" />
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Subtotal
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="mb-8 p-5 bg-gradient-to-r from-gray-50/50 to-gray-100/50 rounded-xl border border-gray-300">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700 font-medium">
                          Total Amount
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Including all charges
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900 flex items-center justify-end">
                          {order.amount}
                          <TbCurrencyTaka className="text-3xl ml-1" />
                        </p>
                        <p className="text-sm text-green-700 font-medium mt-2 flex items-center justify-end">
                          <FaCheckCircle className="w-3 h-3 mr-1.5" />
                          Payment completed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 rounded-xl border border-blue-200 p-5">
                      <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-2 rounded-lg">
                          <FaMapMarkerAlt className="text-blue-600" />
                        </div>
                        <span>Delivery Information</span>
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-white p-3 rounded-lg border border-blue-200">
                            <FaUser className="text-blue-600" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">
                              {order.address?.fullname}
                            </p>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center gap-3">
                                <FaEnvelope className="text-gray-500 text-sm" />
                                <span className="text-gray-700">
                                  {order.address?.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-xl border border-green-200 p-5">
                      <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-3">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-2 rounded-lg">
                          <MdLocalShipping className="text-green-600" />
                        </div>
                        <span>Delivery Address</span>
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-white p-3 rounded-lg border border-green-200">
                            <FaCity className="text-green-600" />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <FaCity className="text-gray-500 text-sm" />
                              <span className="text-gray-700 font-medium">
                                City:
                              </span>
                              <span className="text-gray-900">
                                {order.address?.city}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <FaRoad className="text-gray-500 text-sm" />
                              <span className="text-gray-700 font-medium">
                                Street:
                              </span>
                              <span className="text-gray-900">
                                {order.address?.street}
                              </span>
                            </div>
                          </div>
                        </div>

                        {order.address?.extraInfo && (
                          <div className="mt-4 pt-4 border-t border-green-200">
                            <div className="flex items-start gap-3">
                              <div className="bg-yellow-50 p-2 rounded-lg">
                                <FaStickyNote className="text-amber-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">
                                  Delivery Note
                                </p>
                                <p className="text-gray-600 text-sm italic">
                                  {order.address.extraInfo}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-emerald-100 to-green-100 p-2 rounded-lg">
                          <TbTruckDelivery className="text-emerald-600 text-xl" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Delivery completed
                          </p>
                          <p className="text-sm text-gray-500">
                            Thank you for your order!
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Order ID: {order._id}
                      </div>
                    </div>
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