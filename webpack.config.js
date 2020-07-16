const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const postcssCustomMedia = require("postcss-custom-media");
const postcssImport = require("postcss-import");
const postcssMixins = require("postcss-mixins");
const postcssNesting = require("postcss-nesting");
const postcssObjectFitImages = require("postcss-object-fit-images");
const autoprefixer = require("autoprefixer");

const EXTRA_EXTRA_SMALL_MAX = 479;
const EXTRA_SMALL_MIN = 480;
const EXTRA_SMALL_MAX = 767;
const SMALL_MIN = 768;
const SMALL_MAX = 991;
const MEDIUM_MIN = 992;
const MEDIUM_MAX = 1199;
const LARGE_MIN = 1200;

const generateMediaQuery = ({ min, max }) => {
  const queries = [];

  if (typeof min !== "undefined") {
    queries.push(`min-width: ${min}px`);
  }

  if (typeof max !== "undefined") {
    queries.push(`max-width: ${max}px`);
  }

  return `(${queries.join(") and (")})`;
};

const MEDIA_QUERIES = {
  "--xxs-max": generateMediaQuery({ max: EXTRA_EXTRA_SMALL_MAX }),
  "--xs-min": generateMediaQuery({ min: EXTRA_SMALL_MIN }),
  "--xs-max": generateMediaQuery({ max: EXTRA_SMALL_MAX }),
  "--xs": generateMediaQuery({ min: EXTRA_SMALL_MIN, max: EXTRA_SMALL_MAX }),
  "--sm-min": generateMediaQuery({ min: SMALL_MIN }),
  "--sm-max": generateMediaQuery({ max: SMALL_MAX }),
  "--sm": generateMediaQuery({ min: SMALL_MIN, max: SMALL_MAX }),
  "--md-min": generateMediaQuery({ min: MEDIUM_MIN }),
  "--md-max": generateMediaQuery({ max: MEDIUM_MAX }),
  "--md": generateMediaQuery({ min: MEDIUM_MIN, max: MEDIUM_MAX }),
  "--lg-min": generateMediaQuery({ min: LARGE_MIN }),
};

const RESOLVED_EXTENSIONS = [
  // start defaults
  // https://webpack.js.org/configuration/resolve/#resolveextensions
  '.wasm',
  '.mjs',
  '.js',
  '.json',
  // end defaults
  '.ts',
  '.tsx',
];

module.exports = {
  devtool: "source-map",
  mode: 'production',
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash:5].js",
    chunkFilename: "[name].[chunkhash:5].js",
    publicPath: "/a/",
  },
  resolve: {
    plugins: [
      // Read the `baseUrl` and `paths` from `tsconfig.json` for use when resolving modules via webpack.
      // https://github.com/TypeStrong/ts-loader#baseurl--paths-module-resolution
      new TsconfigPathsPlugin({ extensions: RESOLVED_EXTENSIONS }),
    ],
    extensions: RESOLVED_EXTENSIONS,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: ".babel-cache",
            },
          },
          {
            loader: 'ts-loader',
            options: {
              // It's useful to see which TS config the loader is using
              logLevel: 'info',
              // We must set this explicit to workaround an issue with HappyPack
              // https://github.com/amireh/happypack/issues/261
              configFile: path.join(__dirname, 'tsconfig.json'),
              // Replaces happy pack mode
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              context: __dirname,
              modules: true,
              importLoaders: 1,
              localIdentName: "[hash:base64:5]",
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                postcssImport(),
                postcssCustomMedia({
                  importFrom: [{ customMedia: MEDIA_QUERIES }],
                }),

                // Must come before postcss-nesting as per docs
                postcssMixins({
                  mixinsFiles: path.join(__dirname, "styles", "Mixins.css"),
                }),

                postcssNesting(),
                postcssObjectFitImages(),
                autoprefixer(),
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    chunkIds: "named",
    minimizer: [
      // new TerserPlugin({
      //   sourceMap: true,
      //   parallel: true,
      //   cache: true,
      //   terserOptions: {
      //     // Enable React profiler in local production
      //     // https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977
      //     mangle: true,

      //     // Preserve display names for React components
      //     keep_fnames: true,
      //   },
      // }),

      // new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 0,
      maxAsyncRequests: 20,
      maxInitialRequests: 20,
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: "main.[chunkhash:5].css",
      chunkFilename: "[name].[chunkhash:5].css",
    }),
  ],
};
