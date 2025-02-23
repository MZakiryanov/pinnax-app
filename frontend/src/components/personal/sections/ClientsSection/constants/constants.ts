// src/components/personal/sections/ClientsSection/constants/constants.ts
import type { StatusSettingsType, ClientStats, AutoCalculationRequirements } from '../types';

export const DEFAULT_SETTINGS: StatusSettingsType = {
  manual: {
    ordersX: 2,
    ordersY: 4,
    ordersZ: 5,
    intervalA: 21,
    intervalB: 11,
    daysC: 51
  },
  useAutoCalculation: false
};

export const DEFAULT_STATS: ClientStats = {
  cold: 0,
  new: 0,
  regular: 0,
  loyal: 0,
  lost: 0
};

export const DEFAULT_AUTO_CALCULATION_REQUIREMENTS: AutoCalculationRequirements = {
  MIN_REGULAR_CLIENTS: 20,
  MIN_LOYAL_CLIENTS: 5
};