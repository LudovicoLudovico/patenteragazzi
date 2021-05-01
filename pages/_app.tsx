import UserProvider from '../context/userContext';

import AdminProvider from '../context/adminContext';
import '../style/main.min.css';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <AdminProvider>
      <UserProvider>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
          />
          <meta name='description' content='Description' />
          <meta name='keywords' content='Keywords' />
          <title>PatenteRagazzi</title>

          <link rel='manifest' href='/manifest.json' />
          <link
            href='/icons/favicon-16x16.png'
            rel='icon'
            type='image/png'
            sizes='16x16'
          />
          <link
            href='/icons/favicon-32x32.png'
            rel='icon'
            type='image/png'
            sizes='32x32'
          />
          <link rel='apple-touch-icon' href='/apple-icon.png'></link>
          <meta name='theme-color' content='#00408b' />
        </Head>
        <Component {...pageProps} />
      </UserProvider>
    </AdminProvider>
  );
};

export default App;
