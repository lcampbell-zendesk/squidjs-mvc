module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    filename: 'dist/js/app.js',
    devtoolModuleFilenameTemplate: "[absolute-resource-path]"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  devtool: "source-map"
}
