import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import {
  LayoutDashboard, Wallet, TrendingUp, Landmark, BarChart3,
  FileText, Menu, X, Globe, Banknote, Building
} from 'lucide-react';
import { IncomeDashboard } from './sections/IncomeDashboard';
import { ExpensesDashboard } from './sections/ExpensesDashboard';
import { FiscalPerformanceDashboard } from './sections/FiscalPerformanceDashboard';
import { FinancialPlanDashboard } from './sections/FinancialPlanDashboard';
import { GeneralContext } from './sections/GeneralContext';
import { OtherReportsDashboard } from './sections/OtherReportsDashboard';
import { MacroeconomicContext } from './sections/MacroeconomicContext';
import { DebtServiceDashboard } from './sections/DebtServiceDashboard';
import { DecentralizedSectorDashboard } from './sections/DecentralizedSectorDashboard';
import FullscreenToggle from './components/FullscreenToggle';

type Section =
  | 'context'
  | 'macroeconomic'
  | 'income'
  | 'expenses'
  | 'performance'
  | 'plan'
  | 'debt'
  | 'decentralized'
  | 'other';

const sectionComponents: Record<Section, React.FC> = {
  context: GeneralContext,
  macroeconomic: MacroeconomicContext,
  income: IncomeDashboard,
  expenses: ExpensesDashboard,
  performance: FiscalPerformanceDashboard,
  plan: FinancialPlanDashboard,
  debt: DebtServiceDashboard,
  decentralized: DecentralizedSectorDashboard,
  other: OtherReportsDashboard,
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('context');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'context', label: 'Contexto General', icon: LayoutDashboard },
    { id: 'macroeconomic', label: 'Contexto Macroeconómico', icon: Globe },
    { id: 'income', label: 'Ingresos', icon: Wallet },
    { id: 'expenses', label: 'Gastos', icon: TrendingUp },
    { id: 'performance', label: 'Desempeño Fiscal', icon: BarChart3 },
    { id: 'plan', label: 'Plan Financiero', icon: Landmark },
    { id: 'debt', label: 'Servicio de la Deuda', icon: Banknote },
    { id: 'decentralized', label: 'Sector Descentralizado', icon: Building },
    { id: 'other', label: 'Otros Reportes', icon: FileText },
  ];

  const handleSelectSection = (section: Section) => {
    setActiveSection(section);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="flex h-screen bg-white font-sans">
      {/* Botón flotante de modo presentación (F11-like).
          Aplica fullscreen SOLO sobre el <main id="presentation-root"> */}
      <FullscreenToggle targetId="presentation-root" />

      <div className="fixed top-0 left-0 z-30 md:hidden">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-4 text-gray-600"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <Sidebar
        navItems={navItems}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* El contenido central es el que entra a pantalla completa */}
      <main
        id="presentation-root"
        className="flex-1 overflow-y-auto transition-all duration-300 md:ml-64"
      >
        <div className="p-4 md:p-8 mt-12 md:mt-0 animate-fadeIn">
          <ActiveComponent key={activeSection} />
        </div>
      </main>
    </div>
  );
};

export default App;
