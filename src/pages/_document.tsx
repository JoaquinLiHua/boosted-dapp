import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/Formular-Mono.ttf"
            as="font"
            crossOrigin=""
          />
          <link rel="shortcut icon" href="/images/favicon.ico" />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
