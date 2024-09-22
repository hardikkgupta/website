import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Hardik Gupta"
        />
        <meta name="image" content="https://bonhomme.lol/meta-og.png" />
        <meta itemProp="name" content="Hardik" />
        <meta
          itemProp="description"
          content="Hardik Gupta"
        />
        <meta itemProp="image" content="https://bonhomme.lol/meta-og.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Hardik Gupta" />
        <meta
          name="twitter:description"
          content="Hardik Gupta"
        />
        <meta name="twitter:site" content="@pixel_arts" />
        <meta name="twitter:creator" content="@pixel_arts" />
        <meta name="twitter:image:src" content="https://bonhomme.lol/meta-og.png" />
        <meta name="og:title" content="Hardik Gupta" />
        <meta
          name="og:description"
          content="Hardik Gupta"
        />
        <meta name="og:image" content="https://bonhomme.lol/meta-og.png" />
        <meta name="og:url" content="https://bonhomme.lol/" />
        <meta name="og:site_name" content="Bonhomme" />
        <meta name="og:type" content="website" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
