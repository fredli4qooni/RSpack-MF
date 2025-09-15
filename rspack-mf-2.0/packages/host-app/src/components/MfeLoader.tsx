import React, { useEffect, useState, useCallback, type ComponentType } from 'react';
import { loadComponent } from '../utils/loadComponent';
import Spinner from './Spinner';

interface MfeLoaderProps {
  name: string;
  remoteUrl: string;
  scope: string;
  module: string;
}

type MfeComponent = ComponentType<any> | null;
// hanya butuh dua state: 'loading' dan 'loaded'
type MfeStatus = 'loading' | 'loaded';

const TIMEOUT_MS = 5000;
const RETRY_INTERVAL_MS = 5000;

/**
 * MfeLoader dengan UI loading persisten dan auto-retry.
 * Menampilkan animasi loading sampai MFE berhasil dimuat.
 *
 * @component
 */
const MfeLoader: React.FC<MfeLoaderProps> = ({ name, remoteUrl, scope, module }) => {
  const [Component, setComponent] = useState<MfeComponent>(null);
  const [status, setStatus] = useState<MfeStatus>('loading');

  const handleLoad = useCallback(async () => {
    try {
      // Tidak perlu mengatur status ke 'loading' lagi karena itu adalah state default
      const loadingPromise = loadComponent(remoteUrl, scope, module);
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Pemuatan untuk MFE "${name}" melebihi ${TIMEOUT_MS / 1000} detik.`));
        }, TIMEOUT_MS);
      });

      const LoadedComponent = await Promise.race([loadingPromise, timeoutPromise]);
      
      setComponent(() => LoadedComponent);
      setStatus('loaded'); // Hanya ubah status jika berhasil
    } catch (error) {
      // Jika gagal, tidak mengubah status. hanya mencatat error
      // dan membiarkan timer percobaan ulang berjalan.
      console.error(`Gagal memuat MFE ${name}. Mencoba kembali...`, error);
    }
  }, [name, remoteUrl, scope, module]);

  // useEffect untuk auto-retry
  useEffect(() => {
    // Jika sudah berhasil dimuat, hentikan semua proses
    if (status === 'loaded') {
      return;
    }

    // Lakukan pemuatan awal
    handleLoad();

    // Mulai timer untuk mencoba kembali
    const timerId = setInterval(() => {
      handleLoad();
    }, RETRY_INTERVAL_MS);

    // Fungsi cleanup untuk menghentikan timer
    return () => {
      clearInterval(timerId);
    };
  }, [status, handleLoad]);

  // --- Tampilan UI ---

  // Jika status adalah 'loaded' DAN Komponen ada, tampilkan MFE
  if (status === 'loaded' && Component) {
    return <Component />;
  }

  // Jika tidak, tampilkan UI loading yang persisten
  return (
    <div style={{ padding: '15px', border: '2px dashed #ccc', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
      <Spinner />
      <p style={{ marginTop: '10px', color: '#666', fontSize: '0.9em' }}>
        Memuat {name}...
      </p>
    </div>
  );
};

export default MfeLoader;