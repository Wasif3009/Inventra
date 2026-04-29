import React from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./Authentication/SignUp";
import Login from "./Authentication/Login";
import { IoLogOutOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { HiOutlineCube } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";

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
    <div className="section-1  min-h-screen flex flex-col ">
      <div className="image  flex flex-col items-center w-md justify-center">
        <img src="InventraSided.png" alt="Inventra Logo" className="w-3xs" />
      </div>
      <div className="section-2">
        <div className="navlinks">
          <ul className="flex flex-col gap-10 justify-center items-center text-[#F3F4F6] text-xl">
            <NavLink to="/">
              <div className="flex items-center justify-center gap-2">
                <MdSpaceDashboard size={18} className=" nav-icons" />
                <li>Dashboard</li>
              </div>
            </NavLink>

            <NavLink to="/products">
              <div className="flex items-center justify-center gap-2">
                <HiOutlineCube size={20} className="nav-icons" />
                <li>Products</li>
              </div>
            </NavLink>
            <NavLink to="/categories">
              <div className="flex items-center justify-center gap-2">
                <MdCategory size={18} className=" nav-icons" />
                <li>Category</li>
              </div>
            </NavLink>
            <NavLink to="/stock">
              <div className="flex items-center justify-center gap-2">
                <AiOutlineStock size={21} className="nav-icons" />
                <li>Stock</li>
              </div>
            </NavLink>
            {/* <NavLink to="/settings">
                <li>Settings</li>
              </NavLink> */}
          </ul>
        </div>
        <div className="nav-end flex flex-col items-center justify-end gap-2 ">
          <div className="flex gap-2 items-center justify-center logout ">
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
  );
};

export default Navbar;
