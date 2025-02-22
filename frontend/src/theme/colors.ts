// src/theme/colors.ts
export const COLORS = {
    // Основные цвета
    background: '#EFF6EF',
    primary: '#245D33',
    secondary: '#A7ABAA',
    text: '#465357',
    footer: '#212122',
    
    // Статусы клиентов
    clientStatus: {
      cold: {
        bg: 'bg-[#A7ABAA]/20',
        text: 'text-[#465357]'
      },
      new: {
        bg: 'bg-[#245D33]/20',
        text: 'text-[#245D33]'
      },
      regular: {
        bg: 'bg-[#245D33]/40',
        text: 'text-[#245D33]'
      },
      loyal: {
        bg: 'bg-[#245D33]',
        text: 'text-white'
      },
      lost: {
        bg: 'bg-[#212122]/20',
        text: 'text-[#212122]'
      }
    },
  
    // Нейтральные оттенки
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  
    // Статусы
    status: {
      success: {
        light: '#dcfce7',
        dark: '#166534'
      },
      warning: {
        light: '#fef9c3',
        dark: '#854d0e'
      },
      error: {
        light: '#fee2e2',
        dark: '#991b1b'
      },
      info: {
        light: '#dbeafe',
        dark: '#1e40af'
      }
    }
  } as const;
  
  