"use client";
import axios from "axios";
import React from "react";

const Company = () => {
  const [companyName, setCompanyName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BackendURL}/companies/newCompany`, {
          companyName,
          description,
        })
        .then((res) => {
          console.log("Company created successfully:", res.data.message);
          window.location.href = "/";
        });
    } catch (error: any) {
      if (error.response?.status == 409) {
        console.log("Company creation failed:", error.response.data.message);
        alert(error.response.data.message);
      }
    }
  };
  return (
    <div>
      <div className="w-full h-[90vh] flex justify-center items-center">
        <div className="w-1/3 h-fit flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Register New Company</h1>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-800 transition duration-200"
            >
              Create Company
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Company;
