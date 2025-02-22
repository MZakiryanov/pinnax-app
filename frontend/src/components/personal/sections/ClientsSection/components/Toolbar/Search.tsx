// src/components/personal/sections/ClientsSection/components/Toolbar/Search.tsx
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { COLORS } from '@/theme/colors';
import { TEXT_STYLES } from '@/theme/typography';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ 
  value, 
  onChange, 
  placeholder = "Поиск по ID или телефону..." 
}) => {
  return (
    <div className="relative flex-1 max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-4 py-2 
          border border-[${COLORS.secondary}] 
          rounded-lg 
          ${TEXT_STYLES.body}
          text-[${COLORS.text}]
          placeholder:text-[${COLORS.secondary}]
          focus:ring-2 
          focus:ring-[${COLORS.primary}] 
          focus:border-transparent 
          transition-all duration-200`}
      />
      <SearchIcon 
        className={`w-5 h-5 text-[${COLORS.secondary}] absolute left-3 top-2.5 pointer-events-none`} 
      />
    </div>
  );
};

export default Search;