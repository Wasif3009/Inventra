import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

import { FiPackage } from "react-icons/fi";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaBox } from "react-icons/fa6";
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
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
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
    <div>
      <div className="dashboard flex">
        <Navbar />
        <div className="flex flex-col left-container">
          <SideBar />
          {/* Style Component Here Below SideBar */}
          <div className="summary flex items-center justify-center gap-10 flex-wrap">
            {loading ? (
              <LoadingMessage />
            ) : (
              cards.map((card, index) => (
                <SummaryCard
                  key={index}
                  title1={card.title1}
                  title2={card.title2}
                  value={card.value}
                  Icon={card.icon}
                  loading={loading}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
