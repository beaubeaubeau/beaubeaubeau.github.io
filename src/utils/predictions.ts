import type { Team } from '../types';

/**
 * Prediction utilities using KenPom statistics
 */

/**
 * Calculate randomness factor based on net rating difference
 * Similar net ratings = higher randomness (up to 3%)
 * Very different net ratings = lower randomness (closer to 0%)
 * @param netRtg1 - First team's net rating
 * @param netRtg2 - Second team's net rating
 * @returns Randomness factor (0-0.03, representing 0% to 3% impact)
 */
function getRandomnessFactor(netRtg1: number, netRtg2: number): number {
  const netRtgDiff = Math.abs(netRtg1 - netRtg2);
  
  // When net ratings are very similar (difference < 2), use maximum randomness (3%)
  // When net ratings are very different (difference > 25), use minimum randomness (0%)
  // Scale linearly between these points
  const maxDiff = 25; // Net rating difference where randomness reaches 0%
  const randomnessPercent = Math.max(0, 1 - (netRtgDiff / maxDiff));
  
  // Return as a factor between 0 and 0.03 (0% to 3%)
  return randomnessPercent * 0.03;
}

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
  );
  
  const offAdvantage2 = team2.offRtg - 100;
  const defAdvantage2 = 100 - team2.defRtg;
  const score2 = (
    team2.netRtg * 0.45 +
    offAdvantage2 * 0.20 +
    defAdvantage2 * 0.20 +
    team2.sos * 0.10 +
    team2.luck * 50 * 0.05
  );
  
  // Convert score difference to probability using sigmoid-like function
  const diff = score1 - score2;
  let probability = 50 + (50 / (1 + Math.exp(-diff / 5)));
  
  // Add randomness based on net rating similarity (0% to 3% impact)
  const randomnessFactor = getRandomnessFactor(team1.netRtg, team2.netRtg);
  const randomJitter = (Math.random() - 0.5) * randomnessFactor * 100; // Random jitter scaled to percentage
  probability += randomJitter;
  
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
  
  // Add randomness based on net rating similarity (0% to 3% impact)
  const randomnessFactor = getRandomnessFactor(team1.netRtg, team2.netRtg);
  const randomJitter = (Math.random() - 0.5) * randomnessFactor * 20; // Random jitter scaled to score range
  
  const finalScore1 = score1 + randomJitter;
  const finalScore2 = score2 - randomJitter; // Opposite jitter for team2 to maintain balance
  
  return finalScore1 > finalScore2 ? team1 : team2;
}

