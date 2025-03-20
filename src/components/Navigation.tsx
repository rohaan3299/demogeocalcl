import React from 'react';
import { NavItem } from '../types';
import { 
  Calculator, 
  BarChart2, 
  FileSpreadsheet, 
  Settings, 
  HelpCircle,
  BookOpen
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate }) => {
  const navItems: NavItem[] = [
    { name: 'Calculator', icon: 'Calculator', href: 'calculator' },
    { name: 'Results', icon: 'BarChart2', href: 'results' },
    { name: 'Reports', icon: 'FileSpreadsheet', href: 'reports' },
    { name: 'Documentation', icon: 'BookOpen', href: 'docs' },
    { name: 'Settings', icon: 'Settings', href: 'settings' },
    { name: 'Help', icon: 'HelpCircle', href: 'help' },
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      Calculator,
      BarChart2,
      FileSpreadsheet,
      Settings,
      HelpCircle,
      BookOpen,
    };
    const Icon = icons[iconName as keyof typeof icons];
    return <Icon className="w-5 h-5" />;
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 bg-slate-900 border-r border-slate-700 flex flex-col items-center py-8">
      {navItems.map((item) => (
        <button
          key={item.href}
          onClick={() => onNavigate(item.href)}
          className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center transition-all
            ${activeSection === item.href 
              ? 'bg-emerald-500 text-white' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          {getIcon(item.icon)}
        </button>
      ))}
    </nav>
  );
};