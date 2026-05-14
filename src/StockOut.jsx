import React, { useEffect, useState } from "react";

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
        setOut(data);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full min-w-[420px] border-collapse text-[#F3F4F6]">
          <thead className="bg-[#131316]">
            <tr>
              <th className="px-4 py-3 text-sm font-medium">No.</th>

              <th className="px-4 py-3 text-sm font-medium">Out Of Stocks</th>

              <th className="px-4 py-3 text-sm font-medium">Quantity</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-[#A1A1AA]">
                  Loading...
                </td>
              </tr>
            ) : out.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-8 text-lg text-[#F3F4F6]"
                >
                  No Stock Found
                </td>
              </tr>
            ) : (
              out.map((item, index) => (
                <tr
                  key={item._id}
                  className="
                    odd:bg-[#2A2A2E]
                    even:bg-[#1A1A1D]
                    hover:bg-[#2F2F35]
                    transition-all
                  "
                >
                  <td className="px-4 py-3 text-sm text-center">{index + 1}</td>

                  <td className="px-4 py-3 text-sm text-center">{item.name}</td>

                  <td className="px-4 py-3 text-sm text-center">
                    {item.quantity}
                  </td>
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
