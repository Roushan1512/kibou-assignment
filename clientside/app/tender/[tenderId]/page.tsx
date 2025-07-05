"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TenderId = () => {
  const { tenderId } = useParams();
  const [isCompany, setIsCompany] = useState(false);
  const [proposal, setProposal] = useState("");
  const [tender, setTender] = useState<any>();
  const [applications, setApplications] = useState<any[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const jwt_token = localStorage.getItem("token") || null;
    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_BackendURL}/applications/newApplication`,
          {
            tenderId,
            proposal,
            companyId: localStorage.getItem("companyId"),
          },
          { headers: { Authorization: `Bearer ${jwt_token}` } }
        )
        .then((res) => {
          console.log("Proposal submitted successfully:", res.data.message);
        });
    } catch (error: any) {
      if (error.response?.status == 401 || error.response?.status == 409) {
        console.error(
          "Proposal submission failed:",
          error.response.data.message
        );
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const getCompanyFromTender = async () => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BackendURL}/tenders/getCompfromTender`,
          { params: { tenderId } }
        )
        .then((res) => {
          const { companyId } = res.data;
          //console.log(companyId);
          if (companyId == localStorage.getItem("companyId")) {
            setIsCompany(true);
          }
        });
    };
    getCompanyFromTender();

    const getTenderDetails = async () => {
      const jwt_token = localStorage.getItem("token") || null;
      await axios
        .get(`${process.env.NEXT_PUBLIC_BackendURL}/tenders/getTenderDetails`, {
          params: { tenderId },
          headers: { Authorization: `Bearer ${jwt_token}` },
        })
        .then((res) => {
          console.log("Tender Details:", res.data);
          setTender(res.data);
        });
    };
    getTenderDetails();

    const getApplications = async () => {
      const jwt_token = localStorage.getItem("token") || null;
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_BackendURL}/applications/getAppFromTender`,
          {
            params: { tenderId },
            headers: { Authorization: `Bearer ${jwt_token}` },
          }
        )
        .then((res) => {
          console.log("Applications:", res.data);
          setApplications(res.data);
        });
    };
    getApplications();
  }, [tenderId]);
  return (
    <div className="mt-12 flex flex-col justify-start items-center gap-12 w-full h-[90vh]">
      <div className="w-1/2 h-fit flex flex-col justify-center items-start gap-4">
        <h1 className="text-2xl font-bold mb-4">Tender Details</h1>
        <div className="w-full h-fit p-4 border border-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">
            Title : {tender != null ? tender.title : null}
          </h2>
          <p className="text-gray-400">
            Created By: {tender != null ? tender.companies.companyName : null}
          </p>
          <p className="text-gray-600">
            Description: {tender != null ? tender.description : null}
          </p>
          <p className="text-gray-600">
            Budget: {tender != null ? tender.budget : null} Rs
          </p>
          <p className="text-gray-600">
            Deadline: {tender != null ? tender.deadline : null}
          </p>
        </div>
      </div>
      {isCompany ? null : (
        <>
          <div className="w-full h-fit flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Submit Your Proposal</h1>
            <form className="w-1/2 flex flex-col justify-center items-center gap-4">
              <textarea
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                rows={5}
                placeholder="Your Porposal"
                className="p-2 border border-gray-300 rounded w-2/3"
                required
              />
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-800 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
      <div className="w-1/2 h-fit flex flex-col justify-center items-start gap-4">
        <h1 className="text-2xl font-bold mb-4">Proposals Applied Till Now</h1>
        {applications.length > 0 ? (
          applications.map((application, index) => (
            <div
              key={index}
              className="w-full h-fit p-4 border border-gray-300 rounded-lg shadow-md mb-4"
            >
              <h2 className="text-xl font-semibold">
                Proposal by: {application.companies.companyName}
              </h2>
              <p className="text-gray-600">{application.proposal}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No applications yet.</p>
        )}
      </div>
    </div>
  );
};

export default TenderId;
