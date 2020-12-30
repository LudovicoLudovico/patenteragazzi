import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='it'>
        <Head>
          <link rel='shortcut icon' href='/patenteragazzi.ico' />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            data-ad-client='ca-pub-7942078481061905'
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
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
