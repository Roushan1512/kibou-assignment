import express from "express";
import ConnectDB from "../database/db.js";
import { createHash } from "crypto";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/showAll", async (req, res) => {
  try {
    const db = await ConnectDB();
    const allUsers = await db.from("users").select("*");
    return res.json(allUsers.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error at api/users/showAll");
  }
});

router.post("/newUser", async (req, res) => {
  const { email, username, password, companyName } = await req.body;
  const userId = createHash("sha256").update(email).digest("hex").slice(0, 16);
  const db = await ConnectDB();
  const userExists = await db.from("users").select("*").eq("userId", userId);
  if (userExists.data.length != 0) {
    return res.status(409).json({ message: "User already Exists" });
  } else {
    const company = await db
      .from("companies")
      .select("companyId")
      .eq("companyName", companyName)
      .limit(1);
    if (company.data.length == 0) {
      return res.status(409).json({ message: "Company Not Found" });
    }
    const jwt_token = jwt.sign({ userId: userId }, process.env.JWT_Secret);
    const userAdded = await db.from("users").insert({
      userId: userId,
      email: email,
      userName: username,
      password: password,
      companyId: company.data[0].companyId,
    });
    return res.status(201).json({
      message: "User added successfully",
      token: jwt_token,
      userId: userId,
      userName: username,
      companyId: company.data[0].companyId,
    });
  }
});

router.post("/userLogin", async (req, res) => {
  const { email, password } = await req.body;
  const userId = createHash("sha256").update(email).digest("hex").slice(0, 16);
  const db = await ConnectDB();
  const userExists = await db.from("users").select("*").eq("userId", userId);
  if (userExists.data.length == 0) {
    return res
      .status(409)
      .json({ message: "User does not exist try Signing up" });
  } else {
    const userPass = userExists.data[0].password;
    console.log(userPass, userExists);
    if (userPass == password) {
      const jwt_token = jwt.sign({ userId: userId }, process.env.JWT_Secret);
      const company = await db
        .from("companies")
        .select("companyName,users(companyId)")
        .eq("companyId", userExists.data[0].companyId);
      return res.status(200).json({
        userId: userId,
        userName: userExists.data[0].userName,
        token: jwt_token,
        message: "Logged in Successfully",
        companyId: userExists.data[0].companyId,
      });
    } else {
      return res.status(401).json({ message: "Wrong Password, Try again" });
    }
  }
});

export default router;
