import { describe, it, expect, beforeEach, afterAll } from "@jest/globals";
import supertest from "supertest";
import httpStatus from "http-status";
import { app } from "../../src/app.js";
import { clearDatabase, countParticipants, findParticipantById } from "../helpers/database.helper.js";
import { createParticipant, generateInvalidParticipant, generateValidParticipant } from "../factories/index.js";

const server = supertest(app);
const baseURI = "/api";

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
});

describe("POST /participants", () => {
  const uri = `${baseURI}/participants`;

  it("should return 400 if body is invalid", async () => {
    const body = generateInvalidParticipant();
    const response = await server.post(uri).send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return 400 if body 'participation' field is less than or equal to 0", async () => {
    const body = generateValidParticipant();
    body.participation = 0;
    const response = await server.post(uri).send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return 400 if body 'participation' field is greater than 100", async () => {
    const body = generateValidParticipant();
    body.participation = 101;
    const response = await server.post(uri).send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return 400 if total participation in database exceeds 100", async () => {
    await createParticipant({ participation: 90 });
    const body = generateValidParticipant();
    body.participation = 10.5;

    const response = await server.post(uri).send(body);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return 201 and created participant", async () => {
    const body = generateValidParticipant();
    const response = await server.post(uri).send(body);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toMatchObject({ ...body });
  });

  it("should return 200 and updated participant", async () => {
    const participant = await createParticipant({});
    const body = {
      firstname: participant.firstname,
      lastname: participant.lastname,
      participation: 32,
    };
    const response = await server.post(uri).send(body);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toMatchObject({ ...body });
  });

  it("should create participant in database", async () => {
    const body = generateValidParticipant();

    const beforeCount = await countParticipants();
    await server.post(uri).send(body);
    const afterCount = await countParticipants();

    expect(afterCount).toBe(beforeCount + 1);
  });

  it("should update participant in database", async () => {
    const participant = await createParticipant({});
    const body = {
      firstname: participant.firstname,
      lastname: participant.lastname,
      participation: 32,
    };

    await server.post(uri).send(body);

    const updatedParticipant = await findParticipantById(participant._id);

    expect(updatedParticipant.participation).toBe(body.participation);
  });
});

describe("GET /participants", () => {
  const uri = `${baseURI}/participants`;

  it("should return status 200 and an empty array if there are no participants yet", async () => {
    const response = await server.get(uri);
    expect(response.body).toEqual([]);
    expect(response.status).toEqual(httpStatus.OK);
  });

  it("should return status 200 and an array of participants", async () => {
    const firstParticipant = await createParticipant({});
    firstParticipant._id = firstParticipant._id.toString();
    firstParticipant.createdAt = firstParticipant.createdAt.toISOString();
    firstParticipant.updatedAt = firstParticipant.updatedAt.toISOString();

    const secondParticipant = await createParticipant({});
    secondParticipant._id = secondParticipant._id.toString();
    secondParticipant.createdAt = secondParticipant.createdAt.toISOString();
    secondParticipant.updatedAt = secondParticipant.updatedAt.toISOString();

    const expectedArray = [firstParticipant, secondParticipant];

    const response = await server.get(uri);
    expect(response.body).toEqual(expect.arrayContaining(expectedArray));
    expect(response.status).toEqual(httpStatus.OK);
    expect(response.body.length).toBe(expectedArray.length);
  });
});
