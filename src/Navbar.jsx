import React from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = ({}) => {
  const navigate = useNavigate();
  // let isUserLogged = localStorage.getItem("authToken");
  // let btnText;

  // if (isUserLogged) {
  //   btnText = "Logout";
  // } else {
  //   btnText = "Login";
  // }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="  flex">
      <div className="section-1 w-md h-screen flex flex-col ">
        <div className="image  flex flex-col items-center w-md justify-center">
          <img src="InventraSided.png" alt="Inventra Logo" className="w-3xs" />
        </div>
        <div className="section-2">
          <div className="navlinks">
            <ul className="flex flex-col gap-10 justify-center items-center text-[#F3F4F6] text-xl">
              <NavLink to="/">
                <li>Dashboard</li>
              </NavLink>
              <NavLink to="/products">
                <li>Products</li>
              </NavLink>
              <NavLink to="/categories">
                <li>Categories</li>
              </NavLink>
              <NavLink to="/stock">
                <li>Stock</li>
              </NavLink>
              {/* <NavLink to="/settings">
                <li>Settings</li>
              </NavLink> */}
            </ul>
          </div>
          <div className="nav-end flex flex-col items-center justify-end gap-2 ">
            {/* <p className="text-[#F3F4F6] text-xl">hello</p> */}
            <div className="flex gap-2 items-center justify-center ">
              <IoLogOutOutline className="text-[#F3F4F6] text-2xl" />
              <button
                className="text-[#F3F4F6] text-xl cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
