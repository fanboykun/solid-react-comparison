import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'

/** @ts-ignore skibidi toilet */
import '@fontsource/inter'

import { HydrationScript } from 'solid-js/web'
import { Suspense } from 'solid-js'
import TanStackQueryProvider from '../integrations/tanstack-query/provider.tsx'

import Header from '../components/Header'

import styleCss from '../styles.css?url'

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [{ rel: 'stylesheet', href: styleCss }],
  }),
  shellComponent: RootComponent,
})

function RootComponent() {
  return (
    <html>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <Suspense>
          <TanStackQueryProvider>
            <Header />

            <Outlet />
            <TanStackRouterDevtools />
          </TanStackQueryProvider>
        </Suspense>
        <Scripts />
      </body>
    </html>
  )
}
