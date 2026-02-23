/**
 * Type definitions for the March Madness Predictor
 */

export interface Team {
  name: string;
  netRtg: number;
  offRtg: number;
  defRtg: number;
  adjTempo: number;
  luck: number;
  sos: number;
}

export type GameSite = 'home' | 'away' | 'neutral';

export interface MatchupInput {
  team1Name: string;
  team2Name: string;
  year: string; // 2-digit year (e.g., "25" for 2025)
  site: GameSite;
}

export interface PredictionResult {
  team1: Team;
  team2: Team;
  winner: Team;
  team1WinProbability: number;
  team2WinProbability: number;
  site: GameSite;
}

