/**
 * @fileoverview Componente del Dashboard del Plan Financiero que muestra proyecciones
 * financieras, indicadores y detalles de deuda para el período 2026-2036.
 * @module FinancialPlanDashboard
 */

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { DataTable } from '../components/DataTable';
import { StatCard } from '../components/StatCard';

// Funciones de utilidad para formateo de datos
/**
 * Formatea un número como porcentaje con dos decimales
 * @param value - Valor numérico a formatear
 * @returns Cadena formateada con el símbolo de porcentaje
 */
const formatPercent = (value: number) => `${value.toFixed(2)}%`;

/**
 * Formatea un número usando el formato de moneda colombiano
 * @param value - Valor numérico o cadena a formatear
 * @returns Número formateado con separadores de miles
 */
const formatNumber = (value: string | number) => {
    const num = Number(String(value).replace(/\./g, ''));
    if (isNaN(num)) return value;
    return new Intl.NumberFormat('es-CO').format(num);
};

// Paleta de colores para las gráficas
const COLORS = ['#3b82f6', '#14b8a6', '#f97316', '#8b5cf6', '#ec4899'];

// Datos de proyección del indicador Ley 617 (límite de gastos de funcionamiento)
const ley617Projection = [
  { name: '2026', value: 41.1 },
  { name: '2027', value: 40.9 },
  { name: '2028', value: 40.8 },
  { name: '2029', value: 40.9 },
  { name: '2030', value: 40.9 },
  { name: '2031', value: 40.8 },
  { name: '2032', value: 40.8 },
  { name: '2033', value: 40.7 },
  { name: '2034', value: 40.6 },
  { name: '2035', value: 40.6 },
  { name: '2036', value: 41.5 },
];

// Datos de proyección del superávit primario (incluye sobretasa a la gasolina)
const primarySurplus = [
    { name: '2026', value: -240 }, // Déficit inicial
    { name: '2027', value: -159 }, // Reducción del déficit
    { name: '2028', value: 151 },  // Cambio a superávit
    { name: '2029', value: 170 },
    { name: '2030', value: 184 },
    { name: '2031', value: 236 },
    { name: '2032', value: 375 },
    { name: '2033', value: 433 },
    { name: '2034', value: 570 },
    { name: '2035', value: 850 },
    { name: '2036', value: 1227 }, // Mayor superávit proyectado
];

