// src/sections/IncomeDashboard.tsx
import React from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { ChartCard } from '../components/ChartCard';

const nf = new Intl.NumberFormat('es-CO');
const formatNumber = (v: number) => nf.format(v);
const COLORS = ['#3b82f6', '#14b8a6', '#f97316', '#8b5cf6', '#ec4899', '#f59e0b', '#0ea5e9', '#10b981'];

/* =========  TUS 3 GRÁFICOS ORIGINALES  ========= */
const income2019_2024 = [
  { name: '2019', 'Ingresos Corrientes': 4668165, 'Ingresos Capital': 1257386 },
  { name: '2020', 'Ingresos Corrientes': 4644078, 'Ingresos Capital': 1221259 },
  { name: '2021', 'Ingresos Corrientes': 4595213, 'Ingresos Capital': 1168966 },
  { name: '2022', 'Ingresos Corrientes': 4642504, 'Ingresos Capital': 1252991 },
  { name: '2023', 'Ingresos Corrientes': 5132323, 'Ingresos Capital': 1343407 },
  { name: '2024', 'Ingresos Corrientes': 5494630, 'Ingresos Capital': 1229763 },
];

const currentIncomeBreakdown = [
  { name: '2019', 'Transferencias': 2165341, 'No tributarios': 410527, 'Tributario': 2092297 },
  { name: '2020', 'Transferencias': 2164866, 'No tributarios': 260136, 'Tributario': 2219075 },
  { name: '2021', 'Transferencias': 2126247, 'No tributarios': 244654, 'Tributario': 2224313 },
  { name: '2022', 'Transferencias': 2195104, 'No tributarios': 229973, 'Tributario': 2217427 },
  { name: '2023', 'Transferencias': 2515846, 'No tributarios': 239867, 'Tributario': 2376610 },
  { name: '2024', 'Transferencias': 2496186, 'No tributarios': 284193, 'Tributario': 2714251 },
];

const taxIncomeBreakdown = [
  { name: '2019', 'Predial': 535851, 'Ind. y Cio': 167639, 'Estampillas': 136681, 'Gasolina': 193534, 'Alumbrado': 246144, 'Otros': 0 },
  { name: '2020', 'Predial': 547109, 'Ind. y Cio': 156090, 'Estampillas': 104093, 'Gasolina': 201171, 'Alumbrado': 241948, 'Otros': 0 },
  { name: '2021', 'Predial': 0, 'Ind. y Cio': 0, 'Estampillas': 143978, 'Gasolina': 115780, 'Alumbrado': 203746, 'Otros': 226142 },
  { name: '2022', 'Predial': 0, 'Ind. y Cio': 0, 'Estampillas': 169664, 'Gasolina': 123378, 'Alumbrado': 221591, 'Otros': 224407 },
  { name: '2023', 'Predial': 0, 'Ind. y Cio': 0, 'Estampillas': 199683, 'Gasolina': 124741, 'Alumbrado': 231375, 'Otros': 288105 },
  { name: '2024', 'Predial': 0, 'Ind. y Cio': 0, 'Estampillas': 190169, 'Gasolina': 120962, 'Alumbrado': 249133, 'Otros': 283332 },
];

/* =========  NUEVOS 8 GRÁFICOS (tipo láminas)  ========= */
const capitalStack = [
  { name: '2019', Otros: 118470, Balance: 486120, Credito: 653909 },
  { name: '2020', Otros: 110791, Balance: 402525, Credito: 448452 },
  { name: '2021', Otros:  99880, Balance: 361860, Credito: 528920 },
  { name: '2022', Otros:  87100, Balance: 318641, Credito: 625938 },
  { name: '2023', Otros: 106803, Balance: 409513, Credito: 879828 },
  { name: '2024', Otros: 120481, Balance: 391323, Credito: 940783 },
];

