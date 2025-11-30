import React, { useState, useCallback } from 'react';
import TeamInput from './components/TeamInput';
import TeamList from './components/TeamList';
import Controls from './components/Controls';
import Bracket from './components/Bracket';
import { initializeBracket, SEED_MATCHUPS, getNextMatchupInfo } from './utils/bracket';
import { predictWinner } from './utils/predictions';
import { generateSampleBracket } from './utils/sampleTeams';
import type { Team, Bracket as BracketType } from './types';

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [bracket, setBracket] = useState<BracketType>(initializeBracket());
  const [manualMode, setManualMode] = useState<boolean>(false);

  const handleAddTeam = useCallback((team: Team) => {
    setTeams(prev => [...prev, team]);
  }, []);

  const handleRemoveTeam = useCallback((index: number) => {
    setTeams(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleLoadSamples = useCallback(() => {
    const sampleTeams = generateSampleBracket();
    setTeams(sampleTeams);
    alert(`Loaded ${sampleTeams.length} sample teams across 4 regions. Click "Auto-Fill Bracket" to generate predictions!`);
  }, []);

  const handleClearBracket = useCallback(() => {
    setBracket(initializeBracket());
    setManualMode(false);
  }, []);

  const handleAutoFill = useCallback(() => {
    setManualMode(false);
    
    if (teams.length < 32) {
      alert(`Please add at least 32 teams for a demo bracket. Currently have ${teams.length}. Use "Load Sample Teams" for a demo.`);
      return;
    }

    // Group teams by seed
    const teamsBySeed: Record<number, Team[]> = {};
    teams.forEach(team => {
      if (!teamsBySeed[team.seed]) {
        teamsBySeed[team.seed] = [];
      }
      teamsBySeed[team.seed].push(team);
    });

    // Fill Round 1 (32 matchups)
    const newBracket = initializeBracket();
    const round1Winners: (Team | null)[] = [];

    for (let i = 0; i < 32; i++) {
      const region = Math.floor(i / 8);
      const matchupInRegion = i % 8;
      const [seed1, seed2] = SEED_MATCHUPS[matchupInRegion];

      // Get teams - try to get unique teams per region
      let team1 = teamsBySeed[seed1] ? teamsBySeed[seed1][region % (teamsBySeed[seed1].length || 1)] : null;
      let team2 = teamsBySeed[seed2] ? teamsBySeed[seed2][region % (teamsBySeed[seed2].length || 1)] : null;

      // Fallback: just get first available team with that seed
      if (!team1 && teamsBySeed[seed1]) team1 = teamsBySeed[seed1][0];
      if (!team2 && teamsBySeed[seed2]) team2 = teamsBySeed[seed2][0];

      if (team1 && team2) {
        const winner = predictWinner(team1, team2);
        newBracket.round1[i] = { team1, team2, winner };
        round1Winners.push(winner);
      } else {
        round1Winners.push(null);
      }
    }

    // Fill subsequent rounds
    fillRound(newBracket, round1Winners, 'round2', 16);
    const round2Winners = newBracket.round2.map(m => m?.winner).filter((w): w is Team => w !== null);
    fillRound(newBracket, round2Winners, 'round3', 8);
    const round3Winners = newBracket.round3.map(m => m?.winner).filter((w): w is Team => w !== null);
    fillRound(newBracket, round3Winners, 'round4', 4);
    const round4Winners = newBracket.round4.map(m => m?.winner).filter((w): w is Team => w !== null);
    fillRound(newBracket, round4Winners, 'round5', 2);
    const round5Winners = newBracket.round5.map(m => m?.winner).filter((w): w is Team => w !== null);
    fillRound(newBracket, round5Winners, 'round6', 1);

    setBracket(newBracket);
  }, [teams]);

  const fillRound = (bracket: BracketType, previousWinners: (Team | null)[], roundKey: keyof BracketType, numMatchups: number) => {
    for (let i = 0; i < numMatchups; i++) {
      const team1 = previousWinners[i * 2];
      const team2 = previousWinners[i * 2 + 1];

      if (team1 && team2) {
        const winner = predictWinner(team1, team2);
        bracket[roundKey][i] = { team1, team2, winner };
      } else if (team1 || team2) {
        // If only one team, they advance
        const advancingTeam = team1 || team2;
        bracket[roundKey][i] = {
          team1: team1 || { name: 'Bye', seed: 0, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
          team2: team2 || { name: 'Bye', seed: 0, netRtg: 0, offRtg: 0, defRtg: 0, adjTempo: 0, luck: 0, sos: 0 },
          winner: advancingTeam
        };
      }
    }
  };

  const handleSelectWinner = useCallback((roundKey: keyof BracketType, matchupIndex: number, winner: Team) => {
    setBracket(prev => {
      const newBracket = { ...prev };
      const matchup = { ...newBracket[roundKey][matchupIndex] };
      matchup.winner = winner;
      newBracket[roundKey][matchupIndex] = matchup;

      // Propagate winner to next round
      const nextInfo = getNextMatchupInfo(roundKey, matchupIndex);
      if (nextInfo) {
        const nextMatchup = { ...newBracket[nextInfo.round][nextInfo.matchupIndex] };
        if (nextInfo.position === 0) {
          nextMatchup.team1 = winner;
        } else {
          nextMatchup.team2 = winner;
        }

        // If both teams are set, predict winner
        if (nextMatchup.team1 && nextMatchup.team2 && 
            nextMatchup.team1.seed !== 0 && nextMatchup.team2.seed !== 0) {
          nextMatchup.winner = predictWinner(nextMatchup.team1, nextMatchup.team2);
        } else if (nextMatchup.team1 && nextMatchup.team1.seed !== 0 && 
                   (!nextMatchup.team2 || nextMatchup.team2.seed === 0)) {
          nextMatchup.winner = nextMatchup.team1;
        } else if (nextMatchup.team2 && nextMatchup.team2.seed !== 0 && 
                   (!nextMatchup.team1 || nextMatchup.team1.seed === 0)) {
          nextMatchup.winner = nextMatchup.team2;
        }

        newBracket[nextInfo.round][nextInfo.matchupIndex] = nextMatchup;
      }

      return newBracket;
    });
  }, []);

  const handleEnableManual = useCallback(() => {
    setManualMode(prev => !prev);
  }, []);

  return (
    <div className="container">
      <h1>🏀 March Madness Bracket Predictor</h1>
      <p className="text-center text-muted">Using KenPom Statistics to Predict Winners</p>

      <div className="controls">
        <h3>Add Teams</h3>
        <TeamInput onAddTeam={handleAddTeam} />
        
        <Controls
          onAutoFill={handleAutoFill}
          onClear={handleClearBracket}
          onLoadSamples={handleLoadSamples}
          onEnableManual={handleEnableManual}
          manualMode={manualMode}
        />

        <TeamList teams={teams} onRemoveTeam={handleRemoveTeam} />
      </div>

      <Bracket
        bracket={bracket}
        manualMode={manualMode}
        onSelectWinner={handleSelectWinner}
      />
    </div>
  );
}

export default App;

