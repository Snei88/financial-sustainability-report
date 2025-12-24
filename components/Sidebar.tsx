import React from 'react';
import type { LucideProps } from 'lucide-react';

/**
 * Sidebar.tsx
 * Navegación lateral utilizada para cambiar entre secciones del dashboard.
 * Soporta comportamiento responsive: en pantallas pequeñas se oculta/despliega mediante `isOpen`.
 */

interface NavItem {
  id: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

interface SidebarProps {
  navItems: NavItem[];
  activeSection: string;
  onSelectSection: (section: any) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  navItems,
  activeSection,
  onSelectSection,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      {/* Sidebar principal */}
      <aside
        className={`fixed top-0 left-0 z-20 h-full w-64 bg-white border-r border-gray-200 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 shadow-lg flex flex-col`}
      >
        {/* Encabezado */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h1 className="text-xl font-bold text-[#0A2A6A]">Finanzas Santiago de Cali</h1>
          <p className="text-sm text-gray-500">Sostenibilidad Fiscal en el corto y Mediano Plazo</p>
        </div>

        {/* Navegación: scrollable sin afectar el header/footer */}
        <nav className="mt-2 flex-1 overflow-y-auto">
          <ul className="px-2 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="px-1">
                  <a
                    href="#"
                    title={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectSection(item.id);
                    }}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-[#0A2A6A] text-white shadow-md'
                        : 'text-gray-700 hover:bg-[#E5EAF5] hover:text-[#0A2A6A]'
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`mr-4 flex-shrink-0 transition-transform duration-200 ${
                        isActive
                          ? 'scale-110 text-white'
                          : 'group-hover:scale-110 text-[#0A2A6A]'
                      }`}
                    />
                    <span className="font-medium truncate">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Overlay para móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};
