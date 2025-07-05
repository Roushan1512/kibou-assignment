import express from "express";
import ConnectDB from "../database/db.js";
import { createHash } from "crypto";
import verifyToken from "../middleware/verify.jwt.js";

const router = express.Router();

router.post("/newTender", verifyToken, async (req, res) => {
  const { title, description, deadline, budget, userId } = await req.body;
  const db = await ConnectDB();
  const userFound = await db
    .from("users")
    .select("*")
    .eq("userId", userId)
    .limit(1);
  if (userFound.data.length == 0) {
    return res.status(404).json({ message: "User Not Found, Please Login" });
  }
  const companyId = userFound.data[0].companyId;
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
    userId: userId,
  });
  return res.status(201).json({ message: "Tender Added", tenderAdded });
});

router.get("/getTenders", async (req, res) => {
  console.log(req.query);
  if (req.query.title) {
    const title = req.query.title;
    const db = await ConnectDB();
    const allTenders = await db
      .from("tenders")
      .select("*,companies(*)")
      .ilike("title", title);
    return res.status(200).json(allTenders);
  } else if (req.query.companyName) {
    const companyName = req.query.companyName;
    const db = await ConnectDB();
    const company = await db
      .from("companies")
      .select("*")
      .eq("companyName", companyName);
    const companyId = company.data[0].companyId;
    const allTenders = await db
      .from("tenders")
      .select("*,companies(*)")
      .ilike("companyId", companyId);
    return res.status(200).json(allTenders);
  } else {
    const db = await ConnectDB();
    const allTenders = await db.from("tenders").select(`*,companies(*)`);
    return res.status(200).json(allTenders);
  }
});

router.get("/getCompfromTender", async (req, res) => {
  const { tenderId } = req.query;
  const db = await ConnectDB();
  const company = await db.from("tenders").select("*").eq("tenderId", tenderId);
  const companyId = company.data[0].companyId;
  return res
    .status(200)
    .json({ message: "Company Found", companyId: companyId });
});

router.get("/getTenderDetails", verifyToken, async (req, res) => {
  const { tenderId } = req.query;
  const db = await ConnectDB();
  const tenders = await db
    .from("tenders")
    .select("*,companies(companyName)")
    .eq("tenderId", tenderId);
  const tenderDetails = tenders.data[0];
  return res.status(200).json(tenderDetails);
});

router.get("/getTenderFromComp", async (req, res) => {
  const { companyId } = req.query;
  const db = await ConnectDB();
  const tenders = await db
    .from("tenders")
    .select("*,companies(*)")
    .eq("companyId", companyId);
  return res.status(200).json(tenders.data);
});

export default router;
