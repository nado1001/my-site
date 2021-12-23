import type { DocumentContext } from 'next/document'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html style={{ scrollBehavior: 'smooth' }}>
        <Head />
        <body className="bg-bg01 dark:bg-darkBg01">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
