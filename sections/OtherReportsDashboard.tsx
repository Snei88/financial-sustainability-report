import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DataTable } from '../components/DataTable';
import { ChartCard } from '../components/ChartCard';
import { StatCard } from '../components/StatCard';

const judicialSentencesData = [
    { name: 'Alta', value: 26.1 },
    { name: 'Media', value: 26.0 },
    { name: 'Baja', value: 4.0 },
    { name: 'Remota', value: 15.2 },
    { name: 'Sin calificar', value: 10.5 },
    { name: 'No se califica', value: 18.2 },
];

const COLORS = ['#ef4444', '#f97316', '#22c55e', '#3b82f6', '#8b5cf6', '#64748b'];

const judicialSentencesTableHeaders = ["Jurisdicción", "No. de Procesos", "Cuantías en Millones de pesos"];
const judicialSentencesTableRows = [
    ["Administrativo", 2864, "2.712.782"],
    ["Civil", 29, "16.377"],
    ["Laboral", 385, "78.961"],
    ["MASC", 36, "19.702"],
    ["Tribunal arbitramento", 1, "5.704"],
    ["Total", 3315, "2.833.526"],
];

const contingentLiabilitiesHeaders = ["No.", "Sector", "Pasivo Pensional (31/12/2023)", "Ahorro FONPET (30/04/2025)", "Ahorro Patrimonio Autónomo (31/07/2025)", "Total Ahorro"];
const contingentLiabilitiesRows = [
    [1, "EDUCACIÓN", "51.900", "67.637", "-", "67.637"],
    [2, "SALUD", "58.309", "223.399", "-", "223.399"],
    [3, "PROPÓSITO GENERAL", "3.326.707", "1.238.285", "821.727", "2.060.012"],
    [4, "RESERVAS CUOTAS PARTES", "-", "0,239", "-", "0,239"],
    ["", "TOTAL", "3.436.916", "1.529.321", "821.727", "2.351.048"],
];

export const OtherReportsDashboard: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-[#0A2A6A]">Otros Reportes Financieros</h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="flex flex-col">
                    <ChartCard title="Sentencias Judiciales - Probabilidad de Pérdida">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={judicialSentencesData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    // FIX: The error regarding an arithmetic operation on a non-numeric type was likely caused by a type inference issue with the `percent` prop.
                                    // Changed the label renderer to use the `value` prop from the data, which is already a percentage, thus avoiding the problematic multiplication.
                                    label={({ name, value }) => `${name} ${Number(value).toFixed(0)}%`}
                                >
                                    {judicialSentencesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #e5e7eb' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                    <DataTable title="Cuantías por Jurisdicción" headers={judicialSentencesTableHeaders} rows={judicialSentencesTableRows} />
                </div>
                
                <div className="flex flex-col">
                    <StatCard title="Pasivos Contingentes (Cubrimiento 68,1%)">
                        <p className="italic text-gray-500">
                            “El pasivo pensional se constituye en un factor crítico... Este pasivo es un riesgo fiscal porque si no se gestiona adecuadamente puede generar presiones financieras significativas en el futuro..."
                        </p>
                    </StatCard>
                    <div className="mt-8">
                      <DataTable title="Resumen de Pasivos Pensionales" headers={contingentLiabilitiesHeaders} rows={contingentLiabilitiesRows} />
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#0A2A6A] to-[#1348A2] bg-clip-text text-transparent">Proyectos Estratégicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <StatCard title="Tren de Cercanías - Inversión y Financiación">
                        <p>La inversión total se estima en <strong className="text-purple-600">12 billones de pesos</strong>.</p>
                        <p>Será financiada mediante un convenio donde la Nación asume el <strong className="text-green-600">70%</strong> y las entidades territoriales el <strong className="text-blue-600">30%</strong>.</p>
                        <p>Para Cali, esta participación equivale a aproximadamente <strong className="text-amber-600">$345.600 millones</strong>, lo que representa un riesgo para la sostenibilidad financiera del Distrito.</p>
                    </StatCard>
                    <StatCard title="Tren de Cercanías - Aportes del Distrito">
                        <p>Mediante el Acuerdo 512 de 2021, Cali aprobó su vinculación y la destinación de recursos.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Etapa de estructuración:</strong> $7.005 millones (primeros 4 años).</li>
                             <li><strong>Fase de construcción:</strong> $9.046 millones (años 5 a 7).</li>
                             <li><strong>Etapa de operación:</strong> Aporte inicial de $3.337 millones (a partir del año 8).</li>
                        </ul>
                    </StatCard>
                </div>
            </div>
        </div>
    );
};
