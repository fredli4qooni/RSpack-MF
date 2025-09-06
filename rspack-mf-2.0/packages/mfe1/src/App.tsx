import CounterOne from './components/CounterOne';

/**
 * Komponen App untuk mfe1.
 * Halaman ini berfungsi sebagai "etalase" atau "workbench" untuk development.
 * Tujuannya adalah untuk merender semua komponen yang diekspos oleh MFE ini
 * agar bisa dikembangkan dan diuji secara terisolasi.
 *
 * @component
 * @returns {JSX.Element} Tampilan standalone untuk MFE 1.
 */
function App() {
  return (
    <div>
      <h1>MFE 1 (Standalone Mode)</h1>
      <p>Ini adalah tampilan untuk development MFE 1 secara terisolasi.</p>
      <hr />
      <CounterOne />
    </div>
  );
}

export default App;