import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/ui/dialog";
import { Label } from "@/ui/label";
import toast from "react-hot-toast";

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
    if (!form.name) {
      toast.error(`Please Add Product Name`);
      return;
    }
    if (!form.price) {
      toast.error(`Please Add Price `);
      return;
    }
    if (!form.quantity) {
      toast.error(`Please Add quantity `);
      return;
    }
    if (!form.category) {
      toast.error(`Please Add quantity `);
      return;
    }
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
        toast.success(`${form.name} Updated Successfully `, {
          duration: 3000,
        });
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
            <Label htmlFor="name" className="text-zinc-300">
              Product Name
            </Label>
            <input
              type="text"
              value={form.name}
              placeholder="Product Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input product-update-input"
            />
            <Label htmlFor="price" className="text-zinc-300">
              Product Price
            </Label>
            <input
              type="text"
              value={form.price}
              placeholder="Enter Updated Price..."
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input product-update-input"
            />
            <Label htmlFor="quantity" className="text-zinc-300">
              Product Quantity
            </Label>
            <input
              type="text"
              value={form.quantity}
              placeholder="Enter Update Quantity..."
              onChange={(e) =>
                setForm({ ...form, quantity: Number(e.target.value) })
              }
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input product-update-input"
            />
            <Label htmlFor="category" className="text-zinc-300">
              Product Category
            </Label>
            <input
              type="text"
              placeholder="Enter Updated Category..."
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input product-update-input"
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
