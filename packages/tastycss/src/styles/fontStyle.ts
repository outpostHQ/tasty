export function fontStyleStyle({ fontStyle }): {font-style: any;
}  {
  if (fontStyle === true) {
    fontStyle = 'italic';
  }

  if (fontStyle !== 'inherit') {
    fontStyle = fontStyle ? 'italic' : 'normal';
  }

  return { 'font-style': fontStyle };
}

fontStyleStyle.__lookupStyles = ['fontStyle'];
