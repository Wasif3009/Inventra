import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import LoadingMessage from "./LoadingMessage";
import toast, { Toaster } from "react-hot-toast";

import CreateProducts from "./CreateProducts";
import UpdateProducts from "./UpdateProducts";
import GetProducts from "./GetProducts";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [fullData, setFullData] = useState([]);

  const [getProduct, setGetProduct] = useState([]);
  const [showProduct, setShowProduct] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFullData(data);
        setData(data);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dataUpdated]);

  const handleDelete = (item) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/products/${item._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setData((prev) => prev.filter((el) => el._id !== item._id));

        toast.success(`${item.name} Deleted Successfully`);
      });
  };

  const handleAddBtn = () => {
    setShowCreate(true);
  };

  const handleUpdate = (item) => {
    setSelectedProduct(item);

    setShowUpdate(true);
  };

  const handleInput = (e) => {
    const filtered = fullData.filter((item) => {
      return item._id.includes(e.target.value);
    });

    setData(filtered);
  };

  const handleGet = (item) => {
    setGetProduct(item);

    setShowProduct(true);
  };

  return (
    <div className="w-full">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            backgroundColor: "#2A2A2E",
            color: "#F3F4F6",
            zIndex: 9999,
          },
        }}
      />

      <div className="flex  min-h-screen">
        <Navbar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <SideBar />

          <div className="p-3 sm:p-4 md:p-5">
            {/* Dialogs */}
            {showCreate && (
              <CreateProducts
                open={showCreate}
                setOpen={setShowCreate}
                setDataUpdated={setDataUpdated}
                dataUpdated={dataUpdated}
              />
            )}

            {showUpdate && (
              <UpdateProducts
                open={showUpdate}
                setOpen={setShowUpdate}
                setDataUpdated={setDataUpdated}
                dataUpdated={dataUpdated}
                product={selectedProduct}
              />
            )}

            {showProduct && (
              <GetProducts
                open={showProduct}
                setOpen={setShowProduct}
                setDataUpdated={setDataUpdated}
                dataUpdated={dataUpdated}
                getProduct={getProduct}
              />
            )}

            {/* Table Container */}
            <div className="">
              {/* Top Section */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-4">
                <input
                  type="text"
                  placeholder="Enter ID to get Products..."
                  onChange={(e) => handleInput(e)}
                  className="
                    w-full
                    sm:w-[240px]
                    md:w-[300px]
                    bg-[#27272A]
                    border
                    border-[#3F3F46]
                    rounded-lg
                    px-4
                    py-2.5
                    text-sm
                    text-[#F3F4F6]
                    outline-none
                    focus:border-[#9333ea]
                    transition-all
                  "
                />

                <button
                  onClick={handleAddBtn}
                  className="
                    bg-[#9333ea]
                    hover:bg-[#6D28D9]
                    transition-all
                    text-white
                    px-4
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                  "
                >
                  Create Product
                </button>
              </div>

              {/* Table */}
              {loading ? (
                <LoadingMessage />
              ) : data.length === 0 ? (
                <div className="text-[#F3F4F6] text-center py-10 text-lg sm:text-xl">
                  No products found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-[#F3F4F6] border-collapse bg-[#1F1F23] border border-[#2A2A2E] rounded-xl overflow-hidden shadow-lg">
                    <thead className="bg-[#131316]">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium">No.</th>

                        <th className="px-4 py-3 text-sm font-medium">Name</th>

                        <th className="px-4 py-3 text-sm font-medium">
                          Category
                        </th>

                        <th className="px-4 py-3 text-sm font-medium">
                          Quantity
                        </th>

                        <th className="px-4 py-3 text-sm font-medium">Price</th>

                        <th className="px-4 py-3 text-sm font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, index) => (
                        <tr
                          key={item._id}
                          onClick={() => handleGet(item)}
                          className="
                            odd:bg-[#2A2A2E]
                            even:bg-[#1A1A1D]
                            hover:bg-[#2F2F35]
                            transition-all
                            cursor-pointer
                          "
                        >
                          <td className="px-4 py-3 text-sm text-center">
                            {index + 1}
                          </td>

                          <td className="px-4 py-3 text-sm text-center">
                            {item.name}
                          </td>

                          <td className="px-4 py-3 text-sm text-center">
                            {item.category}
                          </td>

                          <td className="px-4 py-3 text-sm text-center">
                            {item.quantity}
                          </td>

                          <td className="px-4 py-3 text-sm text-center">
                            ₹{item.price}
                          </td>

                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();

                                  handleUpdate(item);
                                }}
                                className="
                                  bg-[#9333ea]
                                  hover:bg-[#6D28D9]
                                  text-white
                                  px-3
                                  py-2
                                  rounded-lg
                                  text-xs
                                  sm:text-sm
                                  font-medium
                                  transition-all
                                "
                              >
                                Update
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();

                                  handleDelete(item);
                                }}
                                className="
                                  bg-red-600
                                  hover:bg-red-700
                                  text-white
                                  px-3
                                  py-2
                                  rounded-lg
                                  text-xs
                                  sm:text-sm
                                  font-medium
                                  transition-all
                                "
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
