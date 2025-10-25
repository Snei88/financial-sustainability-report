import React from 'react';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';
import { Landmark, Users, Briefcase, Scale, Building, Handshake, Accessibility, HandHelping, PersonStanding, Sun } from 'lucide-react';

/**
 * GeneralContext.tsx
 * Sección que resume el contexto general y económico utilizado en el dashboard.
 * Contiene explicaciones conceptuales (texto) y una tabla comparativa de ingreso percápita.
 */

/**
 * Función auxiliar para formatear números según la localización 'es-CO' (miles sin decimales).
 */
const formatNumber = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
        maximumFractionDigits: 0
    }).format(value);
};

// Encabezados y filas de ejemplo para la tabla de ingreso per cápita
const perCapitaHeaders = ["Ciudad", "Presupuesto (2025) (Millones COP)", "Habitantes (2025)", "$ por habitante"];
const perCapitaRows = [
    ["Bogotá", formatNumber(38432743), formatNumber(8380801), formatNumber(4585808)],
    ["Medellín", formatNumber(10958243), formatNumber(2569007), formatNumber(4265556)],
    ["Cali", formatNumber(5887095), formatNumber(2946346), formatNumber(1998100)],
    ["Barranquilla", formatNumber(6722965), formatNumber(1239804), formatNumber(5422603)],
];

/**
 * GeneralContext - componente funcional
 * - Renderiza un título principal, varias tarjetas de estadísticas y una tabla comparativa.
 * - Está pensado como sección estática/presentacional dentro del dashboard.
 */
export const GeneralContext: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gradient mb-8">Contexto General y Económico</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 space-y-8">
                    {/* Tarjeta explicativa sobre el rol del sector público */}
                    <StatCard title="El Papel del Sector Público">
                        <div className="flex items-start space-x-4">
                            <Scale className="text-purple-500 flex-shrink-0 mt-1" size={32} />
                            <div>
                                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                    <li>En una economía de dos sectores (familias y empresas), los precios de mercado de servicios básicos como salud y educación no son asequibles para todas las familias.</li>
                                    <li>El sector público nace para garantizar el acceso universal a estos servicios esenciales.</li>
                                    <li>Para lograrlo, se subsidian los estratos socioeconómicos 1, 2 y 3.</li>
                                    <li>El estado actua como gestor, inversor y regulador de la economia, con el proposito de garantizar sostenibilidad social, ambiental y economica.</li>
                                </ul>
                            </div>
                        </div>
                    </StatCard>

                    {/* Tabla comparativa: ingreso per cápita por ciudad (datos de ejemplo) */}
                    <DataTable title="Ingreso Percápita Comparativo (2025)" headers={perCapitaHeaders} rows={perCapitaRows} />
                </div>

                <div className="lg:col-span-2">
                     {/* Tarjeta visual que representa relaciones entre actores (familias, empresas, estado) */}
                     <StatCard title="El Estado y las Finanzas Públicas">
                        <div className="relative h-[450px] flex items-center justify-center">
                            <div className="absolute w-48 h-48 bg-red-400/30 rounded-full top-10 left-4"></div>
                            <div className="absolute w-48 h-48 bg-blue-400/30 rounded-full top-10 right-4"></div>
                            <div className="absolute w-48 h-48 bg-green-400/30 rounded-full bottom-10"></div>
                            
                            <div className="absolute top-20 left-10 text-center">
                                <Users size={32} className="mx-auto text-red-700"/>
                                <p className="font-semibold text-sm">Familias</p>
                            </div>
                            <div className="absolute top-20 right-10 text-center">
                                <Building size={32} className="mx-auto text-blue-700"/>
                                <p className="font-semibold text-sm">Empresas</p>
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 p-3 bg-white/50 backdrop-blur-sm rounded-full">
                                <Landmark size={40} className="mx-auto text-gray-800"/>
                                <p className="font-bold text-xs">ESTADO</p>
                                <p className="text-xs">Regulador</p>
                                <p className="text-xs">Distribuidor</p>
                                <p className="text-xs">Inversor</p>
                            </div>
                             <div className="absolute top-[130px] left-1/2 transform -translate-x-1/2 text-center">
                               <Handshake size={28} className="mx-auto text-cyan-600" />
                            </div>
                             <div className="absolute bottom-[160px] left-[70px] text-center">
                               <Accessibility size={28} className="mx-auto text-purple-600" />
                               <p className="font-semibold text-xs text-purple-700">Oportunidades<br/>Equitativas</p>
                            </div>
                             <div className="absolute bottom-[160px] right-[70px] text-center">
                               <HandHelping size={28} className="mx-auto text-emerald-600" />
                                <p className="font-semibold text-xs text-emerald-700">Responsabilidad<br/>Social</p>
                            </div>
                             <div className="absolute bottom-16 text-center">
                                <div className="flex justify-center items-center gap-2">
                                  <PersonStanding size={24} className="text-orange-600"/>
                                  <Sun size={20} className="text-orange-500" />
                                </div>
                                <p className="font-semibold text-xs text-orange-700 mt-5">Desarrollo - Sostenibilidad<br/>Social, Ambiental y Económica</p>
                            </div>
                        </div>
                    </StatCard>
                </div>
            </div>

            <div className="mt-8">
                <StatCard title="Visión Estratégica del Distrito">
                    <p className="text-gray-600">
                        El plan financiero del Distrito de Santiago de Cali se fundamenta en principios de sostenibilidad fiscal, eficiencia en el gasto y fortalecimiento de los ingresos propios. Las proyecciones macroeconómicas favorables, junto con una gestión prudente de la deuda, sientan las bases para un crecimiento sostenido y una mayor capacidad de inversión en proyectos estratégicos que impulsen el desarrollo social y económico de la ciudad.
                    </p>
                </StatCard>
            </div>
        </div>
    );
}