const sgpBySector = [
  { name: '2019', Educacion: 813052, Salud: 402525, PropGeneral: 402525, APSB: 361860, AlimEscolar: 54630 },
  { name: '2020', Educacion: 853280, Salud: 394612, PropGeneral: 402525, APSB: 361860, AlimEscolar: 48000 },
  { name: '2021', Educacion: 841634, Salud: 417319, PropGeneral: 396853, APSB: 366264, AlimEscolar: 62000 },
  { name: '2022', Educacion: 798884, Salud: 417468, PropGeneral: 396853, APSB: 362264, AlimEscolar: 70000 },
  { name: '2023', Educacion: 794458, Salud: 517027, PropGeneral: 409765, APSB: 386765, AlimEscolar: 95000 },
  { name: '2024', Educacion: 945407, Salud: 517027, PropGeneral: 409765, APSB: 406803, AlimEscolar: 106803 },
];

const transferencias = [
  { name: '2019', SGP: 1390824, OtrasNac: 538497, Deptal: 102978 },
  { name: '2020', SGP: 1407360, OtrasNac: 664664, Deptal: 129029 },
  { name: '2021', SGP: 1407546, OtrasNac: 633401, Deptal: 149028 },
  { name: '2022', SGP: 1321215, OtrasNac: 792170, Deptal: 170942 },
  { name: '2023', SGP: 1330833, OtrasNac: 998646, Deptal: 213131 },
  { name: '2024', SGP: 1602386, OtrasNac: 1063416, Deptal: 216680 },
];

const noTributarios = [
  { name: '2019', Valorizacion: 27407, Especial: 33260, Intereses: 126659, Transito: 75309, Cuota: 15564, Convenios: 17000, Otros: 117251 },
  { name: '2020', Valorizacion: 18730, Especial: 32572, Intereses: 39679, Transito: 57281, Cuota: 15341, Convenios: 20000, Otros: 68334 },
  { name: '2021', Valorizacion:  9854, Especial: 32521, Intereses: 28112, Transito: 65263, Cuota: 13803, Convenios: 30888, Otros: 74209 },
  { name: '2022', Valorizacion:  4614, Especial: 25317, Intereses: 34649, Transito: 49310, Cuota: 13405, Convenios: 10353, Otros: 92624 },
  { name: '2023', Valorizacion:  1115, Especial: 34454, Intereses: 51598, Transito: 43761, Cuota: 12258, Convenios: 12271, Otros: 84710 },
  { name: '2024', Valorizacion:   977, Especial: 24138, Intereses: 72651, Transito: 71833, Cuota: 13654, Convenios: 10989, Otros: 90151 },
];

const estampillas = [
  { name: '2019', Justicia:  8700, AdultoMayor: 33000, ProCultura: 46644, ProdUrbano: 108753 },
  { name: '2020', Justicia: 10301, AdultoMayor: 29066, ProCultura: 39860, ProdUrbano: 101791 },
  { name: '2021', Justicia:  9967, AdultoMayor: 20046, ProCultura: 36861, ProdUrbano:  85912 },
  { name: '2022', Justicia:  8711, AdultoMayor: 20046, ProCultura: 36861, ProdUrbano:  96262 },
  { name: '2023', Justicia:  8711, AdultoMayor: 38741, ProCultura: 38641, ProdUrbano: 114040 },
  { name: '2024', Justicia:  8711, AdultoMayor: 33000, ProCultura: 46644, ProdUrbano: 108753 },
];

const gasolina = [
  { name: '2019', Recaudo: 136681 },
  { name: '2020', Recaudo: 104093 },
  { name: '2021', Recaudo: 115780 },
  { name: '2022', Recaudo: 123378 },
  { name: '2023', Recaudo: 124741 },
  { name: '2024', Recaudo: 120962 },
];

const industriaComercio = [
  { name: '2019', Avisos: 91624, CompAvisos: 32753, Sanciones: 14672, IndCio: 600601, CapitalIndCio: 118473 },
  { name: '2020', Avisos: 53651, CompAvisos: 45263, Sanciones: 12027, IndCio: 547109, CapitalIndCio: 101791 },
  { name: '2021', Avisos: 45330, CompAvisos: 32990, Sanciones: 11023, IndCio: 528920, CapitalIndCio:  85912 },
  { name: '2022', Avisos: 52920, CompAvisos: 20046, Sanciones: 12027, IndCio: 625938, CapitalIndCio:  96262 },
  { name: '2023', Avisos: 108367, CompAvisos: 38741, Sanciones: 21030, IndCio: 940783, CapitalIndCio: 114040 },
  { name: '2024', Avisos:  94948, CompAvisos: 31657, Sanciones: 19836, IndCio: 990948, CapitalIndCio: 108753 },
];

