import React from 'react';

/**
 * DataTable.tsx
 * Componente reutilizable para mostrar tablas de datos pequeñas/medianas.
 * Comentarios en español explicando props y estructura para facilitar mantenimiento.
 */

/**
 * Props del componente DataTable
 *
 * - title: título que se muestra en la cabecera del card/table.
 * - headers: arreglo de encabezados para la tabla. Cada elemento puede ser texto o un nodo React (para íconos/labels personalizados).
 * - rows: arreglo bidimensional que representa las filas y celdas. Cada fila es un arreglo de valores que pueden ser string, number o nodos React.
 * - highlightRow: opcional. Si se suministra, se espera un objeto con { key, index } donde `index` es la columna a comparar y `key` el valor que al coincidir hará resaltada la fila.
 * - cellStyle: opcional. Función que recibe (cellValue, colIndex, rowIndex) y debe devolver una cadena con clases CSS adicionales para la celda.
 */
interface DataTableProps {
  title: string;
  headers: (string | React.ReactNode)[];
  rows: (string | number | React.ReactNode)[][];
  highlightRow?: { key: string; index: number };
  cellStyle?: (cellValue: any, colIndex: number, rowIndex: number) => string;
}

/**
 * DataTable
 * Componente funcional que renderiza un contenedor con estilo (card) que incluye una tabla.
 * - Usa clases utilitarias (Tailwind) para estilos responsivos y efectos hover.
 * - No maneja paginación ni ordenamiento; está pensado como presentador simple de datos ya procesados.
 *
 * Entrada: DataTableProps
 * Salida: JSX que representa la tabla dentro de una tarjeta.
 */
export const DataTable: React.FC<DataTableProps> = ({ title, headers, rows, highlightRow, cellStyle }) => {
  // Contenedor principal: tarjeta con borde, sombra y transición al pasar el mouse.
  return (
    <div className="bg-white rounded-xl border-2 border-lime-400 shadow-lg shadow-lime-500/20 hover:shadow-xl hover:shadow-lime-500/40 transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Título del componente/table */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>

        {/* Wrapper para scroll horizontal en pantallas pequeñas */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            {/* Cabecera de la tabla: se renderizan los headers pasados en props */}
            <thead className="text-xs text-white uppercase bg-gradient-to-r from-purple-600 to-blue-500">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-6 py-4 font-semibold tracking-wider ${index === 0 ? 'rounded-tl-lg' : ''} ${index === headers.length - 1 ? 'rounded-tr-lg' : ''}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Cuerpo de la tabla: renderiza cada fila y cada celda. */}
            <tbody className="divide-y divide-gray-200">
              {rows.map((row, rowIndex) => {
                // Determina si la fila debe ir resaltada comparando el valor de la columna indicada
                const isHighlighted = highlightRow && row[highlightRow.index] === highlightRow.key;

                return (
                  <tr
                    key={rowIndex}
                    // Si está resaltada, aplicamos un fondo y borde lateral para destacar
                    className={`transition-all duration-200 hover:bg-slate-100 hover:scale-[1.02] origin-left ${isHighlighted ? 'bg-blue-50/50 border-l-4 border-blue-500' : ''}`}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        // Aplica estilos por columna y estilos personalizados a través de cellStyle
                        className={`px-6 py-4 whitespace-nowrap ${cellIndex === 1 ? 'font-medium text-gray-900' : ''} ${cellStyle ? cellStyle(cell, cellIndex, rowIndex) : ''}`}
                      >
                        {/* El contenido de la celda puede ser texto simple o un nodo React (ej. iconos, badges, componentes) */}
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