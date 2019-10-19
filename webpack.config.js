const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src/main/react'),
  entry: {
    index: './index.js',
  },
  devtool: 'sourcemaps',
  cache: true,
  output: {
    path: __dirname,
    filename: './src/main/webapp/resources/js/[name].bundle.js',
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
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
