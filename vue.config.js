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
        let { title } = args[0];

        title = title
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // eslint-disable-next-line no-param-reassign
        args[0].title = title;

        return args;
      });
  },
};
