import { tasty } from 'tastycss';

import type { NextPage } from 'next';

const Element = tasty({
  as: 'span',
  styles: {
    '@local-padding': ['2x', '1x'], // responsive styles
    '@text-color': 'rgba(255, 0, 0)',
    padding: '@local-padding',
    color: {
      '': '#text',
      blue: 'blue',
    },
  },
  role: 'article',
  styleProps: ['align'],
});

const Heading = tasty({
  as: 'h1',
  styles: {
    styleProps: ['align'],
  },
});

const Home: NextPage = () => {
  return (
    <div>
      <Heading> TastyCSS</Heading>
      <Element> yum!</Element>
    </div>
  );
};

export default Home;
