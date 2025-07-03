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

export default router;
