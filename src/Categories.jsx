import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import LoadingMessage from "./LoadingMessage";
import toast, { Toaster } from "react-hot-toast";
import CreateComponent from "./CreateCategory";
import CreateCategory from "./CreateCategory";

const Add = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");
  const [showCreate, setShowCreate] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/categories`, {
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
        setData(data);
        console.log("Fetch Complete");
        setLoading(false);
      })
      .catch((err) => {
        console.log("Something Went Wrong");
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
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Idhar prev mai previous Array jayega fir el mai single single element jayege aur agar gya hu element ki id delete ki hui element ke id se match nahi hoti toh prev array mai wo element rakh warna hata
        setData((prev) => prev.filter((el) => el._id !== item._id));
        toast.success(`${item.name} Deleted Successfully`);
      });
  };

  const handleAddBtn = () => {
    setShowCreate(true);
  };

  return (
    <div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            backgroundColor: "#2a2a2e",
            color: "#F3F4F6",
            zIndex: 9999,
          },
        }}
      />
      <div className="flex dashboard">
        <Navbar />
        <div className="flex flex-col left-container">
          <SideBar />

          <div className="categories flex items-start ">
            <div className="shadow-lg table-container rounded-lg">
              {showCreate && (
                <CreateCategory
                  open={showCreate}
                  setOpen={setShowCreate}
                  setDataUpdated={setDataUpdated}
                  dataUpdated={dataUpdated}
                />
              )}
              <button className="create-btn" onClick={handleAddBtn}>
                Create a Category
              </button>
              {loading ? (
                <LoadingMessage />
              ) : data.length === 0 ? (
                <div className="text-white p-5 text-center flex justify-center text-3xl items-center h-full">
                  No data found
                </div>
              ) : (
                <div className="flex flex-col gap-4 ">
                  <table className="text-[#f3f4f6] text-center table">
                    <thead className="sticky top-0 z-10">
                      <tr>
                        <th className="table-header">No.</th>
                        <th className="table-header">Category Name</th>
                        <th className="table-header">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item, index) => (
                        <tr
                          key={item._id}
                          className="odd:bg-[#2f2f32] even:bg-[#131316]"
                        >
                          <td className="table-data">{index + 1}</td>
                          <td className="table-data">{item.name}</td>
                          <td className="table-data">
                            <button
                              className="delete-btn"
                              onClick={() => handleDelete(item)}
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
