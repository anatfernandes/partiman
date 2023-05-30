import { faker } from "@faker-js/faker";
import { mongo } from "../../src/database/mongo.js";
import { MONGO_COLLECTIONS_ENUM } from "../../src/enums/index.js";
import { ObjectId } from "mongodb";

let db;
async function connectDb() {
  db = await mongo();
}
connectDb();

function generateValidParticipant() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    participation: faker.number.int({ min: 1, max: 100 }),
  };
}

function generateInvalidParticipant() {
  return { firstname: faker.person.firstName() };
}

function generateValidParticipantId() {
  return new ObjectId();
}

async function createParticipant({
  firstname = faker.person.firstName(),
  lastname = faker.person.lastName(),
  participation = faker.number.int({ min: 1, max: 100 }),
}) {
  const created = await db.collection(MONGO_COLLECTIONS_ENUM.PARTICIPANTS).findOneAndUpdate(
    {
      firstname,
      lastname,
      participation,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { $set: {} },
    { upsert: true, returnDocument: "after" },
  );
  return created.value;
}

export { generateInvalidParticipant, generateValidParticipant, generateValidParticipantId, createParticipant };
