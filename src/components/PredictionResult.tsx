import React from 'react';
import type { PredictionResult as PredictionResultType, GameSite } from '../types';

interface PredictionResultProps {
  result: PredictionResultType;
  site: GameSite;
}

function PredictionResult({ result, site }: PredictionResultProps) {
  const { team1, team2, winner, team1WinProbability, team2WinProbability } = result;

  const formatStat = (value: number, decimals: number = 2): string => {
    return value.toFixed(decimals);
  };

  const getSiteLabel = (): string => {
    switch (site) {
      case 'home':
        return `${team1.name} Home`;
      case 'away':
        return `${team1.name} Away`;
      default:
        return 'Neutral Site';
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h3 className="card-title">Prediction Results</h3>
        <p className="text-muted mb-4">Game Site: {getSiteLabel()}</p>

        <div className="row">
          {/* Team 1 Stats */}
          <div className="col-md-6">
            <div className={`card ${winner.name === team1.name ? 'border-success' : ''}`}>
              <div className="card-body">
                <h4 className="card-title">
                  {team1.name}
                  {winner.name === team1.name && (
                    <span className="badge badge-success ml-2">Winner</span>
                  )}
                </h4>
                <div className="mb-2">
                  <strong>Win Probability:</strong>{' '}
                  <span className="text-primary">{formatStat(team1WinProbability, 1)}%</span>
                </div>
                <hr />
                <div className="small">
                  <div className="mb-2">
                    <strong>Net Rating:</strong> {formatStat(team1.netRtg)}
                  </div>
                  <div className="mb-2">
                    <strong>Offensive Rating:</strong> {formatStat(team1.offRtg)}
                  </div>
                  <div className="mb-2">
                    <strong>Defensive Rating:</strong> {formatStat(team1.defRtg)}
                  </div>
                  <div className="mb-2">
                    <strong>Adjusted Tempo:</strong> {formatStat(team1.adjTempo)}
                  </div>
                  <div className="mb-2">
                    <strong>Luck:</strong> {formatStat(team1.luck)}
                  </div>
                  <div>
                    <strong>Strength of Schedule:</strong> {formatStat(team1.sos)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team 2 Stats */}
          <div className="col-md-6">
            <div className={`card ${winner.name === team2.name ? 'border-success' : ''}`}>
              <div className="card-body">
                <h4 className="card-title">
                  {team2.name}
                  {winner.name === team2.name && (
                    <span className="badge badge-success ml-2">Winner</span>
                  )}
                </h4>
                <div className="mb-2">
                  <strong>Win Probability:</strong>{' '}
                  <span className="text-primary">{formatStat(team2WinProbability, 1)}%</span>
                </div>
                <hr />
                <div className="small">
                  <div className="mb-2">
                    <strong>Net Rating:</strong> {formatStat(team2.netRtg)}
                  </div>
                  <div className="mb-2">
                    <strong>Offensive Rating:</strong> {formatStat(team2.offRtg)}
                  </div>
                  <div className="mb-2">
                    <strong>Defensive Rating:</strong> {formatStat(team2.defRtg)}
                  </div>
                  <div className="mb-2">
                    <strong>Adjusted Tempo:</strong> {formatStat(team2.adjTempo)}
                  </div>
                  <div className="mb-2">
                    <strong>Luck:</strong> {formatStat(team2.luck)}
                  </div>
                  <div>
                    <strong>Strength of Schedule:</strong> {formatStat(team2.sos)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="alert alert-info mt-4">
          <strong>Prediction:</strong> {winner.name} is predicted to win with a{' '}
          {winner.name === team1.name ? team1WinProbability : team2WinProbability}% chance of victory.
        </div>
      </div>
    </div>
  );
}

export default PredictionResult;
