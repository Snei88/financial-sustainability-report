/**
 * @fileoverview Dashboard de Análisis de Gastos que muestra la evolución y composición
 * de los gastos del Distrito durante el período 2019-2024, incluyendo gastos de
 * funcionamiento, inversión y deuda.
 * @module ExpensesDashboard
 */

import React from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { StatCard } from '../components/StatCard';

/**
 * Formatea un número usando el formato de moneda colombiano
 * @param value - Valor numérico a formatear
 * @returns Número formateado con separadores de miles
 */
const formatNumber = (value: number) => new Intl.NumberFormat('es-CO').format(value);

// Paleta de colores para las diferentes series de datos en las gráficas
const COLORS = ['#3b82f6', '#14b8a6', '#f97316', '#8b5cf6', '#ec4899'];

/**
 * Datos históricos de gastos totales del Distrito (2019-2024)
 * Incluye los tres componentes principales:
 * - Funcionamiento: Gastos operativos y administrativos
 * - Inversión: Proyectos y programas de desarrollo
 * - Deuda: Servicio de la deuda pública
 */
const totalExpensesData = [
    { name: '2019', 'Funcionamiento': 923033, 'Inversión': 4553329, 'Deuda': 11321 },
    { name: '2020', 'Funcionamiento': 867598, 'Inversión': 3873913, 'Deuda': 36952 },
    { name: '2021', 'Funcionamiento': 926628, 'Inversión': 4162983, 'Deuda': 39488 },
    { name: '2022', 'Funcionamiento': 962567, 'Inversión': 4463672, 'Deuda': 54647 },
    { name: '2023', 'Funcionamiento': 941462, 'Inversión': 4844902, 'Deuda': 41009 },
    { name: '2024', 'Funcionamiento': 1004114, 'Inversión': 4654367, 'Deuda': 233751 },
];

/**
 * Desglose detallado de los gastos de funcionamiento
 * Componentes principales para el cálculo del indicador Ley 617:
 * - Servicios Personales: Nómina y relacionados
 * - Gastos Generales: Operación administrativa
 * - Transferencias: Aportes y transferencias corrientes
 */
const operatingExpensesData = [
  { name: '2019', 'Serv. Personales': 133994, 'Gastos Generales': 545682, 'Transferencias': 0 },
  { name: '2020', 'Serv. Personales': 126784, 'Gastos Generales': 480344, 'Transferencias': 0 },
  { name: '2021', 'Serv. Personales': 146672, 'Gastos Generales': 487754, 'Transferencias': 0 },
  { name: '2022', 'Serv. Personales': 220474, 'Gastos Generales': 496442, 'Transferencias': 0 },
  { name: '2023', 'Serv. Personales': 241606, 'Gastos Generales': 422411, 'Transferencias': 0 },
  { name: '2024', 'Serv. Personales': 235373, 'Gastos Generales': 466114, 'Transferencias': 0 },
];

/**
 * Composición de la inversión según el tipo de recursos
 * - Destinación Específica: Recursos con destino predefinido por ley
 * - Libre Destinación: Recursos de inversión de libre asignación
 * Cifras en millones de pesos corrientes
 */
const investmentBreakdownData = [
  { name: '2019', 'Destinación Específica': 3693133, 'Libre Destinación': 860196 },
  { name: '2020', 'Destinación Específica': 3216658, 'Libre Destinación': 657255 },
  { name: '2021', 'Destinación Específica': 3415799, 'Libre Destinación': 747184 },
  { name: '2022', 'Destinación Específica': 3350920, 'Libre Destinación': 1112752 },
  { name: '2023', 'Destinación Específica': 3742986, 'Libre Destinación': 1101916 },
  { name: '2024', 'Destinación Específica': 3584346, 'Libre Destinación': 1070021 },
];

/**
 * Componente para mostrar tooltips con valores formateados en las gráficas
 * @param active - Estado activo del tooltip
 * @param payload - Datos a mostrar en el tooltip
 * @param label - Etiqueta del punto de datos
 * @returns Elemento JSX con el tooltip formateado o null si no está activo
 */
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
 * Componente principal del Dashboard de Gastos
 * Presenta una vista completa de la evolución y composición de los gastos del Distrito:
 * - Gráfico de área apilada para gastos totales
 * - Desglose de la inversión por tipo de recurso
 * - Análisis del crecimiento por componentes
 * - Gastos de funcionamiento relacionados con Ley 617
 * @returns Componente React con el dashboard completo
 */
export const ExpensesDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gradient mb-6">Análisis de Gastos 2019-2024</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Evolución del Gasto Total" description="Cifras en millones de pesos.">
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={totalExpensesData} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(tick) => `${(tick / 1000000).toFixed(1)}M`} />
                <Tooltip content={<TooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="Funcionamiento" stackId="a" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Inversión" stackId="a" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Deuda" stackId="a" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.7} />
            </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Desglose de la Inversión" description="Cifras en millones de pesos.">
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={investmentBreakdownData} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(tick) => `${(tick / 1000000).toFixed(1)}M`} />
                <Tooltip content={<TooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="Destinación Específica" stackId="1" stroke={COLORS[3]} fill={COLORS[3]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Libre Destinación" stackId="1" stroke={COLORS[4]} fill={COLORS[4]} fillOpacity={0.7} />
            </AreaChart>
            </ResponsiveContainer>
        </ChartCard>

        <div className="lg:col-span-2">
            <StatCard title="Análisis del Crecimiento de Componentes">
                <ul className="list-disc pl-5 space-y-3">
                    <li><strong>Crecimiento General (1%):</strong> Entre 2019 y 2024, los gastos del Distrito crecieron un 1% en promedio anual real, pasando de $5,4 billones a $5,8 billones.</li>
                    <li><strong>Funcionamiento (17% del total):</strong> Estos gastos se mantienen controlados en cumplimiento de la Ley 617 de 2000, con un crecimiento promedio real del 2%.</li>
                    <li><strong>Inversión (81% del total):</strong> Registra un crecimiento moderado del 0,4%, explicado por el agotamiento de recursos de crédito autorizados.</li>
                    <li><strong>Deuda (2% del total):</strong> Presenta un incremento real del 83%, derivado de nuevas obligaciones y amortizaciones pactadas.</li>
                </ul>
            </StatCard>
        </div>
        
        <div className="lg:col-span-2">
            <ChartCard title="Gastos de Funcionamiento y Ley 617" description="Componentes clave para el cálculo del indicador de la Ley 617.">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={operatingExpensesData} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                    <XAxis dataKey="name" stroke="#4b5563" />
                    <YAxis stroke="#4b5563" tickFormatter={(tick) => `${(tick / 100000).toFixed(1)}M`} />
                    <Tooltip content={<TooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="Serv. Personales" stroke={COLORS[0]} strokeWidth={3} />
                    <Line type="monotone" dataKey="Gastos Generales" stroke={COLORS[1]} strokeWidth={3} />
                    <Line type="monotone" dataKey="Transferencias" stroke={COLORS[2]} strokeWidth={3} />
                </LineChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>

      </div>
    </div>
  );
};
