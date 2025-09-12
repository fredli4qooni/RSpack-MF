// Memberitahu TypeScript karna menambahkan properti kustom ke objek Window.
interface Window {
  // untuk mengindeks window dengan string apa pun, mis., window['mfe1']
  [key: string]: any;
}

// Mendeklarasikan variabel global yang disuntikkan oleh runtime Module Federation.
// mengatasi error "Cannot find name".
declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: any };
