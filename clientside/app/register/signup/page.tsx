"use client";
import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BackendURL}/users/newUser`, {
          email,
          username,
          password,
          companyName,
        })
        .then((res) => {
          console.log("SignUp Successful:", res.data.message);
          window.location.href = "/";
          //router.push("/");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("userName", res.data.userName);
        });
    } catch (error: any) {
      if (error.response?.status == 409) {
        console.log("SignUp failed:", error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };
  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className="w-1/3 h-fit flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
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
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
            onClick={(e) => handleSignup(e)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-800 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <a href="/register/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
