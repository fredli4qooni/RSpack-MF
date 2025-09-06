import React, { Suspense } from 'react';

// Mengimpor komponen secara dinamis dari microfrontend remote.
// React.lazy memungkinkan komponen ini dimuat hanya saat dibutuhkan.
const CounterOne = React.lazy(() => import('mfe1/CounterOne'));
const CounterTwo = React.lazy(() => import('mfe2/CounterTwo'));

/**
 * Komponen App utama untuk host-app.
 * Bertindak sebagai "shell" atau "integrator" dalam arsitektur microfrontend.
 * Tugas utamanya adalah mengimpor komponen dari MFE remote (`mfe1`, `mfe2`)
 * dan merakitnya menjadi satu tampilan dasbor yang kohesif.
 *
 * @component
 * @returns {JSX.Element} Halaman dasbor utama yang menampilkan gabungan MFE.
 */
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dasboard Host App</h1>
      <p>Halaman ini menggabungkan komponen dari MFE 1 dan MFE 2.</p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* 
          Suspense digunakan sebagai fallback UI, menampilkan pesan "memuat"
          selama kode untuk MFE remote sedang diunduh melalui jaringan.
        */}
        <Suspense fallback={<div>Memuat MFE 1...</div>}>
          <CounterOne />
        </Suspense>
        <Suspense fallback={<div>Memuat MFE 2...</div>}>
          <CounterTwo />
        </Suspense>
      </div>
    </div>
  );
}

export default App;