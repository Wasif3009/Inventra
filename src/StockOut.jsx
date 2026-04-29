import React, { useEffect, useState } from "react";
import LoadingMessage from "./LoadingMessage";

const StockOut = () => {
  const [out, setOut] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/stock/out`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOut(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="categories flex items-start justify-center">
      <div className="shadow-lg  stock-container rounded-lg ">
        <table className="text-[#f3f4f6] text-center table ">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="table-header">No.</th>
              <th className="table-header">Out of Stocks</th>
              <th className="table-header">Quantity</th>
            </tr>
          </thead>

          <tbody>
            {out.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-2xl py-6">
                  No Stock Found
                </td>
              </tr>
            ) : (
              out.map((item, index) => (
                <tr
                  key={item._id}
                  className="odd:bg-[#2f2f32] even:bg-[#131316]"
                >
                  <td className="table-data">{index + 1}</td>
                  <td className="table-data">{item.name}</td>
                  <td className="table-data">{item.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockOut;
