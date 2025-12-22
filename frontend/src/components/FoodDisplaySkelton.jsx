import React from "react";

export const FoodDisplaySkelton = () => {
  return (
    <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Skeleton */}
      
      {/* Card Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            {/* Image */}
            <div className="w-full h-48 rounded-xl bg-gray-300 animate-pulse mb-4"></div>

            {/* Title */}
            <div className="h-6  bg-gray-300 rounded w-3/4 mb-3 animate-pulse"></div>

            {/* Description (2 lines only) */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            </div>

            {/* Price + Rating */}
            <div className="flex justify-between items-center mb-4">
              <div className="h-7 w-20 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Add to Cart Button */}
            <div className="h-12 bg-gray-300 rounded-xl animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
