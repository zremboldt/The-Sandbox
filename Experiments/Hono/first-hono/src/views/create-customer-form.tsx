import { css, Style } from "hono/css";
import type { FC } from "hono/jsx";

export const CreateCustomerScene: FC = (props) => {
  const globalStyles = css`
    :-hono-global {
      :root {
        --color-bg: hsl(210 20% 5%);
        --color-card-bg: hsl(210 20% 8%);
        --color-border: hsl(210 20% 16%);
        --color-text: hsl(210 20% 90%);
        --color-placeholder: hsl(210 20% 60%);
        --input-height: 2.5rem;
        --input-radius: 3px;
        --primary-hue: 260;
        --focus-ring: 0 0 0 4px hsla(var(--primary-hue) 100% 40% / 0.3);
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      html {
        font-family: Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      body {
        margin: 0;
        padding: 0;
        background-color: var(--color-bg);
        height: 100svh;
        display: grid;
        place-items: center;
      }
      form {
        margin: 0;
      }
      input {
        font-family: inherit;
        height: var(--input-height);
        padding: 0.5rem;
        border-radius: var(--input-radius);
        border: 1px solid var(--color-border);
        background-color: hsl(210 20% 0% / 0.2);
        color: var(--color-text);
        outline: none;
        transition: all 0.15s ease-out;
        &::placeholder {
          color: var(--color-placeholder);
        }
        &:focus-visible {
          border-color: hsl(var(--primary-hue) 100% 40%);
          box-shadow: var(--focus-ring);
        }
      }
      button {
        font-family: inherit;
        height: var(--input-height);
        padding: 0.5rem;
        border-radius: var(--input-radius);
        border: none;
        background-color: hsl(var(--primary-hue) 100% 50%);
        border: 1px solid hsl(var(--primary-hue) 100% 50%);
        color: white;
        cursor: pointer;
        outline: none;
        transition: all 0.15s ease-out;
        &:focus-visible {
          box-shadow: var(--focus-ring);
        }
        &:hover {
          background-color: hsl(var(--primary-hue) 100% 40%);
        }
      }
    }
  `;

  return (
    <html class={globalStyles}>
      <head>
        <Style />
      </head>
      <body>
        <CreateCustomerForm />
      </body>
    </html>
  );
};

const CreateCustomerForm = () => {
  const cardStyles = css`
    width: min(400px, 90vw);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--color-border);
    box-shadow: 0 6px 20px -2px hsl(210 20% 0% / 0.5);
    background-color: var(--color-card-bg);
  `;

  const formStyles = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;

  return (
    <div class={cardStyles}>
      <form action="/customers" method="post" class={formStyles}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          autocomplete="off"
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          autocomplete="off"
          required
        />
        <button type="submit">Create customer</button>
      </form>
    </div>
  );
};
