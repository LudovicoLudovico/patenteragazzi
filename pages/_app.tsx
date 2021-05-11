import UserProvider from '../context/userContext';

import AdminProvider from '../context/adminContext';
import '../style/main.min.css';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

import Head from 'next/head';

import '../style/normalize.min.css';

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
            name='description'
            content='Quiz Patente AM/B - PatenteRagazzi'
          />
          <meta name='keywords' content='Patente B AM Teoria' />
          <title>PatenteRagazzi</title>

          <link rel='manifest' href='/manifest.json' />

          <link rel='apple-touch-icon' href='/apple-icon.png'></link>
          <meta name='theme-color' content='#00408b' />
        </Head>
        <Component {...pageProps} />
      </UserProvider>
    </AdminProvider>
  );
};

export default App;
