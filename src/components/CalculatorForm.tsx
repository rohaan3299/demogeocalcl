import React, { useState } from 'react';
import { ProjectData, SoilType, FoundationType } from '../types';

interface CalculatorFormProps {
  onCalculate: (data: ProjectData) => void;
}

const soilTypes: { value: SoilType; label: string }[] = [
  { value: 'clay', label: 'Clay' },
  { value: 'sand', label: 'Sand' },
  { value: 'silt', label: 'Silt' },
  { value: 'rock', label: 'Rock' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'peat', label: 'Peat' },
];

const foundationTypes: { value: FoundationType; label: string }[] = [
  { value: 'shallow_spread', label: 'Shallow - Spread Footing' },
  { value: 'shallow_raft', label: 'Shallow - Raft Foundation' },
  { value: 'deep_piles', label: 'Deep - Driven Piles' },
  { value: 'deep_caisson', label: 'Deep - Caisson' },
  { value: 'micropiles', label: 'Micropiles' },
  { value: 'sheet_piles', label: 'Sheet Piles' },
];

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const [formData, setFormData] = useState<ProjectData>({
    projectName: '',
    excavationVolume: 0,
    foundationVolume: 0,
    transportDistance: 0,
    soilType: 'clay',
    foundationType: 'shallow_spread',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
    // Enhanced smooth scroll with offset for header
    const resultsElement = document.getElementById('results');
    if (resultsElement) {
      const offset = 80; // Offset for fixed header
      const elementPosition = resultsElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'soilType' || name === 'foundationType' || name === 'projectName' || name === 'date'
        ? value
        : Number(value),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Name
          </label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-2 transition-colors"
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-2 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Soil Type
          </label>
          <select
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-2 transition-colors"
          >
            {soilTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Foundation Type
          </label>
          <select
            name="foundationType"
            value={formData.foundationType}
            onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-2 transition-colors"
          >
            {foundationTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Excavation Volume (m³)
          </label>
          <input
            type="number"
            name="excavationVolume"
            value={formData.excavationVolume}
            onChange={handleChange}
            min="0"
            step="0.1"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-2 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Foundation Volume (m³)
          </label>
          <input
            type="number"
            name="foundationVolume"
            value={formData.foundationVolume}
            onChange={handleChange}
            min="0"
            step="0.1"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-2 transition-colors"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Transport Distance (km)
          </label>
          <input
            type="number"
            name="transportDistance"
            value={formData.transportDistance}
            onChange={handleChange}
            min="0"
            step="0.1"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-2 transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Calculate Carbon Footprint
      </button>
    </form>
  );
};