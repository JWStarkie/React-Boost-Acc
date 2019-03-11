const common = {
	// Important! Do not remove ''. If you do, imports without
	// an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

module.exports = {
  entry: ['babel-polyfill', './src/components/router.jsx'],
  output: {
    path: './src/public/js',
    filename: 'bundle.js',
    publicPath: '/public',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel?cacheDirectory'],
    }],
  },
};