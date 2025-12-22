import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { VscVerifiedFilled } from "react-icons/vsc";
import StarIcon from "@mui/icons-material/Star";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { GiEmptyHourglass } from "react-icons/gi";
import { FaTag } from "react-icons/fa";
export const SingleFoodItem = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const { itemId } = useParams();
  const {
    addToCart,
    deleteFromCart,
    cartItems,
    isLoggedIn,
    url,
    showLogInPopUp,
    setShowLogInPopUp,
  } = useContext(StoreContext);

  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const cartQuantity = cartItems[itemId] || 0;
  const [activeReply, setActiveReply] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState({});
  const [replyCounts, setReplyCounts] = useState({});
  // Add this after the imports, before the component
const calculateDiscountedPrice = (price, discount) => {
  if (!discount || discount <= 0) return price;
  return price - (price * discount) / 100;
};
  // Fetch item data
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${url}/api/food/single-item/${itemId}`);
        setItem(res.data.item);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch item");
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId, url]);

  // Fetch comments and their reply counts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${url}/api/comment/${itemId}`);
        const commentsData = res.data.comments || [];
        setComments(commentsData);

        // Fetch reply counts for all comments
        const counts = {};
        for (const comment of commentsData) {
          try {
            const replyRes = await axios.get(
              `${url}/api/comment/all-replies/${comment._id}`
            );
            counts[comment._id] = replyRes.data.replies?.length || 0;
          } catch (err) {
            console.error(
              "Failed to fetch reply count for comment:",
              comment._id
            );
            counts[comment._id] = 0;
          }
        }
        setReplyCounts(counts);
      } catch (err) {
        console.error(err);
        
      }
    };
    fetchComments();
  }, [itemId, url]);

  const handleAddComment = async () => {
    if (!isLoggedIn()) {
     console.log("Please log in first");
      setShowLogInPopUp(true);
      return;
    }
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `${url}/api/comment/new-comment/${itemId}`,
        { commentText: newComment },
        { headers: { token } }
      );
      if (res.data.ok) {
        
        setComments((prev) => [...prev, res.data.comment]);
        // Initialize reply count for new comment
        setReplyCounts((prev) => ({
          ...prev,
          [res.data.comment._id]: 0,
        }));
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
     
    }
  };

  const handleAddToCart = (foodItemId) => {
    if (!isLoggedIn()) {
     
      setShowLogInPopUp(true)
    } else {
      addToCart(foodItemId);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const res = await axios.post(
        `${url}/api/comment/like/${commentId}`,
        {},
        { headers: { token } }
      );
      if (res.data.ok) {
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? res.data.comment : c))
        );
        
      }
    } catch (err) {
      console.error(err);
     
    }
  };

  const handleDislike = async (commentId) => {
    try {
      const res = await axios.post(
        `${url}/api/comment/dislike/${commentId}`,
        {},
        { headers: { token } }
      );
      if (res.data.ok) {
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? res.data.comment : c))
        );
        
      }
    } catch (err) {
      console.error(err);
      
    }
  };

  const hasLiked = (comment) => {
    return comment.likedBy?.includes(user?.id);
  };

  const hasDisliked = (comment) => {
    return comment.disLikedBy?.includes(user?.id);
  };

  const fetchReplies = async (commentId) => {
    try {
      const res = await axios.get(
        `${url}/api/comment/all-replies/${commentId}`
      );
      if (res.data.ok) {
        setReplies((prev) => ({
          ...prev,
          [commentId]: res.data.replies,
        }));
      }
    } catch (err) {
      console.error(err);
     
    }
  };

  const handleAddReply = async (commentId) => {
    if (!isLoggedIn()) {
      console.log("Please log in first");
      setShowLogInPopUp(true);
      return;
    }
    if (!replyText.trim()) return;

    try {
      const res = await axios.post(
        `${url}/api/comment/reply/${commentId}`,
        { replyText },
        { headers: { token } }
      );

      if (res.data.ok) {
      

        // Update replies list
        setReplies((prev) => ({
          ...prev,
          [commentId]: [...(prev[commentId] || []), res.data.reply],
        }));

        // Update reply count
        setReplyCounts((prev) => ({
          ...prev,
          [commentId]: (prev[commentId] || 0) + 1,
        }));

        setReplyText("");
        setActiveReply(null);
      }
    } catch (err) {
      console.error(err);
      console.log("Failed to add reply");
    }
  };

  const toggleReplies = async (commentId) => {
    if (!replies[commentId]) {
      await fetchReplies(commentId);
    } else {
      setReplies((prev) => {
        const newReplies = { ...prev };
        delete newReplies[commentId];
        return newReplies;
      });
    }
  };



  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );

  if (!item)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Item not found.</p>
      </div>
    );

  const images = item.images?.length > 0 ? item.images : [item.imageUrl];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-4">
              <img
                src={images[selectedImage]}
                alt={item.name}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
              />
            </div>

            {images.length > 1 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  More Views
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === idx
                          ? "border-orange-500 ring-2 ring-orange-200"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${item.name}-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Product Details */}
        
