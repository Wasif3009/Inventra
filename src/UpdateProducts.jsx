import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const UpdateProducts = ({
  open,
  setOpen,
  product,
  dataUpdated,
  setDataUpdated,
}) => {
  const token = localStorage.getItem("authToken");
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    category: product.category,
  });

  const handleUpdate = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOpen(false);
        setDataUpdated(!dataUpdated);
      });
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen} className="dialog">
        <DialogContent className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 dialog product-dialog">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Update Products
            </DialogTitle>

            <DialogDescription className="text-zinc-400 text-base">
              Update Products in your inventory
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input product-input"
            />
            <input
              type="text"
              placeholder="Enter Updated Price..."
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input product-input"
            />
            <input
              type="number"
              placeholder="Enter Update Quantity..."
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input product-input"
            />

            <input
              type="text"
              placeholder="Enter Updated Category..."
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input product-input"
            />

            <button
              onClick={handleUpdate}
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

export default UpdateProducts;
