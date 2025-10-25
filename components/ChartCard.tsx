import React from 'react';

/**
 * ChartCard.tsx
 * Componente contenedor (card) pensado para mostrar un gráfico y su título/descrpción.
 * Uso típico: envolver un componente de gráfico (Chart.js, Recharts, etc.) como `children`.
 */

/**
 * Props de ChartCard
 * - title: título que se muestra arriba del gráfico.
 * - description: texto opcional para dar contexto adicional (subtítulo o explicación breve).
 * - children: contenido del body del card, normalmente el gráfico.
 */
interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * ChartCard
 * Presentational component que no maneja estado ni lógica de negocio.
 * Se centra en el layout y en proveer un espacio consistente para gráficos.
 */
export const ChartCard: React.FC<ChartCardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-[#0A2A6A] shadow-lg shadow-lime-500/20 hover:shadow-xl hover:shadow-lime-500/40 transition-shadow duration-300 p-6">
      {/* Cabecera: título y descripción opcional */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1 mb-4">{description}</p>}
      </div>

      {/* Contenedor del gráfico: altura fija para mantener layout previsto */}
      <div className="h-96">
        {children}
      </div>
    </div>
  );
};
