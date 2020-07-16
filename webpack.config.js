const path = require("path");
const postcssImport = require("postcss-import");
const postcssNesting = require("postcss-nesting");

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
  stats: "errors-only",
  mode: 'production',
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash:5].js",
    chunkFilename: "[name].[chunkhash:5].js",
    publicPath: "/a/",
  },
  resolve: {
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

                postcssNesting(),
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    chunkIds: "named",
    minimizer: [],
  },
};
