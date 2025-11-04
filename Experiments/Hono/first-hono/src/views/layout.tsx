import { css, Style } from "hono/css";
import type { FC } from "hono/jsx";

export const Layout: FC = (props) => {
  return (
    <html class={globalStyles}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.indigo.min.css"
        ></link>
        {/* <Style /> */}
      </head>
      <body>
        <nav>
          <ul>
            <li>
              <strong>Acme Corp</strong>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
          </ul>
        </nav>
        <main class="container">{props.children}</main>
      </body>
    </html>
  );
};

const globalStyles = css`
  :-hono-global {
    :root {
      --primary-hue: 260;
      --secondary-hue: 220;
      --danger-hue: 350;
      --color-bg: hsl(var(--secondary-hue) 20% 5%);
      --color-border: hsl(var(--secondary-hue) 20% 28% / 0.4);
      --color-text: hsl(var(--secondary-hue) 20% 90%);
      --color-placeholder: hsl(var(--secondary-hue) 20% 60%);
      --input-height: 2.5rem;
      --input-radius: 3px;
      --focus-ring: 0 0 0 4px hsla(var(--primary-hue) 100% 40% / 0.3);
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    html {
      font-family: -apple-system, BlinkMacSystemFont, "Open Sans",
        "Helvetica Neue", sans-serif;
      font-size: 16px;
      line-height: 1.5;
      color: var(--color-text);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    body {
      margin: 0;
      padding: min(20vw, 100px) 20px 20px;
      background-color: var(--color-bg);
      /* prettier-ignore */
      background-image: radial-gradient(circle at 50% 10%, hsl(var(--primary-hue) 70% 7%) 0%, hsl(var(--primary-hue) 100% 0%) 100%);
      height: 100svh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      margin: 0;
    }
    input {
      font-family: inherit;
      height: var(--input-height);
      padding: 0.5rem;
      border-radius: var(--input-radius);
      border: 1px solid var(--color-border);
      background-color: hsl(var(--secondary-hue) 20% 0% / 0.2);
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
      font-weight: 600;
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
    .button-danger {
      background-color: hsl(var(--danger-hue) 75% 50%);
      border: 1px solid hsl(var(--danger-hue) 75% 50%);
      &:hover {
        background-color: hsl(var(--danger-hue) 75% 40%);
      }
    }
    .card {
      width: min(400px, 90vw);
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid var(--color-border);
      box-shadow: 0 6px 20px -2px hsl(var(--secondary-hue) 20% 0% / 0.5);
      background-color: hsl(var(--secondary-hue) 20% 14% / 0.4);
    }
  }
`;
