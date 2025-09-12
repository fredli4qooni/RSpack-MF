import { useState } from 'react';
import { Button } from '@mfe/ui-kit';
/**
 * Komponen CounterTwo adalah microfrontend independen.
 * Komponen ini menampilkan penghitung yang dimulai dari 100
 * dan bertambah 5 setiap kali tombol ditekan.
 *
 * @component
 * @returns {JSX.Element} Elemen JSX yang dirender untuk komponen penghitung kedua.
 */
const CounterTwo = () => {
  const [count, setCount] = useState(100);
  return (
    <div style={{ padding: '15px', border: '2px solid teal', borderRadius: '5px' }}>
      <h3>Penghitung dari MFE 2 (Mulai dari 100)</h3>
      <h2>{count}</h2>
      {/* komponen <Button>*/}
      <Button onClick={() => setCount(c => c + 5)}>Tambah +5</Button>
    </div>
  );
};

export default CounterTwo;