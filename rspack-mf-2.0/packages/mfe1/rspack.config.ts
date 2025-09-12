import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import type { Configuration } from "@rspack/cli";
import rspack from "@rspack/core";

const config: Configuration = {
  entry: { main: "./src/main.tsx" },
  experiments: { css: true },
  devServer: {
    port: 3001, // Port unik untuk MFE ini agar bisa berjalan mandiri.
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

    /**
     * Konfigurasi inti untuk Module Federation v2.0.
     * Ini mengubah aplikasi ini menjadi sebuah microfrontend.
     */
    new ModuleFederationPlugin({
      // Nama untuk MFE ini. Akan digunakan oleh host untuk mengimpor.
      name: "mfe1",

      // Nama file manifest yang akan dihasilkan. Host akan menunjuk ke file ini.
      filename: "remoteEntry.js",

      /**
       * Daftar modul yang diekspos oleh MFE ini.
       * Key ('./CounterOne') adalah alias yang akan digunakan host.
       * Value ('./src/components/CounterOne.tsx') adalah path sebenarnya ke file.
       */
      exposes: {
        "./CounterOne": "./src/components/CounterOne.tsx",
      },

      /**
       * Dependensi yang akan dibagikan dengan MFE lain.
       * 'singleton: true' memastikan hanya ada satu instance React di seluruh aplikasi.
       * 'eager: true' memuat dependensi ini secara sinkron di awal.
       */
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0", eager: true },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0",
          eager: true,
        },
      },

      /**
       * Fitur v2.0: Secara otomatis menghasilkan file deklarasi TypeScript (.d.ts)
       * untuk modul yang diekspos, memungkinkan type-safety di sisi host.
       */
      dts: { tsConfigPath: "./tsconfig.json" },
    }),
  ],
};
export default config;
