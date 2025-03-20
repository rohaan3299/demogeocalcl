import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { Navigation } from './components/Navigation';
import { ProjectData, EmissionResults } from './types';

function App() {
  const [results, setResults] = useState<EmissionResults | null>(null);
  const [activeSection, setActiveSection] = useState('calculator');
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  const handleCalculate = (data: ProjectData) => {
    setProjectData(data);
    
    const totalEmissions = {
      excavation: data.excavationVolume * 25,
      foundation: data.foundationVolume * 400,
      transport: data.transportDistance * 0.1,
      total: 0,
      carbonIntensity: 0,
      recommendations: [
        'Use low-carbon concrete alternatives',
        'Optimize transport routes',
        'Implement soil reuse strategies',
        'Consider alternative foundation designs',
        'Use local materials where possible'
      ],
      savings: {
        potential: 0,
        methods: [
          'Switch to low-carbon concrete (-30% emissions)',
          'Optimize transport logistics (-15% emissions)',
          'Implement soil stabilization (-20% emissions)',
          'Use recycled materials (-25% emissions)'
        ]
      }
    };
    
    totalEmissions.total = totalEmissions.excavation + totalEmissions.foundation + totalEmissions.transport;
    totalEmissions.carbonIntensity = totalEmissions.total / (data.excavationVolume + data.foundationVolume);
    totalEmissions.savings.potential = totalEmissions.total * 0.3;
    
    setResults(totalEmissions);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'calculator':
        return (
          <>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  GeoTech Carbon Analytics
                </span>
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Advanced carbon footprint analysis for geotechnical engineering projects
              </p>
            </div>
            <CalculatorForm onCalculate={handleCalculate} />
            {results && projectData && (
              <div className="mt-16">
                <ResultsDashboard results={results} projectData={projectData} />
              </div>
            )}
          </>
        );
      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8">Project Reports</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Project Report #{i}</h3>
                  <p className="text-slate-300 mb-4">Sample project report with emissions data and recommendations.</p>
                  <button className="text-emerald-400 hover:text-emerald-300 font-medium">
                    View Report →
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'docs':
        return (
          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-white mb-8">Documentation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Getting Started</h3>
                <ul className="space-y-3 text-slate-300">
                  <li>Understanding carbon footprint calculation</li>
                  <li>Project setup and configuration</li>
                  <li>Best practices for accurate results</li>
                  <li>Interpreting the analysis</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Advanced Topics</h3>
                <ul className="space-y-3 text-slate-300">
                  <li>Custom emission factors</li>
                  <li>Integration with other tools</li>
                  <li>Batch processing projects</li>
                  <li>API documentation</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-8">Settings</h2>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Dark Mode</span>
                    <button className="w-12 h-6 bg-emerald-500 rounded-full"></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Email Notifications</span>
                    <button className="w-12 h-6 bg-slate-600 rounded-full"></button>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Account</h3>
                <button className="text-slate-300 hover:text-white">
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-8">Help Center</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">FAQs</h3>
                <div className="space-y-4">
                  <details className="text-slate-300">
                    <summary className="cursor-pointer hover:text-white">How are emissions calculated?</summary>
                    <p className="mt-2 pl-4">We use industry-standard emission factors and methodologies...</p>
                  </details>
                  <details className="text-slate-300">
                    <summary className="cursor-pointer hover:text-white">Can I export my results?</summary>
                    <p className="mt-2 pl-4">Yes, you can export your results to Excel format...</p>
                  </details>
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Contact Support</h3>
                <p className="text-slate-300 mb-4">Need help? Our support team is here to assist you.</p>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      
      <div className="ml-20">
        <nav className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <Calculator className="h-8 w-8 text-emerald-400" />
              <h1 className="text-xl font-semibold text-white">
                GeoTech Carbon Analytics
              </h1>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;