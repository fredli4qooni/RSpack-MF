import React, { useEffect, useState, type ComponentType } from 'react';
import { Button } from '@mfe/ui-kit';
import { loadComponent } from '../utils/loadComponent';

interface MfeLoaderProps {
  name: string;
  remoteUrl: string;
  scope: string;
  module: string;
}

type MfeComponent = ComponentType<any> | null;
type MfeStatus = 'idle' | 'loading' | 'loaded' | 'error';

// mendefinisikan durasi timeout dalam milidetik
const TIMEOUT_MS = 5000; // 5 detik

/**
 * MfeLoader adalah komponen untuk memuat MFE secara dinamis.
 * Sekarang menyertakan logika timeout untuk pemuatan.
 *
 * @component
 */
const MfeLoader: React.FC<MfeLoaderProps> = ({ name, remoteUrl, scope, module }) => {
  const [Component, setComponent] = useState<MfeComponent>(null);
  const [status, setStatus] = useState<MfeStatus>('idle');

  const handleLoad = async () => {
    try {
      setStatus('loading');

      // --- LOGIKA TIMEOUT DIMULAI DI SINI ---

      // Promise 1: Pemuatan MFE 
      const loadingPromise = loadComponent(remoteUrl, scope, module);

      // Promise 2: Promise yang akan gagal setelah TIMEOUT_MS
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Pemuatan untuk MFE "${name}" melebihi ${TIMEOUT_MS / 1000} detik.`));
        }, TIMEOUT_MS);
      });

      // Jalankan!
      // 'await' akan menunggu promise pertama yang selesai (baik berhasil maupun gagal).
      const LoadedComponent = await Promise.race([loadingPromise, timeoutPromise]);
      
      // --- LOGIKA TIMEOUT SELESAI ---

      setComponent(() => LoadedComponent);
      setStatus('loaded');
    } catch (error) {
      console.error(`Gagal memuat MFE ${name}:`, error);
      setStatus('error');
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  if (status === 'loading' || status === 'idle') {
    return <div>Memuat {name}... (Timeout dalam {TIMEOUT_MS / 1000} detik)</div>;
  }

  if (status === 'error') {
    return (
      <div style={{ padding: '15px', border: '2px dashed red', borderRadius: '5px', backgroundColor: '#fff0f0', textAlign: 'center' }}>
        <h3 style={{ color: 'red', margin: 0 }}>Error!</h3>
        <p style={{ margin: '5px 0 10px 0' }}>
          Komponen dari "<strong>{name}</strong>" gagal dimuat.
        </p>
        <Button onClick={handleLoad}>Coba Lagi</Button>
      </div>
    );
  }

  if (status === 'loaded' && Component) {
    return <Component />;
  }

  return null;
};

export default MfeLoader;