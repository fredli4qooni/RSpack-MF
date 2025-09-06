import { useState } from 'react';

/**
 * Komponen CounterOne adalah microfrontend yang mandiri (versi 1.5).
 * Bertanggung jawab untuk menampilkan dan mengelola state penghitung sederhana
 * yang dimulai dari 0 dan bertambah 1 setiap kali tombol ditekan.
 *
 * @component
 * @returns {JSX.Element} Elemen JSX yang dirender untuk komponen penghitung.
 */
const CounterOne = () => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: '15px', border: '2px solid purple', borderRadius: '5px' }}>
      <h3>Penghitung dari MFE 1 (v1.5)</h3>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Tambah +1</button>
    </div>
  );
};

export default CounterOne;