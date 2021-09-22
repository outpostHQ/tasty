import { createGlobalStyle } from 'styled-components';

export interface ThemeProps {
	tokens?: Record<string, string>;
	font?: string;
	monospaceFont?: string;
	styles?: Record<string, string>;
	css?: string;
}

export const DEFAULT_TOKENS = {
  'gap': '8px',
  'outline-width': 'calc(1rem / 16 * 3)',
  'border-width': '1px',
  'radius': '4px',
  'transition': '120ms',
};

export const GlobalStyles = createGlobalStyle<ThemeProps>`
  html {
    --font: ${({ font }) =>
    font
			|| 'Inter'}, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    --monospace-font: ${({ monospaceFont }) =>
    `${monospaceFont}, ` || ''}Menlo, Monaco, Consolas, 'Courier New', monospace;
    ${({ tokens }) => {
    return Object.entries({ ...DEFAULT_TOKENS, ...tokens })
      .map(([key, value]) => {
        return `--${key}: ${value};`;
      })
      .join('\n    ');
  }}
  }

  body {
    background-color: white !important;
    font-family: var(--font);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    font-weight: 400;
    ${({ styles }) => {
    return Object.entries(styles || {})
      .map(([key, value]) => {
        return `${key}: ${value};`;
      })
      .join('\n    ');
  }}
    ${({ css }) => css || ''}
  }
`;
