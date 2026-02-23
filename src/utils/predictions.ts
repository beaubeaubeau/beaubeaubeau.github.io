import type { Team, GameSite } from '../types';

/**
 * Prediction utilities using KenPom statistics
 */

/**
 * Calculate randomness factor based on net rating difference
 * Similar net ratings = higher randomness (up to 3%)
 * Very different net ratings = lower randomness (closer to 0%)
 */
function getRandomnessFactor(netRtg1: number, netRtg2: number): number {
  const netRtgDiff = Math.abs(netRtg1 - netRtg2);
  const maxDiff = 25;
  const randomnessPercent = Math.max(0, 1 - (netRtgDiff / maxDiff));
  return randomnessPercent * 0.03;
}

/**
 * Calculate home court advantage adjustment
 * Home teams typically get ~3-4 point advantage in college basketball
 */
function getHomeCourtAdjustment(site: GameSite, isTeam1Home: boolean): number {
  if (site === 'neutral') return 0;
  
  // Home court advantage is approximately 3.5 points in college basketball
  const homeAdvantage = 3.5;
  
  if (site === 'home' && isTeam1Home) {
    return homeAdvantage;
  } else if (site === 'away' && !isTeam1Home) {
    return homeAdvantage;
  }
  
  return -homeAdvantage; // Away team gets negative adjustment
}

/**
 * Calculate win probability percentage between two teams
 * @param team1 - Team object with KenPom stats
 * @param team2 - Team object with KenPom stats
 * @param site - Game site (home/away/neutral)
 * @param isTeam1Home - Whether team1 is the home team (only matters if site is 'home' or 'away')
 * @returns Win probability for team1 (0-100)
 */
export function calculateWinProbability(
  team1: Team,
  team2: Team,
  site: GameSite = 'neutral',
  isTeam1Home: boolean = true
): number {
  const offAdvantage1 = team1.offRtg - 100;
  const defAdvantage1 = 100 - team1.defRtg;
  let score1 = (
    team1.netRtg * 0.45 +
    offAdvantage1 * 0.20 +
    defAdvantage1 * 0.20 +
    team1.sos * 0.10 +
    team1.luck * 50 * 0.05
  );
  
  const offAdvantage2 = team2.offRtg - 100;
  const defAdvantage2 = 100 - team2.defRtg;
  let score2 = (
    team2.netRtg * 0.45 +
    offAdvantage2 * 0.20 +
    defAdvantage2 * 0.20 +
    team2.sos * 0.10 +
    team2.luck * 50 * 0.05
  );
  
  // Apply home court advantage
  const homeCourtAdjustment = getHomeCourtAdjustment(site, isTeam1Home);
  score1 += homeCourtAdjustment;
  score2 -= homeCourtAdjustment;
  
  // Convert score difference to probability using sigmoid-like function
  const diff = score1 - score2;
  let probability = 50 + (50 / (1 + Math.exp(-diff / 5)));
  
  // Add randomness based on net rating similarity (0% to 3% impact)
  const randomnessFactor = getRandomnessFactor(team1.netRtg, team2.netRtg);
  const randomJitter = (Math.random() - 0.5) * randomnessFactor * 100;
  probability += randomJitter;
  
  return Math.max(5, Math.min(95, probability)); // Clamp between 5% and 95%
}

/**
 * Predict winner between two teams using KenPom stats
 * @param team1 - Team object with KenPom stats
 * @param team2 - Team object with KenPom stats
 * @param site - Game site (home/away/neutral)
 * @param isTeam1Home - Whether team1 is the home team
 * @returns Winning team object
 */
export function predictWinner(
  team1: Team,
  team2: Team,
  site: GameSite = 'neutral',
  isTeam1Home: boolean = true
): Team {
  const offAdvantage1 = team1.offRtg - 100;
  const defAdvantage1 = 100 - team1.defRtg;
  
  const offAdvantage2 = team2.offRtg - 100;
  const defAdvantage2 = 100 - team2.defRtg;
  
  let score1 = (
    team1.netRtg * 0.45 +
    offAdvantage1 * 0.20 +
    defAdvantage1 * 0.20 +
    team1.sos * 0.10 +
    team1.luck * 50 * 0.05
  );
  
  let score2 = (
    team2.netRtg * 0.45 +
    offAdvantage2 * 0.20 +
    defAdvantage2 * 0.20 +
    team2.sos * 0.10 +
    team2.luck * 50 * 0.05
  );
  
  // Apply home court advantage
  const homeCourtAdjustment = getHomeCourtAdjustment(site, isTeam1Home);
  score1 += homeCourtAdjustment;
  score2 -= homeCourtAdjustment;
  
  // Add randomness based on net rating similarity (0% to 3% impact)
  const randomnessFactor = getRandomnessFactor(team1.netRtg, team2.netRtg);
  const randomJitter = (Math.random() - 0.5) * randomnessFactor * 20;
  
  const finalScore1 = score1 + randomJitter;
  const finalScore2 = score2 - randomJitter;
  
  return finalScore1 > finalScore2 ? team1 : team2;
}

