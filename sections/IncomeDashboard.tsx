import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from '../components/ChartCard';

/**
 * IncomeDashboard.tsx
 * Pantalla que muestra el análisis de ingresos entre 2019 y 2024.
 * Contiene tres gráficos principales: comparación corriente vs capital, desglose de ingresos corrientes y desglose tributario.
 */

// Formatea números según 'es-CO' para mostrar en tooltips y etiquetas
const formatNumber = (value: number) => new Intl.NumberFormat('es-CO').format(value);
// Paleta de colores utilizada para las series
const COLORS = ['#3b82f6', '#14b8a6', '#f97316', '#8b5cf6', '#ec4899', '#f59e0b'];

// Datos históricos de ejemplo (millones)
const income2019_2024 = [
  { name: '2019', 'Ingresos Corrientes': 4668165, 'Ingresos Capital': 1257386 },
  { name: '2020', 'Ingresos Corrientes': 4644078, 'Ingresos Capital': 1221259 },
  { name: '2021', 'Ingresos Corrientes': 4595213, 'Ingresos Capital': 1168966 },
  { name: '2022', 'Ingresos Corrientes': 4642504, 'Ingresos Capital': 1252991 },
  { name: '2023', 'Ingresos Corrientes': 5132323, 'Ingresos Capital': 1343407 },
  { name: '2024', 'Ingresos Corrientes': 5494630, 'Ingresos Capital': 1229763 },
];

// Desglose de ingresos corrientes por tipo (transferencias, no tributarios, tributario)
const currentIncomeBreakdown = [
    { name: '2019', 'Transferencias': 2165341, 'No tributarios': 410527, 'Tributario': 2092297 },
    { name: '2020', 'Transferencias': 2164866, 'No tributarios': 260136, 'Tributario': 2219075 },
    { name: '2021', 'Transferencias': 2126247, 'No tributarios': 244654, 'Tributario': 2224313 },
    { name: '2022', 'Transferencias': 2195104, 'No tributarios': 229973, 'Tributario': 2217427 },
    { name: '2023', 'Transferencias': 2515846, 'No tributarios': 239867, 'Tributario': 2376610 },
    { name: '2024', 'Transferencias': 2496186, 'No tributarios': 284193, 'Tributario': 2714251 },
];

// Desglose detallado de ingresos tributarios por concepto
const taxIncomeBreakdown = [
    { name: '2019', 'Predial': 535851, 'Ind. y Cio': 167639, 'Estampillas': 136681, 'Gasolina': 193534, 'Alumbrado': 246144, 'Otros': 0 },
    { name: '2020', 'Predial': 547109, 'Ind. y Cio': 156090, 'Estampillas': 104093, 'Gasolina': 201171, 'Alumbrado': 241948, 'Otros': 0 },
    { name: '2021', 'Predial': 0, 'Ind. y Cio': 0, 'Estampillas': 143978, 'Gasolina': 115780, 'Alumbrado': 203746, 'Otros': 226142 },
    { name: '2022', 'Predial': 0, 'Ind. y Cio': 0, 'Estampillas': 169664, 'Gasolina': 123378, 'Alumbrado': 221591, 'Otros': 224407 },
    { name: '2023', 'Predial': 0, 'Ind. y Cio': 0, 'Estampillas': 199683, 'Gasolina': 124741, 'Alumbrado': 231375, 'Otros': 288105 },
    { name: '2024', 'Predial': 0, 'Ind. y Cio': 0, 'Estampillas': 190169, 'Gasolina': 120962, 'Alumbrado': 249133, 'Otros': 283332 },
];

// Tooltip personalizado para los gráficos Recharts: muestra label y cada serie con valor formateado
const TooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/80 backdrop-blur-sm p-4 border border-gray-200 rounded-lg shadow-lg">
                <p className="label text-gray-800 font-bold">{`${label}`}</p>
                {payload.map((pld: any, index: number) => (
                    <p key={index} style={{ color: pld.color }} className="intro font-medium">{`${pld.name}: ${formatNumber(pld.value)}`}</p>
                ))}
            </div>
        );
    }
    return null;
};

/**
 * IncomeDashboard - componente principal
 * Renderiza tres ChartCards con diferentes perspectivas sobre los ingresos.
 */
export const IncomeDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-[#0A2A6A]">Análisis de Ingresos 2019-2024</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Ingresos Corrientes vs. Ingresos de Capital" description="Cifras en millones de pesos.">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={income2019_2024} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(tick) => `${(tick / 1000000).toFixed(1)}M`} />
                <Tooltip content={<TooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="Ingresos Corrientes" stroke={COLORS[0]} strokeWidth={3} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Ingresos Capital" stroke={COLORS[1]} strokeWidth={3} activeDot={{ r: 8 }}/>
            </LineChart>
            </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Desglose de Ingresos Corrientes" description="Cifras en millones de pesos.">
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentIncomeBreakdown} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(tick) => `${(tick / 1000000).toFixed(1)}M`} />
                <Tooltip content={<TooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="Transferencias" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="No tributarios" stackId="1" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Tributario" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.7} />
            </AreaChart>
            </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Desglose de Ingresos Tributarios" description="Cifras en millones de pesos.">
            <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={taxIncomeBreakdown} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(tick) => `${(tick / 1000000).toFixed(1)}M`} />
                <Tooltip content={<TooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="Predial" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Ind. y Cio" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Estampillas" stackId="1" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Gasolina" stackId="1" stroke={COLORS[3]} fill={COLORS[3]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Alumbrado" stackId="1" stroke={COLORS[4]} fill={COLORS[4]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Otros" stackId="1" stroke={COLORS[5]} fill={COLORS[5]} fillOpacity={0.7} />
              </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};