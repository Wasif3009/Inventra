import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    console.log("FORM", form);

    fetch(`${import.meta.env.VITE_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        return res.json().then((data) => {
          if (!res.ok) {
            throw new Error(data.message || "Something went wrong");
          }
          return data;
        });
      })
      .then((data) => {
        toast.success(data.message || "Sign Up Successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <div className="signup">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            zIndex: 9999,
            backgroundColor: "#2a2a2e",
            color: "#F3F4F6",
          },
        }}
      />
      <div className="signup-container">
        <h2> Welcome to Sign Up</h2>
        <div className="signup-form">
          <form
            onSubmit={handleSignUp}
            className="flex flex-col items-center justify-center"
            x
          >
            <div className="input-fields">
              Enter Your Name
              <input
                type="text"
                placeholder="Enter Your Name"
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="input-fields">
              Enter your Email
              <input
                type="text"
                placeholder="Enter Your Email"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="input-fields">
              Enter Your Password
              <div className="password-wrapper flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  required
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                {showPassword ? (
                  <LuEyeClosed
                    className="eye-icon"
                    size={16}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <LuEye
                    className="eye-icon"
                    size={16}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>

            <button>Sign Up</button>
          </form>
        </div>
        <p>
          Already Have An Account?{" "}
          <NavLink to={"/login"} style={{ color: "#7c3aed" }}>
            Login Here{" "}
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
