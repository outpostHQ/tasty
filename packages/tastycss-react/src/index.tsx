import { forwardRef, useContext } from 'react';
import styledComponents from 'styled-components';
import { BreakpointsContext, BreakpointsProvider } from './providers/BreakpointsProvider';
import { pointsToZones, renderStyles, AllBaseProps } from 'tastycss';
import { modAttrs } from './utils/modAttrs';
import { Styles } from './styled';

const DEFAULT_STYLES: Styles = {
  display: 'inline-block',
} as const;

interface CSSElementProps {
	css?: string;
}

const CSSElement = styledComponents.div(({ css }: CSSElementProps) => css || '');

const Element = (allProps: AllBaseProps, ref) => {
  let { as, styles: originalStyles, breakpoints, mods, qa, qaVal, css, ...props } = allProps;

  const styles: Styles = { ...DEFAULT_STYLES, ...originalStyles };

  const contextBreakpoints = useContext(BreakpointsContext);
  const zones = pointsToZones(breakpoints || contextBreakpoints);

  css = `${css || ''}${renderStyles(styles, zones)}`;

  if (mods) {
    Object.assign(props, modAttrs(mods));
  }

  return (
    <CSSElement
      // @ts-ignore
      as={as}
      data-qa={qa}
      data-qaval={qaVal}
      {...props}
      ref={ref}
      css={css}
    />
  );
};

/**
 * The base component of the TastyReact.
 */
const _Element = forwardRef(Element);
export { _Element as Element, BreakpointsProvider };
export { useContextStyles, StyleProvider } from './providers/StylesProvider';
export { styled } from './styled';
export { styled as default } from './styled';
export * from './globals';
export * from 'tastycss';
