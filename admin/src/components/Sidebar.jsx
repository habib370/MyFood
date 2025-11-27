import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const menu = [
    { title: "Add Items", path: "/add", icon: assets.add_icon },
    { title: "List Items", path: "/list", icon: assets.add_icon },
    { title: "Orders", path: "/order", icon: assets.order_icon },
  ];

  return (
    <div className="w-1/6 h-screen flex flex-col gap-y-2 items-center bg-gray-100">
      {menu.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center justify-center gap-x-3 py-2 w-full rounded-sm cursor-pointer
            ${isActive ? "bg-orange-500 text-white" : "text-black"}`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={item.icon}
                alt={item.title}
                className={`h-5 w-5 ${isActive ? "filter brightness-0 invert" : ""}`}
              />
              <p>{item.title}</p>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};
