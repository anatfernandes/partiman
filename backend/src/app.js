import express from "express";
import cors from "cors";
import { loadEnv } from "./config/loadEnv.js";

loadEnv();

const app = express();

app
  .use(express.json())
  .use(cors())
  .use("/health", (_, res) => res.status(200).send("It's alive!"));

export { app };
