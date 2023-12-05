import { cssBundleHref } from "@remix-run/css-bundle";
import { json, redirect } from "@remix-run/node";
import type {
  ActionFunctionArgs,
  DataFunctionArgs,
  LinksFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { ClientHintCheck, getHints } from "./utils/client-hints";
import styles from "./tailwind.css";

export async function loader({ request }: DataFunctionArgs) {
  return json({
    // other stuff here...
    requestInfo: {
      hints: getHints(request),
      userPrefs: {
        theme: getTheme(request),
      },
    },
  });
}

export function getTheme(request: Request) {
  const cookieHeader = request.headers.get("cookie");
  const parsed = cookieHeader
    ?.split("; ")
    .find((c) => c.startsWith("theme="))
    ?.split("=")[1];
  if (parsed === "light" || parsed === "dark") return parsed;
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  return redirect("/", {
    headers: {
      "Set-Cookie": `theme=${
        request.headers.get("Cookie")?.includes("theme=dark") ? "light" : "dark"
      }; Path=/; HttpOnly; SameSite=Lax`,
    },
  });
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export default function App() {
  const { requestInfo } = useLoaderData<typeof loader>();

  console.log(requestInfo.hints);
  return (
    <html
      lang="en"
      className={requestInfo?.userPrefs.theme ?? requestInfo?.hints?.theme}
    >
      <head>
        <ClientHintCheck nonce={requestInfo.nonce} />
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
