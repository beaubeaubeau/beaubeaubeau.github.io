/**
 * Type definitions for the March Madness Bracket Predictor
 */

export interface Team {
  name: string;
  seed: number;
  netRtg: number;
  offRtg: number;
  defRtg: number;
  adjTempo: number;
  luck: number;
  sos: number;
}

export interface Matchup {
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
}

export interface Bracket {
  round1: Matchup[];
  round2: Matchup[];
  round3: Matchup[];
  round4: Matchup[];
  round5: Matchup[];
  round6: Matchup[];
}

export interface RoundInfo {
  name: string;
  key: keyof Bracket;
  matchups: number;
}

export interface NextMatchupInfo {
  round: keyof Bracket;
  matchupIndex: number;
  position: number;
}

