// src/components/personal/sections/ClientsSection/components/Table/Table.tsx
import React from 'react';
import { FileText } from 'lucide-react';
import { Client } from '../../types';
import { getStatusColor, getStatusText } from '../../utils/statusHelpers';
import { TABLE_HEADERS } from '../../utils/constants';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';
import Pagination from './Pagination';

interface TableProps {
  clients: Client[];
  filteredClients: Client[];
  showExtended: boolean;
  onClientSelect: (clientId: string) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Table: React.FC<TableProps> = ({
  filteredClients,
  showExtended,
  onClientSelect,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(filteredClients.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedClients = filteredClients.slice(startIndex, endIndex);

  const columns = showExtended 
    ? [...TABLE_HEADERS.base, ...TABLE_HEADERS.extended]
    : TABLE_HEADERS.base;

  const renderCellValue = (client: Client, key: string): React.ReactNode => {
    switch (key) {
      case 'id':
        return (
          <button
            onClick={() => onClientSelect(client.id)}
            className={`flex items-center text-[${COLORS.primary}] hover:text-[${COLORS.primary}]/80 transition-colors duration-200`}
          >
            #{client.id}
            <FileText className="w-4 h-4 ml-1" />
          </button>
        );
      case 'lastOrder':
        return client.lastOrder 
          ? new Date(client.lastOrder).toLocaleDateString('ru-RU') 
          : '—';
      case 'status':
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full ${TEXT_STYLES.tiny} ${getStatusColor(client.status)}`}>
            {getStatusText(client.status)}
            {client.statusChange === 'upgrade' && (
              <span className={`text-[${COLORS.primary}] ml-1`}>↑</span>
            )}
            {client.statusChange === 'downgrade' && (
              <span className="text-red-500 ml-1">↓</span>
            )}
          </span>
        );
      case 'noMailings':
        return client.noMailings ? 'Отключена' : 'Включена';
      case 'abandonedCarts':
        return client.abandonedCarts ? 'Есть' : 'Нет';
      case 'discount':
        return `${client.discount}%`;
      case 'created':
        return new Date(client.created).toLocaleDateString('ru-RU');
      default:
        return client[key as keyof Client]?.toString() || '—';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`bg-[${COLORS.background}]`}>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className={`px-6 py-3 text-left ${TEXT_STYLES.tiny} text-[${COLORS.secondary}] uppercase tracking-wider`}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#A7ABAA]/20">
            {displayedClients.map((client) => (
              <tr 
                key={client.id} 
                className={`hover:bg-[${COLORS.background}] transition-colors duration-200`}
              >
                {columns.map((column) => (
                  <td 
                    key={`${client.id}-${column.key}`}
                    className={`px-6 py-4 whitespace-nowrap ${TEXT_STYLES.small} text-[${COLORS.text}]`}
                  >
                    {renderCellValue(client, column.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={filteredClients.length}
        startIndex={startIndex}
        endIndex={Math.min(endIndex, filteredClients.length)}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};

export default Table;