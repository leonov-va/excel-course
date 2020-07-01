const path = require('path');
const webpack = require('webpack');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // выносит css из js в отдельный файл

// Cross Env
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
console.log('isDev: ', isDev);
console.log('isProd: ', isProd);
// End Cross Env

// Helpers
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    }
  }]

  // if (isDev) {
  //   loaders.push('eslint-loader');
  // }

  return loaders;
}
// End Helpers

module.exports = {
  context: path.resolve(__dirname, 'src'), // webpack смотрит за всеми исходниками в папке source (src)
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'], // учитываем что мы находимся в папке src, поэтому пишем просто ./index.js
  output: {
    filename: filename('js'), // 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "@core": path.resolve(__dirname, 'src/core')
    }
  },
  devtool: isDev ? 'source-map' : false, // for source-map (false or null)
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }, ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'), // 'bundle.[hash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [{
        test: /\.s[as]ss$/i,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader' // loader-ы идут с права на лево. Сначала sass > css > ...
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ]
  }
}