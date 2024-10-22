const CracoLessPlugin = require("craco-less");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA57A", // Customize as needed
              "@link-color": "#1DA57A", // Customize as needed
              "@border-radius-base": "2px", // Customize as needed
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.path = path.resolve(__dirname, "chrome-extension");

      // Add CopyWebpackPlugin to copy the entire public folder excluding index.html
      webpackConfig.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "public"),
              to: webpackConfig.output.path,
              globOptions: {
                ignore: ["**/index.html"], // Exclude index.html
              },
            },
          ],
        })
      );
      return webpackConfig;
    },
  },
};
