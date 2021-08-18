import { forwardRef, useContext, CSSProperties } from 'node_modules/react';
import styled from 'styled-components';
import { ResponsiveContext } from '../providers/ResponsiveProvider';
import { pointsToZones } from '../utils/responsive';
import { renderStyles, setStyleHandlerMap } from '../stringify';
import { modAttrs } from './utils/modAttrs';
import { AllBaseProps } from '../types/component';
import { NuResponsiveStyleValue } from '../types/styles';

type NuStyles = {
  [key in keyof CSSProperties]?: NuResponsiveStyleValue<CSSProperties[key]>;
} & {
  [key: string]: NuResponsiveStyleValue<string | number | boolean | undefined>;
} | {
  [key: string]: NuResponsiveStyleValue<string | number | boolean | undefined>;
};

const DEFAULT_STYLES: NuStyles = {
  display: 'inline-block',
} as const;

const BaseElement = styled.div(({ css }) => css);

const Base = (allProps: AllBaseProps, ref) => {
  let {
    as,
    styles: originalStyles,
    breakpoints,
    mods,
    qa,
    qaVal,
    css,
    ...props
  } = allProps;

  const styles: NuStyles = { ...DEFAULT_STYLES, ...originalStyles };

  const contextBreakpoints = useContext(ResponsiveContext);
  const zones = pointsToZones(breakpoints || contextBreakpoints);

  css = `${css || ''}${renderStyles(styles, zones)}`;

  if (mods) {
    Object.assign(props, modAttrs(mods));
  }

  return (
    <BaseElement
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
const _Base = forwardRef(Base);
export { _Base as Base, setStyleHandlerMap };

export * from '../types/component';
