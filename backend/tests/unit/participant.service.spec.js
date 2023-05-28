import { jest, describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { generateValidParticipant } from "../factories/participant.factory.js";
import { participantServiceForTesting } from "../../src/services/participant.services.js";
import { participantRepository } from "../../src/repositories/participant.repository.js";

beforeAll(() => {
  jest.restoreAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("getTotalParticipation", () => {
  it("should return 0", async () => {
    jest.spyOn(participantRepository, "sumTotal").mockImplementationOnce(() => Promise.resolve([]));
    const result = await participantServiceForTesting.getTotalParticipation();
    expect(result).toBe(0);
  });

  it("should return 7", async () => {
    jest.spyOn(participantRepository, "sumTotal").mockImplementationOnce(() => Promise.resolve([{ total: 7 }]));
    const result = await participantServiceForTesting.getTotalParticipation();
    expect(result).toBe(7);
  });
});

describe("validateParticipationQuantity", () => {
  const expectedError = {
    type: expect.any(String),
    message: expect.any(String),
  };

  it("should return undefined without 'minus' param", async () => {
    jest.spyOn(participantRepository, "sumTotal").mockImplementationOnce(() => Promise.resolve([{ total: 50 }]));
    const result = await participantServiceForTesting.validateParticipationQuantity({ participation: 50 });

    expect(result).toBeUndefined();
  });

  it("should return undefined with 'minus' param", async () => {
    jest.spyOn(participantRepository, "sumTotal").mockImplementationOnce(() => Promise.resolve([{ total: 50 }]));

    const result = await participantServiceForTesting.validateParticipationQuantity({ participation: 60, minus: 10 });
    expect(result).toBeUndefined();
  });

  it("should return an error without 'minus' param", async () => {
    jest.spyOn(participantRepository, "sumTotal").mockImplementationOnce(() => Promise.resolve([{ total: 50 }]));

    const result = participantServiceForTesting.validateParticipationQuantity({ participation: 51 });
    await expect(result).rejects.toEqual(expectedError);
  });

  it("should return an error without 'minus' param", async () => {
    jest.spyOn(participantRepository, "sumTotal").mockImplementationOnce(() => Promise.resolve([{ total: 50 }]));

    const result = participantServiceForTesting.validateParticipationQuantity({ participation: 60, minus: 5 });
    await expect(result).rejects.toEqual(expectedError);
  });
});

describe("upsert", () => {
  const participant = generateValidParticipant();

  it("should create participant", async () => {
    const expectResult = { data: participant, updated: false };

    jest.spyOn(participantRepository, "sumTotal").mockImplementationOnce(() => Promise.resolve([]));
    jest.spyOn(participantRepository, "findByCredentials").mockImplementationOnce(() => Promise.resolve(null));
    jest
      .spyOn(participantRepository, "upsert")
      .mockImplementationOnce(() =>
        Promise.resolve({ ok: 1, value: participant, lastErrorObject: { updatedExisting: false } }),
      );

    const result = await participantServiceForTesting.upsert(participant);
    expect(result).toEqual(expectResult);
  });

  it("should update participant", async () => {
    const expectResult = { data: participant, updated: true };

    jest
      .spyOn(participantServiceForTesting, "validateParticipationQuantity")
      .mockImplementation(() => Promise.resolve());
    jest.spyOn(participantRepository, "sumTotal").mockImplementationOnce(() => Promise.resolve([]));
    jest.spyOn(participantRepository, "findByCredentials").mockImplementationOnce(() => Promise.resolve(participant));
    jest
      .spyOn(participantRepository, "upsert")
      .mockImplementationOnce(() =>
        Promise.resolve({ ok: 1, value: participant, lastErrorObject: { updatedExisting: true } }),
      );

    const result = await participantServiceForTesting.upsert(participant);
    expect(result).toEqual(expectResult);
  });

  it("should return an error if not saved/updated", async () => {
    const expectedError = {
      type: expect.any(String),
      message: expect.any(String),
    };

    jest.spyOn(participantRepository, "sumTotal").mockImplementationOnce(() => Promise.resolve([]));
    jest
      .spyOn(participantServiceForTesting, "validateParticipationQuantity")
      .mockImplementation(() => Promise.resolve());
    jest.spyOn(participantRepository, "findByCredentials").mockImplementationOnce(() => Promise.resolve(participant));
    jest.spyOn(participantRepository, "upsert").mockImplementationOnce(() => Promise.resolve({ ok: 0 }));

    const result = participantServiceForTesting.upsert(participant);
    await expect(result).rejects.toEqual(expectedError);
  });
});
