import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600&family=Noto+Sans+Bengali:wght@400;700&display=swap"
            rel="stylesheet"
          />
          {/* Google Analytics GA4 Script */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID`}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'YOUR_MEASUREMENT_ID');
              `,
            }}
          />
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
