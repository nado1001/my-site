// 'use client'

import '@/styles/globals.css'

// import { ApolloProvider } from '@apollo/client'
// import { ThemeProvider } from 'next-themes'
import React from 'react'

// import { useApollo } from '@/apollo/apolloClient'
import { GoogleAnalytics } from '@/lib/gtag'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const apolloClient = useApollo(children)
  // usePageView()

  return (
    <html lang="ja" className="sm:scroll-pt-[50px] scroll-smooth dark">
      <head>
        <GoogleAnalytics />
      </head>
      <body>
        {/* <ApolloProvider client={apolloClient}> */}
        {/* <ThemeProvider attribute="class" defaultTheme="dark"> */}
        {children}
        {/* </ThemeProvider> */}
        {/* </ApolloProvider> */}
      </body>
    </html>
  )
}
