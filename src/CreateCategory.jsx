import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

const CreateCategory = ({ open, setOpen, dataUpdated, setDataUpdated }) => {
  const [form, setForm] = useState({
    name: "",
  });

  const token = localStorage.getItem("authToken");

  const handleAdd = () => {
    if (!form.name) {
      toast.error(`Please Add Category Name`);
      return;
    }
    fetch(`${import.meta.env.VITE_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpen(false);
        setDataUpdated(!dataUpdated);
        toast.success(`${form.name} Added Successfully `, {
          duration: 3000,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} className="dialog">
        <DialogContent className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 dialog">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Create Category
            </DialogTitle>

            <DialogDescription className="text-zinc-400 text-base">
              Add a new Category to your inventory
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Enter Category Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-600 text-white  dialog-input"
            />

            <button
              onClick={handleAdd}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md dialog-btn"
            >
              Create
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateCategory;
