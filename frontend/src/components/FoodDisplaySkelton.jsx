import React from "react";

export const FoodDisplaySkelton = ({ category }) => {
  return (
    <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Skeleton */}
      <div className="text-center mb-12">
        <div className="h-10 bg-gray-300 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-5 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
              group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 
              relative overflow-hidden
            "
          >
            {/* Image Skeleton */}
            <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-300 animate-pulse"></div>

            {/* Content Skeleton */}
            <div className="space-y-3">
              <div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              </div>

              {/* Price and Rating Skeleton */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="h-7 bg-gray-300 rounded w-16 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-12 mt-1 animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 bg-gray-300 rounded w-20 animate-pulse"></div>
                </div>
              </div>

              {/* Add to Cart Section Skeleton */}
              <div className="mt-4">
                <div className="w-full h-12 bg-gray-300 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
