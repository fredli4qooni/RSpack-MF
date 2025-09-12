// untuk melacak skrip yang sudah dimuat agar tidak memuat ulang
const loadedScripts = new Map<string, Promise<void>>();

/**
 * Memuat remoteEntry.js dari sebuah MFE secara dinamis.
 * @param {string} remoteUrl - URL ke file remoteEntry.js.
 * @returns {Promise<void>}
 */
function loadRemoteEntry(remoteUrl: string): Promise<void> {
  if (loadedScripts.has(remoteUrl)) {
    return loadedScripts.get(remoteUrl)!;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = remoteUrl;
    script.async = true;

    script.onload = () => {
      console.log(`Dynamic script loaded: ${remoteUrl}`);
      resolve();
    };

    script.onerror = (err) => {
      console.error(`Dynamic script error: ${remoteUrl}`, err);
      // menghapus cache jika gagal agar bisa dicoba lagi
      loadedScripts.delete(remoteUrl);
      reject(new Error(`Failed to load dynamic script: ${remoteUrl}`));
    };

    document.head.appendChild(script);
  });

  loadedScripts.set(remoteUrl, promise);
  return promise;
}

/**
 * Memuat komponen yang diekspos dari MFE yang sudah dimuat.
 * @param {string} scope - Nama global MFE (misalnya, 'mfe2').
 * @param {string} module - Alias modul yang diekspos (misalnya, './CounterTwo').
 * @returns {Promise<React.ComponentType<any>>}
 */
async function loadExposedModule(
  scope: string,
  module: string
): Promise<React.ComponentType<any>> {
  // Tidak perlu @ts-ignore lagi karena __webpack_init_sharing__ sudah dideklarasikan secara global
  await __webpack_init_sharing__("default");

  const container = window[scope] as any;
  if (!container) {
    throw new Error(`MFE container not found for scope: ${scope}`);
  }

  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  if (!factory) {
    throw new Error(`Module ${module} not found in MFE scope: ${scope}`);
  }

  const Module = factory();
  return Module.default;
}

/**
 * Fungsi utama untuk memuat komponen MFE.
 * @param {string} remoteUrl - URL ke remoteEntry.js.
 * @param {string} scope - Nama global MFE.
 * @param {string} module - Alias modul yang diekspos.
 * @returns {Promise<React.ComponentType<any>>}
 */
export async function loadComponent(
  remoteUrl: string,
  scope: string,
  module: string
): Promise<React.ComponentType<any>> {
  await loadRemoteEntry(remoteUrl);
  return await loadExposedModule(scope, module);
}
