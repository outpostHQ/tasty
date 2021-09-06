import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    --gap: 8px;
    --outline-width: calc(1rem / 16 * 3);
    --border-width: 1px;
    --radius: 4px;
    --transition: 120ms;
  }
`;
