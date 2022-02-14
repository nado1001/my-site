import '../styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import { useApollo } from '../apollo/apolloClient'
import { usePageView } from '../lib/gtag'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  usePageView()

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
