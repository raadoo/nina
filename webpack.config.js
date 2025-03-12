import path from "path";

export default {
  entry: {
    index: "./src/components/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(process.cwd(), "dist"),
    library: "nina-web-components",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  },
  devServer: {
    static: "./dist",
  },
  mode: "production", // Change to 'production' for optimized builds
};
