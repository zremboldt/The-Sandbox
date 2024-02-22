import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import '~/styles/theme-config.css';
import "~/styles/global.css";
import { Box, IconButton, Theme, ThemePanel } from '@radix-ui/themes';
import radixThemeStyles from '@radix-ui/themes/styles.css';
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from 'react';

import { RootLogo } from "~/components/root-logo";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: radixThemeStyles },
  // { rel: "stylesheet", href: globalStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   return json({ user: await getUser(request) });
// };

export const meta: MetaFunction = () => [{ title: "Root Insurance" }];

export default function App() {
  const storedAppearance = null;
  const [appearance, setAppearance] = useState(storedAppearance || 'dark');

  return (
    <html lang="en" >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>

        <body>
          <Theme accentColor="tomato" radius="small" scaling='105%' appearance={appearance}>
            {/* <ThemePanel /> */}
            <header>
              <Link to="/name" className="logo-link">
                <RootLogo />
              </Link>
            </header>

            <main>
              <Box style={{ width: 'min(100%, 500px)'}}>
                <Outlet />
              </Box>
            </main>

            <IconButton 
              variant='soft' 
              color="gray" 
              className="theme-button" 
              onClick={() => setAppearance(appearance === 'light' ? 'dark' : 'light')}
            >
              {appearance === 'light' ? (
                <MoonIcon width="18" height="18" /> 
              ) : (
                <SunIcon width="18" height="18" />
              )}
            </IconButton>
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </Theme>
        </body>
    </html>
  );
}
