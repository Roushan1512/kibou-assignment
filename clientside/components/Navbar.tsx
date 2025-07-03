"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const Id = localStorage.getItem("userId") || null;
    setUserId(Id);
    const Name = localStorage.getItem("userName") || null;
    setUserName(Name);
  }, []);

  return (
    <div className="fixed top-0 h-[10vh] w-full flex justify-center items-center border-b-white border-b-2 z-10">
      <div className="h-full w-1/3 flex justify-start items-center gap-8 pl-4">
        <Link href="/">Home</Link>
        <Link href="/create">Create</Link>
        {userId != null && userName != null ? (
          <Link href="/profile">Dashboard</Link>
        ) : null}
      </div>
      <div className="h-full w-1/3 flex justify-center items-center">
        <h1 className="text-2xl font-bold">Tenderly</h1>
      </div>
      <div className="h-full w-1/3 flex justify-end items-center gap-8 pr-4">
        {userId != null && userName != null ? (
          <>
            <span className="text-lg">Welcome, {userName}</span>
            <button
              className="cursor-pointer bg-red-500 text-white p-2 rounded hover:bg-red-800 transition duration-200"
              onClick={() => {
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
                localStorage.removeItem("token");
                //router.push("/");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/register/login"
              className="cursor-pointer bg-blue-500 text-white p-2 rounded-md hover:bg-blue-800 transition duration-200 px-6"
            >
              Login / Sign Up
            </Link>
            <Link
              href="/register/company"
              className="cursor-pointer bg-green-500 text-white p-2 rounded-md hover:bg-green-800 transition duration-200 px-6"
            >
              New Company
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
