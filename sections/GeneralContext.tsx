import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import {
  Scale, TrendingUp, Info, Lightbulb, BarChart3, ZoomIn, X
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Label, LabelList, Cell
} from 'recharts';

// Importaciones de imágenes
import diagramaImg from '../assets/imagen.png';
import diagramaImg2 from '../assets/imagen2.jpeg';
import diagramaImg3 from '../assets/imagen3.jpeg';
import diagramaImg4 from '../assets/imagen4.jpeg';

export const GeneralContext = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const openImage = (src, alt) => {
    setModalSrc(src);
    setModalAlt(alt);
    setModalOpen(true);
  };

  const closeImage = () => setModalOpen(false);

  // Datos para el gráfico de ingreso per cápita
  const data = [
    { ciudad: 'Bogotá', perCapita: 4.58 },
    { ciudad: 'Medellín', perCapita: 4.21 },
    { ciudad: 'Cali', perCapita: 2.58 },
    { ciudad: 'Barranquilla', perCapita: 5.17 },
  ];

  const barColors = ['#BFDBFE', '#A7F3FC', '#A7F3D0', '#D9F99D'];

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Título Principal */}
      <h2 className="text-3xl font-bold mb-6 text-[#0A2A6A]">
        Contexto General y Económico
      </h2>

      {/* Síntesis - Card Destacada */}
      <div className="mb-6">
        <StatCard title="Síntesis – Evaluación Fiscal del Distrito de Santiago de Cali">
          <div className="text-gray-700 space-y-3 text-sm leading-relaxed">
            <p>
              El Distrito cumple con los límites establecidos en la Ley 617 de 2000, la Ley 358 de 1997 
              y la Ley 819 de 2003, manteniendo una calificación de riesgo favorable que le ha permitido 
              acceder a nuevos cupos de endeudamiento. Sin embargo, este desempeño debe asumirse como un 
              punto de inflexión que exige mayor disciplina fiscal.
            </p>
            <p>
              Se observan alertas de sostenibilidad derivadas de la desaceleración de los ingresos 
              estructurales, el incremento del servicio de la deuda y las presiones por pasivos pensionales 
              y judiciales. Se recomienda fortalecer el recaudo propio, optimizar el gasto corriente y 
              reforzar la gestión de riesgos fiscales para preservar la solvencia y sostenibilidad 
              financiera del Distrito.
            </p>
          </div>
        </StatCard>
      </div>

      {/* Sección Superior: Papel del Sector Público y Diagrama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Columna Izquierda - Papel del Sector Público (Texto) */}
        <div className="lg:col-span-2">
          <StatCard title="El Papel del Sector Público">
            <div className="text-gray-700 text-sm leading-relaxed">
              <p>
                Además de garantizar el equilibrio presupuestal, la entidad territorial presenta retos 
                importantes como: la Transición a Cali Distrito, la Financiación de Proyectos Regionales 
                dentro del alcance de la AMSO, así como garantizar las Vigencias Futuras para el Tren de 
                Cercanías y honrar el servicio de la deuda por lo que debe garantizar flujos futuros de 
                ICLD suficientes para ser Sostenible Fiscal y Financieramente.
              </p>
            </div>
          </StatCard>
        </div>

        {/* Columna Derecha - Diagrama Estado */}
        <div>
          <StatCard title="El Estado y las Finanzas Públicas">
            <div className="relative flex justify-center items-center">
              <img
                src={diagramaImg}
                alt="Diagrama El Estado y las Finanzas Públicas"
                className="rounded-lg shadow-sm border border-gray-200 w-full h-auto max-h-[200px] object-contain"
                loading="lazy"
              />
              <button
                onClick={() => openImage(diagramaImg, 'El Estado y las Finanzas Públicas')}
                className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow transition-all"
                aria-label="Ampliar imagen"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </StatCard>
        </div>
      </div>

      {/* Principales Hallazgos y Riesgo Fiscal - Lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Principales Hallazgos */}
        <div>
          <StatCard title="Principales Hallazgos">
            <div className="relative flex justify-center items-center">
              <img
                src={diagramaImg4}
                alt="Principales Hallazgos"
                className="rounded-lg shadow-sm border border-gray-200 w-full h-auto max-h-[320px] object-contain"
                loading="lazy"
              />
              <button
                onClick={() => openImage(diagramaImg4, 'Principales Hallazgos')}
                className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow transition-all"
                aria-label="Ampliar imagen"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </StatCard>
        </div>

        {/* Riesgo Fiscal */}
        <div>
          <StatCard title="Riesgo Fiscal en Cali: De la Estabilidad a una Alta Exposición">
            <div className="relative flex justify-center items-center">
              <img
                src={diagramaImg3}
                alt="Riesgo Fiscal en Cali"
                className="rounded-lg shadow-sm border border-gray-200 w-full h-auto max-h-[320px] object-contain"
                loading="lazy"
              />
              <button
                onClick={() => openImage(diagramaImg3, 'Riesgo Fiscal en Cali')}
                className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow transition-all"
                aria-label="Ampliar imagen"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </StatCard>
        </div>
      </div>

      {/* Finanzas Eficientes y Gestión de Recursos - Lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Finanzas Eficientes */}
        <div>
          <StatCard title="Finanzas Eficientes y Sostenibles">
            <p className="text-gray-700 text-sm leading-relaxed">
              La Sostenibilidad Fiscal para Gestión Eficiente de Recursos requiere finanzas equilibradas 
              con una buena gestión tributaria, eficiencia en el gasto. La estabilidad en el mediano plazo 
              implica una gestión eficiente de las fuentes de financiación incluidos los recursos del crédito. 
              Para lograr avanzar en términos de sostenibilidad se requiere robustecer la capacidad de 
              inversión de proyectos estratégicos para la ciudad.
            </p>
          </StatCard>
        </div>

        {/* Gestión Eficiente de Recursos */}
        <div>
          <StatCard title="Gestión Eficiente de Recursos">
            <div className="relative flex justify-center items-center">
              <img
                src={diagramaImg2}
                alt="Gestión Eficiente de Recursos"
                className="rounded-lg shadow-sm border border-gray-200 w-full h-auto max-h-[280px] object-contain"
                loading="lazy"
              />
              <button
                onClick={() => openImage(diagramaImg2, 'Gestión Eficiente de Recursos')}
                className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow transition-all"
                aria-label="Ampliar imagen"
              >
                <ZoomIn size={16} />
              </button>
            </div>
          </StatCard>
        </div>
      </div>

      {/* Sección Inferior: Papel del Sector Público (Lista), Gráfico y Tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Papel del Sector Público - Lista */}
        <div>
          <StatCard title="El Papel del Sector Público">
            <div className="flex items-start space-x-3">
              <Scale className="text-purple-600 flex-shrink-0 mt-0.5" size={24} />
              <ul className="list-disc pl-4 space-y-2 text-gray-700 text-sm leading-relaxed">
                <li>
                  En una economía de dos sectores (familias y empresas), los precios de servicios básicos 
                  como salud y educación pueden no ser asequibles para todos.
                </li>
                <li>
                  El sector público garantiza el acceso universal a servicios esenciales.
                </li>
                <li>
                  Para ello, subsidia a los estratos 1, 2 y 3, priorizando la equidad.
                </li>
                <li>
                  El Estado actúa como gestor, inversor y regulador para asegurar sostenibilidad social, 
                  ambiental y económica.
                </li>
              </ul>
            </div>
          </StatCard>
        </div>

        {/* Gráfico de Ingreso Per Cápita */}
        <div>
          <StatCard title="Ingreso Per Cápita Principales Ciudades (2025)">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 15, left: 5, bottom: 15 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis
                    dataKey="ciudad"
                    tickLine={false}
                    axisLine={{ stroke: '#93C5FD' }}
                    tick={{ fill: '#374151', fontSize: 11 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={{ stroke: '#93C5FD' }}
                    tick={{ fill: '#374151', fontSize: 10 }}
                    tickFormatter={(v) => `$${v.toFixed(1)}`}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(59,130,246,0.08)' }}
                    formatter={(v) => [`$${v.toFixed(2)}M`, 'Per Cápita']}
                    labelFormatter={(l) => `${l}`}
                    contentStyle={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '12px' }}
                  />
                  <Bar dataKey="perCapita" radius={[6, 6, 0, 0]}>
                    <LabelList
                      dataKey="perCapita"
                      position="top"
                      formatter={(v) => `$${v.toFixed(2)}`}
                      style={{ fill: '#1F2937', fontWeight: 600, fontSize: 11 }}
                      offset={8}
                    />
                    {data.map((d, i) => (
                      <Cell key={d.ciudad} fill={barColors[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </StatCard>
        </div>

        {/* Tendencia Fiscal y Hallazgos Clave */}
        <div>
          <StatCard title="Tendencia Fiscal y Hallazgos Clave">
            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex items-start space-x-2">
                <TrendingUp className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="leading-relaxed">
                  Los ingresos crecen ~5% anual con estabilidad pero sin innovación tributaria.
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <Info className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="leading-relaxed">
                  En 2026 se observa un salto por ajustes contables o estimaciones optimistas.
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <Lightbulb className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="leading-relaxed">
                  Patrón lineal y predecible, con baja autonomía fiscal.
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <BarChart3 className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="leading-relaxed">
                  <strong>Interpretación:</strong> crecimiento moderado, alta dependencia y baja capacidad 
                  de ajuste. Se recomienda fortalecer el esfuerzo fiscal local.
                </p>
              </div>
            </div>
          </StatCard>
        </div>
      </div>

      {/* Modal para Ampliar Imágenes */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={closeImage}
        >
          <div className="relative max-w-[95vw] max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={modalSrc}
              alt={modalAlt}
              className="block rounded-lg shadow-2xl max-w-full max-h-[95vh] object-contain"
            />
            <button
              onClick={closeImage}
              className="absolute -top-3 -right-3 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all"
              aria-label="Cerrar imagen"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};