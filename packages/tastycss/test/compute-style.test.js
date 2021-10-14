import { styleHandlerCacheWrapper } from '../dist/mjs';
import { expect } from './utils';

const handler = styleHandlerCacheWrapper(({ style }) => ({ style }));

handler.__lookupStyles = ['style'];

function checkAppliance(list) {
  list.forEach((obj, i) => {
    it(`to list ${i}`, () => {
      // @ts-ignore
      expect(handler(obj.input)).to.eql(obj.output);
    });
  });
}

describe('Apply states to selector', () => {
  checkAppliance([
    {
      input: {
        style: 'value1',
        '&::before': {
          style: {
            '': 'value2',
            hovered: 'value3',
          },
        }
      },
      output: `&&:not([data-is-style]){
style:value1;
}
&&[data-is-style]{
style:value1;
}
&&:not([data-is-hovered])::before{
style:value2;
}
&&[data-is-hovered]::before{
style:value3;
}
`,
    },
  ]);
});
