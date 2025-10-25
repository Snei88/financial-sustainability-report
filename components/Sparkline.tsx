import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Sparkline.tsx
 * Componente que renderiza un mini-gráfico (área) usando Recharts.
 * Está pensado para visualizaciones compactas tipo sparkline que acompañan estadísticas.
 */
interface SparklineProps {
  // data: arreglo de puntos con nombre y valor. name se usa para el tooltip y value para el gráfico.
  data: { name: string; value: number }[];
  // color principal de la línea/área (ej. '#4f46e5')
  color: string;
  // título que se mostrará en el tooltip para dar contexto al valor
  title: string;
}

/**
 * CustomTooltip
 * Tooltip personalizado para mostrar label y valor con estilo.
 * Recharts pasa active, payload y label; title lo inyectamos para contextualizar el valor.
 */
const CustomTooltip = ({ active, payload, label, title }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-2 border border-gray-200 rounded shadow-md text-xs">
        <p className="font-bold">{`${label}`}</p>
        <p style={{ color: payload[0].color }}>{`${title}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

/**
 * Sparkline - componente principal
 * - Calcula un id para el gradiente a partir del color (para evitar colisiones si hay varios sparkline en la página)
 * - Usa ResponsiveContainer para adaptarse al contenedor padre
 * - Renderiza el AreaChart con un gradiente y un tooltip personalizado
 */
export const Sparkline: React.FC<SparklineProps> = ({ data, color, title }) => {
  const gradientId = `colorUv-${color.replace('#', '')}`;
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        {/* Definición del gradiente para el área del sparkline */}
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>

        {/* Tooltip personalizado: mostramos título y valor */}
        <Tooltip content={<CustomTooltip title={title} />} />

        {/* Área: stroke es la línea, fill usa el gradiente definido arriba */}
        <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#${gradientId})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
