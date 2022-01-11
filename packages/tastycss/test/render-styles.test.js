import { renderStyles } from '../dist/mjs';
import { expect } from './utils';

function checkAppliance(list) {
  list.forEach((obj, i) => {
    it(`to list ${i}`, () => {
      // @ts-ignore
      // console.log('!', renderStyles(obj.input, []));
      // @ts-ignore
      expect(renderStyles(obj.input, [])).to.eql(obj.output);
    });
  });
}

describe('Apply states to selector', () => {
  checkAppliance([
    {
      input: {
        color: '#purple',
        '&::before': {
          color: {
            '': '#red',
            hovered: '#blue',
          },
        }
      },
      output: `outline: none;
&&{
color:var(--purple-color, rgba(0, 0, 0, 1));
}
outline: none;
&&:not([data-is-hovered])::before{
color:var(--red-color, rgba(0, 0, 0, 1));
}
&&[data-is-hovered]::before{
color:var(--blue-color);
}
`,
    },
    // Element style definition
    {
      input: {
        color: '#purple',

        Element: {
          color: {
            '': '#red',
            hovered: '#blue',
          },
        }
      },
      output: `outline: none;
&&{
color:var(--purple-color, rgba(0, 0, 0, 1));
}
outline: none;
&&:not([data-is-hovered]) [data-element="Element"]{
color:var(--red-color, rgba(0, 0, 0, 1));
}
&&[data-is-hovered] [data-element="Element"]{
color:var(--blue-color);
}
`,
    },
    // Class style definition
    {
      input: {
        color: '#purple',

        '.someclass': {
          color: {
            '': '#red',
            hovered: '#blue',
          },
        }
      },
      output: `outline: none;
&&{
color:var(--purple-color, rgba(0, 0, 0, 1));
}
outline: none;
&&:not([data-is-hovered]) .someclass{
color:var(--red-color, rgba(0, 0, 0, 1));
}
&&[data-is-hovered] .someclass{
color:var(--blue-color);
}
`,
    },
  ]);
});
