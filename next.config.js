const withCSS = require('@zeit/next-css');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA(
  {
    pwa: {
      dest: 'public',
      runtimeCaching,
    },
  },
  withCSS({
    cssLoaderOptions: {
      url: false,
    },
    images: {
      domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    },
  })
);
