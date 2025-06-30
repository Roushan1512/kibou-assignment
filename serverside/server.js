import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import testRouter from "./routes/test.route.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors({}));
app.use(express.json());

app.use(testRouter);

app.listen(process.env.PORT, () => {
  console.log(`Express Running on port ${process.env.PORT}`);
});
app.on("error", (err) => {
  console.log("Error Server crashed");
  throw err;
});
