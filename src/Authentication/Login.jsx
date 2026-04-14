import React, { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error("Invalid Credentials");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        toast.success(data.message);
        localStorage.setItem("authToken", data.token);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Invalid Credentials");
        console.log(error);
      });
  };

  return (
    <div className="login">
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
      <div className="login-container">
        <h2>Welcome Back</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center"
        >
          <div className="input-fields">
            Enter Your Email
            <input
              type="text"
              placeholder="Enter Your Email"
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="input-fields">
            Enter Your Password
            <input
              type="password"
              placeholder="Enter Your Password"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button>Login</button>
        </form>
        <p>
          Don't Have an Account?{" "}
          <NavLink to={"/signup"} style={{ color: "#7c3aed" }}>
            Sign Up Here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
