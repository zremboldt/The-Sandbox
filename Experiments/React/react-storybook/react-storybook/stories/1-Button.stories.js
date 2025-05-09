import React from 'react';
import { action } from '@storybook/addon-actions';
// import { Button } from '@storybook/react/demo';
import { Button } from '../src/components/Button';

export default {
  title: 'Button'
};

// export const text = () => <Button onClick={action('clicked')}>Hello Button</Button>;

export const emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

const text = 'Testing button labels';

export const label = () => <Button label={text} />;
