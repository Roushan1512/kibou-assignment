import express from "express";
import ConnectDB from "../database/db.js";
import verifyToken from "../middleware/verify.jwt.js";
import { createHash } from "crypto";

const router = express.Router();

router.get("/allApplications", async (req, res) => {
  const db = await ConnectDB();
  const applications = await db.from("applications").select("*");
  return res.status(200).json(applications.data);
});

router.post("/newApplication", verifyToken, async (req, res) => {
  const { tenderId, companyId, proposal } = await req.body;
  const appId = createHash("sha256")
    .update(tenderId + companyId)
    .digest("hex")
    .slice(0, 16);
  const db = await ConnectDB();
  const appAdded = await db.from("applications").insert({
    appId: appId,
    tenderId: tenderId,
    companyId: companyId,
    proposal: proposal,
  });
  return res.status(201).json({ message: "Proposal Added", appAdded });
});

router.get("/getAppFromTender", verifyToken, async (req, res) => {
  const { tenderId } = req.query;
  const db = await ConnectDB();
  const apps = await db
    .from("applications")
    .select("*,companies(*)")
    .eq("tenderId", tenderId);
  return res.status(200).json(apps.data);
});

export default router;
