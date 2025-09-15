import React from 'react';

// Menambahkan style langsung di dalam file untuk kesederhanaan.
const styles: React.CSSProperties = {
  border: '4px solid rgba(0, 0, 0, 0.1)',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  borderLeftColor: '#ff9f64ff', 
  animation: 'spin 1s ease infinite',
};

const keyframes = `
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

/**
 * Komponen Spinner sederhana untuk menunjukkan state loading.
 *
 * @component
 */
const Spinner = () => {
  return (
    <>
      <style>{keyframes}</style>
      <div style={styles} />
    </>
  );
};

export default Spinner;