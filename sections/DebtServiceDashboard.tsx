/**
 * @fileoverview Dashboard de Servicio de la Deuda que visualiza la estructura,
 * evolución y proyecciones de la deuda pública del Distrito. Incluye análisis
 * de sostenibilidad y composición por tipo de acreedor.
 * @module DebtServiceDashboard
 */

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { DataTable } from '../components/DataTable';
import { StatCard } from '../components/StatCard';

/**
 * Formatea un valor numérico o cadena a formato de moneda colombiana
 * @param value - Valor a formatear (número o cadena)
 * @returns Cadena formateada con separadores de miles
 */
const formatNumber = (value: number | string) => {
    const num = Number(String(value).replace(/,/g, ''));
    if (isNaN(num)) return value;
    return new Intl.NumberFormat('es-CO').format(num);
};

// Paleta de colores para las visualizaciones
// Rojo: Servicio de deuda, Azul: Deuda total, Verde: Composición, Naranja: Adicional
const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f97316'];

/**
 * Serie histórica de la deuda total y su servicio anual (2019-2024)
 * Muestra la evolución del saldo de la deuda y los pagos realizados
 * Cifras en millones de pesos corrientes
 */
const debtEvolutionData = [
  { name: '2019', 'Deuda Total': 1050000, 'Servicio Deuda': 11321 },
  { name: '2020', 'Deuda Total': 1100000, 'Servicio Deuda': 36952 },
  { name: '2021', 'Deuda Total': 1250000, 'Servicio Deuda': 39488 },
  { name: '2022', 'Deuda Total': 1300000, 'Servicio Deuda': 54647 },
  { name: '2023', 'Deuda Total': 1150000, 'Servicio Deuda': 41009 },
  { name: '2024', 'Deuda Total': 1060073, 'Servicio Deuda': 233751 },
];

/**
 * Distribución de la deuda por tipo de acreedor
 * - Banca Nacional: Créditos con bancos comerciales locales
 * - Banca Multilateral: Préstamos de organismos internacionales
 * - Bonos: Títulos de deuda pública
 * Valores expresados en porcentaje del total
 */
const debtCompositionData = [
  { name: 'Banca Nacional', value: 75 },
  { name: 'Banca Multilateral', value: 15 },
  { name: 'Bonos', value: 10 },
];

/**
 * Datos de proyección del servicio de la deuda (2025-2028)
 * Incluye los componentes principales del servicio:
 * - Amortización de capital
 * - Pago de intereses
 * - Servicio total (suma de capital e intereses)
 * Cifras en millones de pesos
 */
const debtServiceProjectionHeaders = ["Año", "Amortización Capital", "Intereses", "Servicio Total"];
const debtServiceProjectionRows = [
    ["2025", "2.514", "81.798", "84.312"],
    ["2026", "150.000", "120.000", "270.000"],
    ["2027", "180.000", "110.000", "290.000"],
    ["2028", "200.000", "95.000", "295.000"],
].map(row => row.map(cell => formatNumber(cell)));

/**
 * Componente para mostrar tooltips en las gráficas con valores formateados
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
 * Componente principal del Dashboard de Servicio de la Deuda
 * Muestra una vista completa del perfil de endeudamiento del Distrito:
 * - Evolución histórica de la deuda y su servicio
 * - Composición por tipo de acreedor
 * - Proyecciones de pagos futuros
 * - Análisis de sostenibilidad y capacidad de pago
 * @returns Componente React con el dashboard completo
 */
export const DebtServiceDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-[#0A2A6A]">Análisis del Servicio de la Deuda</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-4xl">
        Esta sección detalla la estructura, evolución y proyecciones del servicio de la deuda del Distrito, un componente clave para la sostenibilidad fiscal a largo plazo.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Evolución de la Deuda Total y Servicio Anual" description="Cifras en millones de pesos.">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={debtEvolutionData} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                    <XAxis dataKey="name" stroke="#4b5563" />
                    <YAxis yAxisId="left" stroke={COLORS[1]} tickFormatter={(tick) => `${(tick / 1000000).toFixed(1)}M`} />
                    <YAxis yAxisId="right" orientation="right" stroke={COLORS[0]} tickFormatter={(tick) => `${(tick / 1000).toFixed(0)}K`} />
                    <Tooltip content={<TooltipContent />} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="Deuda Total" stroke={COLORS[1]} strokeWidth={3} />
                    <Line yAxisId="right" type="monotone" dataKey="Servicio Deuda" stroke={COLORS[0]} strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Composición de la Deuda por Acreedor">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={debtCompositionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                    <Bar dataKey="value" name="Porcentaje" fill={COLORS[2]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-8">
        <DataTable title="Proyección del Servicio de la Deuda (Millones de Pesos)" headers={debtServiceProjectionHeaders} rows={debtServiceProjectionRows} />
      </div>

      <div className="mt-8">
          <StatCard title="Análisis de Sostenibilidad de la Deuda">
              <ul className="list-disc pl-5 space-y-3">
                  <li><strong>Perfil de la Deuda:</strong> La deuda del Distrito se encuentra mayoritariamente contratada a tasa fija y con plazos largos, lo que mitiga los riesgos de tasa de interés y refinanciamiento.</li>
                  <li><strong>Capacidad de Pago:</strong> Los indicadores de capacidad de pago (Ley 358/97) se mantienen en niveles saludables, por debajo de los límites legales, asegurando el acceso a futuras fuentes de financiamiento.</li>
                  <li><strong>Proyecciones:</strong> El plan financiero contempla un manejo prudente del endeudamiento, asegurando que el servicio de la deuda no comprometa la inversión social prioritaria. Las proyecciones muestran un perfil de amortizaciones manejable en el mediano plazo.</li>
              </ul>
          </StatCard>
      </div>
    </div>
  );
};
