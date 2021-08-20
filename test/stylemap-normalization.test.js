import { styleMapToStyleMapStateList } from '../dist/mjs/index';
import { expect } from './utils';

function checkStyleMapNormalization(list) {
  list.forEach((obj, i) => {
    it(`input ${i}`, () => {
      // @ts-ignore
      // console.log('!', styleMapToStyleMapStateList(...obj.input));
      // @ts-ignore
      expect(styleMapToStyleMapStateList(...obj.input)).to.eql(obj.output);
    });
  });
}

describe('State normalization', () => {
  checkStyleMapNormalization([
    {
      input: [
        {
          one: {
            '': 'value1',
            'mod1 & mod2': 'value2',
          },
          two: {
            '': 'value1',
            'mod1 | mod2 & mod3': 'value2',
          },
        },
        ['one']
      ],
      output: [
        { mods: [], notMods: [ 'mod1', 'mod2' ], value: { one: 'value1' } },
        { mods: [ 'mod1' ], notMods: [ 'mod2' ], value: { one: 'value1' } },
        { mods: [ 'mod1', 'mod2' ], notMods: [], value: { one: 'value2' } },
        { mods: [ 'mod2' ], notMods: [ 'mod1' ], value: { one: 'value1' } }
      ],
    },
    {
      input: [
        {
          one: {
            '': 'value1',
            'mod1 & mod2': 'value2',
          },
          two: {
            '': 'value3',
            'mod1 | mod2 & mod3': 'value4',
          },
        },
        ['one', 'two']
      ],
      output: [
        {
          mods: [],
          notMods: [ 'mod1', 'mod2', 'mod3' ],
          value: { one: 'value3', two: 'value3' }
        },
        {
          mods: [ 'mod1' ],
          notMods: [ 'mod2', 'mod3' ],
          value: { one: 'value3', two: 'value4' }
        },
        {
          mods: [ 'mod1', 'mod2' ],
          notMods: [ 'mod3' ],
          value: { one: 'value2', two: 'value4' }
        },
        {
          mods: [ 'mod1', 'mod2', 'mod3' ],
          notMods: [],
          value: { one: 'value2', two: 'value4' }
        },
        {
          mods: [ 'mod1', 'mod3' ],
          notMods: [ 'mod2' ],
          value: { one: 'value3', two: 'value4' }
        },
        {
          mods: [ 'mod2' ],
          notMods: [ 'mod1', 'mod3' ],
          value: { one: 'value3', two: 'value3' }
        },
        {
          mods: [ 'mod2', 'mod3' ],
          notMods: [ 'mod1' ],
          value: { one: 'value3', two: 'value4' }
        },
        {
          mods: [ 'mod3' ],
          notMods: [ 'mod1', 'mod2' ],
          value: { one: 'value3', two: 'value3' }
        }
      ],
    },
    {
      input: [
        {
          one: {
            '': 'value2',
            '!mod2 | mod1': 'value1',
          },
        },
        ['one']
      ],
      output: [
        { mods: [], notMods: [ 'mod2', 'mod1' ], value: { one: 'value1' } },
        { mods: [ 'mod2' ], notMods: [ 'mod1' ], value: { one: 'value2' } },
        { mods: [ 'mod2', 'mod1' ], notMods: [], value: { one: 'value1' } },
        { mods: [ 'mod1' ], notMods: [ 'mod2' ], value: { one: 'value1' } }
      ],
    },
    {
      input: [
        {
          one: {
            '': 'default',
            '[type="one"]': 'one',
            '[type="two"]': 'two',
            '[type="three"]': 'three',
            'mod': 'modvalue',
          },
        },
        ['one']
      ],
      output: [
        {
          mods: [],
          notMods: [ 'mod', '[type="three"]', '[type="two"]', '[type="one"]' ],
          value: { one: 'default' }
        },
        {
          mods: [ 'mod' ],
          notMods: [ '[type="three"]', '[type="two"]', '[type="one"]' ],
          value: { one: 'modvalue' }
        },
        {
          mods: [ 'mod', '[type="three"]' ],
          notMods: [ '[type="two"]', '[type="one"]' ],
          value: { one: 'modvalue' }
        },
        {
          mods: [ 'mod', '[type="two"]' ],
          notMods: [ '[type="three"]', '[type="one"]' ],
          value: { one: 'modvalue' }
        },
        {
          mods: [ 'mod', '[type="one"]' ],
          notMods: [ '[type="three"]', '[type="two"]' ],
          value: { one: 'modvalue' }
        },
        {
          mods: [ '[type="three"]' ],
          notMods: [ 'mod', '[type="two"]', '[type="one"]' ],
          value: { one: 'three' }
        },
        {
          mods: [ '[type="two"]' ],
          notMods: [ 'mod', '[type="three"]', '[type="one"]' ],
          value: { one: 'two' }
        },
        {
          mods: [ '[type="one"]' ],
          notMods: [ 'mod', '[type="three"]', '[type="two"]' ],
          value: { one: 'one' }
        }
      ],
    },
  ]);
});
