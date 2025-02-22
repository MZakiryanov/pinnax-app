// src/components/common/Logo.tsx
import React from 'react';
import { COLORS } from '@/theme/colors';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 250 100" 
    className={className}
  >
    <text 
      x="50%" 
      y="50%" 
      textAnchor="middle" 
      dominantBaseline="middle"
      fontFamily="ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Apple Color Emoji, Arial, sans-serif, Segoe UI Emoji, Segoe UI Symbol" 
      fontWeight="bold" 
      fontSize="72" 
      fill={COLORS.primary}
    >
      pinnaX
    </text>
  </svg>
);

export default Logo;