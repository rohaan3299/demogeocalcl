import React from 'react';
import { EmissionResults } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface DataVisualizationProps {
  results: EmissionResults;
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({ results }) => {
  const barData = [
    { name: 'Excavation', emissions: results.excavation },
    { name: 'Foundation', emissions: results.foundation },
    { name: 'Transport', emissions: results.transport },
  ];

  const pieData = barData.map(item => ({
    name: item.name,
    value: item.emissions,
  }));

  const COLORS = ['#06b6d4', '#10b981', '#14b8a6'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Emissions by Category</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Bar dataKey="emissions" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Distribution of Emissions</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};