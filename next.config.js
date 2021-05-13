const withCSS = require('@zeit/next-css');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA(
  withCSS({
    cssLoaderOptions: {
      url: false,
    },
    images: {
      domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    },
  }),
  {
    pwa: {
      dest: 'public',
      mode: 'production',
      // disable: process.env.NODE_ENV === 'development',
      disable: true,
      runtimeCaching,
    },
  }
);