<div className="lg:w-1/2">
  <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
    {/* Stock Status Badge */}
    <div className="mb-4 flex justify-between items-center">
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${item.isAvailable ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
        {item.isAvailable ? (
          <>
            <FaCheckCircle className="w-4 h-4" />
            <span>In Stock</span>
          </>
        ) : (
          <>
            <GiEmptyHourglass className="w-4 h-4" />
            <span>Out of Stock</span>
          </>
        )}
      </div>
      
      {/* Discount Badge */}
      {item.discount && item.discount > 0 && item.isAvailable && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
          <FaTag className="w-3 h-3" />
          <span>{item.discount}% OFF</span>
        </div>
      )}
    </div>

    {item.category && (
      <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full mb-4">
        {item.category}
      </span>
    )}

    <div className="flex items-center justify-between">
      <h1 className={`text-3xl md:text-4xl font-bold mb-3 ${item.isAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
        {item.name}
      </h1>
      <button
        onClick={() => {
          if (!isLoggedIn()) {
            toast.error("Please log in first");
            setShowLogInPopUp(true);
          } else if (!item.isAvailable) {
           console.log("This item is currently out of stock");
          } else {
            addToCart(item._id);
            navigate("/order");
          }
        }}
        className={`cursor-pointer z-20 px-5 py-2 text-sm font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${item.isAvailable 
          ? item.discount && item.discount > 0 
            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-xl' 
            : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:shadow-xl'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!item.isAvailable}
      >
        {item.isAvailable ? (item.discount && item.discount > 0 ? "Quick Buy" : "Buy") : "Unavailable"}
      </button>
    </div>

    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center">
        <StarIcon className={`mr-1 ${item.isAvailable ? 'text-yellow-500' : 'text-gray-400'}`} />
        <span className={`font-bold ${item.isAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
          {item.rating || 4.5}
        </span>
      </div>
      <span className="text-gray-500">•</span>
      <span className={`${item.isAvailable ? 'text-gray-500' : 'text-gray-400'}`}>
        {comments.length} {comments.length === 1 ? "Review" : "Reviews"}
      </span>
    </div>

    <div className="mb-6">
      {/* Price Display */}
      <div className="flex items-center gap-3 mb-2">
        {/* Current/Discounted Price */}
        <div className={`text-4xl font-bold ${item.isAvailable ? 'text-green-600' : 'text-gray-400'}`}>
          ${calculateDiscountedPrice(item.price, item.discount).toFixed(2)}
        </div>
        
        {/* Original Price with strikethrough if discount exists */}
        {item.discount && item.discount > 0 && item.isAvailable && (
          <div className={`text-lg line-through ${item.isAvailable ? 'text-gray-500' : 'text-gray-400'}`}>
            ${item.price}
          </div>
        )}
      </div>
      
      {/* You Save Amount */}
      {item.discount && item.discount > 0 && item.isAvailable && (
        <div className="text-sm text-green-600 font-semibold">
          You save ${((item.price * item.discount) / 100).toFixed(2)} ({item.discount}% off)
        </div>
      )}
    </div>

    <div className="mb-8">
      <h3 className={`text-xl font-semibold mb-3 ${item.isAvailable ? 'text-gray-900' : 'text-gray-600'}`}>
        Description
      </h3>
      <p className={`leading-relaxed ${item.isAvailable ? 'text-gray-700' : 'text-gray-500'}`}>
        {item.description}
      </p>
    </div>

    <div className="mb-8">
      <h3 className={`text-lg font-semibold mb-4 ${item.isAvailable ? 'text-gray-900' : 'text-gray-600'}`}>
        Quantity
      </h3>
      <div className="flex items-center gap-4">
        <div className={`flex items-center border rounded-xl overflow-hidden ${item.isAvailable ? 'border-gray-300' : 'border-gray-200 opacity-60'}`}>
          <button
            className={`cursor-pointer px-4 py-3 transition-colors ${item.isAvailable 
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => item.isAvailable && deleteFromCart(item._id)}
            disabled={!item.isAvailable}
          >
            −
          </button>
          <span className={`px-6 py-3 text-lg font-semibold min-w-[60px] text-center ${item.isAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
            {cartQuantity}
          </span>
          <button
            className={`cursor-pointer px-4 py-3 transition-colors ${item.isAvailable 
              ? item.discount && item.discount > 0
                ? 'bg-gradient-to-r from-red-100 to-orange-100 hover:from-red-200 hover:to-orange-200 text-gray-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => item.isAvailable && handleAddToCart(item._id)}
            disabled={!item.isAvailable}
          >
            +
          </button>
        </div>

        <div className="flex-1">
          <button
            onClick={() => {
              if (!isLoggedIn()) {
               console.log("Please log in first");
                setShowLogInPopUp(true);
              } else if (!item.isAvailable) {
               console.log("This item is currently out of stock");
              } else {
                handleAddToCart(item._id);
              }
            }}
            className={`cursor-pointer w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg ${item.isAvailable 
              ? item.discount && item.discount > 0
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 hover:shadow-xl'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!item.isAvailable}
          >
            {cartQuantity > 0 ? (
              <div className="flex items-center justify-center gap-3">
                <span>{item.isAvailable ? (item.discount && item.discount > 0 ? "Add More" : "Add to Cart") : "Out of Stock"}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${item.isAvailable 
                  ? item.discount && item.discount > 0
                    ? 'bg-white text-red-600'
                    : 'bg-white text-orange-600'
                  : 'bg-gray-200 text-gray-500'
                }`}>
                  {cartQuantity} in cart
                </span>
              </div>
            ) : (
              item.isAvailable ? (item.discount && item.discount > 0 ? "Quick to Cart" : "Add to Cart") : "Out of Stock"
            )}
          </button>
        </div>
      </div>
    </div>

    <div className={`grid grid-cols-2 gap-4 pt-6 border-t ${item.isAvailable ? 'border-gray-200' : 'border-gray-100'}`}>
      {item.calories && (
        <div className="text-center">
          <div className={`text-sm ${item.isAvailable ? 'text-gray-500' : 'text-gray-400'}`}>Calories</div>
          <div className={`font-semibold ${item.isAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
            {item.calories}
          </div>
        </div>
      )}
      {item.prepTime && (
        <div className="text-center">
          <div className={`text-sm ${item.isAvailable ? 'text-gray-500' : 'text-gray-400'}`}>Prep Time</div>
          <div className={`font-semibold ${item.isAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
            {item.prepTime} min
          </div>
        </div>
      )}
    </div>
  </div>
</div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2">
                <StarIcon className="text-yellow-500 text-2xl" />
                <span className="text-xl font-bold">{item.rating || 4.5}</span>
                <span className="text-gray-500">
                  ({comments.length} reviews)
                </span>
              </div>
            </div>

            {/* Add Comment Form */}
            <div className="mb-8 p-4 bg-gray-50 rounded-xl">
              <textarea
                placeholder="Share your thoughts about this product..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="3"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleAddComment}
                  className="cursor-pointer px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!newComment.trim()}
                >
                  Post Review
                </button>
              </div>
            </div>

            {/* Comments List */}
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4 text-6xl">💬</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No reviews yet
                </h3>
                <p className="text-gray-500">
                  Be the first to share your thoughts about this product!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {comments.map((c) => (
                  <div
                    key={c._id}
                    className="border border-gray-200 rounded-xl p-6 hover:border-orange-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                            style={{
                              backgroundColor: `hsl(${
                                ((c.firstName?.charCodeAt(0) || 0) * 137.508) %
                                360
                              }, 70%, 50%)`,
                            }}
                          >
                            {c.firstName?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <div className="flex gap-x-1 items-center">
                            <p className="font-semibold text-gray-900">
                              {c.firstName || "Anonymous"} {c.lastName}
                            </p>

                            <VscVerifiedFilled className="text-green-500" />
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(c.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {c.commentText}
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleLike(c._id)}
                        className={`cursor-pointer cursor-pointer flex items-center gap-2 transition-colors ${
                          hasLiked(c)
                            ? "text-orange-500"
                            : "text-gray-600 hover:text-orange-500"
                        }`}
                      >
                        <ThumbUpOffAltIcon sx={{ fontSize: 20 }} />
                        <span className="text-sm">{c.totalLikes || 0}</span>
                      </button>
                      <button
                        onClick={() => handleDislike(c._id)}
                        className={`cursor-pointer flex items-center gap-2 transition-colors ${
                          hasDisliked(c)
                            ? "text-orange-500"
                            : "text-gray-600 hover:text-orange-500"
                        }`}
                      >
                        <ThumbDownOffAltIcon sx={{ fontSize: 20 }} />
                        <span className="text-sm">{c.totalDislikes || 0}</span>
                      </button>
                      <button
                        onClick={() => toggleReplies(c._id)}
                        className="cursor-pointer text-sm text-gray-600 hover:text-orange-500 font-medium flex items-center gap-1"
                      >
                        {replies[c._id] ? (
                          <FaChevronUp className="text-xs" />
                        ) : (
                          <FaChevronDown className="text-xs" />
                        )}
                        {replyCounts[c._id] || 0} replies
                      </button>
                    </div>

                    {/* Reply Section */}
                    <div className="mt-4 space-y-4">
                      {/* Reply Input */}
                      <div className="flex gap-3 ml-8 py-4">
                        <div className="flex-shrink-0 ">
                           <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                            style={{
                              backgroundColor: `hsl(${
                                ((user?.firstName?.charCodeAt(0) || 0) * 137.508) %
                                360
                              }, 70%, 50%)`,
                            }}
                          >
                            {user?.firstName.charAt(0)?.toUpperCase() || "U"}
                          </div>
                         
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Add a reply..."
                              value={activeReply === c._id ? replyText : ""}
                              onChange={(e) => setReplyText(e.target.value)}
                              onFocus={() => setActiveReply(c._id)}
                              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            />
                            {activeReply === c._id && replyText.trim() && (
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                                <button
                                  onClick={() => {
                                    setReplyText("");
                                    setActiveReply(null);
                                  }}
                                  className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 px-2 py-1"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleAddReply(c._id)}
                                  className="cursor-pointer text-sm bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600 transition-colors"
                                >
                                  Reply
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Replies List */}
                       
                        </div>
                      </div>
                         {replies[c._id] && (
                            <div className="space-y-4 pt-4 ">
                              {replies[c._id].map((reply) => (
                                <div key={reply._id} className="flex gap-1">
                                  <div className="flex-shrink-0 py-4">
                                    <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                            style={{
                              backgroundColor: `hsl(${
                                ((reply?.firstName?.charCodeAt(0) || 0) * 137.508) %
                                360
                              }, 70%, 50%)`,
                            }}
                          >
                            {reply?.firstName.charAt(0)?.toUpperCase() || "U"}
                          </div>
                                  </div>

                                  <div className="flex-1 py-2">
                                    <div className="bg-gray-50 rounded-2xl p-3">
                                      <div className="flex items-center gap-2 mb-1">
                                        <div className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                                          {reply.firstName} {reply.lastName}
                                            <VscVerifiedFilled className="text-green-500 text-sm " />
                                        </div>
                                        <span className="text-xs text-gray-500">
                                          {new Date(
                                            reply.createdAt
                                          ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          })}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-700 mb-2">
                                        {reply.replyText}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
