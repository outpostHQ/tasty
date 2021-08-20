import { computeState } from '../dist/mjs/index';
import { expect } from './utils';

function checkNormalization(list) {
  list.forEach((obj, i) => {
    it(`input ${i}`, () => {
      // @ts-ignore
      expect(computeState(...obj.input)).to.eql(obj.output);
    });
  });
}

const NOT = '!';
const AND = '&';
const OR = '|';
const XOR = '^';

describe('State normalization', () => {
  checkNormalization([
    {
      input: [
        [XOR, [OR, [AND, 2, 2], 1], 0],
        [1, 0, 1],
      ],
      output: !!(((1 & 1) | 0) ^ 1),
    },
    {
      input: [
        [OR, [AND, [XOR, 2, 2], 1], 0],
        [1, 0, 1],
      ],
      output: !!(((1 ^ 1) & 0) | 1),
    },
    {
      input: [
        [AND, [OR, [XOR, 2, 2], 1], 0],
        [1, 0, 1],
      ],
      output: !!(((1 ^ 1) | 0) & 1),
    },
  ]);
});
