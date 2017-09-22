module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    filename: 'dist/js/app.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
