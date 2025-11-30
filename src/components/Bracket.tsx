import Round from './Round';
import { ROUNDS } from '../utils/bracket';
import type { Bracket, Team } from '../types';

interface BracketProps {
  bracket: Bracket;
  manualMode: boolean;
  onSelectWinner?: (roundKey: keyof Bracket, matchupIndex: number, winner: Team) => void;
}

function Bracket({ bracket, manualMode, onSelectWinner }: BracketProps) {
  return (
    <div className="bracket-container">
      {ROUNDS.map(round => (
        <Round
          key={round.key}
          round={round}
          bracket={bracket}
          manualMode={manualMode}
          onSelectWinner={onSelectWinner}
        />
      ))}
    </div>
  );
}

export default Bracket;

