import './theme-config.css';
import { Theme, ThemePanel } from '@radix-ui/themes';
import stylesheet from '@radix-ui/themes/styles.css';
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en" >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <style>
          {`
            body {
              margin: 0;
            }
            header {
              padding: 14px;
              border-bottom: 1px solid #ddd;
            }
            .logo-link {
              display: flex;
              color: inherit;
            }
          `}
        </style>
      </head>

        <body>
          <Theme accentColor="tomato" radius="small" scaling='105%' appearance='light'>
          {/* <ThemePanel /> */}
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </Theme>
        </body>
    </html>
  );
}
