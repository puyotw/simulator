module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  // disable hashing because embed.js is external, which 
  // with hashing the url is different each build, and
  // thus not include-friendly
  filenameHashing: false,
  pages: {
    main: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'dev.html',
      title: 'PUTE TW - Puyo Simulator - Dev',
      chunks: ['chunk-vendors', 'chunk-common', 'main']
    },
    index: {
      entry: 'src/editor.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'PUTE TW - Puyo Simulator - Editor',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    player: {
      entry: 'src/player.js',
      template: 'public/index.html',
      filename: 'player.html',
      title: 'PUTE TW - Puyo Simulator - Player',
      chunks: ['chunk-vendors', 'chunk-common', 'player']
    },
  },
  configureWebpack: {
    entry: {
      embed: './src/embed.js',
    },
    output: {
      libraryExport: 'embed.js',
      libraryTarget: 'window',
    },
  }
};
