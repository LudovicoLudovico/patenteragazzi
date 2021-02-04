import UserProvider from '../context/userContext';

import AdminProvider from '../context/adminContext';
import '../style/main.min.css';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

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
        <Component {...pageProps} />
      </UserProvider>
    </AdminProvider>
  );
};

export default App;