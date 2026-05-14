import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

import { FiPackage } from "react-icons/fi";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";

import SummaryCard from "./SummaryCard";
import LoadingMessage from "./LoadingMessage";

const Dashboard = () => {
  const [products, setProducts] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/dashboard/summary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.totalProducts);
        setQuantity(data.totalQuantity);
        setLowStock(data.lowStock);
        setOutOfStock(data.outOfStock);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const cards = [
    {
      title1: "Total",
      title2: "Products",
      value: products,
      icon: FiPackage,
    },
    {
      title1: "Total",
      title2: "Quantity",
      value: quantity,
      icon: AiOutlineBarChart,
    },
    {
      title1: "Low",
      title2: "Stock",
      value: lowStock,
      icon: FaExclamationTriangle,
    },
    {
      title1: "Out Of",
      title2: "Stock",
      value: outOfStock,
      icon: FaTimesCircle,
    },
  ];

  return (
    <div className="bg-[#18181b] min-h-screen text-[#F3F4F6] flex">
      <Navbar />
      <div className=" flex flex-col  min-h-screen w-full">
        {/* Navbar */}

        <SideBar />
        {/* Right Section */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          {/* Sidebar */}

          {/* Dashboard Content */}
          <div className="flex-1  sm:px-6 md:px-8 md:py-6 lg:py-6">
            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-xl sm:text-xl  text-[#F3F4F6] hidden md:block">
                Dashboard Overview
              </h1>

              <p className="text-xs text-[#A1A1AA] mt-1 hidden md:block">
                Monitor your inventory summary and stock details
              </p>
            </div>

            {/* Summary Cards */}
            <div className="flex flex-wrap gap-6 sm:gap-10 justify-center ">
              {loading ? (
                <LoadingMessage />
              ) : (
                cards.map((card, index) => (
                  <div
                    key={index}
                    className="
                      
                      sm:w-[30%]
                      lg:w-40
                      xl:w-50
                    "
                  >
                    <SummaryCard
                      title1={card.title1}
                      title2={card.title2}
                      value={card.value}
                      Icon={card.icon}
                      loading={loading}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
