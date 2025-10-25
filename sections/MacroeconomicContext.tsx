import React from 'react';
import { StatCard } from '../components/StatCard';
import { TrendingUp, Building, Users, Ship, Anchor, Droplets, Smile, Briefcase, Percent, UserMinus, Calendar } from 'lucide-react';

/**
 * MacroeconomicContext.tsx
 * Sección que muestra indicadores macroeconómicos clave del distrito (ej.: crecimiento, desempleo, inflación).
 * Está compuesta por varias tarjetas (`StatCard`) que presentan cifras y breves explicaciones.
 */
export const MacroeconomicContext: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-[#0A2A6A]">Panorama Economico Distrito de Santiago de Cali</h2>

            {/* Fila principal con indicadores clave: crecimiento, desempleo e inflación */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <StatCard title="Crecimiento Económico">
                    <div className="flex items-center space-x-4">
                        <TrendingUp className="text-green-500" size={48} />
                        <div>
                            <p className="text-5xl font-bold text-green-600">+3,4%</p>
                            <p className="text-gray-500 mt-1">Iguala el promedio histórico y supera la media nacional (+2.5%).</p>
                        </div>
                    </div>
                </StatCard>
                
                <StatCard title="Tasa de Desempleo Histórica">
                     <div className="flex items-center space-x-4">
                        <UserMinus className="text-blue-500" size={48} />
                        <div>
                            <p className="text-5xl font-bold text-blue-600">7,8%</p>
                            <p className="text-gray-500 mt-1">La más baja en 19 años (vs. 10.9% en 2023 y 11.2% en 2024).</p>
                        </div>
                    </div>
                </StatCard>

                <StatCard title="Inflación Controlada">
                    <div className="flex items-center space-x-4">
                        <Percent className="text-purple-500" size={48} />
                        <div>
                           <p className="text-5xl font-bold text-purple-600">4,7%</p>
                           <p className="text-gray-500 mt-1">Continúa descendiendo y se ubica por debajo de la variación nacional (5.1%).</p>
                        </div>
                    </div>
                </StatCard>
            </div>
            
            {/* Sección sobre sectores que impulsan el crecimiento */}
            <div className="mt-8">
                <StatCard title="Motores del Crecimiento Económico">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-start space-x-3">
                            <Building className="text-green-500 mt-1" size={24}/>
                            <div>
                                <h4 className="font-bold">Construcción</h4>
                                <p className="text-2xl font-semibold text-green-600">+13,9%</p>
                                <p className="text-sm text-gray-500">en licencias de construcción.</p>
                            </div>
                        </div>
                         <div className="flex items-start space-x-3">
                            <Users className="text-green-500 mt-1" size={24}/>
                            <div>
                                <h4 className="font-bold">Turismo</h4>
                                <p className="text-2xl font-semibold text-green-600">+3,5%</p>
                                <p className="text-sm text-gray-500">en ocupación hotelera, con aumento de turistas extranjeros (+20.4% Jul, +13.8% Ago).</p>
                            </div>
                        </div>
                         <div className="flex items-start space-x-3">
                            <Smile className="text-green-500 mt-1" size={24}/>
                            <div>
                                <h4 className="font-bold">Consumo</h4>
                                <p className="text-2xl font-semibold text-green-600">+11,9%</p>
                                <p className="text-sm text-gray-500">en el Índice de Confianza del Consumidor y +20.4% en matrículas de vehículos.</p>
                            </div>
                        </div>
                         <div className="flex items-start space-x-3">
                            <Ship className="text-green-500 mt-1" size={24}/>
                            <div>
                                <h4 className="font-bold">Exportaciones</h4>
                                <p className="text-2xl font-semibold text-green-600">+7,9%</p>
                                <p className="text-sm text-gray-500">en Cali y Yumbo (azúcares, farmacéuticos, etc.).</p>
                            </div>
                        </div>
                    </div>
                </StatCard>
            </div>

            {/* Análisis general resumido */}
            <div className="mt-8">
                <StatCard title="Análisis General">
                    <p>El segundo trimestre de 2025 muestra una economía distrital robusta y en sólida recuperación, con una trayectoria de crecimiento que iguala su promedio histórico. El dinamismo se apoya en múltiples sectores, destacando la construcción, el turismo y un fuerte consumo interno. La moderación de la inflación y las cifras históricas de empleo refuerzan la perspectiva positiva, posicionando a Cali con un desempeño económico superior al promedio nacional y confirmando la recuperación de su actividad productiva este año.</p>
                </StatCard>
            </div>
        </div>
    );
}