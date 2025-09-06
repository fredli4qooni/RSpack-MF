import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import type { Configuration } from "@rspack/cli";
import rspack from "@rspack/core";

const config: Configuration = {
  entry: { main: "./src/main.tsx" },
  experiments: { css: true },
  devServer: {
    port: 3000, // Port utama untuk aplikasi gabungan.
    historyApiFallback: true,
  },
  output: { publicPath: "auto" },
  resolve: { extensions: ["...", ".ts", ".tsx", ".jsx"] },
  module: {
    rules: [
      { test: /\.css$/, type: "css" },
      { test: /\.svg$/, type: "asset" },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: { syntax: "typescript", tsx: true },
                transform: { react: { runtime: "automatic" } },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: "./index.html" }),
    new ModuleFederationPlugin({
      name: "host_app",

      /**
       * Daftar MFE remote yang akan dikonsumsi oleh host ini.
       * Key ('mfe1') adalah nama lokal yang akan digunakan untuk import.
       * Value ('mfe1@http://...') adalah URL ke file manifest remote.
       */
      remotes: {
        mfe1: "mfe1@http://localhost:3001/remoteEntry.js",
        mfe2: "mfe2@http://localhost:3002/remoteEntry.js",
      },

      // Konfigurasi shared harus cocok dengan yang ada di remote.
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0", eager: true },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0",
          eager: true,
        },
      },
    }),
  ],
};
export default config;
