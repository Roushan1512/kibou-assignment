"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { companyId } = useParams();
  const [isCompany, setIsCompany] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>({});
  const [tenderDetails, setTenderDetails] = useState<any>([]);
  const [file, setFile] = useState<any>(null);

  const getCompanyDetails = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BackendURL}/companies/getCompDetails`, {
        params: { companyId },
      })
      .then((res) => {
        console.log(res.data);
        setCompanyDetails(res.data);
      });
  };

  const getTenderFromCompany = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BackendURL}/tenders/getTenderFromComp`, {
        params: { companyId },
      })
      .then((res) => {
        console.log(res.data);
        setTenderDetails(res.data);
      });
  };

  useEffect(() => {
    setIsCompany(companyId == localStorage.getItem("companyId"));
    getCompanyDetails();
    getTenderFromCompany();
  }, [companyId]);

  return (
    <div className="mt-12">
      <div className="w-full h-fit flex justify-center items-center mb-8">
        <h1 className="w-full h-fit text-3xl font-bold mb-4 text-center">
          {isCompany ? "Your Company Profile" : "Company Profile"}
        </h1>
      </div>

      <div className="w-full h-[90vh] flex flex-col justify-start items-center">
        {companyDetails ? (
          <>
            <div className="w-[60vw] h-fit p-4 border-2 border-gray-300 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">
                {companyDetails ? companyDetails.companyName : "Loading..."}
              </h2>
              <p className="text-gray-500">
                {companyDetails ? companyDetails.description : "Loading..."}
              </p>
            </div>
          </>
        ) : null}
        <h2 className="text-3xl font-semibold mt-12 mb-2">Tenders</h2>
        <div className="w-[60vw] h-fit mt-4 p-4 border-2 border-gray-300 rounded-lg shadow-lg">
          {tenderDetails.length > 0 ? (
            tenderDetails.map((tender: any) => (
              <div key={tender.tenderId} className="mb-4">
                <h3 className="text-lg font-medium">{tender.title}</h3>
                <p className="text-gray-500">{tender.description}</p>
                <p className="text-gray-500">{tender.deadline}</p>
                <p className="text-gray-500">{tender.budget}</p>
              </div>
            ))
          ) : (
            <p>No tenders available for this company.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
