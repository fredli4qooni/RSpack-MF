import type { Configuration } from "@rspack/cli";
import rspack from "@rspack/core";

// Mengimpor plugin dari namespace 'container' milik Rspack.
// Ini adalah cara standar untuk mengakses Module Federation v1.5 bawaan.
const { ModuleFederationPlugin } = rspack.container;

const config: Configuration = {
  entry: { main: "./src/main.tsx" },
  experiments: { css: true },
  devServer: { port: 3001, historyApiFallback: true },
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

    /**
     * Konfigurasi inti untuk Module Federation v1.5 (bawaan Rspack).
     */
    new ModuleFederationPlugin({
      name: "mfe1",
      filename: "remoteEntry.js",
      exposes: {
        "./CounterOne": "./src/components/CounterOne.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0", eager: true },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0",
          eager: true,
        },
      },
      // Perhatikan: Tidak ada properti 'dts' di sini. Penanganan tipe di host
      // sepenuhnya bergantung pada file deklarasi manual (.d.ts).
    }),
  ],
};
export default config;
