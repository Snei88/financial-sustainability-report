import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { Sparkline } from '../components/Sparkline';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

/**
 * @fileoverview Dashboard de Desempeño Fiscal que visualiza y analiza el Índice
 * de Desempeño Fiscal (IDF) del Distrito de Cali, calculado por el DNP.
 * 
 * Incluye:
 * - Serie histórica del IDF (2000-2024)
 * - Indicadores de la nueva metodología del DNP
 * - Ranking comparativo con otras ciudades principales
 * - Análisis detallado de componentes y tendencias
 * 
 * @module FiscalPerformanceDashboard
 */

// Datos históricos del IDF (2000-2024) para la serie del gráfico
const historicalIdfData = [
    { year: '2000', idf: 51.56, rating: 'Riesgo' }, { year: '2001', idf: 57.13, rating: 'Riesgo' },
    { year: '2002', idf: 46.17, rating: 'Riesgo' }, { year: '2003', idf: 49.70, rating: 'Riesgo' },
    { year: '2004', idf: 49.94, rating: 'Riesgo' }, { year: '2005', idf: 57.28, rating: 'Riesgo' },
    { year: '2006', idf: 61.76, rating: 'Vulnerable' }, { year: '2007', idf: 69.28, rating: 'Vulnerable' },
    { year: '2008', idf: 69.21, rating: 'Vulnerable' }, { year: '2009', idf: 63.20, rating: 'Vulnerable' },
    { year: '2010', idf: 83.16, rating: 'Sostenible' }, { year: '2011', idf: 76.67, rating: 'Solvente' },
    { year: '2012', idf: 73.57, rating: 'Solvente' }, { year: '2013', idf: 74.09, rating: 'Solvente' },
    { year: '2014', idf: 79.02, rating: 'Solvente' }, { year: '2015', idf: 80.73, rating: 'Sostenible' },
    { year: '2016', idf: 79.86, rating: 'Solvente' }, { year: '2017', idf: 80.14, rating: 'Sostenible' },
    { year: '2018', idf: 81.13, rating: 'Sostenible' }, { year: '2019', idf: 81.30, rating: 'Sostenible' },
    { year: '2020', idf: 70.71, rating: 'Solvente' }, { year: '2021', idf: 65.02, rating: 'Vulnerable' },
    { year: '2022', idf: 66.00, rating: 'Vulnerable' }, { year: '2023', idf: 69.60, rating: 'Vulnerable' },
    { year: '2024', idf: 58.30, rating: 'Riesgo' }
];

// Datos de la "nueva metodología" presentados en tabla (ejemplo)
const newMethodologyData = {
    headers: ["Categoría", "Indicador", "2020", "2021", "2022", "2023", "2024"],
    rows: [
        { cat: 'Resultados Fiscales', ind: 'Dependencia de las transferencias', v20: 56.6, v21: 57.9, v22: 57.1, v23: 58.7, v24: 56.4 },
        { cat: 'Resultados Fiscales', ind: 'Relevancia FBK fijo', v20: 66.4, v21: 48.8, v22: 47.1, v23: 53.4, v24: 28.4 },
        { cat: 'Resultados Fiscales', ind: 'Endeudamiento largo plazo', v20: 68.4, v21: 67.1, v22: 66.9, v23: 71.8, v24: 70.0 },
        { cat: 'Resultados Fiscales', ind: 'Ahorro Corriente', v20: 80.0, v21: 80.0, v22: 80.0, v23: 80.0, v24: 86.7 },
        { cat: 'Resultados Fiscales', ind: 'Balance Primario', v20: 60.0, v21: 80.0, v22: 60.0, v23: 60.0, v24: 20.0 },
        { cat: 'Gestión Financiera', ind: 'Holgura', v20: 0.0, v21: 79.6, v22: 56.8, v23: 60.5, v24: 61.3 },
        { cat: 'Gestión Financiera', ind: 'Capacidad de Programación de los ingresos', v20: 100.0, v21: 100.0, v22: 100.0, v23: 100.0, v24: 100.0 },
        { cat: 'Gestión Financiera', ind: 'Capacidad de Ejecución de Inversión', v20: 80.0, v21: 80.0, v22: 80.0, v23: 100.0, v24: 100.0 },
        { cat: 'Bonos', ind: 'Bonificación esfuerzo propio', v20: 0.0, v21: 0.0, v22: 0.1, v23: 0.1, v24: 0.05 },
        { cat: 'Bonos', ind: 'Bono Catastro', v20: 0.0, v21: 0.0, v22: 2.0, v23: 2.0, v24: 2.0 },
        { cat: 'Total', ind: 'IDF', v20: 65.02, v21: 71.49, v22: 65.96, v23: 69.60, v24: 58.30 },
    ]
};

