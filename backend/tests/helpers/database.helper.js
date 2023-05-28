import { mongo } from "../../src/database/mongo.js";
import { MONGO_COLLECTIONS_ENUM } from "../../src/enums/index.js";

let db;
async function connectDb() {
  db = await mongo();
}
connectDb();

async function countData(collection) {
  const result = await db
    .collection(collection)
    .aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
    .toArray();

  return result[0]?.count || 0;
}

async function clearDatabase() {
  await db.collection(MONGO_COLLECTIONS_ENUM.PARTICIPANTS).deleteMany({});
}

function countParticipants() {
  return countData(MONGO_COLLECTIONS_ENUM.PARTICIPANTS);
}

function findParticipantById(id) {
  return db.collection(MONGO_COLLECTIONS_ENUM.PARTICIPANTS).findOne({ _id: id });
}

export { clearDatabase, countParticipants, findParticipantById };
