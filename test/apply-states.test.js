import { applyStates } from '../dist/mjs/index';
import { expect } from './utils';

function checkAppliance(list) {
  list.forEach((obj, i) => {
    it(`to list ${i}`, () => {
      // @ts-ignore
      expect(applyStates(...obj.input)).to.eql(obj.output);
    });
  });
}

describe('Apply states to selector', () => {
  checkAppliance([
    {
      input: [
        'nu-element',
        [
          {
            mods: [],
            value: 'value1',
          },
          {
            mods: ['mod1'],
            value: 'value2',
          },
          {
            notMods: ['mod2'],
            value: 'value2',
          },
          {
            mods: ['mod1'],
            notMods: ['mod2'],
            value: 'value3',
          },
        ],
      ],
      output: `nu-element{
value1}
nu-element[data-is-mod1]{
value2}
nu-element:not([data-is-mod2]){
value2}
nu-element[data-is-mod1]:not([data-is-mod2]){
value3}
`,
    },
  ]);
});
