# TastyCSS

CSS-in-JS solution modules that include state-to-style bindings, SSR, and next-level developer experience.

[![NPM Version](https://img.shields.io/npm/v/tastycss.svg?style=flat)](https://www.npmjs.com/package/tastycss)
[![Discord](https://img.shields.io/discord/793832892781690891?color=7389D8&label=chat%20on%20Discord&logo=Discord&logoColor=ffffff)](https://discord.gg/sHnHPnAPZj)


## Installation

```sh
# with npm
npm install tastycss

# with yarn
yarn add tastycss
```

## Usage of Tasty API

Let's look at styled API:

```typescript jsx
import { tasty } from 'tastycss';

const Element = tasty({
  /** The tag name of the element. */
  as: 'span',
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
  /** Default attributes (example) */
  role: 'article',
  /** The list of styles that can be provided by props */
  styleProps: ['align'],
});
```

Now you can use this element inside your React App:

```typescript jsx
export default function Component({ title, children }) {
  return (
    <>
      <Heading>{title}</Heading>
      <Element>{children}</Element>
    </>
  );
}
```

#### Extend base options

You can use `tasty()` function to extend styling of the existing component.

```typescript jsx
const CustomElement = tasty(Element, {
  /** Change tag name */
  as: 'input',
  /** Extend or rewrite styles */
  styles: {
    color: '#purple',
  },
  /** Add more default properties/attributes */
  role: 'article',
});
```

**Documentation is work in progress.**

## Contributing

Please follow our [contributing guidelines](CONTRIBUTING.md).

## Authors

- Andrey Yamanov ([@tenphi](https://twitter.com/tenphi))

## License

TastyCSS is a project by [Forneu](https://forneu.com).

Released under the [MIT License](LICENSE).
