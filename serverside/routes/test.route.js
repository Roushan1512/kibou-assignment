import express from "express";
// import pool from "../database/db.js";
import sql from "../database/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).send("This is home page");
});

router.get("/test", async (req, res) => {
  const result = await sql`select 1 as 'one';`;
  console.log(result);
  return res.status(200).send(result);
});
export default router;
