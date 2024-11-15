const webpack = require("webpack");
module.exports = function override(config, env) {
  config.resolve.fallback = {
    fs: false,
    tls: false,
    net: false,
    http: false,
    https: false,
    zlib: false,
    path: false,
    stream: false,
    util: false,
    crypto: require.resolve("crypto-browserify"),
    "process/browser": require.resolve("process/browser"),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
