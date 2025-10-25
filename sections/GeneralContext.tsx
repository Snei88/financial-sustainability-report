import React from 'react';
import { StatCard } from '../components/StatCard';
import {
  Landmark, Users, Scale,
  DollarSign, TrendingUp, PiggyBank, Briefcase
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Label, LabelList, Cell
} from 'recharts';

/** Formatea con 1 decimal y agrega " B" (billones) */
const formatWithB = (value: number) => `${value.toFixed(1)} B`;

/** Formatea números es-CO sin decimales (cuando se requiera) */
const formatNumber = (value: number) =>
  new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(value);

export const GeneralContext: React.FC = () => {
  // Datos base (billones y millones expresados como números ya escalados)
  const data = [
    { ciudad: 'Bogotá',       icon: <DollarSign size={18} color="#1D4ED8" />, presupuesto: 38.4, habitantes: 8.4, perCapita: 4.58 },
    { ciudad: 'Medellín',     icon: <TrendingUp size={18} color="#0D9488" />, presupuesto: 11.0, habitantes: 2.6, perCapita: 4.21 },
    { ciudad: 'Cali',         icon: <PiggyBank size={18} color="#10B981" />, presupuesto: 5.9,  habitantes: 2.3, perCapita: 2.58 },
    { ciudad: 'Barranquilla', icon: <Briefcase size={18} color="#65A30D" />, presupuesto: 6.9,  habitantes: 2.4, perCapita: 5.17 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gradient mb-8">
        Contexto General y Económico
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* --- COLUMNA IZQUIERDA --- */}
        <div className="lg:col-span-3 space-y-8">
          {/* Tarjeta explicativa */}
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

          {/* --- GRÁFICO DE INGRESO PERCÁPITA --- */}
          <StatCard title="Ingreso Percápita de las Principales Ciudades de Colombia (2025)">
            <div className="h-[380px]">
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
                    <LabelList
                      dataKey="icon"
                      position="top"
                      content={(props) => {
                        const { x, y, value } = props;
                        if (x == null || y == null) return null;
                        return (
                          <foreignObject x={x + 8} y={y - 30} width={30} height={30}>
                            <div className="flex items-center justify-center">{value}</div>
                          </foreignObject>
                        );
                      }}
                    />
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
        </div>

        {/* --- COLUMNA DERECHA --- */}
        <div className="lg:col-span-2">
          {/* Aquí reemplazamos el SVG por la imagen */}
          <StatCard title="El Estado y las Finanzas Públicas">
            <div className="flex justify-center items-center">
              <img
                src="/assets/imagen.png"
                alt="Diagrama El Estado y las Finanzas Públicas"
                className="rounded-xl shadow-md border border-gray-200 max-h-[500px] object-contain"
              />
            </div>
          </StatCard>
        </div>
      </div>

      {/* --- VISIÓN ESTRATÉGICA --- */}
      <div className="mt-8">
        <StatCard title="Visión Estratégica del Distrito">
          <p className="text-gray-700">
            La Sostenibilidad Fiscal para las entidades territoriales requiere finanzas equilibradas con una buena gestión tributaria, eficiencia en el gasto. La estabilidad en el mediano plazo implica una gestión eficiente de las fuentes de financiación incluidos los recursos del crédito. Para lograr avanzar en términos de sostenibilidad se requiere robustecer la capacidad de inversión de proyectos estratégicos para la ciudad.
          </p>
        </StatCard>
      </div>
    </div>
  );
};