// Ranking de ciudades: para cada ciudad hay datos por año (posición y valor IDF)
const cityRankingData = [
  { city: 'Bogotá', data: [{p:1, idf:NaN},{p:1, idf:85.78},{p:1, idf:79.72},{p:1, idf:90.10},{p:1, idf:77.00}] },
  { city: 'Barranquilla', data: [{p:5, idf:64.03},{p:11, idf:56.47},{p:2, idf:75.70},{p:4, idf:72.70},{p:2, idf:75.50}] },
  { city: 'Medellín', data: [{p:1, idf:78.56},{p:2, idf:80.45},{p:5, idf:71.18},{p:5, idf:69.80},{p:3, idf:69.70}] },
  { city: 'Cali', data: [{p:4, idf:65.02},{p:3, idf:71.49},{p:7, idf:65.96},{p:6, idf:69.60},{p:6, idf:58.30}] },
  { city: 'Bucaramanga', data: [{p:11, idf:53.80},{p:9, idf:61.34},{p:3, idf:73.37},{p:2, idf:76.10},{p:5, idf:62.90}] },
  { city: 'Manizales', data: [{p:10, idf:54.33},{p:4, idf:64.41},{p:4, idf:72.25},{p:7, idf:69.10},{p:7, idf:69.10}] },
  { city: 'Pereira', data: [{p:6, idf:63.84},{p:8, idf:62.12},{p:8, idf:65.47},{p:3, idf:75.00},{p:NaN, idf:NaN}] },
  { city: 'Cartagena', data: [{p:13, idf:51.70},{p:12, idf:50.39},{p:11, idf:63.00},{p:NaN, idf:NaN},{p:4, idf:63.40}] },
  { city: 'Cúcuta', data: [{p:2, idf:68.88},{p:5, idf:63.72},{p:9, idf:64.44},{p:10, idf:66.00},{p:10, idf:66.00}] },
  { city: 'Montería', data: [{p:7, idf:52.20},{p:6, idf:63.84},{p:11, idf:53.60},{p:9, idf:66.40},{p:9, idf:66.40}] },
  { city: 'Pasto', data: [{p:8, idf:60.25},{p:7, idf:63.49},{p:6, idf:68.23},{p:11, idf:63.50},{p:11, idf:63.50}] },
  { city: 'Ibagué', data: [{p:9, idf:57.41},{p:13, idf:49.05},{p:11, idf:56.06},{p:12, idf:59.70},{p:12, idf:59.70}] },
  { city: 'Villavicencio', data: [{p:12, idf:53.80},{p:10, idf:59.03},{p:10, idf:64.39},{p:8, idf:68.30},{p:8, idf:68.30}] },
];

/**
 * ValueCell
 * Componente pequeño que formatea y aplica estilo condicional a un valor numérico del IDF.
 * - Si el valor es NaN muestra "N/A"
 * - Si el valor es <30 lo marca en rojo (deterioro)
 * - Si el valor es >80 lo marca en verde (sostenible)
 * - Si existe previousValue compara y aplica color de mejora/deterioro
 */
const ValueCell: React.FC<{ value: number, previousValue?: number }> = ({ value, previousValue }) => {
    if (isNaN(value)) return <span className="text-gray-400">N/A</span>;
    const isImproved = previousValue !== undefined && !isNaN(previousValue) && value > previousValue;
    const isWorsened = previousValue !== undefined && !isNaN(previousValue) && value < previousValue;
    const color = isImproved ? 'text-green-600' : isWorsened ? 'text-red-600' : 'text-gray-800';

    if (value < 30) return <span className="font-bold text-red-600 bg-red-100 px-2 py-1 rounded-md">{value.toFixed(2)}</span>
    if (value > 80) return <span className="font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">{value.toFixed(2)}</span>

    return <span className={`font-semibold ${color}`}>{value.toFixed(2)}</span>
};


