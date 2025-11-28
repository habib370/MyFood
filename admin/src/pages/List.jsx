import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LoopIcon from "@mui/icons-material/Loop";

export const List = ({url}) => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.ok) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const removeitem = async (id) => {
    const response = await axios.post(`${url}/api/food/remove`, { id });
    if (response.data.ok) {
      fetchData();
      toast.success("Item deleted successfully");
    } else {
      toast.error(response.data.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Skeleton loader component
  const SkeletonRow = () => (
    <div className="grid grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-6 py-2 sm:py-4 items-center animate-pulse">
      {/* Image skeleton */}
      <div className="col-span-4 sm:col-span-3 lg:col-span-2">
        <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-300 rounded-lg"></div>
      </div>
      
      {/* Name skeleton */}
      <div className="col-span-8 sm:col-span-3 lg:col-span-3">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
      
      {/* Category skeleton */}
      <div className="col-span-6 sm:col-span-2 lg:col-span-2">
        <div className="h-6 bg-gray-300 rounded-full w-20"></div>
      </div>
      
      {/* Price skeleton */}
      <div className="col-span-6 sm:col-span-2 lg:col-span-2">
        <div className="h-4 bg-gray-300 rounded w-12"></div>
      </div>
      
      {/* Actions skeleton */}
      <div className="col-span-12 sm:col-span-2 lg:col-span-3 flex justify-center sm:justify-start">
        <div className="h-8 bg-gray-300 rounded w-20"></div>
      </div>
    </div>
  );

  return (
    <div className="ml-0 sm:ml-1/6 w-full sm:w-5/6 min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-8">
      <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 sm:p-6 text-white">
          <h1 className="text-xl sm:text-2xl font-bold">All Food Items</h1>
          <p className="text-orange-100 mt-1 text-sm sm:text-base">
            Manage your food menu items
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white border-b border-gray-200 p-2 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="text-gray-600 font-medium text-sm sm:text-base">
            Total Items:{" "}
            <span className="text-orange-500 font-bold">
              {loading ? (
                <span className="inline-block h-4 w-8 bg-gray-300 rounded animate-pulse"></span>
              ) : (
                list.length
              )}
            </span>
          </span>
          <button
            onClick={fetchData}
            disabled={loading}
            className={`${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
            } bg-gray-100 text-gray-700 px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-medium flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base transition-all duration-200`}
          >
            <span>Refresh</span>
            <LoopIcon fontSize="small" className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Table Header */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-6 py-2 sm:py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wider">
            <div className="col-span-4 sm:col-span-3 lg:col-span-2">Item</div>
            <div className="col-span-4 sm:col-span-3 lg:col-span-3">Name</div>
            <div className="col-span-2 sm:col-span-2 lg:col-span-2">Category</div>
            <div className="col-span-2 sm:col-span-2 lg:col-span-2">Price</div>
            <div className="col-span-12 sm:col-span-2 lg:col-span-3 text-center sm:text-left">
              Actions
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {loading ? (
              // Show skeleton loaders while loading
              <>
                {[...Array(6)].map((_, index) => (
                  <SkeletonRow key={index} />
                ))}
              </>
            ) : (
              // Show actual data when loaded
              list.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 sm:gap-4 px-2 sm:px-6 py-2 sm:py-4 items-center hover:bg-orange-50 transition-all duration-200 group"
                >
                  {/* Image */}
                  <div className="col-span-4 sm:col-span-3 lg:col-span-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-cover rounded-lg shadow-sm border border-gray-200 group-hover:shadow-md transition-all duration-200"
                    />
                  </div>

                  {/* Name */}
                  <div className="col-span-8 sm:col-span-3 lg:col-span-3">
                    <span className="font-medium text-gray-800 text-xs sm:text-sm line-clamp-2">
                      {item.name}
                    </span>
                  </div>

                  {/* Category */}
                  <div className="col-span-6 sm:col-span-2 lg:col-span-2 mt-1 sm:mt-0">
                    <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="col-span-6 sm:col-span-2 lg:col-span-2 mt-1 sm:mt-0">
                    <span className="font-bold text-green-600 text-xs sm:text-sm">
                      ${item.price}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-12 sm:col-span-2 lg:col-span-3 mt-1 sm:mt-0 flex justify-center sm:justify-start space-x-1 sm:space-x-2">
                    <button
                      onClick={() => removeitem(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 transition-all duration-200"
                    >
                      <DeleteForeverIcon fontSize="small" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Empty State */}
          {!loading && list.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <h3 className="mt-4 text-sm sm:text-lg font-medium text-gray-900">
                No food items found
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-500">
                Get started by adding some delicious food items to your menu.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
