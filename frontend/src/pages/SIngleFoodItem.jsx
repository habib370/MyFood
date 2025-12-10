import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import { toast } from "react-toastify";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import StarIcon from "@mui/icons-material/Star";

export const SingleFoodItem = () => {
  const token = localStorage.getItem("token");
  const { itemId } = useParams();
  const { addToCart,deleteFromCart, cartItems, isLoggedIn, url, } = useContext(StoreContext);

  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const cartQuantity = cartItems[itemId] || 0;

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

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${url}/api/comment/${itemId}`);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch comments");
      }
    };
    fetchComments();
  }, [itemId, url]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `${url}/api/comment/new-comment/${itemId}`,
        { commentText: newComment },
        { headers: { token } }
      );
      if (res.data.ok) {
        toast.success("Comment added!");
        setComments((prev) => [...prev, res.data.comment]);
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    }
  };

const handleAddToCart = (foodItem) => {
    if (!isLoggedIn()) {
      toast.error("Please log in first");
    } else {
      addToCart(foodItem._id);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500 text-lg font-semibold">{error}</p>
    </div>
  );
  
  if (!item) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600 text-lg">Item not found.</p>
    </div>
  );

  const images = item.images && item.images.length > 0 ? item.images : [item.imageUrl];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-4">
              <img
                src={images[selectedImage]}
                alt={item.name}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">More Views</h3>
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
            {/* Product Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              {/* Category Badge */}
              {item.category && (
                <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full mb-4">
                  {item.category}
                </span>
              )}

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {item.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  <StarIcon className="text-yellow-500 mr-1" />
                  <span className="font-bold text-gray-900">{item.rating || 4.5}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">
                  {comments.length} {comments.length === 1 ? 'Review' : 'Reviews'}
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  ${item.price}
                </div>
                {item.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">
                    ${item.originalPrice}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                    <button
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      onClick={() => deleteFromCart(item._id)}
                    >
                      −
                    </button>
                    <span className="px-6 py-3 text-lg font-semibold min-w-[60px] text-center">
                      {cartQuantity}
                    </span>
                    <button
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      onClick={() => addToCart(item._id)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <button
                    onClick={() => addToCart(item._id)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                    >
                      {cartQuantity > 0 ? (
                        <div className="flex items-center justify-center gap-3">
                          <span>Add to Cart</span>
                          <span className="bg-white text-orange-600 px-2 py-1 rounded-full text-sm">
                            {cartQuantity} in cart
                          </span>
                        </div>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                {item.calories && (
                  <div className="text-center">
                    <div className="text-gray-500 text-sm">Calories</div>
                    <div className="font-semibold text-gray-900">{item.calories}</div>
                  </div>
                )}
                {item.prepTime && (
                  <div className="text-center">
                    <div className="text-gray-500 text-sm">Prep Time</div>
                    <div className="font-semibold text-gray-900">{item.prepTime} min</div>
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
                <span className="text-gray-500">({comments.length} reviews)</span>
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
                  className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                            {c.firstName?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div className="flex gap-x-2">
                            <p className="font-semibold text-gray-900">
                              {c.firstName || 'Anonymous User'}
                            </p>
                            <p className="font-semibold text-gray-900">
                              {c.lastName || 'Anonymous User'}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <StarIcon className="text-yellow-500" sx={{ fontSize: 16 }} />
                              <span>{item.rating || 5.0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(c.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {c.commentText}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                        <ThumbUpOffAltIcon sx={{ fontSize: 20 }} />
                        <span className="text-sm">Helpful</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                        <ThumbDownOffAltIcon sx={{ fontSize: 20 }} />
                        <span className="text-sm">Not Helpful</span>
                      </button>
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