"use client";
import axios from "axios";
import React, { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId") || null;
    const jwt_token = localStorage.getItem("token") || null;
    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BackendURL}/tenders/newTender`,
          { title, description, deadline, budget, userId },
          { headers: { Authorization: `Bearer ${jwt_token}` } }
        )
        .then((res) => {
          console.log("New Tender created successfully:", res.data.message);
          alert("New Tender created successfully");
          window.location.reload();
        });
    } catch (error: any) {
      if (error.response?.status == 404) {
        console.log("User Not Found : ", error.response.data.message);
        alert("User Not Found. Please login again.");
      } else {
        console.log("Error creating tender :", error.response?.data.message);
        alert(
          `Error creating tender. Please try again. ${error.response?.data.message}`
        );
      }
    }
  };
  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className="w-1/3 h-fit flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Create New Tender</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Tender Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            placeholder="Tender Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          ></textarea>
          <input
            type="date"
            min="2000-01-01"
            max="2050-12-31"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="p-2 border border-gray-300 rounded invert text-black"
            required
          />
          <input
            type="number"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-800 transition duration-200"
          >
            Create New Tender
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
