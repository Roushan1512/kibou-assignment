import express from "express";
import ConnectDB from "../database/db.js";
import { createHash } from "crypto";

const router = express.Router();

router.post("/newTender", async (req, res) => {
  const { title, description, deadline, budget, companyName } = await req.body;
  const db = await ConnectDB();
  const companyFound = await db
    .from("companies")
    .select("*")
    .eq("companyName", companyName)
    .limit(1);
  if (companyFound.data.length == 0) {
    return res.status(404).json({ message: "Company Not Found" });
  }
  const companyId = companyFound.data[0].companyId;
  const tenderId = createHash("sha256")
    .update(companyId + title)
    .digest("hex")
    .slice(0, 16);
  const tenderAdded = await db.from("tenders").insert({
    tenderId: tenderId,
    title: title,
    description: description,
    deadline: deadline,
    budget: budget,
    companyId: companyId,
  });
  return res.status(201).json({ message: "Tender Added", tenderAdded });
});

export default router;
