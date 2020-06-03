const path = require('path');

const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // выносит css из js в отдельный файл

module.exports = {
  context: path.resolve(__dirname, 'src'), // webpack смотрит за всеми исходниками в папке source (src)
  mode: 'development',
  entry: './index.js', // учитываем что мы находимся в папке src, поэтому пишем просто ./index.js
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "@core": path.resolve(__dirname, 'src/core'),
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CopyPlugin([{
      from: path.resolve(__dirname, 'src/favicon.ico'),
      to: path.resolve(__dirname, 'dist'),
    }]),
    new MiniCssExtractPlugin({
      filename: 'bundle.[hash].css'
    }),
  ]
}