export const FiscalPerformanceDashboard: React.FC = () => {
    
    // Función para aplicar estilos a la celda de posición en la tabla de ranking
    const rankingCellStyle = (cellValue: any, colIndex: number): string => {
        if (colIndex === 0) {
            // extraemos la posición numérica (si existe) del contenido del JSX
            const position = cellValue?.props?.children?.[0]?.props?.children;
            if (position === 1) return 'font-bold bg-amber-100 text-amber-800';
            if (position === 2) return 'font-bold bg-slate-200 text-slate-800';
            if (position === 3) return 'font-bold bg-orange-200 text-orange-800';
        }
        return '';
    };
    
    // Convertimos cityRankingData en filas para la DataTable: última posición, ciudad, series históricas y sparkline
    const cityRankingRows = cityRankingData.map(item => {
        const trendData = item.data.map((d, i) => ({ name: (2020 + i).toString(), value: d.idf || 0 })).filter(d => d.value > 0);
        const lastData = item.data[4];
        const prevData = item.data[3];

        // Icono de tendencia según comparación entre último y penúltimo valor
        const trendIcon = !lastData || !prevData || !lastData.idf || !prevData.idf ? <Minus size={16} className="text-gray-500" />
            : lastData.idf > prevData.idf ? <ArrowUp size={16} className="text-green-500" />
            : <ArrowDown size={16} className="text-red-500" />;

        return [
            <div className="flex items-center space-x-2"><span className="font-bold">{lastData?.p || 'N/A'}</span> {trendIcon}</div>,
            item.city,
            ...item.data.map(d => d.idf?.toFixed(2) || 'N/A'),
            <div className="h-10 w-24"><Sparkline data={trendData} color="#3b82f6" title="IDF" /></div>
        ];
    });

    // lastCat se usa para agrupar visualmente por categoría en la tabla de la nueva metodología
    let lastCat = '';

    return (
        <div>
            <h2 className="text-3xl font-bold text-gradient mb-6">Índice de Desempeño Fiscal (DNP)</h2>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="xl:col-span-2">
                    <ChartCard title="Evolución Histórica del Desempeño Fiscal de Cali (2000-2024)">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={historicalIdfData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4}/>
                                <XAxis dataKey="year" />
                                <YAxis domain={[40, 90]}/>
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #e5e7eb' }} />
                                <Legend />
                                {/* ReferenceArea colorea rangos de desempeño para facilitar la lectura */}
                                <ReferenceArea y1={0} y2={40} fill="rgba(239, 68, 68, 0.1)" strokeOpacity={0.3} label={{ value: "Deterioro", position: "insideLeft", fill: "#ef4444" }}/>
                                <ReferenceArea y1={40} y2={60} fill="rgba(249, 115, 22, 0.1)" strokeOpacity={0.3} label={{ value: "Riesgo", position: "insideLeft", fill: "#f97316" }}/>
                                <ReferenceArea y1={60} y2={70} fill="rgba(234, 179, 8, 0.1)" strokeOpacity={0.3} label={{ value: "Vulnerable", position: "insideLeft", fill: "#eab308" }}/>
                                <ReferenceArea y1={70} y2={80} fill="rgba(59, 130, 246, 0.1)" strokeOpacity={0.3} label={{ value: "Solvente", position: "insideLeft", fill: "#3b82f6" }}/>
                                <ReferenceArea y1={80} y2={100} fill="rgba(22, 163, 74, 0.1)" strokeOpacity={0.3} label={{ value: "Sostenible", position: "insideLeft", fill: "#16a34a" }}/>
                                <Line type="monotone" dataKey="idf" name="IDF Cali" stroke="#8b5cf6" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                <StatCard title="Análisis de Cali (2023 vs 2024)">
                    <p>En 2024, el IDF de Cali cayó a <strong className="text-red-600">58,30 (Riesgo)</strong> desde 69,60 (Vulnerable) en 2023. Esta caída se explica principalmente por el deterioro en los indicadores de <strong className="text-red-500">Relevancia FBK fijo</strong> (de 53,4 a 28,4) y <strong className="text-red-500">Balance Primario</strong> (de 60,0 a 20,0). A pesar de una mejora en <strong className="text-green-500">Ahorro Corriente</strong> (de 80,0 a 86,7), no fue suficiente para compensar las caídas.</p>
                </StatCard>
                <StatCard title="Contexto Nacional DNP 2024">
                    <p>El puntaje promedio del IDF municipal <strong className="text-red-600">disminuyó a 55,86 en 2024</strong> (desde 57,57 en 2023). Esta caída se debe a una disminución en la dimensión de <strong className="text-red-500">Resultados Fiscales</strong>, aunque la <strong className="text-green-500">Gestión Financiera</strong> mejoró. Casi 7 de cada 10 municipios se ubican en los rangos de <strong className="text-orange-500">"Riesgo"</strong> y <strong className="text-red-600">"Deterioro"</strong>.</p>
                </StatCard>
            </div>
            
            <div className="mt-8">
                 <DataTable 
                    title="Resultados Cali - Nueva Metodología DNP (2020-2024)"
                    headers={newMethodologyData.headers}
                    rows={newMethodologyData.rows.map(row => {
                         const cat = row.cat !== lastCat ? <span className={`font-bold ${row.cat === 'Total' ? 'text-blue-600' : ''}`}>{row.cat}</span> : '';
                         lastCat = row.cat;
                         return [
                             cat,
                             row.ind,
                             row.v20.toFixed(2),
                             row.v21.toFixed(2),
                             row.v22.toFixed(2),
                             row.v23.toFixed(2),
                             <ValueCell value={row.v24} previousValue={row.v23} />
                         ]
                    }) as any}
                 />
            </div>
            
             <div className="mt-8">
                <DataTable 
                    title="Ranking IDF - Principales Ciudades (2020-2024)" 
                    headers={["Posición", "Ciudad", "2020", "2021", "2022", "2023", "2024", "Tendencia"]} 
                    rows={cityRankingRows as any} 
                    highlightRow={{ key: 'Cali', index: 1 }}
                    cellStyle={rankingCellStyle}
                />
            </div>
        </div>
    );
};
