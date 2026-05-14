import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";

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
    <div className="min-h-screen bg-[#18181b] flex items-center justify-center px-4">
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

      <div className="w-full max-w-xs sm:max-w-sm bg-[#202024] border border-[#3f3f46] rounded-xl p-4 sm:p-5 shadow-md">
        <h2 className="text-[#9333ae] text-xl sm:text-2xl  text-center mb-5">
          Welcome to Sign Up
        </h2>

        <form onSubmit={handleSignUp} className="flex flex-col gap-3">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-200 text-sm">Enter Your Name</label>

            <input
              type="text"
              placeholder="Enter Your Name"
              required
              className="bg-[#27272a] border border-[#3f3f46] px-3 py-2 text-sm text-white outline-none focus:border-[#9333ae] transition-all w-full"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-200 text-sm">Enter Your Email</label>

            <input
              type="text"
              placeholder="Enter Your Email"
              required
              className="bg-[#27272a] border border-[#3f3f46] px-3 py-2  text-sm text-white outline-none focus:border-[#9333ae] transition-all w-full"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-200 text-sm">Enter Your Password</label>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                required
                className="bg-[#27272a] border border-[#3f3f46] px-3 py-2 text-sm text-white outline-none focus:border-[#9333ae] transition-all w-full pr-10"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {showPassword ? (
                <LuEyeClosed
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
                  size={16}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <LuEye
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
                  size={16}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>

          {/* Button */}
          <div className="flex items-center justify-center">
            <button className="bg-[#9333ae] hover:bg-[#7e2697] transition-all w-24 text-[#18181b] text-sm  py-2 rounded-lg mt-1 cursor-pointer">
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-gray-300 text-center text-xs sm:text-xs mt-4">
          Already Have An Account?{" "}
          <NavLink
            to={"/login"}
            className="text-[#9333ae] hover:text-[#a855f7]"
          >
            Login Here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
