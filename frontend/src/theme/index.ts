// src/theme/index.ts
import * as ColorsModule from './colors';
import * as TypographyModule from './typography';
import * as ComponentsModule from './components';
import { STATUS_STYLES, COLORS, FONT_FAMILY, BUTTON_STYLES } from './constants';

export const THEME = {
  colors: ColorsModule.COLORS,
  typography: TypographyModule.TEXT_STYLES,
  components: ComponentsModule.COMPONENT_STYLES,
  status: STATUS_STYLES
} as const;

export function getThemeValue(path: string) {
  const keys = path.split('.');
  let value: any = THEME;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) break;
  }
  
  return value || path;
}

export { 
  ColorsModule as ThemeColors, 
  TypographyModule as ThemeTypography, 
  ComponentsModule as ThemeComponents 
};

export { 
  COLORS as ThemeConstantColors, 
  FONT_FAMILY, 
  STATUS_STYLES, 
  BUTTON_STYLES 
};

export * from './ThemeProvider';