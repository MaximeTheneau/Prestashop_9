const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const LicensePlugin = require('webpack-license-plugin');

let config = {
  entry: {
    theme: ['./js/theme.js', './css/theme.scss'],
    error: ['./css/error.scss'],
  },
  output: {
    path: path.resolve(__dirname, '../assets/js'),
    filename: '[name].js',
  },
  resolve: {
    preferRelative: true,
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'esbuild-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // Ajoutez postcss-loader ici
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /.(png|woff(2)?|eot|otf|ttf|svg|gif)(\?[a-z0-9=\.]+)?$/,
        type: 'asset/resource',
        generator: {
          filename: '../css/[hash][ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'postcss-loader', // Ajoutez postcss-loader ici
        ],
        include: [
          path.resolve(__dirname, '../themes/maxime_t/assets/css')
        ],
      },
    ],
  },
  externals: {
    prestashop: 'prestashop',
  },
  plugins: [
    new MiniCssExtractPlugin({filename: path.join('..', 'css', '[name].css')}),
    new CssoWebpackPlugin({
      forceMediaMerge: true,
    }),
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
  };
}

module.exports = config;
