const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssLoaderOptions: {
    url: false,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
});
