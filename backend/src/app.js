import express from "express";
import cors from "cors";
import { loadEnv } from "./config/loadEnv.js";
import { responseHelper } from "./helpers/index.js";

loadEnv();

const app = express();

app
  .use(express.json())
  .use(cors())
  .use("/api/health", (_, res) => responseHelper.OK({ res, body: "It's alive!" }));

export { app };
