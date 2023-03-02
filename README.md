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

# with pnpm
pnpm add tastycss
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

#### Define global styles

Use `tasty()` to define global styles for elements:

```typescript jsx
import { tasty } from 'tastycss';

const GlobalStyledHeading = tasty('.myButton', {
  display: 'inline-block',
  padding: '1x 2x',
  preset: 't2',
  border: true,
  radius: true,
});
```

#### Style variants

You can reduce the amount of CSS for your component by splitting it into variants.

```typescript jsx
import { tasty } from 'tastycss';

const StyledButton = tasty(Button, {
  styles: {
    /* default styles */
  },
  variants: {
    // define themes using variants
    default: {
      // default (fallback) variant
      // define new styles for `default` variant or override default styles.
    },
    danger: {
      // define new styles for `danger` variant or override default styles.
    },
  },
});
```

Usage example:

```typescript jsx
<StyledButton variant="danger">Danger Button</StyledButton>
```

If the `variant` prop is not provided then the `default` variant will be used.

> IMPORTANT: It's preferred that the component will not receive any change in `variant` prop to avoid style replacement. But this case is supported.

**Documentation is work in progress.**

## Contributing

Please follow our [contributing guidelines](CONTRIBUTING.md).

## License

TastyCSS is a project by [Outpost](https://outpost.run).

Released under the [MIT License](LICENSE).
