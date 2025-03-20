import React from 'react';
import { EmissionResults } from '../types';
import { DataVisualization } from './DataVisualization';
import { FileDown } from 'lucide-react';
import { exportToExcel } from '../utils/excelExport';

interface ResultsDashboardProps {
  results: EmissionResults;
  projectData: any;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, projectData }) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(num);
  };

  const handleExport = () => {
    exportToExcel(projectData, results);
  };

  return (
    <div id="results" className="space-y-8 scroll-mt-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Results & Analysis</h3>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white transition-colors"
        >
          <FileDown className="w-5 h-5" />
          <span>Export to Excel</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-slate-200 mb-2">
            Total Carbon Footprint
          </h4>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            {formatNumber(results.total)} kg CO₂e
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-slate-200 mb-2">
            Carbon Intensity
          </h4>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            {formatNumber(results.carbonIntensity)} kg/m³
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-slate-200 mb-2">
            Potential Savings
          </h4>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            {formatNumber(results.savings.potential)} kg CO₂e
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-slate-200 mb-2">
            Reduction Target
          </h4>
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            {formatNumber(results.total * 0.3)} kg CO₂e
          </p>
        </div>
      </div>

      <DataVisualization results={results} />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Recommendations
          </h4>
          <ul className="space-y-3 text-slate-300">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Potential Savings Methods
          </h4>
          <ul className="space-y-3 text-slate-300">
            {results.savings.methods.map((method, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                <span>{method}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};