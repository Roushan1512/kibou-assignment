"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BackendURL}/users/userLogin`, {
          email,
          password,
        })
        .then((res) => {
          console.log("Login successful:", res.data.message);
          window.location.href = "/";
          //router.push("/");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("userName", res.data.userName);
        });
    } catch (error: any) {
      if (error.response?.status == 401 || error.response?.status == 409) {
        console.error("Login failed:", error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };
  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className="w-1/3 h-fit flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            onClick={(e) => handleLogin(e)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-800 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <a href="/register/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
