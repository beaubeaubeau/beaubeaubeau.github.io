import Matchup from './Matchup';
import type { Bracket, RoundInfo, Team } from '../types';

interface RoundProps {
  round: RoundInfo;
  bracket: Bracket;
  manualMode: boolean;
  onSelectWinner?: (roundKey: keyof Bracket, matchupIndex: number, winner: Team) => void;
}

function Round({ round, bracket, manualMode, onSelectWinner }: RoundProps) {
  const matchups = bracket[round.key] || [];

  return (
    <div className="round" data-round={round.key}>
      <div className="round-title">{round.name}</div>
      {matchups.map((matchup, index) => (
        <Matchup
          key={index}
          matchup={matchup}
          roundKey={round.key}
          matchupIndex={index}
          manualMode={manualMode}
          onSelectWinner={onSelectWinner}
        />
      ))}
    </div>
  );
}

export default Round;

