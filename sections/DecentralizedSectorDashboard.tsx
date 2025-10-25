/**
 * @fileoverview Dashboard del Sector Descentralizado que presenta el análisis
 * financiero de las principales entidades descentralizadas del Distrito,
 * incluyendo EMCALI, Metrocali, y otras entidades públicas.
 * @module DecentralizedSectorDashboard
 */

import React from 'react';
import { StatCard } from '../components/StatCard';
import { Sparkline } from '../components/Sparkline';
import { Bus, Droplets, Landmark } from 'lucide-react';
import { DataTable } from '../components/DataTable';

/**
 * Serie histórica de ingresos operacionales de EMCALI
 * Muestra la evolución de los ingresos en billones de pesos
 * desde 2020 hasta 2024, reflejando el crecimiento sostenido
 * de la empresa de servicios públicos
 */
const emcaliData = [
    { name: '2020', value: 4.1 },
    { name: '2021', value: 4.3 },
    { name: '2022', value: 4.5 },
    { name: '2023', value: 4.6 },
    { name: '2024', value: 4.8 },
];
/**
 * Serie histórica del resultado neto de Metrocali
 * Muestra la evolución del déficit operacional en miles de millones
 * desde 2020 hasta 2024, con una tendencia de mejora gradual
 * aunque manteniendo resultados negativos
 */
const metrocaliData = [
    { name: '2020', value: -150 },
    { name: '2021', value: -180 }, // Mayor déficit histórico
    { name: '2022', value: -165 },
    { name: '2023', value: -140 },
    { name: '2024', value: -120 }, // Mejora progresiva
];

/**
 * Datos de transferencias entre el nivel central y entidades descentralizadas
 * Valores positivos: Transferencias de la entidad al Distrito
 * Valores negativos: Transferencias del Distrito a la entidad
 * Incluye los últimos tres años y el concepto principal de la transferencia
 */
const transfersHeaders = ["Entidad", "2022 (Millones)", "2023 (Millones)", "2024 (Millones)", "Concepto Principal"];
const transfersRows = [
    ["EMCALI EICE ESP", "180.000", "195.000", "210.000", "Excedentes Financieros"],
    ["Metrocali S.A.", "-250.000", "-280.000", "-310.000", "Subsidio al Diferencial Tarifario"],
    ["Corfecali", "15.000", "18.000", "20.000", "Aportes para Feria de Cali"],
    ["Hospitales (ESE)", "-90.000", "-95.000", "-105.000", "Financiación de no POS y saneamiento"],
    ["Fondo de Vivienda", "25.000", "30.000", "35.000", "Subsidios de Vivienda de Interés Social"],
];


/**
 * Componente principal del Dashboard del Sector Descentralizado
 * Presenta información detallada sobre:
 * - Desempeño financiero de EMCALI
 * - Situación operacional de Metrocali
 * - Transferencias entre el nivel central y entidades descentralizadas
 * - Análisis de riesgos y sostenibilidad del sector
 * @returns Componente React con el dashboard completo
 */
export const DecentralizedSectorDashboard: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gradient mb-6">Análisis del Sector Descentralizado</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-4xl">
                Revisión del desempeño financiero y las transferencias entre el nivel central y las principales entidades descentralizadas del Distrito.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <StatCard title="EMCALI EICE ESP">
                    <div className="flex items-start space-x-4">
                        <Droplets className="text-blue-500" size={48} />
                        <div>
                            <h4 className="font-bold text-lg">Empresas Municipales de Cali</h4>
                            <p className="text-gray-500">Servicios Públicos (Energía, Acueducto, Telecomunicaciones)</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-3xl font-bold text-green-600">$4.8 Billones</p>
                        <p className="text-sm text-gray-500">Ingresos Operacionales 2024</p>
                    </div>
                    <div className="h-24 mt-2">
                        <Sparkline data={emcaliData} color="#3b82f6" title="Ingresos (Billones COP)" />
                    </div>
                </StatCard>
                <StatCard title="Metrocali S.A.">
                    <div className="flex items-start space-x-4">
                        <Bus className="text-red-500" size={48} />
                        <div>
                            <h4 className="font-bold text-lg">Metrocali S.A.</h4>
                            <p className="text-gray-500">Ente Gestor del Sistema de Transporte Masivo (MIO)</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-3xl font-bold text-red-600">-$120 Mil Millones</p>
                        <p className="text-sm text-gray-500">Resultado Neto 2024 (Estimado)</p>
                    </div>
                    <div className="h-24 mt-2">
                        <Sparkline data={metrocaliData} color="#ef4444" title="Resultado Neto (Miles de Millones COP)" />
                    </div>
                </StatCard>
            </div>
            
            <div className="mt-8">
                <DataTable title="Transferencias Nivel Central - Entidades Descentralizadas" headers={transfersHeaders} rows={transfersRows} />
            </div>

            <div className="mt-8">
                <StatCard title="Análisis y Riesgos">
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Fortaleza (EMCALI):</strong> EMCALI sigue siendo la principal fuente de excedentes financieros para el Distrito, con un desempeño operativo estable y en crecimiento.</li>
                        <li><strong>Riesgo Fiscal (Metrocali):</strong> El déficit operacional de Metrocali representa la mayor presión fiscal para el nivel central, requiriendo transferencias significativas para cubrir el diferencial tarifario y sostener la operación del MIO.</li>
                        <li><strong>Sostenibilidad Hospitalaria:</strong> La red de salud pública (ESE) depende de transferencias para su equilibrio financiero, lo que constituye un pasivo contingente y una presión de gasto constante.</li>
                        <li><strong>Diversidad de Desempeño:</strong> El resto de entidades muestra un comportamiento mixto, con algunas generando superávits menores y otras requiriendo aportes para su funcionamiento.</li>
                    </ul>
                </StatCard>
            </div>
        </div>
    );
};