import React, { useState, useCallback } from 'react';
import MatchupForm from './components/MatchupForm';
import PredictionResult from './components/PredictionResult';
import { fetchTeamData } from './utils/kenpomScraper';
import { predictWinner, calculateWinProbability } from './utils/predictions';
import type { MatchupInput, PredictionResult as PredictionResultType } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResultType | null>(null);

  const handleSubmit = useCallback(async (input: MatchupInput) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Fetch team data from KenPom
      const [team1Data, team2Data] = await Promise.all([
        fetchTeamData(input.team1Name, input.year),
        fetchTeamData(input.team2Name, input.year)
      ]);

      if (!team1Data) {
        throw new Error(`Could not find team data for "${input.team1Name}" for year ${input.year}`);
      }

      if (!team2Data) {
        throw new Error(`Could not find team data for "${input.team2Name}" for year ${input.year}`);
      }

      // Determine if team1 is home (only matters for home/away games)
      const isTeam1Home = input.site === 'home';

      // Calculate win probabilities
      const team1WinProb = calculateWinProbability(
        team1Data,
        team2Data,
        input.site,
        isTeam1Home
      );
      const team2WinProb = 100 - team1WinProb;

      // Predict winner
      const winner = predictWinner(team1Data, team2Data, input.site, isTeam1Home);

      // Set prediction result
      setPrediction({
        team1: team1Data,
        team2: team2Data,
        winner,
        team1WinProbability: team1WinProb,
        team2WinProbability: team2WinProb,
        site: input.site
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching prediction:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">🏀 March Madness Predictor</h1>
      <p className="text-center text-muted mb-4">
        Using KenPom Statistics to Predict Game Winners
      </p>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <MatchupForm onSubmit={handleSubmit} isLoading={isLoading} />

          {error && (
            <div className="alert alert-danger mt-4" role="alert">
              <strong>Error:</strong> {error}
              <br />
              <small>
                Note: Web scraping may be blocked by CORS. You may need to use a CORS proxy
                or implement a serverless function for production use.
              </small>
            </div>
          )}

          {prediction && (
            <PredictionResult result={prediction} site={prediction.site} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

