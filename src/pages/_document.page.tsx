import { createGetInitialProps } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'

import { GoogleAnalytics } from '../lib/gtag'

const getInitialProps = createGetInitialProps()

class MyDocument extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html
        style={{ scrollBehavior: 'smooth' }}
        className="sm:scroll-pt-[50px]"
      >
        <Head>
          <link href="/favicon.svg" rel="icon" />
          <GoogleAnalytics />
        </Head>
        <body className="bg-bg01 dark:bg-darkBg01">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
