import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  json,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import styleSheet from "./tailwind.css?url";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18nServer, { localeCookie } from "./modules/i18n.server";
import { useChangeLanguage } from "remix-i18next/react";

export const handle = { i18n: ["translation"] };

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18nServer.getLocale(request);
  return json(
    { locale },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } }
  );
};

export const meta: MetaFunction = () => {
  return [
    { title: "Inmigration Docs - LLC" },
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "Immigration Docs - LLC, Certified translations for immigration purposes with guaranteed acceptance by USCIS.",
    },
    { property: "op:title", content: "Inmigration Docs - LLC" },

    {
      property: "op:description",
      content:
        "Immigration Docs - LLC, Certified translations for immigration purposes with guaranteed acceptance by USCIS.",
    },
    { property: "op:type", content: "website" },
    { property: "op:url", content: "https://www.immigrationdocsllc.com/" },
    { property: "op:image", content: "/images/immigrationMetaLogo.webp" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styleSheet },
  {
    rel: "preload",
    href: "/fonts/interFontVar.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/images/bgPatternHero.svg",
    as: "image",
  },
  {
    rel: "preload",
    href: "/images/imageHero.webp",
    as: "image",
  },
  {
    rel: "preload",
    href: "/images/englishHero.svg",
    as: "image",
  },
  {
    rel: "preload",
    href: "/images/spanishHero.svg",
    as: "image",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang={loaderData?.locale ?? "en"} className="scroll-smooth">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 3600 * 1000,
          },
        },
      })
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}
