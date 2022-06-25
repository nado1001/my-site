import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import { useApollo } from '../apollo/apolloClient'
import { usePageView } from '../lib/gtag'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  usePageView()

  const myTheme: MantineThemeOverride = {
    primaryColor: 'dark',
    colors: {
      dark: [
        '#d5d7e0',
        '#acaebf',
        '#8c8fa3',
        '#666980',
        '#4d4f66',
        '#34354a',
        '#01010a',
        '#1d1e30',
        '#0c0d21',
        '#01010a'
      ]
    }
  }

  return (
    <ApolloProvider client={apolloClient}>
      <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Component {...pageProps} />
        </ThemeProvider>
      </MantineProvider>
    </ApolloProvider>
  )
}

export default MyApp
