const path = require("path");

module.exports = {
  devtool: "none",
  stats: "errors-only",
  mode: "production",
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:5].js",
    chunkFilename: "[name].[contenthash:5].js",
  },
  module: {
    rules: [
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
        ],
      },
    ],
  },
  optimization: {
    minimizer: [],
  },
};
