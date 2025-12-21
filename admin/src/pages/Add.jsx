import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import {toast} from 'react-toastify'
export const Add = ({url}) => {
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.ok) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
     toast.success(response.data.message);
    } else {
     toast.error(response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <form
        onSubmit={(e) => onSubmitHandler(e)}
        className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-6 sm:space-y-8"
      >
        {/* Upload Image */}

        <div className="space-y-2">
          <p className="font-semibold text-gray-700 text-lg">Upload Image</p>

          <label
            htmlFor="fileInput"
            className="cursor-pointer block border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-50 hover:border-orange-400 transition"
          >
            {image ? (
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <>
                <img
                  src={ assets.upload_area}
                  alt="upload"
                  className="w-20 opacity-60"
                />
                <p className="text-gray-500 mt-2 text-sm">
                  Click to upload image
                </p>
              </>
            )}
          </label>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {image && (
            <button
              type="button"
              onClick={() => setImage(null)}
              className="text-red-500 text-sm underline cursor-pointer"
            >
              Remove Image
            </button>
          )}
        </div>

        {/* Product Name */}
        <div className="space-y-3">
          <p className="font-semibold text-gray-700 text-lg">Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Enter product name"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Description */}
        <div className="space-y-3">
          <p className="font-semibold text-gray-700 text-lg">Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="3"
            placeholder="Enter product description"
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 resize-vertical"
          />
        </div>

        {/* Category and Price - Side by side on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Category */}
          <div className="space-y-3">
            <p className="font-semibold text-gray-700 text-lg">
              Product Category
            </p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-700 bg-white appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Burgers">Burgers</option>
            </select>
          </div>

          {/* Price */}
          <div className="space-y-3">
            <p className="font-semibold text-gray-700 text-lg">Price</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium ">
                $
              </span>
              <input
                type="number"
                name="price"
                onChange={onChangeHandler}
                value={data.price}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full p-3 sm:p-4 pl-8 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-orange-600 active:bg-orange-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-lg"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};
