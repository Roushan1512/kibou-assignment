"use client";
import axios from "axios";
import React from "react";

const Company = () => {
  const [companyName, setCompanyName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState<any>(null);

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

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("avatar", file); // "avatar" matches Express field name

    const res = await axios.post("/api/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
            {/* <>
              <input
                type="file"
                className="cursor-pointer"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <label
                htmlFor="file-upload"
                className="w-fit text-blue-500 p-2 rounded-md px-6"
              >
                Upload Avatar
              </label>
            </> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Company;
