# TastyCSS

[![NPM Version](https://img.shields.io/npm/v/tastycss.svg?style=flat)](https://www.npmjs.com/package/tastycss)
[![Discord](https://img.shields.io/discord/793832892781690891?color=7389D8&label=chat%20on%20Discord&logo=Discord&logoColor=ffffff)](https://discord.gg/sHnHPnAPZj)

A set of modules is for CSS-in-JS solution that includes state-to-style bindings, SRR and next-level developer experience. It includes a framework-agnostic implementation 


## Installation

Framework-agnostic version:

```sh
# with npm
npm install tastycss

# with yarn
yarn add tastycss
```

React version:

```sh
# with npm
npm install tastycss styled-components

# with yarn
yarn add tastycss styled-components
```

## Documentation

TastyCSS utils allow generating performant CSS with responsiveness and style-to-state bindings.

TastyCSS React is a styled version for React Apps that uses `styled-components` under-the-hood.

### React

Let's look at styled API:

```typescript jsx
import styled from 'tastycss/dist/mjs/react';

const Element = styled({
  /** The name of the element. It can be used to override styles in context. */
  name: 'Article',
  /** The tag name of the element. */
  tag: 'span',
  /** Default styles of the element. */
  styles: {
    // tokens
    '@local-padding': ['2x', '1x'], // responsive styles
    '@text-color': 'rgba(255, 0, 0)',
    // styles
    padding: '@local-padding',
    color: {
      // the default color
      '': '#text',
      // the color if `blue` mod is specified
      blue: 'blue',
    }, // use color token
  },
  /** Default raw css of the element. */
  css: `
    appearance: none;
  `,
  /** Default attributes */
  attrs: {
    role: 'article',
  },
  availableMods: ['blue'],
});
```

Now you can use this element inside your React App:

```typescript jsx
export default function Component({ title, children }) {
  return <>
    <Heading>{title}</Heading>
    <Element>{chidlren}</Element>
  </>;
}
```

Customize styles in-place using `styles` attribute:

```typescript jsx
<Element styles={{ color: 'red' }}>{chidlren}</Element>
```

Customize styles in context:

```typescript jsx
import { StylesProvider } from 'tastycss/dist/mjs/react';

export default function Component({ title, children }) {
  return <StylesProvider Article={{
    color: 'red',
  }}>
    <Heading>{title}</Heading>
    <Element>{chidlren}</Element>
    <Element>{chidlren}</Element>
  </StylesProvider>;
}
```

#### Responsive breakpoints

Customize responsive breakpoints:

```typescript jsx
import { BreakpointsProvider } from 'tastycss/dist/mjs/react';

export default function Component({ title, children }) {
  return <BreakpointsProvider value={[1200, 960]}>
    <Heading>{title}</Heading>
    <Element>{chidlren}</Element>
    <Element>{chidlren}</Element>
  </BreakpointsProvider>;
}
```

This will create two breakpoints (1200px and 960px) which will split possible screen width into three zones: >=1200px, >=960px & <1200px, <960px.

Then you can create responsive styles with specific value for each zone:

```typescript jsx
<Element styles={{ 
  color: [
    'red', // >=1200px
    'blue', // >=960px & <1200px
    'purple', // <960px
  ],
}}>
  content
</Element>
```

#### Style-to-state bindings

Style-to-state binding works gracefully and allows to use logical operators:

```typescript jsx
// This example is not a real-life case. It's only a demonstation of library capabilities.
<Element styles={{
  color: {
    // default
    '': 'yellow',
    // if `blue` mod is presented on the element
    'blue': 'blue',
    // if `blue` mod is not presented on the element and the element is hovered
    '!blue & :hover': 'purple',
    // if `green` or `success` mod is presented on the element
    'success | green': 'green',
    // if either `red` or `danger` mod is presented on the element
    'success ^ green': 'green',
  }
}}></Element>
```

You can use even more complex expressions with brackets. The algorithm will go from the last to the first expression trying to match every possible combination of modifiers. If the combination is matched then it applies the style value to that selector.

**This documentation is work in progress. It is not yet ready.**

## Contributing

Please follow our [contributing guidelines](CONTRIBUTING.md).

## Authors

- Andrey Yamanov ([@tenphi](https://twitter.com/tenphi))

## License

TastyCSS is a project by [Forneu](https://forneu.com).

Released under the [MIT License](LICENSE).
