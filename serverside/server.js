import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import testRouter from "./routes/test.route.js";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";
import tenderRouter from "./routes/tender.route.js";
import appRouter from "./routes/application.route.js";

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors({}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/test", testRouter);
app.use("/users", userRouter);
app.use("/companies", companyRouter);
app.use("/tenders", tenderRouter);
app.use("/applications", appRouter);

app.get("/", (req, res) => {
  return res.status(200).send("ExpressJs API LIVE");
});

app.listen(process.env.PORT, () => {
  console.log(`Express Running on port ${process.env.PORT}`);
});
app.on("error", (err) => {
  console.log("Error Server crashed");
  throw err;
});
