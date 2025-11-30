import type { Team } from '../types';

/**
 * Prediction utilities using KenPom statistics
 */

/**
 * Calculate win probability percentage between two teams
 * @param team1 - Team object with KenPom stats
 * @param team2 - Team object with KenPom stats
 * @returns Win probability for team1 (0-100)
 */
export function calculateWinProbability(team1: Team | null, team2: Team | null): number {
  if (!team1 || !team2) return 50;
  
  const offAdvantage1 = team1.offRtg - 100;
  const defAdvantage1 = 100 - team1.defRtg;
  const score1 = (
    team1.netRtg * 0.45 +
    offAdvantage1 * 0.20 +
    defAdvantage1 * 0.20 +
    team1.sos * 0.10 +
    team1.luck * 50 * 0.05
  ) + (17 - team1.seed) * 0.3;
  
  const offAdvantage2 = team2.offRtg - 100;
  const defAdvantage2 = 100 - team2.defRtg;
  const score2 = (
    team2.netRtg * 0.45 +
    offAdvantage2 * 0.20 +
    defAdvantage2 * 0.20 +
    team2.sos * 0.10 +
    team2.luck * 50 * 0.05
  ) + (17 - team2.seed) * 0.3;
  
  // Convert score difference to probability using sigmoid-like function
  const diff = score1 - score2;
  const probability = 50 + (50 / (1 + Math.exp(-diff / 5)));
  
  return Math.max(5, Math.min(95, probability)); // Clamp between 5% and 95%
}

/**
 * Predict winner between two teams using KenPom stats
 * @param team1 - Team object with KenPom stats
 * @param team2 - Team object with KenPom stats
 * @returns Winning team object or null
 */
export function predictWinner(team1: Team | null, team2: Team | null): Team | null {
  if (!team1 || !team2 || team1.seed === 0 || team2.seed === 0) {
    return team1 && team1.seed !== 0 ? team1 : (team2 && team2.seed !== 0 ? team2 : null);
  }
  
  // Calculate composite score using weighted KenPom metrics
  // Net Rating is the primary indicator (45% weight) - most important stat
  // Offensive efficiency advantage (20% weight) - scoring ability
  // Defensive efficiency advantage (20% weight) - stopping opponents
  // Strength of Schedule (10% weight) - quality of competition
  // Luck adjustment (5% weight) - recent performance trends
  
  // Normalize offensive/defensive ratings (higher ORtg is better, lower DRtg is better)
  const offAdvantage1 = team1.offRtg - 100; // Baseline is 100
  const defAdvantage1 = 100 - team1.defRtg; // Lower DRtg is better
  
  const offAdvantage2 = team2.offRtg - 100;
  const defAdvantage2 = 100 - team2.defRtg;
  
  const score1 = (
    team1.netRtg * 0.45 +
    offAdvantage1 * 0.20 +
    defAdvantage1 * 0.20 +
    team1.sos * 0.10 +
    team1.luck * 50 * 0.05  // Scale luck factor
  );
  
  const score2 = (
    team2.netRtg * 0.45 +
    offAdvantage2 * 0.20 +
    defAdvantage2 * 0.20 +
    team2.sos * 0.10 +
    team2.luck * 50 * 0.05
  );
  
  // Seed-based adjustment (higher seeds get small bonus, but stats matter more)
  // This allows for upsets when lower seeds have better stats
  const seedBonus1 = (17 - team1.seed) * 0.3; // Max 4.8 points for #1 seed
  const seedBonus2 = (17 - team2.seed) * 0.3;
  
  const finalScore1 = score1 + seedBonus1;
  const finalScore2 = score2 + seedBonus2;
  
  return finalScore1 > finalScore2 ? team1 : team2;
}

