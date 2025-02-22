// src/theme/components.ts
interface LanguageSelectorStyles {
  dropdown: {
    base: string;
    item: string;
    hover: string;
    active: string;
  }
}

export const COMPONENT_STYLES = {
  // Кнопки
  button: {
    base: 'rounded-lg transition-colors duration-200 font-medium',
    primary: 'bg-[#245D33] hover:bg-[#1e4d2b] text-white',
    secondary: 'bg-[#A7ABAA] hover:bg-[#959998] text-white',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    }
  },
  
  // Карточки
  card: {
    base: 'bg-white rounded-lg shadow-sm overflow-hidden',
    header: 'px-6 py-4 border-b border-[#A7ABAA]/20',
    body: 'p-6'
  },
  
  // Поля ввода
  input: {
    base: 'w-full rounded-lg border border-[#A7ABAA] focus:ring-2 focus:ring-[#245D33] focus:border-transparent transition duration-200',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-4 py-3 text-lg'
    }
  },
  
  // Бейджи статусов
  badge: {
    base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    cold: 'bg-[#A7ABAA]/20 text-[#465357]',
    new: 'bg-[#245D33]/20 text-[#245D33]',
    regular: 'bg-[#245D33]/40 text-[#245D33]',
    loyal: 'bg-[#245D33] text-white',
    lost: 'bg-[#212122]/20 text-[#212122]'
  },

  // Языковой переключатель
  languageSelector: {
    dropdown: {
      base: 'absolute right-0 bottom-full mb-2 w-32 bg-white rounded-lg shadow-lg',
      item: 'w-full text-left px-4 py-2',
      hover: 'hover:bg-[#F5F5F5]',
      active: 'bg-[#F5F5F5]'
    }
  } as LanguageSelectorStyles
} as const;