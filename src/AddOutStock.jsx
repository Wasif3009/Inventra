import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/ui/dialog";
import toast from "react-hot-toast";

const AddOutStock = ({ open, setOpen }) => {
  const [form, setForm] = useState({
    productId: "",
    quantity: "",
  });
  const token = localStorage.getItem("authToken");
  const handleAddOut = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/stock/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setOpen(false);
        toast.success(`Stock Updated Successfully `, {
          duration: 3000,
        });
      });
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen} className="stock-dialog">
        <DialogContent className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 stock-dialog">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Update Out of Stock
            </DialogTitle>

            <DialogDescription className="text-zinc-400 text-base">
              Update Products in your inventory
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Product Id..."
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input product-input"
            />

            <input
              type="number"
              placeholder="Enter Quantity..."
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input product-input"
            />

            <button
              onClick={handleAddOut}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md dialog-btn"
            >
              Update
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddOutStock;
