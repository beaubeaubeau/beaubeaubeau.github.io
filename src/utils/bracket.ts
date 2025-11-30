import type { Bracket, RoundInfo, NextMatchupInfo } from '../types';

/**
 * Bracket generation and management utilities
 */

export const ROUNDS: RoundInfo[] = [
  { name: 'Round of 64', key: 'round1', matchups: 32 },
  { name: 'Round of 32', key: 'round2', matchups: 16 },
  { name: 'Sweet 16', key: 'round3', matchups: 8 },
  { name: 'Elite 8', key: 'round4', matchups: 4 },
  { name: 'Final 4', key: 'round5', matchups: 2 },
  { name: 'Championship', key: 'round6', matchups: 1 }
];

/**
 * Standard bracket seed matchups for Round of 64
 */
export const SEED_MATCHUPS: [number, number][] = [
  [1, 16], [8, 9], [5, 12], [4, 13],
  [6, 11], [3, 14], [7, 10], [2, 15]
];

/**
 * Initialize empty bracket structure
 */
export function initializeBracket(): Bracket {
  return ROUNDS.reduce((acc, round) => {
    acc[round.key] = Array(round.matchups).fill(null).map(() => ({
      team1: null,
      team2: null,
      winner: null
    }));
    return acc;
  }, {} as Bracket);
}

/**
 * Get the next round key
 */
export function getNextRound(currentRound: keyof Bracket): keyof Bracket | null {
  const roundKeys: (keyof Bracket)[] = ROUNDS.map(r => r.key);
  const currentIndex = roundKeys.indexOf(currentRound);
  return currentIndex < roundKeys.length - 1 ? roundKeys[currentIndex + 1] : null;
}

/**
 * Calculate next round matchup index and position from current matchup
 */
export function getNextMatchupInfo(roundKey: keyof Bracket, matchupIndex: number): NextMatchupInfo | null {
  const nextRound = getNextRound(roundKey);
  if (!nextRound) return null;
  
  return {
    round: nextRound,
    matchupIndex: Math.floor(matchupIndex / 2),
    position: matchupIndex % 2
  };
}