const predial = [
  { name: '2019', Corriente: 535851, AmbientalBomberil: 118473, Alumbrado: 246144, Capital: 19883 },
  { name: '2020', Corriente: 547109, AmbientalBomberil: 101791, Alumbrado: 241948, Capital: 19783 },
  { name: '2021', Corriente: 528920, AmbientalBomberil:  85912, Alumbrado: 203746, Capital: 14582 },
  { name: '2022', Corriente: 625938, AmbientalBomberil:  96262, Alumbrado: 221591, Capital: 12042 },
  { name: '2023', Corriente: 940783, AmbientalBomberil: 114040, Alumbrado: 231375, Capital: 10989 },
  { name: '2024', Corriente: 990948, AmbientalBomberil: 108753, Alumbrado: 249133, Capital:  9951 },
];

/* === Tooltip genérico === */
const TooltipBox = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/85 backdrop-blur-sm p-3 border border-gray-200 rounded-lg shadow">
      <div className="font-semibold text-gray-800 mb-1">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="text-sm" style={{ color: p.color }}>
          {p.name}: {formatNumber(p.value)}
        </div>
      ))}
    </div>
  );
};

export const IncomeDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-[#0A2A6A]">Análisis de Ingresos 2019-2024</h2>

      {/* ===== LAYOUT MASONRY (sin espacios) ===== */}
      <div className="columns-1 lg:columns-2 gap-8 [column-fill:_balance]">
        {/* --- 1. Ingresos corrientes vs capital --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="Ingresos Corrientes vs. Ingresos de Capital" description="Cifras en millones de pesos.">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={income2019_2024} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(t) => `${(t / 1_000_000).toFixed(1)}M`} />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Line type="monotone" dataKey="Ingresos Corrientes" stroke={COLORS[0]} strokeWidth={3} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Ingresos Capital" stroke={COLORS[1]} strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- 2. Desglose corrientes --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="Desglose de Ingresos Corrientes" description="Cifras en millones de pesos.">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentIncomeBreakdown} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(t) => `${(t / 1_000_000).toFixed(1)}M`} />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Area type="monotone" dataKey="Transferencias" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="No tributarios" stackId="1" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Tributario" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.7} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- 3. Desglose tributarios --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="Desglose de Ingresos Tributarios" description="Cifras en millones de pesos.">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={taxIncomeBreakdown} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(t) => `${(t / 1_000_000).toFixed(1)}M`} />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Area type="monotone" dataKey="Predial" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Ind. y Cio" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Estampillas" stackId="1" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Gasolina" stackId="1" stroke={COLORS[3]} fill={COLORS[3]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Alumbrado" stackId="1" stroke={COLORS[4]} fill={COLORS[4]} fillOpacity={0.7} />
                <Area type="monotone" dataKey="Otros" stackId="1" stroke={COLORS[5]} fill={COLORS[5]} fillOpacity={0.7} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- 4. Capital --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="Recursos de Capital: composición" description="Otros / Recursos del Balance / Recursos del Crédito.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capitalStack} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis type="number" tickFormatter={(t) => `${(t / 1000).toFixed(1)}k`} stroke="#4b5563" />
                <YAxis type="category" dataKey="name" stroke="#4b5563" />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Bar dataKey="Otros" stackId="A" fill={COLORS[2]} />
                <Bar dataKey="Balance" stackId="A" fill={COLORS[6]} />
                <Bar dataKey="Credito" stackId="A" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- 5. SGP por sector --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="SGP por sector" description="Educación, Salud, Propósito General, Agua & Saneamiento, Alimentación Escolar.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sgpBySector} margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(t) => `${(t / 1000).toFixed(0)}k`} />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Bar dataKey="Educacion" stackId="S" fill={COLORS[0]} />
                <Bar dataKey="Salud" stackId="S" fill={COLORS[4]} />
                <Bar dataKey="PropGeneral" stackId="S" fill={COLORS[3]} />
                <Bar dataKey="APSB" stackId="S" fill={COLORS[6]} />
                <Bar dataKey="AlimEscolar" stackId="S" fill={COLORS[2]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- 6. Transferencias --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="Transferencias" description="SGP, otras transferencias de la Nación y transferencias departamentales.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transferencias} margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(t) => `${(t / 1_000_000).toFixed(1)}M`} />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Bar dataKey="SGP" stackId="T" fill={COLORS[0]} />
                <Bar dataKey="OtrasNac" stackId="T" fill={COLORS[6]} />
                <Bar dataKey="Deptal" stackId="T" fill={COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- 7. No tributarios --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="Ingresos No Tributarios por concepto" description="Valorización, especial, intereses, tránsito, cuota, convenios y otros.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={noTributarios} margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(t) => `${(t / 1000).toFixed(0)}k`} />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Bar dataKey="Valorizacion" stackId="N" fill={COLORS[5]} />
                <Bar dataKey="Especial" stackId="N" fill={COLORS[4]} />
                <Bar dataKey="Intereses" stackId="N" fill={COLORS[0]} />
                <Bar dataKey="Transito" stackId="N" fill={COLORS[1]} />
                <Bar dataKey="Cuota" stackId="N" fill={COLORS[6]} />
                <Bar dataKey="Convenios" stackId="N" fill={COLORS[2]} />
                <Bar dataKey="Otros" stackId="N" fill={COLORS[3]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- 8. Estampillas --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="Estampillas (composición)" description="Pro-Cultura, Desarrollo Urbano, Adulto Mayor, Justicia Familiar.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={estampillas} margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(t) => `${(t / 1000).toFixed(0)}k`} />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Bar dataKey="ProCultura" stackId="E" fill={COLORS[0]} />
                <Bar dataKey="ProdUrbano" stackId="E" fill={COLORS[3]} />
                <Bar dataKey="AdultoMayor" stackId="E" fill={COLORS[6]} />
                <Bar dataKey="Justicia" stackId="E" fill={COLORS[2]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- 9. Gasolina --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="Sobretasa a la Gasolina" description="Recaudo anual (millones de pesos).">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gasolina} margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(t) => `${(t / 1000).toFixed(0)}k`} />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Bar dataKey="Recaudo" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- 10. Industria y Comercio --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="Industria y Comercio: detalle" description="Avisos, complementarios, sanciones, capital y base de I&C.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industriaComercio} margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(t) => `${(t / 1000).toFixed(0)}k`} />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Bar dataKey="IndCio" stackId="IC" fill={COLORS[0]} />
                <Bar dataKey="Avisos" stackId="IC" fill={COLORS[1]} />
                <Bar dataKey="CompAvisos" stackId="IC" fill={COLORS[6]} />
                <Bar dataKey="Sanciones" stackId="IC" fill={COLORS[2]} />
                <Bar dataKey="CapitalIndCio" stackId="IC" fill={COLORS[3]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* --- 11. Predial --- */}
        <div className="mb-8 break-inside-avoid">
          <ChartCard title="Predial (grupo): composición" description="Corriente, ambiental/ bomberil, alumbrado, capital.">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={predial} margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.4} />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" tickFormatter={(t) => `${(t / 1000).toFixed(0)}k`} />
                <Tooltip content={<TooltipBox />} />
                <Legend />
                <Bar dataKey="Corriente" stackId="P" fill={COLORS[0]} />
                <Bar dataKey="AmbientalBomberil" stackId="P" fill={COLORS[6]} />
                <Bar dataKey="Alumbrado" stackId="P" fill={COLORS[4]} />
                <Bar dataKey="Capital" stackId="P" fill={COLORS[2]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};
