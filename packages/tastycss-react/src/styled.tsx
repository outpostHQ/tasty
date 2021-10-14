import { forwardRef, useContext, CSSProperties } from 'react';
import styledComponents from 'styled-components';
import { BreakpointsContext } from './providers/BreakpointsProvider';
import { pointsToZones, renderStyles, AllBaseProps, ResponsiveStyleValue } from 'tastycss';
import { modAttrs } from './utils/modAttrs';
import { useContextStyles } from './providers/StylesProvider';

export type Styles =
	| ({
			[key in keyof CSSProperties]?: ResponsiveStyleValue<CSSProperties[key]>;
	  } & {
			[key: string]: ResponsiveStyleValue<string | number | boolean | undefined>;
	  })
	| {
			[key: string]: ResponsiveStyleValue<string | number | boolean | undefined>;
	  };

export interface StyledProps<T extends string> {
	/** The name of the element. It can be used to override styles in context. */
	name?: string;
	/** The tag name of the element. */
	tag?: string;
	/** Default styles of the element. */
	styles?: Styles;
	/** Default css of the element. */
	css?: string;
	/** Default attributes */
	attrs?: Record<string, any>;
	/** The list of available modifiers. Providing it will show a warning each time you set an incorrect modifier on the element */
	availableMods?: T[];
}

export type AllBasePropsWithMods<T extends string> = Omit<AllBaseProps, 'mods'> & {
	mods?: Record<T, boolean | null | undefined>;
};

function combineStyles(defaultStyles, contextStyles, styles) {
  if (!defaultStyles && !contextStyles && !styles) return;

  // if only a single object provided
  if ((defaultStyles || contextStyles || styles) === (styles || contextStyles || defaultStyles)) {
    return defaultStyles || contextStyles || styles;
  }

  return {
    ...defaultStyles,
    ...contextStyles,
    ...styles,
  };
}

export function styled<T extends string>(options: StyledProps<T>) {
  let { name, tag, styles: defaultStyles, css: defaultCSS, attrs } = options;
  let Element = styledComponents[tag || 'div'](({ theme }) => theme.css);

  if (name) {
    return forwardRef((allProps: AllBasePropsWithMods<T>, ref) => {
      let { as, styles, breakpoints, mods, qa, qaVal, css, ...props } = allProps;

      // @ts-ignore
      const contextStyles = useContextStyles(name, props);
      const allStyles: Styles | undefined = combineStyles(defaultStyles, contextStyles, styles);

      const contextBreakpoints = useContext(BreakpointsContext);
      const zones = pointsToZones(breakpoints || contextBreakpoints);

      css = `${defaultCSS || ''}${css || ''}${allStyles ? renderStyles(allStyles, zones) : ''}`;

      if (mods) {
        Object.assign(props, modAttrs(mods));
      }

      return <Element as={as || tag} data-qa={qa} data-qaval={qaVal} {...attrs} {...props} ref={ref} theme={{ css }} />;
    });
  } else {
    return forwardRef((allProps: AllBasePropsWithMods<T>, ref) => {
      let { as, styles, breakpoints, mods, qa, qaVal, css, ...props } = allProps;

      const allStyles: Styles | undefined = combineStyles(defaultStyles, null, styles);
      const contextBreakpoints = useContext(BreakpointsContext);
      const zones = pointsToZones(breakpoints || contextBreakpoints);

      css = `${defaultCSS || ''}${css || ''}${allStyles ? renderStyles(allStyles, zones) : ''}`;

      if (mods) {
        Object.assign(props, modAttrs(mods));
      }

      return <Element as={as || tag} data-qa={qa} data-qaval={qaVal} {...attrs} {...props} ref={ref} theme={{ css }} />;
    });
  }
}
