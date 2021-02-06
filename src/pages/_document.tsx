import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

const PRELOADED_FONTS = [
  "/fonts/Inter-Regular.woff2",
  "/fonts/Inter-SemiBold.woff2",
  "/fonts/Inter-Bold.woff2",
];

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const styledComponentsSheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            styledComponentsSheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
          {PRELOADED_FONTS.map((fontPath) => (
            <link
              key={fontPath}
              rel="preload"
              href={fontPath}
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
