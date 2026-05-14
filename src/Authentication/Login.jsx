import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
        if (!res.ok) {
          throw new Error("Invalid Credentials");
        }

        return res.json();
      })
      .then((data) => {
        toast.success(data.message);

        localStorage.setItem("authToken", data.token);

        const decoded = jwtDecode(data.token);

        localStorage.setItem("userName", decoded.email);

        navigate("/");
      })
      .catch((error) => {
        toast.error("Invalid Credentials");
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
            backgroundColor: "#2a2a2e",
            color: "#F3F4F6",
            zIndex: 9999,
          },
        }}
      />

      <div className="w-full max-w-sm bg-[#202024] border border-[#3f3f46] rounded-xl p-5 sm:p-6 shadow-md ">
        <h2 className="text-[#9333ae] text-xl sm:text-2xl  text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 ">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-200 text-sm">Enter Your Email</label>

            <input
              type="text"
              placeholder="Enter Your Email"
              required
              className="bg-[#27272a] border border-[#3f3f46] p-2.5  text-sm text-white outline-none focus:border-[#9333ae] transition-all w-full"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-200 text-sm">Enter Your Password</label>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                required
                className="bg-[#27272a] border border-[#3f3f46] p-2.5  text-sm text-white outline-none focus:border-[#9333ae] transition-all w-full pr-10"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              {showPassword ? (
                <LuEyeClosed
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
                  size={18}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <LuEye
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
                  size={18}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>

          {/* Button */}
          <div className="flex items-center justify-center">
            <button
              className="bg-[#9333ae] hover:bg-[#7e2697] transition-all  text-sm  py-2.5 rounded-lg mt-1
          w-24 text-[#18181b] cursor-pointer
          "
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-gray-300 text-center text-xs mt-5">
          Don&apos;t Have an Account?{" "}
          <NavLink
            to={"/signup"}
            className="text-[#9333ae] hover:text-violet-400"
          >
            Sign Up Here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
