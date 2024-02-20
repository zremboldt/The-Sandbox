import './theme-config.css';
import { Theme } from '@radix-ui/themes';
// import '@radix-ui/themes/styles.css';
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

// import stylesheet from "~/tailwind.css";

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
      </head>

        <body>
          <Theme accentColor="tomato" grayColor="slate" radius="small" scaling='110%' appearance='dark'>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </Theme>
        </body>
    </html>
  );
}
