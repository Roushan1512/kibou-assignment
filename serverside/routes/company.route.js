import express from "express";
import ConnectDB from "../database/db.js";
import { createHash } from "crypto";

const router = express.Router();

router.get("/showAll", async (req, res) => {
  try {
    const db = await ConnectDB();
    const companies = await db.from("companies").select("*");
    return res.status(200).json(companies.data);
  } catch (error) {
    return res.status(500).send("Error at api/companies/showAll");
  }
});

router.post("/newCompany", async (req, res) => {
  const { companyName, description } = await req.body;
  const companyId = createHash("sha256")
    .update(companyName)
    .digest("hex")
    .slice(0, 16);
  const db = await ConnectDB();
  const companyExists = await db
    .from("companies")
    .select("*")
    .eq("companyId", companyId);
  if (companyExists.data.length != 0) {
    return res.status(409).json({ message: "Company already Exists" });
  } else {
    const companyAdded = await db.from("companies").insert({
      companyId,
      companyName,
      description,
    });
    return res.status(201).json({
      message: "Company Registered Successfully",
      companyName: companyName,
    });
  }
});

export default router;