const financialPlanHeaders = ["Detalle", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036"];
const rawFinancialPlanRows = [
    ["Ingresos Corrientes", "6547004", "6915114", "7269017", "7690137", "8137502", "8614515", "9121803", "9666034", "10244757", "10853173", "11393240"],
    ["Recursos de Capital", "1004541", "723179", "138052", "76427", "76520", "75731", "79415", "81678", "84006", "86405", "88475"],
    ["TOTAL INGRESOS", "7551545", "7638294", "7407069", "7766564", "8214022", "8690246", "9201219", "9747712", "10328763", "10939578", "11481715"],
    ["Funcionamiento", "1297031", "1375849", "1456704", "1550449", "1650308", "1756838", "1870454", "1992227", "2121786", "2259863", "2403875"],
    ["Deuda Pública", "285457", "337077", "546274", "547511", "515266", "466203", "614620", "531805", "481357", "454345", "397898"],
    ["Inversión", "5969057", "5925368", "5404091", "5668603", "6048448", "6467205", "6716146", "7223680", "7725620", "8225370", "8679942"],
    ["TOTAL GASTOS", "7551545", "7638294", "7407069", "7766564", "8214022", "8690246", "9201219", "9747712", "10328763", "10939578", "11481715"],
];

const financialPlanRows = rawFinancialPlanRows.map(row => [row[0], ...row.slice(1).map(cell => formatNumber(cell as string))]);

const incomeProjectionData = financialPlanHeaders.slice(1).map((year, index) => ({
  name: year,
  'Ingresos Corrientes': Number(rawFinancialPlanRows[0][index + 1]),
  'Recursos de Capital': Number(rawFinancialPlanRows[1][index + 1]),
}));

const expenseProjectionData = financialPlanHeaders.slice(1).map((year, index) => ({
  name: year,
  'Funcionamiento': Number(rawFinancialPlanRows[3][index + 1]),
  'Deuda Pública': Number(rawFinancialPlanRows[4][index + 1]),
  'Inversión': Number(rawFinancialPlanRows[5][index + 1]),
}));

const debtService2025Headers = ["Mes", "Saldo Anterior", "Desembolsos", "Amortizaciones", "Nuevo Saldo", "Intereses", "Servicio Deuda"];
const debtService2025Rows = [
    ["ENERO", "1.060.073", "", "", "1.060.073", "22.345", "22.345"],
    ["FEBRERO", "1.060.073", "", "", "1.060.073", "0", "0"],
    ["MARZO", "1.060.073", "", "", "1.060.073", "14.369", "14.369"],
    ["ABRIL", "1.060.073", "", "", "1.060.073", "14.712", "14.712"],
    ["MAYO", "1.060.073", "", "", "1.060.073", "0", "0"],
    ["JUNIO", "1.060.073", "", "", "1.060.073", "15.768", "15.768"],
    ["JULIO", "1.060.073", "3.628", "2.514", "1.061.187", "14.605", "17.119"],
    ["AGOSTO", "1.061.187", "", "", "1.061.187", "0", "0"],
    ["SEPTIEMBRE", "1.061.187", "", "", "1.061.187", "0", "0"],
    ["OCTUBRE", "1.061.187", "", "", "1.061.187", "0", "0"],
    ["NOVIEMBRE", "1.061.187", "", "", "1.061.187", "0", "0"],
    ["DICIEMBRE", "1.061.187", "", "", "1.061.187", "0", "0"],
    ["TOTALES", "", "3.628", "2.514", "1.061.187", "81.798", "84.312"],
].map(row => row.map(cell => formatNumber(cell as string | number)));

const surchargeDebtHeaders1 = ["Año", "Saldo Inicial", "Desembolsos", "Intereses", "Capital", "Servicio Deuda", "Saldo Final"];
const surchargeDebtRows1 = [
    ["2026", "45.000", "45.000", "25.260", "", "25.260", "45.000"],
    ["2027", "300.000", "255.000", "72.011", "", "72.011", "300.000"],
    ["2028", "300.000", "", "62.896", "", "62.896", "300.000"],
    ["2029", "300.000", "", "59.544", "", "59.544", "300.000"],
    ["2030", "300.000", "", "59.525", "", "59.525", "300.000"],
    ["2031", "300.000", "", "6.250", "65.775", "65.775", "293.750"],
].map(row => row.map(cell => formatNumber(cell as string | number)));

const surchargeDebtHeaders2 = ["Año", "Saldo Inicial", "Intereses", "Capital", "Servicio Deuda", "Saldo Final"];
const surchargeDebtRows2 = [
    ["2032", "293.750", "59.675", "34.722", "94.397", "259.028"],
    ["2033", "259.028", "59.502", "34.722", "94.224", "224.306"],
    ["2034", "224.306", "85.802", "34.722", "120.524", "189.583"],
    ["2035", "189.583", "108.943", "34.722", "143.666", "154.861"],
    ["2036", "154.861", "101.912", "34.722", "136.634", "120.139"],
].map(row => row.map(cell => formatNumber(cell as string | number)));

/**
 * Componente para mostrar tooltips con valores porcentuales en las gráficas
 * @param active - Estado activo del tooltip
 * @param payload - Datos a mostrar en el tooltip
 * @param label - Etiqueta del punto de datos
 */
const TooltipContentPercent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/80 backdrop-blur-sm p-4 border border-gray-200 rounded-lg shadow-lg">
                <p className="label text-gray-800 font-bold">{`${label}`}</p>
                {payload.map((pld: any, index: number) => (
                    <p key={index} style={{ color: pld.color }} className="intro font-medium">{`${pld.name}: ${formatPercent(pld.value)}`}</p>
                ))}
            </div>
        );
    }
    return null;
};

/**
 * Componente para mostrar tooltips con valores numéricos formateados en las gráficas
 * @param active - Estado activo del tooltip
 * @param payload - Datos a mostrar en el tooltip
 * @param label - Etiqueta del punto de datos
 */
