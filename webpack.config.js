const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // ... other config
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      inject: true,
    }),
    // ... other plugins
  ],
  // ... other config
};
