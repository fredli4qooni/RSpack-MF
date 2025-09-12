import { useState } from 'react';
// Impor komponen Button dari direktori 'common'
import Button from '../common/Button';

/**
 * Komponen CounterOne adalah microfrontend yang mandiri.
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
      <h3>Penghitung dari MFE 1</h3>
      <h2>{count}</h2>
      {/* komponen <Button> */}
      <Button onClick={() => setCount(count + 1)}>Tambah +1</Button>
    </div>
  );
};

export default CounterOne;