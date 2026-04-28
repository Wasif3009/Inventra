import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import LoadingMessage from "./LoadingMessage";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CreateProducts from "./CreateProducts";
import GetProducts from "./GetProducts";
import UpdateProducts from "./UpdateProducts";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/products`, {
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

  const handleUpdate = (item) => {
    setSelectedProduct(item);
    setShowUpdate(true);
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
      <div className="flex">
        <Navbar />
        <div className="flex flex-col w-280">
          <SideBar />
          <div className="categories flex items-start justify-center ">
            <div className="shadow-lg  table-container rounded-lg ">
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
              <div className="flex items-center justify-between ">
                {/* <GetProducts /> */}
                <button className="create-btn" onClick={handleAddBtn}>
                  Create a Product
                </button>
              </div>
              {loading ? (
                <LoadingMessage />
              ) : data.length === 0 ? (
                <div className="text-white p-5 text-center flex items-center justify-center h-full text-3xl">
                  No products found
                </div>
              ) : (
                <table className="text-[#f3f4f6] text-center table">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className="table-header">No.</th>
                      <th className="table-header">Name</th>
                      <th className="table-header">Category</th>

                      <th className="table-header">Quantity</th>
                      <th className="table-header">Price</th>

                      <th className="table-header">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item, index) => {
                      return (
                        <tr
                          key={item._id}
                          className="odd:bg-[#2f2f32] even:bg-[#131316]"
                        >
                          <td className="table-data">{index + 1}</td>
                          <td className="table-data">{item.name}</td>
                          <td className="table-data">{item.category}</td>

                          <td className="table-data">{item.quantity}</td>
                          <td className="table-data">{item.price}</td>

                          <td className="table-data">
                            <div className="flex items-center justify-center gap-6">
                              <button
                                className="update-btn"
                                onClick={() => handleUpdate(item)}
                              >
                                Update
                              </button>

                              <button
                                className="delete-btn"
                                onClick={() => handleDelete(item)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
