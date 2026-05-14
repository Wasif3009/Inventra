import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import LoadingMessage from "./LoadingMessage";
import toast, { Toaster } from "react-hot-toast";
import CreateCategory from "./CreateCategory";

const Add = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showCreate, setShowCreate] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, [dataUpdated]);

  const handleDelete = (item) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/categories/category/${item._id}`, {
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

  return (
    <div className="bg-[#18181B] min-h-screen">
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

      <div className="flex  lg:flex-row min-h-screen">
        <Navbar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <SideBar />

          <div className="p-3 sm:p-4 md:p-5">
            {/* Dialog */}
            {showCreate && (
              <CreateCategory
                open={showCreate}
                setOpen={setShowCreate}
                setDataUpdated={setDataUpdated}
                dataUpdated={dataUpdated}
              />
            )}

            {/* Table Container */}
            <div className="">
              {/* Top Section */}
              <div className="flex justify-start p-4">
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
                  Create Category
                </button>
              </div>

              {/* Table */}
              {loading ? (
                <LoadingMessage />
              ) : data.length === 0 ? (
                <div className="text-[#F3F4F6] text-center py-10 text-lg sm:text-xl">
                  No data found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-[#F3F4F6] border-collapse bg-[#1F1F23] border border-[#2A2A2E] rounded-xl overflow-hidden shadow-lg">
                    <thead className="bg-[#131316]">
                      <tr>
                        <th className="px-4 py-3 text-sm font-medium">No.</th>

                        <th className="px-4 py-3 text-sm font-medium">
                          Category Name
                        </th>

                        <th className="px-4 py-3 text-sm font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, index) => (
                        <tr
                          key={item._id}
                          className="
                            odd:bg-[#2A2A2E]
                            even:bg-[#1A1A1D]
                            hover:bg-[#2F2F35]
                            transition-all
                          "
                        >
                          <td className="px-4 py-3 text-sm text-center">
                            {index + 1}
                          </td>

                          <td className="px-4 py-3 text-sm text-center">
                            {item.name}
                          </td>

                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleDelete(item)}
                              className="
                                bg-red-600
                                hover:bg-red-700
                                transition-all
                                text-white
                                px-3
                                py-2
                                rounded-lg
                                text-xs
                                sm:text-sm
                                font-medium
                              "
                            >
                              Delete
                            </button>
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

export default Add;
