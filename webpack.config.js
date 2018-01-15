module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  }
}
