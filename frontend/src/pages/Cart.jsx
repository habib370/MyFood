import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext.jsx";
import { useNavigate } from 'react-router-dom'
import { TbCurrencyTaka } from "react-icons/tb";
import { FaTag } from "react-icons/fa";

export const Cart = () => {
  const navigate = useNavigate();
  const { food_list, cartItems, addToCart, deleteFromCart, removeAllFromCart, url } =
    useContext(StoreContext);
     console.log(cartItems);

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return price - (price * discount) / 100;
  };

  // Calculate total price with discounts
  const totalPrice = food_list.reduce((total, item) => {
    if (cartItems[item._id] > 0) {
      const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
      return total + cartItems[item._id] * discountedPrice;
    }
    return total;
  }, 0);

  // Calculate total savings
  const totalSavings = food_list.reduce((savings, item) => {
    if (cartItems[item._id] > 0 && item.discount && item.discount > 0) {
      const originalPrice = item.price * cartItems[item._id];
      const discountedPrice = calculateDiscountedPrice(item.price, item.discount) * cartItems[item._id];
      return savings + (originalPrice - discountedPrice);
    }
    return savings;
  }, 0);

  const deliveryFee = totalPrice > 0 ? 5 : 0;

  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
      {/* Header Row - Hidden on mobile, visible on medium screens and up */}
      <div className="hidden md:grid md:grid-cols-6 gap-4 font-semibold border-b border-gray-300 pb-2 mb-4 text-gray-700">
        <div>Items</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total</div>
        <div>Savings</div>
        <div>Remove</div>
      </div>

      {/* Cart Items */}
      {food_list.map((item, index) => {
        if (cartItems[item._id] > 0) {
          const hasDiscount = item.discount && item.discount > 0;
          const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
          const itemTotal = cartItems[item._id] * discountedPrice;
          const itemSavings = hasDiscount 
            ? (item.price * cartItems[item._id]) - itemTotal
            : 0;

          return (
            <div
              key={index}
              className="flex flex-col md:grid md:grid-cols-6 gap-3 md:gap-4 items-center border-b border-gray-200 py-4 md:py-2"
            >
              {/* Image and Title combined on mobile */}
              <div className="flex items-center gap-3 md:block w-full md:w-auto relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded flex-shrink-0"
                />
                <div className="font-medium text-sm md:text-base md:mt-0">
                  {item.name}
                  {hasDiscount && (
                    <div className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                      <FaTag className="w-2 h-2" />
                      <span>{item.discount}% OFF</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price - hidden on mobile, visible on medium+ */}
              <div className="hidden md:block">
                <div className="flex flex-col">
                  <div className={`font-medium ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                    {discountedPrice.toFixed(2)} <TbCurrencyTaka className="inline text-sm" />
                  </div>
                  {hasDiscount && (
                    <div className="text-xs text-gray-500 line-through">
                      {item.price.toFixed(2)} <TbCurrencyTaka className="inline text-xs" />
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between w-full md:w-auto">
                <span className="md:hidden font-semibold text-gray-600">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteFromCart(item._id)}
                    className={`w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-300 transition-colors ${hasDiscount 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    -
                  </button>
                  <span className="font-medium min-w-8 text-center">
                    {cartItems[item._id]}
                  </span>
                  <button
                    onClick={() => addToCart(item._id)}
                    className={`w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-300 transition-colors ${hasDiscount 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between w-full md:w-auto">
                <span className="md:hidden font-semibold text-gray-600">Total:</span>
                <div className="font-medium flex flex-col">
                  <div className={`flex items-center ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                    {itemTotal.toFixed(2)}
                    <TbCurrencyTaka className="text-xl ml-1" />
                  </div>
                  {hasDiscount && (
                    <div className="text-xs text-gray-500 line-through flex items-center">
                      {(item.price * cartItems[item._id]).toFixed(2)}
                      <TbCurrencyTaka className="text-xs ml-1" />
                    </div>
                  )}
                </div>
              </div>

              {/* Savings */}
              <div className="flex justify-between w-full md:w-auto">
                <span className="md:hidden font-semibold text-gray-600">Savings:</span>
                <div className={`font-medium flex items-center ${itemSavings > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {itemSavings > 0 ? (
                    <>
                      -{itemSavings.toFixed(2)}
                      <TbCurrencyTaka className="text-sm ml-1" />
                    </>
                  ) : (
                    "—"
                  )}
                </div>
              </div>

              {/* Remove - full width on mobile, auto on desktop */}
              <div className="w-full md:w-auto flex justify-end md:justify-start">
                <button
                  className="text-red-500 hover:text-red-700 text-sm md:text-base py-1 px-3 border border-red-300 rounded-md hover:bg-red-500 transition-colors w-full md:w-auto text-center"
                  onClick={() => removeAllFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        }
        return null;
      })}

      {/* Empty Cart State */}
      {totalPrice === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Your cart is empty</p>
          <p className="text-sm mt-2">Add some delicious items to get started!</p>
        </div>
      )}

      {/* Cart Summary */}
      {totalPrice !== 0 && (
        <div className="mt-6 p-4 sm:p-6 border border-gray-300 rounded-lg bg-gray-50">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center md:text-left">
              Cart Summary
            </h2>
            
            <div className="space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal:</span>
                <div className="font-medium flex items-center">
                  {totalPrice.toFixed(2)} 
                  <TbCurrencyTaka className="text-xl ml-1" />
                </div>
              </div>
              
              {/* Savings */}
              {totalSavings > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-1">
                    <FaTag className="text-green-500" />
                    Savings:
                  </span>
                  <div className="font-medium flex items-center text-green-600">
                    -{totalSavings.toFixed(2)}
                    <TbCurrencyTaka className="text-sm ml-1" />
                  </div>
                </div>
              )}
              
              {/* Delivery Fee */}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery Fee:</span>
                <div className="font-medium flex items-center">
                  {deliveryFee.toFixed(2)}
                  <TbCurrencyTaka className="text-xl ml-1" />
                </div>
              </div>
              
              <hr className="border-gray-300" />
              
              {/* Grand Total */}
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-gray-800">Grand Total:</span>
                <div className="text-orange-600 flex items-center">
                  {(totalPrice + deliveryFee).toFixed(2)}
                  <TbCurrencyTaka className="text-xl ml-1" />
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/order')}
              className="w-full sm:w-64 mx-auto md:mx-0 h-12 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 transition-colors shadow-md hover:shadow-lg"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};