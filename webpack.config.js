const path = require("path");
const postcssImport = require("postcss-import");
const postcssNesting = require("postcss-nesting");

module.exports = {
  devtool: "none",
  stats: "errors-only",
  mode: "production",
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash:5].js",
    chunkFilename: "[name].[chunkhash:5].js",
    publicPath: "/a/",
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
              plugins: [postcssImport(), postcssNesting()],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [],
  },
};
