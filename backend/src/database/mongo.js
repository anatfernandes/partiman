import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { loadEnv } from "../config/loadEnv.js";

dotenv.config();
loadEnv();

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function mongo() {
  try {
    const connect = mongoClient.db(process.env.MONGO_DATABASE_NAME);
    return connect;
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);
    return error;
  }
}

export { mongo };
