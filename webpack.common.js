const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: {
      import: './src/js/index.js',
      // For ultiple Imports
      // import: ['./src/index.js', './src/index2.js'],
      // dependOn: 'shared',
    },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'shared',
    // },
    // shared: ['loadash'],
  },

  module: {
    rules: [
      // Asset Loader
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      // Fonts Loader
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
      // scss configuration
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      // Babel configuration
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // CSS Minimizer
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  optimization: {
    minimizer: ['...'],
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    // new HtmlWebpackPlugin() => Another html file
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html', // index.[contenthash].html on production
      inject: 'body',
    }),
    // css minimizer
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
  ],

  // Output
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
