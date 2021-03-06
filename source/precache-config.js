const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!\/__)/],
  stripPrefix: 'dist',
  root: 'dist/',
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: 'BetterGymWue',
      filename: 'sw.js',
      staticFileGlobs: [
        'dist/**'
      ],
      stripPrefix:'dist/assets',
      mergeStatisticsConfig: true
    })
  ]
};
