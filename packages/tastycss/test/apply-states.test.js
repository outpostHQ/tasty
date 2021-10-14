import { applyStates } from '../dist/mjs';
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

describe('Apply complex case', () => {
  checkAppliance([{
    input: [
      'nu-element',
      [
        {
          mods: [],
          notMods: ['[data-type="link"]', '[data-size="hero"]', '[data-size="large"]'],
          value: "value1",
        },
        {
          mods: ['[data-type="link"]'],
          notMods: ['[data-size="hero"]', '[data-size="large"]'],
          value: "",
        },
        {
          mods: ['[data-type="link"]', '[data-size="hero"]'],
          notMods: ['[data-size="large"]'],
          value: ""
        },
        , {
          mods: ['[data-type="link"]', '[data-size="large"]'],
          notMods: ['[data-size="hero"]'],
          value: "",
        }
        , {
          mods: ['[data-size="hero"]'],
          notMods: ['[data-type="link"]', '[data-size="large"]'],
          value: "value2",
        }, {
          mods: ['[data-size="large"]'],
          notMods: ['[data-type="link"]', '[data-size="hero"]'],
          value: "value3",
        },
      ]
    ], output: `nu-element:not([data-type="link"]):not([data-size="hero"]):not([data-size="large"]){
value1}
nu-element[data-size="hero"]:not([data-type="link"]):not([data-size="large"]){
value2}
nu-element[data-size="large"]:not([data-type="link"]):not([data-size="hero"]){
value3}
`,
  }]);
});
