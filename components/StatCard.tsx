import React from 'react';

/**
 * StatCard.tsx
 * Componente simple para mostrar una métrica o estadística destacada dentro de una tarjeta.
 * Ejemplos de uso: número total, porcentaje, valor KPI con un pequeño texto explicativo.
 */
interface StatCardProps {
  title: string;
  children: React.ReactNode;
}

/**
 * StatCard
 * - title: encabezado de la métrica
 * - children: contenido principal (número grande, iconos, comparativas, etc.)
 *
 * Este componente es puramente presentacional y no gestiona estado.
 */
export const StatCard: React.FC<StatCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-xl border-2 border-lime-400 shadow-lg shadow-lime-500/20 hover:shadow-xl hover:shadow-lime-500/40 transition-shadow duration-300">
      {/* Encabezado de la tarjeta */}
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>

      {/* Contenido: normalmente un número grande o pequeñas visualizaciones */}
      <div>{children}</div>
    </div>
  );
};