"use client";
import axios from "axios";
import React from "react";

const Home = () => {
  const handleClick = async (e: any) => {
    e.preventDefault();
    const jwt_token = localStorage.getItem("token") || null;
    await axios
      .get(`${process.env.NEXT_PUBLIC_BackendURL}/test/protected`, {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <button
        className="cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 transition duration-200 px-6"
        onClick={(e) => handleClick(e)}
      >
        Check JWT
      </button>
    </div>
  );
};

export default Home;
