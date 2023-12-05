import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import type { DataFunctionArgs, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getHints } from "./utils/client-hints";

export async function loader({ request }: DataFunctionArgs) {
  return json({
    // other stuff here...
    requestInfo: {
      hints: getHints(request),
    },
  });
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  const { requestInfo } = useLoaderData<typeof loader>();

  console.log(requestInfo.hints);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
