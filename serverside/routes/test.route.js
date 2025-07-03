import express from "express";
import ConnectDB from "../database/db.js";
import verifyToken from "../middleware/verify.jwt.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).send("This is TEST page");
});

router.get("/showAll", async (req, res) => {
  const db = await ConnectDB();
  const result = await db.from("test").select("*");
  const { data, error } = result;
  return res.status(200).json(data);
});

router.get("/new", async (req, res) => {
  const db = await ConnectDB();
  const newRow = await db
    .from("test")
    .insert({ name: "N", description: "That One" });
  return res.status(201).json(newRow);
});

router.get("/protected", verifyToken, async (req, res) => {
  res.status(200).send("Protected route");
});

export default router;
