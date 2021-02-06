const {
  name,
  version,
  author,
  homepage,
} = require('./package.json');

const appName = name
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

process.env.VUE_APP_NAME = appName;
process.env.VUE_APP_VERSION = version;
process.env.VUE_APP_AUTHOR = author;
process.env.VUE_APP_HOMEPAGE = homepage;

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    devtool: 'source-map',
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        const arg = args[0];

        arg.title = appName;

        return args;
      });
  },
};
