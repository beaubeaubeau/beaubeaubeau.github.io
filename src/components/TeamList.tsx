import type { Team } from '../types';

interface TeamListProps {
  teams: Team[];
  onRemoveTeam: (index: number) => void;
}

function TeamList({ teams, onRemoveTeam }: TeamListProps) {
  return (
    <div className="team-list">
      <h5 className="mt-3 mb-2">
        Teams Added: <span>{teams.length}</span>
      </h5>
      {teams.map((team, index) => (
        <div key={index} className="team-item">
          <div>
            <strong>#{team.seed} {team.name}</strong>
            <div className="team-stats">
              NetRtg: {team.netRtg.toFixed(2)} | ORtg: {team.offRtg.toFixed(1)} | DRtg: {team.defRtg.toFixed(1)}
            </div>
          </div>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onRemoveTeam(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default TeamList;

