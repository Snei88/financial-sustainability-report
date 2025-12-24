import React from 'react';
import { StatCard } from '../components/StatCard';

export const ReporteGerencial: React.FC = () => {
  return (
    <div>
      <StatCard title="Reporte Gerencial">
        <div className="flex flex-col">
          <div className="mb-3 flex justify-end">
            <a
              href="/cali.html"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Abrir en nueva pestaña
            </a>
          </div>

          <div className="w-full">
            <iframe
              src="/cali.html"
              title="Reporte Gerencial - cali"
              className="w-full h-[75vh] rounded-xl border border-gray-200"
              style={{ minHeight: '480px' }}
            />
          </div>
        </div>
      </StatCard>
    </div>
  );
};

export default ReporteGerencial;
