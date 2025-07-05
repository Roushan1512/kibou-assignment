"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [tenders, setTenders] = useState([]);
  const [selected, setSelected] = useState("title");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getTenders = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BackendURL}/tenders/getTenders`, {
        params:
          selected == "title"
            ? { title: searchQuery }
            : { companyName: searchQuery },
      })
      .then((res) => {
        console.log(res.data.data);
        setTenders(res.data.data);
      });
  };

  useEffect(() => {
    console.log({
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      companyId: localStorage.getItem("companyId"),
      token: localStorage.getItem("token"),
    });
    setUserLoggedIn(localStorage.getItem("userId") != null);
    getTenders();
  }, []);

  return (
    <div className="w-full h-[90vh] pt-12 flex flex-col justify-start items-center gap-16">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">
          Create, Manage and Apply for Tenders
          <button
            className="text-blue-500 ml-4 hover:text-blue-800 transition duration-200"
            onClick={() => {
              window.location.reload();
            }}
          >
            ⭮
          </button>
        </h1>
        <div className="w-[60vw] h-fit flex justify-center items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Tenders by...."
            className="h-10 p-2 border-2 border-gray-300 rounded-l-lg w-[60vh]"
            required
          />
          <select
            className="h-10 p-2 border-2 border-gray-300 w-[30vh]"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="title" className="text-black bg-gray-300">
              Title
            </option>
            <option value="companyName" className="text-black bg-gray-300">
              Company
            </option>
          </select>
          <button
            onClick={getTenders}
            className="flex justify-center items-center h-10 w-[10vh] bg-blue-500 text-white p-2 rounded-r-lg border-4 border-blue-500 hover:bg-blue-800 hover:border-blue-800 transition duration-200"
          >
            Search
          </button>
        </div>
      </div>
      <div className="">
        {tenders.length > 0 ? (
          <div className="w-[60vw] h-fit flex flex-col gap-4">
            {tenders.map((tender: any) => (
              <div
                key={tender.tenderId}
                className="w-full h-fit p-4 flex justify-center items-start border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <div className="w-[80vw] h-fit flex flex-col gap-1 pl-4">
                  <h2 className="text-xl font-semibold">
                    <a href={`/profile/${tender.companies.companyId}`}>
                      {tender.title}
                    </a>
                  </h2>
                  <p className="text-gray-500">{tender.description}</p>
                  <p className="text-gray-500">
                    Company: {tender.companies.companyName}
                  </p>
                  <p className="text-gray-500">Budget: {tender.budget} Rs</p>
                  <p className="text-gray-500">
                    Deadline: {new Date(tender.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-[20vw] h-full flex justify-end items-start">
                  {tender.companies.companyId ===
                  localStorage.getItem("companyId") ? (
                    <button className="ml-auto bg-green-500 text-white p-2 rounded hover:bg-green-800 transition duration-200">
                      <a href={`/tender/${tender.tenderId}`}>View</a>
                    </button>
                  ) : (
                    <button
                      className={`ml-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-800 transition duration-200 ${
                        userLoggedIn
                          ? ""
                          : "bg-neutral-500 hover:bg-neutral-600"
                      }`}
                    >
                      <a
                        href={userLoggedIn ? `/tender/${tender.tenderId}` : "#"}
                        className={
                          userLoggedIn ? "cursor-pointer" : "cursor-not-allowed"
                        }
                      >
                        Apply
                      </a>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
