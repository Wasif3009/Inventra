import React, { useState } from "react";

const CreateCategory = () => {
  const [form, setForm] = useState({
    name: "",
  });

  const token = localStorage.getItem("authToken");

  const handleAdd = () => {
    fetch(`${import.meta.env.VITE_BASE_URL}/categories`, {
      method: "POST",
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="add-container">
      <form
        onSubmit={handleAdd}
        className="flex flex-col items-center justify-center"
      >
        <div className="input-fields">
          Enter The Name of Category
          <input
            type="text"
            placeholder="Enter the Name of Category"
            required
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          />
        </div>
        <button onClick={handleAdd}>Add Category</button>
      </form>
    </div>
  );
};

export default CreateCategory;
