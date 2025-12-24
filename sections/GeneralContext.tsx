import React, { useState } from 'react';
import { StatCard } from '../components/StatCard';
import {
  Landmark, Users, Scale,
  DollarSign, TrendingUp, PiggyBank, Briefcase, ZoomIn,
  Info, Lightbulb, BarChart as BarChartIcon
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Label, LabelList, Cell
} from 'recharts';

//  IMPORTA la imagen desde /assets (ruta relativa desde /sections)
import diagramaImg from '../assets/imagen.png';
import diagramaImg2 from '../assets/imagen2.jpeg';
import diagramaImg3 from '../assets/imagen3.jpeg';
import diagramaImg4 from '../assets/imagen4.jpeg';
import diagramaImg5 from '../assets/imagen5.png';
import diagramaImg6 from '../assets/imagen6.jpeg';


/** Formatea con 1 decimal y agrega " B" (billones) */
const formatWithB = (value: number) => `${value.toFixed(1)} B`;

/** Formatea números es-CO sin decimales (cuando se requiera) */
const formatNumber = (value: number) =>
  new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(value);

export const GeneralContext: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const openImage = (src: string, alt: string) => {
    setModalSrc(src);
    setModalAlt(alt);
    setModalOpen(true);
  };

  const closeImage = () => setModalOpen(false);

  // Datos base (billones y millones expresados como números ya escalados)
  const data = [
    { ciudad: 'Bogotá',       icon: <DollarSign size={18} color="#1D4ED8" />, presupuesto: 38.4, habitantes: 8.4, perCapita: 4.58 },
    { ciudad: 'Medellín',     icon: <TrendingUp size={18} color="#0D9488" />, presupuesto: 11.0, habitantes: 2.6, perCapita: 4.21 },
    { ciudad: 'Cali',         icon: <PiggyBank size={18} color="#10B981" />, presupuesto: 5.9,  habitantes: 2.3, perCapita: 2.58 },
    { ciudad: 'Barranquilla', icon: <Briefcase size={18} color="#65A30D" />, presupuesto: 6.9,  habitantes: 2.4, perCapita: 5.17 },
  ];

  return (
    <div>
      {/* Título azul profesional */}
      <h2 className="text-3xl font-bold mb-8 text-[#0A2A6A]">
        Contexto General y Económico
      </h2>

      {/* Síntesis – Evaluación Fiscal del Distrito de Santiago de Cali (introducción) */}
      <div className="mb-6">
        <StatCard title="Síntesis – Evaluación Fiscal del Distrito de Santiago de Cali">
          <div className="text-gray-700 space-y-3">
            <p>
              El Distrito cumple con los límites establecidos en la Ley 617 de 2000, la Ley 358 de 1997 y la Ley 819 de 2003, manteniendo una calificación de riesgo favorable que le ha permitido acceder a nuevos cupos de endeudamiento. Sin embargo, este desempeño debe asumirse como un punto de inflexión que exige mayor disciplina fiscal.
            </p>

            <p>
              Se observan alertas de sostenibilidad derivadas de la desaceleración de los ingresos estructurales, el incremento del servicio de la deuda y las presiones por pasivos pensionales y judiciales. Se recomienda fortalecer el recaudo propio, optimizar el gasto corriente y reforzar la gestión de riesgos fiscales para preservar la solvencia y sostenibilidad financiera del Distrito.
            </p>
          </div>
        </StatCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* --- COLUMNA IZQUIERDA --- */}
        <div className="lg:col-span-3 space-y-8">
          {/* Reemplazo: texto descriptivo (donde estaba 'El Papel del Sector Público') */}
          <StatCard title="El Papel del Sector Público">
            <div className="text-gray-700 space-y-3">
               <p>
                 Además de garantizar el equilibrio presupuestal la entidad territorial presenta retos importantes como: la Transición a Cali Distrito, la Financiación de Proyectos Regionales dentro del alcance de la AMSO, así como garantizar las Vigencias Futuras para el Tren de Cercanías y honrar el servicio de la deuda por lo que debe garantizar flujos futuros de ICLD suficientes para ser Sostenible Fiscal y Financiera mente.
               </p>
             </div>
           </StatCard>

          {/* Reemplazo: imagen4 en el espacio donde estaba el gráfico de ingreso percápita */}
          <StatCard title="Principales Hallazgos">
            <div className="relative flex justify-center items-center">
              <img
                src={diagramaImg4}
                alt="Imagen 4 - Ingreso Percápita sustituta"
                className="rounded-xl shadow-md border border-gray-200 max-h-[900px] object-contain w-full"
                loading="lazy"
              />
              <button
                onClick={() => openImage(diagramaImg4, 'Imagen Ingreso Percápita')}
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow"
                aria-label="Ampliar imagen"
              >
                <ZoomIn size={18} />
              </button>
            </div>
          </StatCard>
        </div>

        {/* --- COLUMNA DERECHA --- */}
        <div className="lg:col-span-2">
          {/* Imagen (importada) en lugar del SVG */}
          <StatCard title="El Estado y las Finanzas Públicas">
            <div className="relative flex justify-center items-center">
              <img
                src={diagramaImg}                 // 👈 usa la importación (funciona en Vercel)
                alt="Diagrama El Estado y las Finanzas Públicas"
                className="rounded-xl shadow-md border border-gray-200 max-h-[270px] object-contain w-full"
                loading="lazy"
              />
              <button
                onClick={() => openImage(diagramaImg, 'Diagrama El Estado y las Finanzas Públicas')}
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow"
                aria-label="Ampliar imagen"
              >
                <ZoomIn size={18} />
              </button>
            </div>
          </StatCard>

          {/* Separación visual reducida entre las dos tarjetas en la columna derecha */}
          <div className="mt-4" />

          {/* Bloque duplicado solicitado: imagen2.jpeg y título 'Riesgo Fiscal en Cali de la Estabilidad a una Alta Exposición' */}
          <StatCard title="Riesgo Fiscal en Cali de la Estabilidad a una Alta Exposición">
            <div className="relative flex justify-center items-center">
              <img
                src={diagramaImg3}
                alt="Diagrama Riesgo Fiscal en Cali de la Estabilidad a una Alta Exposicións"
                className="rounded-xl shadow-md border border-gray-200 max-h-[500px] object-contain"
                loading="lazy"
              />
              <button
                onClick={() => openImage(diagramaImg3, 'Diagrama Riesgo Fiscal en Cali')}
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow"
                aria-label="Ampliar imagen"
              >
                <ZoomIn size={18} />
              </button>
            </div>
          </StatCard>
        </div>
      </div>

      {/* --- VISIÓN ESTRATÉGICA --- */}
      <div className="mt-8">
        <StatCard title="Finanzas eficientes y sostenibles.">
          <p className="text-gray-700">
            La Sostenibilidad Fiscal para Gestión Eficiente de Recursos requiere finanzas equilibradas con una buena gestión tributaria, eficiencia en el gasto. La estabilidad en el mediano plazo implica una gestión eficiente de las fuentes de financiación incluidos los recursos del crédito. Para lograr avanzar en términos de sostenibilidad se requiere robustecer la capacidad de inversión de proyectos estratégicos para la ciudad.
          </p>
        </StatCard>
      </div>

      {/* Imagen grande solicitada: debajo de Finanzas eficientes y sostenibles. */}
      <div className="mt-6">
        <StatCard title="Gestión Eficiente de Recursos">
            <div className="relative flex justify-center items-center">
              <img
                src={diagramaImg2}
                alt="Diagrama Gestión Eficiente de Recursos - grande"
                className="rounded-xl shadow-lg border border-gray-200 w-full max-h-[700px] object-cover"
                loading="lazy"
              />
              <button
                onClick={() => openImage(diagramaImg2, 'Gestión Eficiente de Recursos')}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-700 rounded-full p-3 shadow-lg"
                aria-label="Ampliar imagen"
              >
                <ZoomIn size={20} />
              </button>
            </div>
        </StatCard>
      </div>

      {/* Componentes movidos: 'El Papel del Sector Público' (lista) y 'Ingreso Percápita' (gráfico) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <StatCard title="El Papel del Sector Público">
            <div className="flex items-start space-x-4">
              <Scale className="text-purple-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>En una economía de dos sectores (familias y empresas), los precios de servicios básicos como salud y educación pueden no ser asequibles para todos.</li>
                  <li>El sector público garantiza el acceso universal a servicios esenciales.</li>
                  <li>Para ello, subsidia a los estratos 1, 2 y 3, priorizando la equidad.</li>
                  <li>El Estado actúa como gestor, inversor y regulador para asegurar sostenibilidad social, ambiental y económica.</li>
                </ul>
              </div>
            </div>
          </StatCard>
          
        <div className="my-8" /> {/* ← separador */}

          {/* Como se financia el estado */}
          <StatCard title="Como se financia el estado">
            <div className="relative flex justify-center items-center">
              <img
                src={diagramaImg5}
                alt="Como se financia el estado"
                className="rounded-xl shadow-md border border-gray-200 max-h-[420px] object-contain w-full"
                loading="lazy"
              />
              <button
                onClick={() => openImage(diagramaImg5, 'Como se financia el estado')}
                className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow"
                aria-label="Ampliar imagen Como se financia el estado"
              >
                <ZoomIn size={18} />
              </button>
            </div>
          </StatCard>
        </div>

        <div>
          <StatCard title="Ingreso Percápita de las Principales Ciudades de Colombia (2025)">
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.map(d => ({ name: d.ciudad, perCapita: d.perCapita, icon: d.icon }))}
                  margin={{ top: 30, right: 20, left: 8, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={{ stroke: '#93C5FD' }}
                    tick={{ fill: '#374151', fontSize: 12 }}
                  >
                    <Label value="Ciudad" offset={10} position="bottom" />
                  </XAxis>
                  <YAxis
                    tickLine={false}
                    axisLine={{ stroke: '#93C5FD' }}
                    tick={{ fill: '#374151', fontSize: 12 }}
                    tickFormatter={(v: number) => `${v.toFixed(2)}$`}
                  >
                    <Label
                      value="Ingreso Percápita"
                      angle={-90}
                      position="insideLeft"
                      offset={-2}
                      style={{ fill: '#374151' }}
                    />
                  </YAxis>

                  <Tooltip
                    cursor={{ fill: 'rgba(59,130,246,0.08)' }}
                    formatter={(v: number) => [`${v.toFixed(2)}$`, 'Ingreso Percápita']}
                    labelFormatter={(l) => `Ciudad: ${l}`}
                  />

                  <Bar dataKey="perCapita" radius={[6, 6, 0, 0]}>
                    {/* Iconos removidos: se eliminó el LabelList que mostraba íconos encima de las barras */}
                    <LabelList
                      dataKey="perCapita"
                      position="top"
                      formatter={(v: number) => `${v.toFixed(2)}$`}
                      style={{ fill: '#1F2937', fontWeight: 600 }}
                      offset={20}
                    />
                    {data.map((d, i) => (
                      <Cell
                        key={d.ciudad}
                        fill={['#BFDBFE', '#A7F3FC', '#A7F3D0', '#D9F99D'][i % 4]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </StatCard>

          <div className="my-8" /> {/* ← separador */}


          <StatCard title="Tendencia Fiscal y Hallazgos Clave">
            <div className="space-y-5 text-gray-700">
              <div className="flex items-start space-x-3">
                <TrendingUp className="text-blue-500 mt-1" />
                <p>
                  Los ingresos crecen de forma sostenida (~5% anual), mostrando
                  estabilidad pero sin innovación tributaria ni nuevas fuentes de
                  recaudo.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <Info className="text-orange-500 mt-1" />
                <p>
                  En 2026 se observa un salto inusual en las proyecciones,
                  principalmente por ajustes contables o estimaciones optimistas.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <Lightbulb className="text-yellow-500 mt-1" />
                <p>
                  El patrón es lineal y predecible, con baja autonomía fiscal y sin
                  evidencia de políticas diferenciales o diversificación económica.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <BarChartIcon className="text-green-500 mt-1" />
                <p>
                  <strong>Interpretación:</strong> crecimiento moderado, alta
                  dependencia de transferencias y baja capacidad de ajuste ante
                  choques. Se recomienda fortalecer el esfuerzo fiscal local y
                  diversificar ingresos sostenibles.
                </p>
              </div>
            </div>
          </StatCard>
        </div>
      </div>
      {/* Modal para mostrar imagen en grande */}
      {/* Imagen6: componente adicional en la parte inferior */}
      <div className="mt-6">
        <StatCard title="Imagen 6 - Complementaria">
          <div className="relative flex justify-center items-center">
            <img
              src={diagramaImg6}
              alt="Imagen 6 complemento"
              className="rounded-xl shadow-md border border-gray-200 w-full max-h-[500px] object-contain"
              loading="lazy"
            />
            <button
              onClick={() => openImage(diagramaImg6, 'Imagen 6 complemento')}
              className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow"
              aria-label="Ampliar imagen 6"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </StatCard>
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={closeImage}
        >
          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', height: '100%' }}
          >
            <div className="relative" style={{ maxWidth: '95vw', maxHeight: '95vh' }}>
              <img
                src={modalSrc}
                alt={modalAlt}
                className="block rounded-lg shadow-2xl"
                style={{
                  maxWidth: '95vw',
                  maxHeight: '95vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />

              <button
                onClick={closeImage}
                className="absolute -top-3 -right-3 bg-white/90 rounded-full p-2 shadow"
                aria-label="Cerrar imagen"
              >
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
