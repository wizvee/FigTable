const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  context: path.resolve(__dirname, 'src/main/react'),
  entry: ['@babel/polyfill', './index.js'],
  devtool: 'sourcemaps',
  cache: true,
  output: {
    path: __dirname,
    filename: './src/main/webapp/resources/js/index.bundle.js',
    publicPath: path.resolve(__dirname, 'src/main/webapp/resources'),
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['emotion'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new webpack.DefinePlugin(envKeys)],
};
