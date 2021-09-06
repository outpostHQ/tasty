import { forwardRef, useContext, CSSProperties } from 'react';
import styledComponents from 'styled-components';
import { ResponsiveContext } from '../providers/ResponsiveProvider';
import { pointsToZones } from '../utils/responsive';
import { renderStyles } from '../stringify';
import { modAttrs } from './utils/modAttrs';
import { AllBaseProps } from '../types/component';
import { NuResponsiveStyleValue } from '../types/render';
import { useContextStyles } from '../providers/StylesProvider';

export type NuStyles = {
  [key in keyof CSSProperties]?: NuResponsiveStyleValue<CSSProperties[key]>;
} & {
  [key: string]: NuResponsiveStyleValue<string | number | boolean | undefined>;
} | {
  [key: string]: NuResponsiveStyleValue<string | number | boolean | undefined>;
};

export * from '../types/component';
export { useContextStyles, StyleProvider } from '../providers/StylesProvider';

export interface StyledProps {
  /** The name of the element. It can be used to override styles in context. */
  name?: string,
  /** The tag name of the element. */
  tag?: string,
  /** Default styles of the element. */
  styles?: NuStyles,
  /** Default css of the element. */
  css?: string,
}

export function styled({ name, tag, styles: defaultStyles, css: defaultCSS }: StyledProps) {
  let Base;
  let Element = styledComponents[tag || 'div'](({ css }) => css);

  if (name) {
    Base = (allProps: AllBaseProps, ref) => {
      let {
        as,
        styles,
        breakpoints,
        mods,
        qa,
        qaVal,
        css,
        ...props
      } = allProps;

      const contextStyles = useContextStyles(name, props);
      const allStyles: NuStyles = { display: 'inline-block', ...defaultStyles, ...contextStyles, ...styles };
      const contextBreakpoints = useContext(ResponsiveContext);
      const zones = pointsToZones(breakpoints || contextBreakpoints);

      css = `${defaultCSS || ''}${css || ''}${renderStyles(allStyles, zones)}`;

      if (mods) {
        Object.assign(props, modAttrs(mods));
      }

      return (
        <Element
          as={as || tag}
          data-qa={qa}
          data-qaval={qaVal}
          {...props}
          ref={ref}
          css={css}
        />
      );
    };
  } else {
    Base = (allProps: AllBaseProps, ref) => {
      let {
        as,
        styles,
        breakpoints,
        mods,
        qa,
        qaVal,
        css,
        ...props
      } = allProps;

      const allStyles: NuStyles = { display: 'inline-block', ...defaultStyles, ...styles };

      const contextBreakpoints = useContext(ResponsiveContext);
      const zones = pointsToZones(breakpoints || contextBreakpoints);

      css = `${css || ''}${renderStyles(allStyles, zones)}`;

      if (mods) {
        Object.assign(props, modAttrs(mods));
      }

      return (
        <Element
          as={as || tag}
          data-qa={qa}
          data-qaval={qaVal}
          {...props}
          ref={ref}
          css={css}
        />
      );
    };
  }

  return forwardRef(Base);
}
