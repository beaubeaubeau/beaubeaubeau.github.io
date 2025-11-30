import type { Team } from '../types';

/**
 * Sample team data for testing
 */

export const SAMPLE_TEAMS: Team[] = [
  { name: 'Michigan', seed: 1, netRtg: 35.14, offRtg: 122.4, defRtg: 87.3, adjTempo: 73.0, luck: 0.064, sos: 14.03 },
  { name: 'Purdue', seed: 1, netRtg: 32.42, offRtg: 129.4, defRtg: 97.0, adjTempo: 66.5, luck: 0.070, sos: 5.25 },
  { name: 'Duke', seed: 1, netRtg: 32.05, offRtg: 124.6, defRtg: 92.6, adjTempo: 68.8, luck: 0.043, sos: -3.15 },
  { name: 'Iowa St.', seed: 1, netRtg: 29.65, offRtg: 122.1, defRtg: 92.5, adjTempo: 69.9, luck: 0.039, sos: 1.02 },
  { name: 'Gonzaga', seed: 2, netRtg: 29.12, offRtg: 122.3, defRtg: 93.1, adjTempo: 72.2, luck: 0.103, sos: 9.42 },
  { name: 'Connecticut', seed: 2, netRtg: 27.97, offRtg: 122.3, defRtg: 94.3, adjTempo: 66.6, luck: 0.011, sos: 1.49 },
  { name: 'Houston', seed: 2, netRtg: 27.97, offRtg: 119.2, defRtg: 91.2, adjTempo: 64.5, luck: 0.048, sos: 4.17 },
  { name: 'Louisville', seed: 2, netRtg: 27.89, offRtg: 126.0, defRtg: 98.1, adjTempo: 71.6, luck: 0.052, sos: -8.16 },
  { name: 'Arizona', seed: 3, netRtg: 27.88, offRtg: 122.5, defRtg: 94.6, adjTempo: 72.1, luck: 0.086, sos: 2.42 },
  { name: 'Vanderbilt', seed: 3, netRtg: 27.50, offRtg: 125.2, defRtg: 97.7, adjTempo: 72.3, luck: 0.030, sos: -0.27 },
  { name: 'Kentucky', seed: 3, netRtg: 26.96, offRtg: 121.9, defRtg: 94.9, adjTempo: 71.6, luck: -0.117, sos: -6.85 },
  { name: 'BYU', seed: 3, netRtg: 26.50, offRtg: 120.5, defRtg: 94.0, adjTempo: 72.8, luck: 0.099, sos: -0.43 },
  { name: 'Kansas', seed: 4, netRtg: 25.00, offRtg: 118.0, defRtg: 93.0, adjTempo: 70.0, luck: 0.050, sos: 2.00 },
  { name: 'North Carolina', seed: 4, netRtg: 24.50, offRtg: 117.5, defRtg: 93.0, adjTempo: 71.0, luck: 0.040, sos: 1.50 },
  { name: 'Villanova', seed: 5, netRtg: 23.00, offRtg: 116.0, defRtg: 93.0, adjTempo: 69.0, luck: 0.030, sos: 0.50 },
  { name: 'Baylor', seed: 5, netRtg: 22.50, offRtg: 115.5, defRtg: 93.0, adjTempo: 70.5, luck: 0.025, sos: -1.00 }
];

/**
 * Generate full bracket of 64 teams
 */
export function generateSampleBracket(): Team[] {
  const regions = ['East', 'West', 'South', 'Midwest'];
  const teams: Team[] = [];
  const seedMatchups: [number, number][] = [
    [1, 16], [8, 9], [5, 12], [4, 13],
    [6, 11], [3, 14], [7, 10], [2, 15]
  ];
  
  for (let region = 0; region < 4; region++) {
    for (let matchup = 0; matchup < 8; matchup++) {
      const [seed1, seed2] = seedMatchups[matchup];
      
      // Get base team stats and adjust for seed
      const base1 = SAMPLE_TEAMS[(seed1 - 1) % SAMPLE_TEAMS.length];
      const base2 = SAMPLE_TEAMS[(seed2 - 1) % SAMPLE_TEAMS.length];
      
      teams.push({
        name: `${base1.name} (${regions[region]})`,
        seed: seed1,
        netRtg: base1.netRtg - (seed1 - 1) * 1.5,
        offRtg: base1.offRtg - (seed1 - 1) * 0.8,
        defRtg: base1.defRtg + (seed1 - 1) * 0.5,
        adjTempo: base1.adjTempo,
        luck: base1.luck,
        sos: base1.sos - (seed1 - 1) * 0.5
      });
      
      teams.push({
        name: `${base2.name} (${regions[region]})`,
        seed: seed2,
        netRtg: base2.netRtg - (seed2 - 1) * 1.5,
        offRtg: base2.offRtg - (seed2 - 1) * 0.8,
        defRtg: base2.defRtg + (seed2 - 1) * 0.5,
        adjTempo: base2.adjTempo,
        luck: base2.luck,
        sos: base2.sos - (seed2 - 1) * 0.5
      });
    }
  }
  
  return teams;
}

