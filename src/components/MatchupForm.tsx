import React, { useState, FormEvent } from 'react';
import type { MatchupInput, GameSite } from '../types';

interface MatchupFormProps {
  onSubmit: (input: MatchupInput) => void;
  isLoading: boolean;
}

function MatchupForm({ onSubmit, isLoading }: MatchupFormProps) {
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [year, setYear] = useState('');
  const [site, setSite] = useState<GameSite>('neutral');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!team1Name.trim() || !team2Name.trim() || !year.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Validate year format (2 digits)
    if (!/^\d{2}$/.test(year.trim())) {
      alert('Year must be 2 digits (e.g., 25 for 2025)');
      return;
    }

    onSubmit({
      team1Name: team1Name.trim(),
      team2Name: team2Name.trim(),
      year: year.trim(),
      site
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Enter Matchup Details</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="team1">Team 1 Name</label>
            <input
              type="text"
              className="form-control"
              id="team1"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              placeholder="e.g., Duke"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="team2">Team 2 Name</label>
            <input
              type="text"
              className="form-control"
              id="team2"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              placeholder="e.g., North Carolina"
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year (2 digits)</label>
            <input
              type="text"
              className="form-control"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g., 25 for 2025"
              maxLength={2}
              disabled={isLoading}
              required
            />
            <small className="form-text text-muted">
              Enter the last 2 digits of the year (e.g., 25 for 2025)
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="site">Game Site</label>
            <select
              className="form-control"
              id="site"
              value={site}
              onChange={(e) => setSite(e.target.value as GameSite)}
              disabled={isLoading}
            >
              <option value="neutral">Neutral Site</option>
              <option value="home">Team 1 Home</option>
              <option value="away">Team 1 Away</option>
            </select>
            <small className="form-text text-muted">
              Select whether Team 1 is playing at home, away, or neutral site
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Get Prediction'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MatchupForm;
