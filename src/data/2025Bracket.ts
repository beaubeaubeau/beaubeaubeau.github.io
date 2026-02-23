import type { Team } from '../types';

/**
 * 2025 NCAA Tournament Bracket Data
 * 
 * NOTE: This file needs to be populated with complete data from:
 * 1. Bracket matchups: https://www.espn.com/mens-college-basketball/bracket
 * 2. KenPom stats: https://kenpom.com/index.php?y=2025
 * 
 * Structure: Each region has 16 teams in the standard bracket format:
 * - Matchup 0: 1 vs 16
 * - Matchup 1: 8 vs 9
 * - Matchup 2: 5 vs 12
 * - Matchup 3: 4 vs 13
 * - Matchup 4: 6 vs 11
 * - Matchup 5: 3 vs 14
 * - Matchup 6: 7 vs 10
 * - Matchup 7: 2 vs 15
 * 
 * To find KenPom stats for each team:
 * 1. Go to https://kenpom.com/index.php?y=2025
 * 2. Find the team in the rankings table
 * 3. Copy: NetRtg, AdjOE (Offensive Rating), AdjDE (Defensive Rating), 
 *    AdjT (Adjusted Tempo), Luck, SOS (Strength of Schedule)
 */

interface RegionTeam {
  name: string;
  seed: number;
  netRtg: number;
  offRtg: number;
  defRtg: number;
  adjTempo: number;
  luck: number;
  sos: number;
}

interface RegionBracket {
  region: string;
  teams: RegionTeam[];
}

/**
 * 2025 Tournament Bracket
 * Based on known tournament information:
 * - East #1: Duke
 * - West #1: Florida
 * - South #1: Auburn
 * - Midwest #1: Houston
 * 
 * TODO: Complete all team data with actual KenPom stats from https://kenpom.com/index.php?y=2025
 */
export const BRACKET_2025: RegionBracket[] = [
  {
    region: 'East',
    teams: [
      // Matchup 0: 1 vs 16
      { name: 'Duke', seed: 1, netRtg: 32.05, offRtg: 124.6, defRtg: 92.6, adjTempo: 68.8, luck: 0.043, sos: -3.15 },
      { name: 'TBD #16', seed: 16, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 1: 8 vs 9
      { name: 'TBD #8', seed: 8, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #9', seed: 9, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 2: 5 vs 12
      { name: 'TBD #5', seed: 5, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #12', seed: 12, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 3: 4 vs 13
      { name: 'TBD #4', seed: 4, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #13', seed: 13, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 4: 6 vs 11
      { name: 'TBD #6', seed: 6, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #11', seed: 11, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 5: 3 vs 14
      { name: 'TBD #3', seed: 3, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #14', seed: 14, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 6: 7 vs 10
      { name: 'TBD #7', seed: 7, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #10', seed: 10, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 7: 2 vs 15
      { name: 'TBD #2', seed: 2, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #15', seed: 15, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
    ]
  },
  {
    region: 'West',
    teams: [
      // Matchup 0: 1 vs 16
      { name: 'Florida', seed: 1, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #16', seed: 16, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 1: 8 vs 9
      { name: 'TBD #8', seed: 8, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #9', seed: 9, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 2: 5 vs 12
      { name: 'TBD #5', seed: 5, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #12', seed: 12, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 3: 4 vs 13
      { name: 'TBD #4', seed: 4, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #13', seed: 13, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 4: 6 vs 11
      { name: 'TBD #6', seed: 6, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #11', seed: 11, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 5: 3 vs 14
      { name: 'TBD #3', seed: 3, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #14', seed: 14, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 6: 7 vs 10
      { name: 'TBD #7', seed: 7, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #10', seed: 10, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 7: 2 vs 15
      { name: 'TBD #2', seed: 2, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #15', seed: 15, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
    ]
  },
  {
    region: 'South',
    teams: [
      // Matchup 0: 1 vs 16
      { name: 'Auburn', seed: 1, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #16', seed: 16, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 1: 8 vs 9
      { name: 'TBD #8', seed: 8, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #9', seed: 9, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 2: 5 vs 12
      { name: 'TBD #5', seed: 5, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #12', seed: 12, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 3: 4 vs 13
      { name: 'TBD #4', seed: 4, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #13', seed: 13, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 4: 6 vs 11
      { name: 'TBD #6', seed: 6, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #11', seed: 11, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 5: 3 vs 14
      { name: 'TBD #3', seed: 3, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #14', seed: 14, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 6: 7 vs 10
      { name: 'TBD #7', seed: 7, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #10', seed: 10, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 7: 2 vs 15
      { name: 'TBD #2', seed: 2, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #15', seed: 15, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
    ]
  },
  {
    region: 'Midwest',
    teams: [
      // Matchup 0: 1 vs 16
      { name: 'Houston', seed: 1, netRtg: 27.97, offRtg: 119.2, defRtg: 91.2, adjTempo: 64.5, luck: 0.048, sos: 4.17 },
      { name: 'TBD #16', seed: 16, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 1: 8 vs 9
      { name: 'TBD #8', seed: 8, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #9', seed: 9, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 2: 5 vs 12
      { name: 'TBD #5', seed: 5, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #12', seed: 12, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 3: 4 vs 13
      { name: 'TBD #4', seed: 4, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #13', seed: 13, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 4: 6 vs 11
      { name: 'TBD #6', seed: 6, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #11', seed: 11, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 5: 3 vs 14
      { name: 'TBD #3', seed: 3, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #14', seed: 14, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 6: 7 vs 10
      { name: 'TBD #7', seed: 7, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #10', seed: 10, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      // Matchup 7: 2 vs 15
      { name: 'TBD #2', seed: 2, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
      { name: 'TBD #15', seed: 15, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
    ]
  }
];

/**
 * Convert bracket data to Team array format
 */
export function generate2025Bracket(): Team[] {
  const teams: Team[] = [];
  
  BRACKET_2025.forEach(region => {
    region.teams.forEach(team => {
      teams.push({
        name: team.name,
        seed: team.seed,
        netRtg: team.netRtg,
        offRtg: team.offRtg,
        defRtg: team.defRtg,
        adjTempo: team.adjTempo,
        luck: team.luck,
        sos: team.sos
      });
    });
  });
  
  return teams;
}
