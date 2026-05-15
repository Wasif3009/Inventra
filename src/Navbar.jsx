import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { IoLogOutOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { HiOutlineCube } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { AiOutlineStock } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    navigate("/login");
  };

  return (
    <div
      className="
        w-18
        md:w-36
        lg:w-40
        bg-[#18181b]
  flex
        flex-col
        justify-between
        px-3
        py-4
        shrink-0
        min-h-screen
        lg:min-h-screen
      "
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center mb-6 lg:mb-8">
          <img
            src="InventraSided.png"
            alt="Inventra Logo"
            className="
              w-[140px]
              sm:w-[160px]
              lg:w-[180px]
              
            "
          />
        </div>

        {/* Nav Links */}
        <div>
          <ul
            className="
              flex
              flex-row
              lg:flex-col
              flex-wrap
              justify-center
              gap-2
              lg:gap-3
              text-[#F3F4F6]
            "
          >
            {/* Dashboard */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `
                ${
                  isActive
                    ? "bg-[#9333ea] text-white"
                    : "bg-transparent hover:bg-[#27272A]"
                }

                transition-all
                duration-200
                rounded-lg
                px-3
                py-2.5
                w-[125px]
                
              `
              }
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MdSpaceDashboard size={18} />

                <li className="list-none text-sm font-medium hidden lg:block">
                  Dashboard
                </li>
              </div>
            </NavLink>

            {/* Products */}
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `
                ${
                  isActive
                    ? "bg-[#9333ea] text-white"
                    : "bg-transparent hover:bg-[#27272A]"
                }

                transition-all
                duration-200
                rounded-lg
                px-3
                py-2.5
                w-[125px]
                
              `
              }
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <HiOutlineCube size={18} />

                <li className="list-none text-sm font-medium hidden lg:block">
                  Products
                </li>
              </div>
            </NavLink>

            {/* Categories */}
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `
                ${
                  isActive
                    ? "bg-[#9333ea] text-white"
                    : "bg-transparent hover:bg-[#27272A]"
                }

                transition-all
                duration-200
                rounded-lg
                px-3
                py-2.5
                w-[125px]
                
              `
              }
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MdCategory size={18} />

                <li className="list-none text-sm font-medium hidden lg:block">
                  Category
                </li>
              </div>
            </NavLink>

            {/* Stock */}
            <NavLink
              to="/stock"
              className={({ isActive }) =>
                `
                ${
                  isActive
                    ? "bg-[#9333ea] text-white"
                    : "bg-transparent hover:bg-[#27272A]"
                }

                transition-all
                duration-200
                rounded-lg
                px-3
                py-2.5
                w-[125px]
                
              `
              }
            >
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <AiOutlineStock size={18} />

                <li className="list-none text-sm font-medium hidden lg:block">
                  Stock
                </li>
              </div>
            </NavLink>
          </ul>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-6 lg:mt-0 flex justify-center lg:justify-start">
        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            
            gap-2
            bg-[#27272A]
            hover:bg-[#9333ea]
            transition-all
            duration-200
            text-[#F3F4F6]
            md:px-3
            md:py-2.5
            rounded-lg
            px-1
            py-2
            w-20
            lg:w-full
            justify-center
           
          "
        >
          <IoLogOutOutline className="md:text-sm text-xs " />

          <span className="md:text-sm text-xs font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
