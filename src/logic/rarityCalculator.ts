import { ScoreMap, PersonalityType, BlobResult } from '../types';
import { BLOB_RESULTS } from '../constants/blobResults';

const MAX_SCORES: ScoreMap = {
  burnout: 21,
  buffet: 21,
  sale: 18,
  deadline: 21,
  finalboss: 21,
  lucky: 18,
};

function normalize(scores: ScoreMap): ScoreMap {
  return (Object.keys(scores) as PersonalityType[]).reduce(
    (acc, key) => ({ ...acc, [key]: scores[key] / MAX_SCORES[key] }),
    {} as ScoreMap,
  );
}

function getDominant(normalized: ScoreMap): PersonalityType {
  return (Object.keys(normalized) as PersonalityType[]).reduce((a, b) =>
    normalized[a] >= normalized[b] ? a : b,
  );
}

export function calculateResult(scores: ScoreMap): BlobResult {
  // 1% wild-card for Mythic Lucky Blob regardless of score
  if (Math.random() < 0.01) return BLOB_RESULTS.lucky;

  const normalized = normalize(scores);
  const dominant = getDominant(normalized);
  const rand = Math.random();

  // Probability cascades — rarer types have low chances even when dominant
  switch (dominant) {
    case 'lucky':
      if (rand < 0.30) return BLOB_RESULTS.lucky;        // 30% Mythic
      if (rand < 0.65) return BLOB_RESULTS.finalboss;    // 35% Legendary
      return BLOB_RESULTS.deadline;                        // 35% Super Rare

    case 'finalboss':
      if (rand < 0.20) return BLOB_RESULTS.finalboss;    // 20% Legendary
      if (rand < 0.55) return BLOB_RESULTS.deadline;     // 35% Super Rare
      if (rand < 0.80) return BLOB_RESULTS.sale;         // 25% Rare
      return rand < 0.90 ? BLOB_RESULTS.burnout : BLOB_RESULTS.buffet;

    case 'deadline':
      if (rand < 0.55) return BLOB_RESULTS.deadline;     // 55% Super Rare
      if (rand < 0.80) return BLOB_RESULTS.sale;         // 25% Rare
      return rand < 0.90 ? BLOB_RESULTS.burnout : BLOB_RESULTS.buffet;

    case 'sale':
      if (rand < 0.70) return BLOB_RESULTS.sale;         // 70% Rare
      return rand < 0.85 ? BLOB_RESULTS.burnout : BLOB_RESULTS.buffet;

    case 'burnout':
      return BLOB_RESULTS.burnout;

    case 'buffet':
      return BLOB_RESULTS.buffet;

    default:
      return BLOB_RESULTS.burnout;
  }
}

export function initScores(): ScoreMap {
  return { burnout: 0, buffet: 0, sale: 0, deadline: 0, finalboss: 0, lucky: 0 };
}

export function addScores(current: ScoreMap, partial: Partial<ScoreMap>): ScoreMap {
  const updated = { ...current };
  (Object.keys(partial) as PersonalityType[]).forEach((key) => {
    updated[key] += partial[key] ?? 0;
  });
  return updated;
}
