require('dotenv/config');
const path = require('path');

const clientPath = path.join(__dirname, 'client/src');
const buildPath = path.join(__dirname, 'client/build/');
const public = path.join(__dirname, 'client/build')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  entry: clientPath,
  output: {
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.ts*/,
        exclude: /node_modules/,
        include: clientPath,
        use: 'ts-loader'
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        include: clientPath,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: '3000',
    static: {
      directory: public,
      publicPath: '/',
      watch: true
    },
    proxy: {
      '/api': `http://localhost:${process.env.SERVER_PORT}`
    }
  },
  stats: 'errors-warnings',
  performance: {
    hints: false
  }
};
