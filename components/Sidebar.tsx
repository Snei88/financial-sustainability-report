import React from 'react';
import type { LucideProps } from 'lucide-react';

/**
 * Sidebar.tsx
 * Navegación lateral utilizada para cambiar entre secciones del dashboard.
 * Soporta comportamiento responsive: en pantallas pequeñas se oculta/despliega mediante `isOpen`.
 */

/**
 * NavItem - definición de un elemento de navegación
 * - id: identificador único de la sección (se usa para comparar activeSection)
 * - label: texto mostrado al usuario
 * - icon: componente de icono (se espera un componente Lucide) que se renderiza junto al label
 */
interface NavItem {
  id: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

/**
 * Props del Sidebar
 * - navItems: arreglo de NavItem
 * - activeSection: id de la sección actualmente activa
 * - onSelectSection: callback que se llama cuando el usuario selecciona una sección (recibe el id)
 * - isOpen / setIsOpen: control de visibilidad en dispositivos móviles
 */
interface SidebarProps {
  navItems: NavItem[];
  activeSection: string;
  onSelectSection: (section: any) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Sidebar - componente principal
 * - Renderiza una lista de elementos navegables.
 * - Aplica estilos distintos para el elemento activo.
 * - Previene la navegación por defecto en los <a> y llama a onSelectSection con el id.
 */
export const Sidebar: React.FC<SidebarProps> = ({ navItems, activeSection, onSelectSection, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Aside principal: se desplaza fuera de pantalla si isOpen es false (para mobile) */}
      <aside
        className={`fixed top-0 left-0 z-20 h-full w-64 bg-white border-r border-gray-200 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 shadow-lg`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Reporte Financiero</h1>
          <p className="text-sm text-gray-500">Santiago de Cali</p>
        </div>

        {/* Lista de navegación: cada item es un enlace que llama a onSelectSection */}
        <nav className="mt-6">
          <ul>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="px-4 py-1">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectSection(item.id);
                    }}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {/* Icono del item; aplicamos ligera animación si está activo */}
                    <Icon size={20} className={`mr-4 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Overlay para cerrar el sidebar en mobile al tocar fuera (solo visible si isOpen) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};