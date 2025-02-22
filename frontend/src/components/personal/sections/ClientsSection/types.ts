// src/components/personal/sections/ClientsSection/types.ts
import { COLORS } from '@/theme';
import React from 'react';

// Client Status Types
export type ClientStatus = keyof typeof COLORS.clientStatus;
export type StatusChange = 'upgrade' | 'downgrade';

// Client Interface
export interface Client {
  id: string;
  name: string;
  phone: string;
  street: string;
  house: string;
  entrance: string;
  floor: string;
  apartment: string;
  email: string;
  noMailings: boolean;
  abandonedCarts: boolean;
  channel: string;
  created: string;
  ordersCount: number;
  totalAmount: string;
  lastOrder: string | null;
  status: ClientStatus;
  statusChange: StatusChange | null;
  discount: number;
  averageCheck: string;
  orderFrequency: number;
  comment?: string;
  ordersByMonth: OrderByMonth[];
  products: Product[];
  orders: Order[];
  averageInterval: number;
  daysSinceLastOrder: number;
}

// Order Related Interfaces
export interface OrderByMonth {
  month: string;
  orders: number;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: string;
  total: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
  total: string;
}

// Updated Filter Interface to include all filtering options
export interface ClientFilters {
  ordersFrom: string;
  ordersTo: string;
  amountFrom: string;
  amountTo: string;
  status: string;
  lastOrderFrom: string;
  lastOrderTo: string;
  channel?: string[];
  dateRange?: {
    start: string | null;
    end: string | null;
  };
}

// Status Settings Interface
export interface StatusSettings {
  manual: {
    ordersX: number;
    ordersY: number;
    ordersZ: number;
    intervalA: number;
    intervalB: number;
    daysC: number;
  };
  useAutoCalculation: boolean;
}

// Auto Calculation Requirements Interface
export interface AutoCalculationRequirements {
  MIN_REGULAR_CLIENTS: number;
  MIN_LOYAL_CLIENTS: number;
}

// Client Statistics Interface
export interface ClientStats {
  cold: number;
  new: number;
  regular: number;
  loyal: number;
  lost: number;
}

// Base Themeable Component Interface
export interface ThemeableComponent {
  className?: string;
  style?: React.CSSProperties;
}

// Button Props Interface
export interface StyledButtonProps extends ThemeableComponent {
  variant?: keyof typeof COLORS.status;
  size?: 'sm' | 'md' | 'lg';
}

// Badge Props Interface
export interface StyledBadgeProps extends ThemeableComponent {
  status: ClientStatus;
  showStatusChange?: boolean;
  statusChange?: StatusChange;
}

// Themeable Filter Interface
export interface ThemeableFilter extends ClientFilters {
  appearance?: keyof typeof COLORS.neutral;
}

// Pagination Related Interfaces
export interface PaginationStyle {
  activeColor?: keyof typeof COLORS;
  hoverColor?: keyof typeof COLORS;
  textColor?: keyof typeof COLORS;
}

export interface PaginationProps {
  className?: string;
  style?: React.CSSProperties;
  paginationStyle?: PaginationStyle;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Modal Props Interface
export interface ModalProps extends ThemeableComponent {
  isOpen: boolean;
  onClose: () => void;
  overlayColor?: keyof typeof COLORS;
}

// Input Props Interface
export interface ThemeableInput extends ThemeableComponent {
  variant?: 'outline' | 'filled';
  status?: keyof typeof COLORS.status;
  size?: 'sm' | 'md' | 'lg';
}

// Table Style Interface
export interface TableStyle extends ThemeableComponent {
  headerColor?: keyof typeof COLORS;
  rowHoverColor?: keyof typeof COLORS;
  borderColor?: keyof typeof COLORS;
  stripedColor?: keyof typeof COLORS;
}

// Chart Colors Interface
export interface ChartColors {
  primary?: keyof typeof COLORS;
  secondary?: keyof typeof COLORS;
  axis?: keyof typeof COLORS;
  grid?: keyof typeof COLORS;
  tooltip?: keyof typeof COLORS;
}

// Helper function to combine styles
export const combinedStyles = (baseStyle?: React.CSSProperties, paginationStyle?: PaginationStyle): React.CSSProperties => {
  const computedStyles: React.CSSProperties = {
    ...baseStyle,
  };

  if (paginationStyle) {
    if (paginationStyle.textColor) {
      computedStyles.color = `var(--color-${paginationStyle.textColor})`;
    }
  }

  return computedStyles;
};

// Type guard for checking ClientStatus
export const isClientStatus = (status: string): status is ClientStatus => {
  return status in COLORS.clientStatus;
};

// Type guard for checking StatusChange
export const isStatusChange = (change: string): change is StatusChange => {
  return change === 'upgrade' || change === 'downgrade';
};