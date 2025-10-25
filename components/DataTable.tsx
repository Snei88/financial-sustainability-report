import React from 'react';

/**
 * DataTable.tsx
 * Componente reutilizable para mostrar tablas de datos pequeñas/medianas.
 */

/** Props */
interface DataTableProps {
  title: string;
  headers: (string | React.ReactNode)[];
  rows: (string | number | React.ReactNode)[][];
  highlightRow?: { key: string; index: number };
  cellStyle?: (cellValue: any, colIndex: number, rowIndex: number) => string;
}

export const DataTable: React.FC<DataTableProps> = ({
  title,
  headers,
  rows,
  highlightRow,
  cellStyle,
}) => {
  return (
    <div
      className="
        bg-white rounded-xl border-2 border-[#0A2A6A]
        shadow-lg shadow-[rgba(10,42,106,0.18)]
        hover:shadow-xl hover:shadow-[rgba(10,42,106,0.28)]
        transition-shadow duration-300 overflow-hidden
      "
    >
      <div className="p-6">
        {/* Título */}
        <h3 className="text-lg font-semibold mb-4 text-[#0A2A6A]">
          {title}
        </h3>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            {/* HEADER de la tabla */}
            <thead
              className="
                text-xs text-white uppercase
                bg-[#0A2A6A]
                /* Si prefieres un sutil degradado corporativo, usa esta línea en lugar de la de arriba:
                bg-gradient-to-r from-[#0A2A6A] to-[#1348A2]
                */
              "
            >
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-6 py-4 font-semibold tracking-wider ${
                      index === 0 ? 'rounded-tl-lg' : ''
                    } ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* CUERPO */}
            <tbody className="divide-y divide-gray-200">
              {rows.map((row, rowIndex) => {
                const isHighlighted =
                  !!highlightRow && row[highlightRow.index] === highlightRow.key;

                return (
                  <tr
                    key={rowIndex}
                    className={`transition-all duration-200 hover:bg-slate-100 hover:scale-[1.02] origin-left ${
                      isHighlighted ? 'bg-blue-50/60 border-l-4 border-[#0A2A6A]' : ''
                    }`}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`
                          px-6 py-4 whitespace-nowrap
                          ${cellIndex === 1 ? 'font-medium text-gray-900' : ''}
                          ${cellStyle ? cellStyle(cell, cellIndex, rowIndex) : ''}
                        `}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
