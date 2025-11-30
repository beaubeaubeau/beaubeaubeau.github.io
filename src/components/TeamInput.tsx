import { useState, type FormEvent, type ChangeEvent } from 'react';
import type { Team } from '../types';

interface TeamInputProps {
  onAddTeam: (team: Team) => void;
}

interface FormData {
  name: string;
  seed: string;
  netRtg: string;
  offRtg: string;
  defRtg: string;
  adjTempo: string;
  luck: string;
  sos: string;
}

function TeamInput({ onAddTeam }: TeamInputProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    seed: '',
    netRtg: '',
    offRtg: '',
    defRtg: '',
    adjTempo: '',
    luck: '',
    sos: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const team: Team = {
      name: formData.name.trim(),
      seed: parseInt(formData.seed),
      netRtg: parseFloat(formData.netRtg) || 0,
      offRtg: parseFloat(formData.offRtg) || 0,
      defRtg: parseFloat(formData.defRtg) || 0,
      adjTempo: parseFloat(formData.adjTempo) || 0,
      luck: parseFloat(formData.luck) || 0,
      sos: parseFloat(formData.sos) || 0
    };

    if (!team.name || !team.seed) {
      alert('Please enter team name and seed');
      return;
    }

    onAddTeam(team);
    
    // Reset form
    setFormData({
      name: '',
      seed: '',
      netRtg: '',
      offRtg: '',
      defRtg: '',
      adjTempo: '',
      luck: '',
      sos: ''
    });
  };

  return (
    <div className="team-input-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Team Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Michigan"
            required
          />
        </div>
        <div className="form-group">
          <label>Seed (1-16)</label>
          <input
            type="number"
            className="form-control"
            name="seed"
            value={formData.seed}
            onChange={handleChange}
            min="1"
            max="16"
            placeholder="1"
            required
          />
        </div>
        <div className="stats-grid">
          <div className="stat-input">
            <label>Net Rating</label>
            <input
              type="number"
              step="0.01"
              name="netRtg"
              value={formData.netRtg}
              onChange={handleChange}
              placeholder="+35.14"
            />
          </div>
          <div className="stat-input">
            <label>Offensive Rating</label>
            <input
              type="number"
              step="0.1"
              name="offRtg"
              value={formData.offRtg}
              onChange={handleChange}
              placeholder="122.4"
            />
          </div>
          <div className="stat-input">
            <label>Defensive Rating</label>
            <input
              type="number"
              step="0.1"
              name="defRtg"
              value={formData.defRtg}
              onChange={handleChange}
              placeholder="87.3"
            />
          </div>
          <div className="stat-input">
            <label>Adjusted Tempo</label>
            <input
              type="number"
              step="0.1"
              name="adjTempo"
              value={formData.adjTempo}
              onChange={handleChange}
              placeholder="73.0"
            />
          </div>
          <div className="stat-input">
            <label>Luck</label>
            <input
              type="number"
              step="0.001"
              name="luck"
              value={formData.luck}
              onChange={handleChange}
              placeholder="0.064"
            />
          </div>
          <div className="stat-input">
            <label>Strength of Schedule</label>
            <input
              type="number"
              step="0.01"
              name="sos"
              value={formData.sos}
              onChange={handleChange}
              placeholder="+14.03"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-3">
          Add Team
        </button>
      </form>
    </div>
  );
}

export default TeamInput;