const TooltipContentNumbers = ({ active, payload, label }: any) => {
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
 * Componente principal del Dashboard del Plan Financiero
 * Muestra una vista completa de las proyecciones financieras incluyendo:
 * - Tabla resumen del plan financiero 2026-2036
 * - Gráficas de proyección de ingresos y gastos
 * - Indicador Ley 617
 * - Superávit primario proyectado
 * - Detalles de deuda y sobretasa a la gasolina
 */
export const FinancialPlanDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gradient mb-6">Plan Financiero y Proyecciones</h2>
      
      <DataTable title="Resumen Plan Financiero 2026-2036 (Cifras en millones de pesos)" headers={financialPlanHeaders} rows={financialPlanRows} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <ChartCard title="Proyección de Ingresos Totales">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={incomeProjectionData} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                    <XAxis dataKey="name" stroke="#4b5563" />
                    <YAxis stroke="#4b5563" tickFormatter={(tick) => `${(tick / 1000000).toFixed(0)}M`} />
                    <Tooltip content={<TooltipContentNumbers />} />
                    <Legend />
                    <Line type="monotone" dataKey="Ingresos Corrientes" stroke={COLORS[0]} strokeWidth={3} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Recursos de Capital" stroke={COLORS[1]} strokeWidth={3} activeDot={{ r: 8 }}/>
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Proyección de Gastos Totales">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expenseProjectionData} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                    <XAxis dataKey="name" stroke="#4b5563" />
                    <YAxis stroke="#4b5563" tickFormatter={(tick) => `${(tick / 1000000).toFixed(0)}M`} />
                    <Tooltip content={<TooltipContentNumbers />} />
                    <Legend />
                    <Line type="monotone" dataKey="Funcionamiento" stroke={COLORS[2]} strokeWidth={3} />
                    <Line type="monotone" dataKey="Inversión" stroke={COLORS[3]} strokeWidth={3} />
                    <Line type="monotone" dataKey="Deuda Pública" stroke={COLORS[4]} strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <ChartCard title="Proyección Indicador Ley 617 (2026-2036)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ley617Projection} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
              <XAxis dataKey="name" stroke="#4b5563" />
              <YAxis domain={[35, 55]} stroke="#4b5563" tickFormatter={(tick) => `${tick}%`} />
              <Tooltip content={<TooltipContentPercent />} />
              <Legend />
              <ReferenceLine y={50} label={{ value: "Límite Legal", position: "top", fill: '#dc2626' }} stroke="#dc2626" strokeDasharray="2 2" />
              <Line type="monotone" dataKey="value" name="Proyección" stroke={COLORS[1]} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Superávit Primario Proyectado (incl. Sobretasa Gasolina + Tren)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={primarySurplus} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
              <XAxis dataKey="name" stroke="#4b5563" />
              <YAxis stroke="#4b5563" tickFormatter={(tick) => `${tick}%`} />
              <Tooltip formatter={(value: number) => `${value}%`} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #e5e7eb', color: '#1f2937' }}/>
              <ReferenceLine y={100} label={{ value: "Límite 819 > 100%", fill: "#dc2626" }} stroke="#dc2626" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="value" name="Superávit" stroke={COLORS[2]} strokeWidth={3} activeDot={{ r: 8 }}/>
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-8 space-y-8">
        <h3 className="text-2xl font-bold text-gradient mb-2">Detalles Adicionales del Plan Financiero</h3>
        <DataTable title="Ejecución Servicio de la Deuda por Mes 2025 (Cifras en Millones)" headers={debtService2025Headers} rows={debtService2025Rows} />
        <StatCard title="Deuda Sobretasa a la Gasolina">
            <p>Metrocali tiene autorizado mediante Acuerdo 180 de 2020 un cupo de <strong className="text-purple-600">$300,000 millones</strong> con fuente de financiación Sobretasa a la Gasolina.</p>
        </StatCard>
        <DataTable title="Proyección Deuda Sobretasa a la Gasolina (2026-2031)" headers={surchargeDebtHeaders1} rows={surchargeDebtRows1} />
        <DataTable title="Proyección Deuda Sobretasa a la Gasolina (2032-2036)" headers={surchargeDebtHeaders2} rows={surchargeDebtRows2} />
      </div>
    </div>
  );
};
