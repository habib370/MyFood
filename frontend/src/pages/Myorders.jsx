import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";

export const Myorders = () => {
  const { url } = useContext(StoreContext);
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);

  const fetchOrder = async () => {
    try {
      const res = await axios.get(url + "/api/order/myOrders", {
        headers: { token },
      });
      if (res.data.ok) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered" && order.payment
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>

      {deliveredOrders.length === 0 ? (
        <p className="text-center text-gray-600">
          No delivered and paid orders yet.
        </p>
      ) : (
        <div className="flex flex-col gap-y-15 max-w-screen mx-auto">
          {deliveredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-lg shadow border border-gray-200"
            >
              {/* Header */}
              <div className=" flex justify-between mb-3">
               <div>
                 <p className="font-semibold">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </p>
               </div>
                <div>
                  <p className="text-green-600 font-medium">Status: {order.status}</p>
                <p className="text-green-600 font-medium">Payment: Paid</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-3">
                <p className="font-semibold mb-1">Items:</p>
                <div className="space-y-1">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm border-b border-gray-100 py-1"
                    >
                      <p>{item.name}</p>
                     <div className="flex gap-x-5">
                       <p >Quantity: {item.qty}</p>
                      <p>${item.price}</p>
                     </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="mb-3 font-semibold flex justify-between">
                <span>Total:</span>
                <span>${order.amount}</span>
              </div>

              {/* Address */}
               <div>
                  <p className=" font-bold">Address informations</p>
                </div>
              <div className=" flex justify-between text-gray-700">
               
              <div className="text-sm">
                  <p>Name: {order.address.fullname}</p>
                <p>Email: {order.address.email}</p>
              </div>
                <div className="text-sm">
                  <p>City: {order.address.city}</p>
                <p>Street: {order.address.street}</p>
                </div>
                {order.address.extraInfo && <p>Note: {order.address.extraInfo}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

