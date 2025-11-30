import { predictWinner, calculateWinProbability } from '../utils/predictions';
import type { Matchup as MatchupType, Team, Bracket } from '../types';

interface MatchupProps {
  matchup: MatchupType;
  roundKey: keyof Bracket;
  matchupIndex: number;
  manualMode: boolean;
  onSelectWinner?: (roundKey: keyof Bracket, matchupIndex: number, winner: Team) => void;
}

function Matchup({ matchup, roundKey, matchupIndex, manualMode, onSelectWinner }: MatchupProps) {
  const { team1, team2, winner } = matchup;

  // Handle bye cases
  if (!team1 || team1.name === 'Bye' || team1.seed === 0) {
    if (!team2) return null;
    return (
      <div className="matchup winner">
        <div className="team selected">
          <span className="team-seed">#{team2.seed}</span>
          <span className="team-name">{team2.name}</span>
        </div>
        <div className="team-stats">NetRtg: {team2.netRtg.toFixed(2)}</div>
        <div className="prediction-info">Advances</div>
      </div>
    );
  }

  if (!team2 || team2.name === 'Bye' || team2.seed === 0) {
    return (
      <div className="matchup winner">
        <div className="team selected">
          <span className="team-seed">#{team1.seed}</span>
          <span className="team-name">{team1.name}</span>
        </div>
        <div className="team-stats">NetRtg: {team1.netRtg.toFixed(2)}</div>
        <div className="prediction-info">Advances</div>
      </div>
    );
  }

  const predictedWinner = winner || predictWinner(team1, team2);
  const winProb1 = calculateWinProbability(team1, team2);
  const winProb2 = 100 - winProb1;
  const isWinner1 = predictedWinner === team1;
  const isWinner2 = predictedWinner === team2;

  return (
    <div className={`matchup ${(isWinner1 || isWinner2) ? 'winner' : ''} ${manualMode ? 'clickable' : ''}`}>
      <div
        className={`team ${isWinner1 ? 'selected' : ''}`}
        onClick={() => manualMode && onSelectWinner && onSelectWinner(roundKey, matchupIndex, team1)}
      >
        <span className="team-seed">#{team1.seed}</span>
        <span className="team-name">{team1.name}</span>
      </div>
      <div className="team-stats">
        NetRtg: {team1.netRtg.toFixed(2)} | {winProb1.toFixed(1)}%
      </div>
      <div
        className={`team ${isWinner2 ? 'selected' : ''}`}
        onClick={() => manualMode && onSelectWinner && onSelectWinner(roundKey, matchupIndex, team2)}
      >
        <span className="team-seed">#{team2.seed}</span>
        <span className="team-name">{team2.name}</span>
      </div>
      <div className="team-stats">
        NetRtg: {team2.netRtg.toFixed(2)} | {winProb2.toFixed(1)}%
      </div>
      <div className="prediction-info">
        Predicted: {predictedWinner?.name || 'TBD'}
      </div>
    </div>
  );
}

export default Matchup;

