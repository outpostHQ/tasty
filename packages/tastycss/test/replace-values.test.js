import { replaceStateValues } from '../dist/mjs';
import { expect } from './utils';

function checkReplacement(list) {
  list.forEach((obj, i) => {
    it(`to list ${i}`, () => {
      // @ts-ignore
      expect(replaceStateValues(...obj.input)).to.eql(obj.output);
    });
  });
}

describe('Replace state values', () => {
  checkReplacement([
    {
      input: [
        [
          {
            mods: [],
            value: {
              style1: 'value1',
            },
          },
          {
            mods: ['mod1'],
            value: {
              style2: 'value2',
              style3: 'value3',
            },
          },
          {
            mods: ['mod2'],
            value: {
              style2: 'value4',
              style3: 'value5',
            },
          },
        ],
        ({ style1, style2, style3 }) => `${style1 || ''}${style2 || ''}${style3 || ''}`,
      ],
      output: [
        {
          mods: [],
          value: "value1",
        },
        {
          mods: [
            "mod1",
          ],
          value: "value2value3",
        },
        {
          mods: [
            "mod2",
          ],
          value: "value4value5",
        },
      ]
    },
  ]);
});
