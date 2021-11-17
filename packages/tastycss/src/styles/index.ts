import { RawStyleHandler, StyleHandler } from '../types/render';
import {
  getRgbValuesFromRgbaString,
  parseColor,
  parseStyle,
  strToRgb,
  styleHandlerCacheWrapper,
} from '../utils/styles';
import { toSnakeCase } from '../utils/toSnakeCase';

const CACHE = {};

export function createStyle(styleName: string, cssStyle?: string, converter?: Function) {
   const key = `${styleName}.${cssStyle || ''}`;

  if (!CACHE[key]) {
    CACHE[key] = styleHandlerCacheWrapper((styleMap) => {
      let styleValue = styleMap[styleName];

      if (styleValue == null || styleValue === false) return;

      const finalCssStyle = cssStyle || toSnakeCase(styleName).replace(/^@/, '--');

      // convert non-string values
      if (converter && typeof styleValue !== 'string') {
        styleValue = converter(styleValue);

        if (!styleValue) return;
      }

      if (typeof styleValue === 'string' && finalCssStyle.startsWith('--') && finalCssStyle.endsWith('-color')) {
        styleValue = styleValue.trim();

        const rgba = strToRgb(styleValue);

        const { color, name } = parseColor(styleValue);

        if (name && rgba) {
          return {
            [finalCssStyle]: `var(--${name}-color, ${rgba})`,
            [`${finalCssStyle}-rgb`]: `var(--${name}-color-rgb, ${getRgbValuesFromRgbaString(rgba).join(', ')})`,
          };
        } else if (name) {
          return {
            [finalCssStyle]: `var(--${name}-color)`,
            [`${finalCssStyle}-rgb`]: `var(--${name}-color-rgb)`,
          };
        } else if (rgba) {
          return {
            [finalCssStyle]: rgba,
            [`${finalCssStyle}-rgb`]: getRgbValuesFromRgbaString(rgba).join(', '),
          };
        }

        return {
          [finalCssStyle]: color,
        };
      }

      const { value } = parseStyle(styleValue, 1);

      return { [finalCssStyle]: value };
    });

    CACHE[key].__lookupStyles = [styleName];
  }

  return CACHE[key];
}

type StyleHandlerMap = Record<string, StyleHandler[]>;

export const STYLE_HANDLER_MAP: StyleHandlerMap = {};

export function defineCustomStyle(names: string[] | StyleHandler, handler?: RawStyleHandler): void  {
  let handlerWithLookup: StyleHandler;

  if (typeof names === 'function') {
    handlerWithLookup = names;
    names = handlerWithLookup.__lookupStyles;
  } else {
    handlerWithLookup = Object.assign(handler, { __lookupStyles: names });
  }

  handlerWithLookup = styleHandlerCacheWrapper(handlerWithLookup);

  names.forEach((name) => {
    if (!STYLE_HANDLER_MAP[name]) {
      STYLE_HANDLER_MAP[name] = [];
    }

    STYLE_HANDLER_MAP[name].push(handlerWithLookup);
  });
}

type ConverterHandler = (s: string | boolean | number | undefined) => string | undefined;

export function defineStyleAlias(styleName: string, cssStyleName?: string, converter?: ConverterHandler): void  {
  const styleHandler = createStyle(styleName, cssStyleName, converter);

  if (!STYLE_HANDLER_MAP[styleName]) {
    STYLE_HANDLER_MAP[styleName] = [];
  }

  STYLE_HANDLER_MAP[styleName].push(styleHandler);
}
