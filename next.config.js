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
    future: {
      webpack5: true,
    },
  }),
  {
    pwa: {
      dest: 'public',
      mode: 'production',
      runtimeCaching,
    },
  }
);
