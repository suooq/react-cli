const paths = require('./paths');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = paths
const devServer = require(resolve('build/devServer'))
const customize = require(resolve('react.config'))

const {
  controller,
  babelPlugins,
  postcssPlugins
} = customize

const sassLoader = {
  loader: 'sass-loader',
}

const lessLoader = {
  loader: 'less-loader',
  options: {
    lessOptions: {
      javascriptEnabled: true
    },
  },
}

const cssloader = isModule => ({
  loader: 'css-loader',
  options: {
    modules: isModule ? {
      localIdentName: '[local]_[hash:base64:5]',
    } : false,
  }
})

const babelLoader = (plugins = []) => [{
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [
      ['@babel/env'],
      ['@babel/react']
    ],
    plugins: [
      ['@babel/transform-runtime', { corejs: 3, proposals: true }],
      ...plugins
    ]
  }
}]

const postcssLoader = (plugins = []) => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        'autoprefixer',
        ...plugins
      ]
    }
  }
})

const defStyleLoader = (mode, isModule) => {
  const isDevMode = mode === 'development'
  return [
    isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
    cssloader(isModule),
    postcssLoader(postcssPlugins)
  ]
}

module.exports = env => {
  // 接 化 发 ！！
  const mode = env
  const isDevMode = mode === 'development'
  process.env.NODE_ENV = mode


  return {
    mode,

    entry: [
      ...customize.entry,
      paths.appIndex
    ],

    output: {
      path: paths.dist,
      filename: isDevMode ? '[name].[contenthash:8].js' : '[contenthash:8].js',
      chunkFilename: isDevMode ? '[name].[contenthash:8].chunk.js' : '[contenthash:6].js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: babelLoader(babelPlugins)
            },

            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: defStyleLoader(mode, false)
            },

            {
              test: /\.module\.css$/,
              use: defStyleLoader(mode, true)
            },

            {
              test: /\.less$/,
              exclude: /\.module\.less$/,
              use: defStyleLoader(mode, false).concat(lessLoader),
            },

            {
              test: /\.module\.less$/,
              use: defStyleLoader(mode, true).concat(lessLoader),
            },

            {
              test: /\.sass$/,
              exclude: /\.module\.sass$/,
              use: defStyleLoader(mode, false).concat(sassLoader),
            },

            {
              test: /\.module\.sass$/,
              use: defStyleLoader(mode, true).concat(sassLoader),
            },

            {
              test: /\.(bmp|gif|jpe?g|png|svg)$/,
              loader: 'url-loader',
              options: {
                limit: 1024 * 10,
                name: '[name].[hash:8].[ext]',
              },
            },

            {
              loader: 'file-loader',
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: '[name].[hash:8].[ext]',
              },
            }
          ].filter(Boolean)
        },
      ]
    },

    plugins: [
      // eslint 开关
      (controller.eslint && isDevMode) && new ESLintPlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].chunk.css',
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
      }),

      ...customize.plugins,
    ].filter(Boolean),

    optimization: {
      minimize: !isDevMode,
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime.${entrypoint.name}`,
      },
    },

    devServer: Object.assign(
      devServer,
      customize.devServer
    ),

    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.wasm', '.json'],
      alias: {
        '@': paths.src,
        '#': paths.components,
        ...customize.aliasPath
      },
    },

    devtool: isDevMode ? 'cheap-module-source-map' : false,
    performance: false
  }
}