import type { Team } from '../types';

/**
 * KenPom 2025 Data - Parsed from provided data
 * This is a lookup table for all tournament teams
 */

interface KenPomTeamData {
  name: string;
  seed?: number;
  netRtg: number;
  offRtg: number;
  defRtg: number;
  adjTempo: number;
  luck: number;
  sos: number;
}

// Parsed KenPom data for tournament teams (those with seeds)
export const KENPOM_2025_DATA: Record<string, KenPomTeamData> = {
  'Duke': { name: 'Duke', seed: 1, netRtg: 39.29, offRtg: 130.1, defRtg: 90.8, adjTempo: 66.0, luck: -0.026, sos: 11.51 },
  'Houston': { name: 'Houston', seed: 1, netRtg: 36.59, offRtg: 123.4, defRtg: 86.8, adjTempo: 61.9, luck: 0.020, sos: 15.63 },
  'Florida': { name: 'Florida', seed: 1, netRtg: 36.46, offRtg: 128.2, defRtg: 91.8, adjTempo: 70.1, luck: 0.032, sos: 16.15 },
  'Auburn': { name: 'Auburn', seed: 1, netRtg: 35.05, offRtg: 127.2, defRtg: 92.1, adjTempo: 68.2, luck: 0.026, sos: 19.63 },
  'Tennessee': { name: 'Tennessee', seed: 2, netRtg: 30.93, offRtg: 120.7, defRtg: 89.7, adjTempo: 63.7, luck: 0.029, sos: 16.80 },
  'Alabama': { name: 'Alabama', seed: 2, netRtg: 30.34, offRtg: 126.8, defRtg: 96.5, adjTempo: 75.3, luck: 0.036, sos: 20.14 },
  'Michigan St.': { name: 'Michigan St.', seed: 2, netRtg: 28.48, offRtg: 118.8, defRtg: 90.4, adjTempo: 67.5, luck: -0.008, sos: 14.72 },
  'Gonzaga': { name: 'Gonzaga', seed: 8, netRtg: 28.01, offRtg: 124.7, defRtg: 96.7, adjTempo: 70.5, luck: -0.082, sos: 8.09 },
  'Texas Tech': { name: 'Texas Tech', seed: 3, netRtg: 27.92, offRtg: 125.4, defRtg: 97.5, adjTempo: 66.1, luck: -0.037, sos: 12.19 },
  'Maryland': { name: 'Maryland', seed: 4, netRtg: 27.07, offRtg: 118.9, defRtg: 91.9, adjTempo: 69.6, luck: -0.028, sos: 12.51 },
  'Iowa St.': { name: 'Iowa St.', seed: 3, netRtg: 26.65, offRtg: 119.8, defRtg: 93.2, adjTempo: 68.8, luck: -0.051, sos: 12.83 },
  'Wisconsin': { name: 'Wisconsin', seed: 3, netRtg: 26.57, offRtg: 122.9, defRtg: 96.3, adjTempo: 68.0, luck: -0.047, sos: 14.53 },
  'Arizona': { name: 'Arizona', seed: 4, netRtg: 26.35, offRtg: 123.7, defRtg: 97.3, adjTempo: 70.3, luck: -0.048, sos: 16.93 },
  'St. John\'s': { name: 'St. John\'s', seed: 2, netRtg: 26.06, offRtg: 114.0, defRtg: 88.0, adjTempo: 70.0, luck: -0.017, sos: 9.16 },
  'Purdue': { name: 'Purdue', seed: 4, netRtg: 25.36, offRtg: 124.6, defRtg: 99.2, adjTempo: 65.1, luck: -0.016, sos: 16.76 },
  'Kentucky': { name: 'Kentucky', seed: 3, netRtg: 24.54, offRtg: 123.7, defRtg: 99.2, adjTempo: 70.9, luck: 0.010, sos: 18.23 },
  'Illinois': { name: 'Illinois', seed: 6, netRtg: 24.32, offRtg: 121.9, defRtg: 97.6, adjTempo: 71.5, luck: -0.022, sos: 17.14 },
  'Texas A&M': { name: 'Texas A&M', seed: 4, netRtg: 23.66, offRtg: 116.5, defRtg: 92.9, adjTempo: 66.8, luck: 0.001, sos: 16.52 },
  'Missouri': { name: 'Missouri', seed: 6, netRtg: 23.57, offRtg: 124.4, defRtg: 100.8, adjTempo: 68.6, luck: -0.055, sos: 13.34 },
  'UCLA': { name: 'UCLA', seed: 7, netRtg: 23.46, offRtg: 117.3, defRtg: 93.8, adjTempo: 65.0, luck: -0.019, sos: 14.09 },
  'Michigan': { name: 'Michigan', seed: 5, netRtg: 23.45, offRtg: 116.5, defRtg: 93.1, adjTempo: 70.1, luck: 0.072, sos: 16.57 },
  'Mississippi': { name: 'Mississippi', seed: 6, netRtg: 23.34, offRtg: 119.1, defRtg: 95.8, adjTempo: 68.1, luck: 0.013, sos: 16.98 },
  'Clemson': { name: 'Clemson', seed: 5, netRtg: 23.22, offRtg: 118.2, defRtg: 95.0, adjTempo: 64.6, luck: -0.046, sos: 8.32 },
  'Kansas': { name: 'Kansas', seed: 7, netRtg: 22.94, offRtg: 115.9, defRtg: 93.0, adjTempo: 68.6, luck: -0.034, sos: 15.79 },
  'Saint Mary\'s': { name: 'Saint Mary\'s', seed: 7, netRtg: 22.73, offRtg: 114.7, defRtg: 92.0, adjTempo: 61.7, luck: 0.014, sos: 6.61 },
  'BYU': { name: 'BYU', seed: 6, netRtg: 22.31, offRtg: 124.1, defRtg: 101.8, adjTempo: 67.6, luck: 0.050, sos: 12.66 },
  'Oregon': { name: 'Oregon', seed: 5, netRtg: 21.85, offRtg: 117.6, defRtg: 95.8, adjTempo: 68.1, luck: 0.063, sos: 15.19 },
  'Louisville': { name: 'Louisville', seed: 8, netRtg: 21.73, offRtg: 118.1, defRtg: 96.3, adjTempo: 69.1, luck: 0.054, sos: 10.57 },
  'Marquette': { name: 'Marquette', seed: 7, netRtg: 21.01, offRtg: 117.4, defRtg: 96.4, adjTempo: 67.7, luck: -0.021, sos: 12.78 },
  'Baylor': { name: 'Baylor', seed: 9, netRtg: 20.83, offRtg: 121.3, defRtg: 100.4, adjTempo: 64.6, luck: -0.036, sos: 16.72 },
  'North Carolina': { name: 'North Carolina', seed: 11, netRtg: 20.33, offRtg: 119.2, defRtg: 98.9, adjTempo: 70.7, luck: -0.030, sos: 12.57 },
  'Connecticut': { name: 'Connecticut', seed: 8, netRtg: 20.18, offRtg: 121.6, defRtg: 101.4, adjTempo: 64.0, luck: -0.027, sos: 11.08 },
  'Mississippi St.': { name: 'Mississippi St.', seed: 8, netRtg: 20.02, offRtg: 118.9, defRtg: 98.8, adjTempo: 68.3, luck: -0.002, sos: 15.11 },
  'VCU': { name: 'VCU', seed: 11, netRtg: 19.53, offRtg: 116.0, defRtg: 96.5, adjTempo: 66.3, luck: -0.054, sos: 1.32 },
  'Creighton': { name: 'Creighton', seed: 9, netRtg: 19.44, offRtg: 117.8, defRtg: 98.3, adjTempo: 67.3, luck: 0.044, sos: 12.52 },
  'Arkansas': { name: 'Arkansas', seed: 10, netRtg: 19.33, offRtg: 114.4, defRtg: 95.1, adjTempo: 69.4, luck: -0.007, sos: 15.21 },
  'Georgia': { name: 'Georgia', seed: 9, netRtg: 18.57, offRtg: 115.3, defRtg: 96.8, adjTempo: 66.7, luck: -0.002, sos: 14.18 },
  'UC San Diego': { name: 'UC San Diego', seed: 12, netRtg: 18.25, offRtg: 115.0, defRtg: 96.7, adjTempo: 65.8, luck: -0.005, sos: -1.44 },
  'Oklahoma': { name: 'Oklahoma', seed: 9, netRtg: 17.95, offRtg: 118.2, defRtg: 100.3, adjTempo: 68.8, luck: -0.004, sos: 14.90 },
  'New Mexico': { name: 'New Mexico', seed: 10, netRtg: 17.78, offRtg: 112.9, defRtg: 95.1, adjTempo: 72.5, luck: -0.002, sos: 7.33 },
  'Colorado St.': { name: 'Colorado St.', seed: 12, netRtg: 17.61, offRtg: 116.8, defRtg: 99.2, adjTempo: 66.0, luck: 0.013, sos: 6.55 },
  'Xavier': { name: 'Xavier', seed: 11, netRtg: 17.19, offRtg: 116.2, defRtg: 99.0, adjTempo: 69.2, luck: -0.016, sos: 10.29 },
  'Texas': { name: 'Texas', seed: 11, netRtg: 16.90, offRtg: 117.3, defRtg: 100.4, adjTempo: 67.6, luck: -0.067, sos: 14.25 },
  'Vanderbilt': { name: 'Vanderbilt', seed: 10, netRtg: 16.23, offRtg: 117.8, defRtg: 101.6, adjTempo: 69.5, luck: 0.010, sos: 13.38 },
  'San Diego St.': { name: 'San Diego St.', seed: 11, netRtg: 15.13, offRtg: 109.8, defRtg: 94.6, adjTempo: 66.3, luck: 0.028, sos: 9.20 },
  'Drake': { name: 'Drake', seed: 11, netRtg: 15.12, offRtg: 112.9, defRtg: 97.8, adjTempo: 59.4, luck: 0.021, sos: 1.23 },
  'Memphis': { name: 'Memphis', seed: 5, netRtg: 15.10, offRtg: 113.4, defRtg: 98.3, adjTempo: 71.0, luck: 0.085, sos: 6.51 },
  'High Point': { name: 'High Point', seed: 13, netRtg: 9.15, offRtg: 118.4, defRtg: 109.2, adjTempo: 66.5, luck: 0.015, sos: -4.82 },
  'McNeese': { name: 'McNeese', seed: 12, netRtg: 14.24, offRtg: 114.1, defRtg: 99.8, adjTempo: 65.9, luck: -0.008, sos: -0.61 },
  'Utah St.': { name: 'Utah St.', seed: 10, netRtg: 14.00, offRtg: 119.8, defRtg: 105.8, adjTempo: 67.6, luck: 0.092, sos: 6.11 },
  'Liberty': { name: 'Liberty', seed: 12, netRtg: 12.46, offRtg: 111.8, defRtg: 99.4, adjTempo: 65.6, luck: 0.037, sos: 1.06 },
  'Lipscomb': { name: 'Lipscomb', seed: 14, netRtg: 8.55, offRtg: 112.0, defRtg: 103.5, adjTempo: 66.2, luck: -0.013, sos: -4.15 },
  'Troy': { name: 'Troy', seed: 14, netRtg: 6.95, offRtg: 107.4, defRtg: 100.4, adjTempo: 66.5, luck: -0.003, sos: -1.81 },
  'Yale': { name: 'Yale', seed: 13, netRtg: 11.02, offRtg: 115.2, defRtg: 104.2, adjTempo: 67.7, luck: -0.048, sos: -1.85 },
  'UNC Wilmington': { name: 'UNC Wilmington', seed: 14, netRtg: 5.28, offRtg: 112.2, defRtg: 106.9, adjTempo: 65.9, luck: 0.049, sos: -4.06 },
  'Robert Morris': { name: 'Robert Morris', seed: 15, netRtg: 2.90, offRtg: 107.5, defRtg: 104.6, adjTempo: 68.1, luck: 0.077, sos: -5.15 },
  'Wofford': { name: 'Wofford', seed: 15, netRtg: 4.24, offRtg: 113.9, defRtg: 109.7, adjTempo: 64.3, luck: -0.034, sos: 0.03 },
  'Nebraska Omaha': { name: 'Nebraska Omaha', seed: 15, netRtg: -0.06, offRtg: 111.0, defRtg: 111.1, adjTempo: 67.7, luck: 0.085, sos: -1.91 },
  'Montana': { name: 'Montana', seed: 14, netRtg: 0.07, offRtg: 110.6, defRtg: 110.6, adjTempo: 67.3, luck: 0.180, sos: -1.74 },
  'Bryant': { name: 'Bryant', seed: 15, netRtg: 0.92, offRtg: 106.8, defRtg: 105.8, adjTempo: 72.7, luck: 0.007, sos: -6.41 },
  'Norfolk St.': { name: 'Norfolk St.', seed: 16, netRtg: -1.63, offRtg: 107.5, defRtg: 109.1, adjTempo: 66.5, luck: 0.071, sos: -6.42 },
  'Mount St. Mary\'s': { name: 'Mount St. Mary\'s', seed: 16, netRtg: -6.34, offRtg: 100.9, defRtg: 107.3, adjTempo: 67.8, luck: 0.162, sos: -6.61 },
  'SIUE': { name: 'SIUE', seed: 16, netRtg: -4.50, offRtg: 101.8, defRtg: 106.3, adjTempo: 66.2, luck: 0.076, sos: -8.19 },
  'American': { name: 'American', seed: 16, netRtg: -6.65, offRtg: 102.5, defRtg: 109.2, adjTempo: 63.8, luck: 0.123, sos: -7.12 },
  'Saint Francis': { name: 'Saint Francis', seed: 16, netRtg: -12.76, offRtg: 99.7, defRtg: 112.5, adjTempo: 67.1, luck: 0.060, sos: -6.88 },
  'Alabama St.': { name: 'Alabama St.', seed: 16, netRtg: -8.87, offRtg: 101.5, defRtg: 110.4, adjTempo: 68.1, luck: 0.060, sos: -7.94 },
};

/**
 * Get KenPom data for a team by name
 */
export function getKenPomData(teamName: string): KenPomTeamData | null {
  // Try exact match first
  if (KENPOM_2025_DATA[teamName]) {
    return KENPOM_2025_DATA[teamName];
  }
  
  // Try case-insensitive match
  const lowerName = teamName.toLowerCase();
  for (const [key, value] of Object.entries(KENPOM_2025_DATA)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }
  
  return null;
}

/**
 * Convert KenPom data to Team format
 */
export function kenPomToTeam(data: KenPomTeamData, seed: number): Team {
  return {
    name: data.name,
    seed: seed,
    netRtg: data.netRtg,
    offRtg: data.offRtg,
    defRtg: data.defRtg,
    adjTempo: data.adjTempo,
    luck: data.luck,
    sos: data.sos
  };
}

