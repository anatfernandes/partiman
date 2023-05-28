import { mongo } from "../database/mongo.js";
import { MONGO_COLLECTIONS_ENUM } from "../enums/index.js";

let db;
async function connectDb() {
  db = await mongo();
}
connectDb();

function sumTotal() {
  return db
    .collection(MONGO_COLLECTIONS_ENUM.PARTICIPANTS)
    .aggregate([{ $group: { _id: null, total: { $sum: "$participation" } } }])
    .toArray();
}

function findByCredentials(firstname, lastname) {
  return db.collection(MONGO_COLLECTIONS_ENUM.PARTICIPANTS).findOne({ firstname, lastname });
}

function findAll() {
  return db.collection(MONGO_COLLECTIONS_ENUM.PARTICIPANTS).find().sort({ participation: -1 }).toArray();
}

function upsert(data, existingParticipant) {
  return db.collection(MONGO_COLLECTIONS_ENUM.PARTICIPANTS).findOneAndUpdate(
    existingParticipant,
    {
      $set: data,
    },
    { upsert: true, returnDocument: "after" },
  );
}

const participantRepository = { sumTotal, findByCredentials, findAll, upsert };

export { participantRepository };
