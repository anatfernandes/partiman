import { errorHelper } from "../helpers/error.helper.js";
import { participantRepository } from "../repositories/participant.repository.js";

function isTestingEnvironment() {
  return process.env.NODE_ENV === "test";
}

async function getTotalParticipation() {
  const sum = await participantRepository.sumTotal();

  return sum[0]?.total || 0;
}

async function validateParticipationQuantity({ participation, minus = 0 }) {
  const totalParticipation = await getTotalParticipation();
  const participantionSum = totalParticipation + participation - minus;

  if (participantionSum > 100) {
    throw errorHelper.badRequest(`Participation exceeded by ${participantionSum - 100}!`);
  }
}

async function upsert(data) {
  const participant = { ...data, updatedAt: new Date() };
  const existingParticipant = await participantRepository.findByCredentials(
    participant.firstname,
    participant.lastname,
  );

  await validateParticipationQuantity({
    participation: participant.participation,
    minus: existingParticipant?.participation || 0,
  });

  if (!existingParticipant) participant.createdAt = new Date();

  const result = await participantRepository.upsert(participant, existingParticipant || {});

  if (!result.ok) {
    throw errorHelper.server("There was an error saving participant!");
  }

  return { data: result.value, updated: result.lastErrorObject.updatedExisting };
}

const participantService = { upsert };
const participantServiceForTesting = !isTestingEnvironment
  ? {}
  : { upsert, getTotalParticipation, validateParticipationQuantity };

export { participantService, participantServiceForTesting };
