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

/**
 * MfeLoader adalah komponen canggih untuk memuat MFE secara dinamis.
 * Mengelola state loading, error, dan retry dengan memuat skrip secara manual.
 *
 * @component
 */
const MfeLoader: React.FC<MfeLoaderProps> = ({ name, remoteUrl, scope, module }) => {
  const [Component, setComponent] = useState<MfeComponent>(null);
  const [status, setStatus] = useState<MfeStatus>('idle');

  const handleLoad = async () => {
    try {
      setStatus('loading');
      const LoadedComponent = await loadComponent(remoteUrl, scope, module);
      setComponent(() => LoadedComponent); // Simpan komponen sebagai fungsi
      setStatus('loaded');
    } catch (error) {
      console.error(`Failed to load MFE ${name}:`, error);
      setStatus('error');
    }
  };

  useEffect(() => {
    handleLoad();
  }, []); // Hanya dijalankan sekali saat mount

  if (status === 'loading' || status === 'idle') {
    return <div>Memuat {name}...</div>;
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
  export default MfeLoader;