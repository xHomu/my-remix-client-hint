import type { MetaFunction } from "@remix-run/node";
import { Form, useRouteLoaderData } from "@remix-run/react";
import { useHints } from "~/utils/client-hints";
import type { loader as rootLoader } from "../root";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { requestInfo } = useRouteLoaderData<typeof rootLoader>("root");

  console.log(requestInfo);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-blue-500 dark:text-red-500">Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <Form method="post" action="/">
        <input
          type="hidden"
          name="theme"
          value={
            requestInfo?.userPrefs?.theme ??
            requestInfo?.hints?.theme === "dark"
              ? "light"
              : "dark"
          }
        />
        <button type="submit">
          Toggle Theme: currently{" "}
          {requestInfo?.userPrefs?.theme ?? requestInfo?.hints?.theme}
        </button>
      </Form>
    </div>
  );
}
