// src/components/personal/sections/ClientsSection/components/Toolbar/Toolbar.tsx
import React from 'react';
import { Filter, Download, Settings } from 'lucide-react';
import Search from './Search';
import Filters from '../Filters/Filters';
import { ClientFilters } from '../../types';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';

interface ToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onExport: () => void;
  onOpenSettings: () => void;
  filters: ClientFilters;
  onFiltersChange: (filters: ClientFilters) => void;
  showExtended: boolean;
  onShowExtendedChange: (show: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters,
  onExport,
  onOpenSettings,
  filters,
  onFiltersChange,
  showExtended,
  onShowExtendedChange,
}) => {
  const buttonBaseClass = `flex items-center px-4 py-2 
    border border-[${COLORS.secondary}] 
    rounded-lg 
    ${TEXT_STYLES.body}
    text-[${COLORS.text}]
    hover:bg-[${COLORS.background}] 
    transition-colors duration-200`;

  return (
    <div className={`bg-[${COLORS.background}] rounded-lg shadow-sm p-4`}>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <Search 
          value={searchQuery}
          onChange={onSearchChange}
        />

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={onToggleFilters}
            className={buttonBaseClass}
          >
            <Filter className="w-5 h-5 mr-2" />
            Фильтры
          </button>
          
          <button
            onClick={onOpenSettings}
            className={buttonBaseClass}
          >
            <Settings className="w-5 h-5 mr-2" />
            Настройка
          </button>
          
          <button 
            onClick={onExport}
            className={buttonBaseClass}
          >
            <Download className="w-5 h-5 mr-2" />
            Экспорт
          </button>
          
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showExtended}
              onChange={(e) => onShowExtendedChange(e.target.checked)}
              className="sr-only peer"
            />
            <div className={`relative w-11 h-6 
              bg-[${COLORS.secondary}] 
              peer-focus:outline-none 
              peer-focus:ring-4 
              peer-focus:ring-[${COLORS.primary}]/30 
              rounded-full 
              peer 
              peer-checked:after:translate-x-full 
              rtl:peer-checked:after:-translate-x-full 
              peer-checked:after:border-white 
              after:content-[''] 
              after:absolute 
              after:top-[2px] 
              after:start-[2px] 
              after:bg-white 
              after:border-[${COLORS.secondary}] 
              after:border 
              after:rounded-full 
              after:h-5 
              after:w-5 
              after:transition-all 
              peer-checked:bg-[${COLORS.primary}]`}
            />
            <span className={`ml-2 ${TEXT_STYLES.small} text-[${COLORS.text}]`}>
              Расширенный вид
            </span>
          </label>
        </div>
      </div>

      {showFilters && (
        <Filters 
          filters={filters}
          onChange={onFiltersChange}
        />
      )}
    </div>
  );
};

export default Toolbar;