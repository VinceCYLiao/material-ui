import * as React from 'react';
import { deepmerge } from '@mui/utils';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  PaletteColorOptions,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextNProgressBar } from 'docs/src/modules/components/AppFrame';
import { getDesignTokens, getThemedComponents } from 'docs/src/modules/brandingTheme';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    primaryDark?: PaletteColorOptions;
  }
}

const { palette: lightPalette, typography, ...designTokens } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');

const theme = extendTheme({
  cssVarPrefix: 'muidocs',
  colorSchemes: {
    light: {
      palette: lightPalette,
    },
    dark: {
      palette: darkPalette,
    },
  },
  ...designTokens,
  typography: deepmerge(typography, {
    h1: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'initial',
      },
    },
    h2: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-grey-100)',
      },
    },
    h5: {
      ':where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-primary-300)',
      },
    },
  }),
  ...getThemedComponents(),
});

export default function BrandingCssVarsProvider({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={theme} disableTransitionOnChange>
      <NextNProgressBar />
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
