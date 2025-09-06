import CounterOne from './components/CounterOne';

/**
 * Komponen App untuk mfe1 (versi 1.5).
 * Halaman ini berfungsi sebagai "etalase" untuk development MFE 1
 * secara terisolasi.
 *
 * @component
 * @returns {JSX.Element} Tampilan standalone untuk MFE 1.
 */
function App() {
  return (
    <div>
      <h1>MFE 1 (Standalone Mode)</h1>
      <CounterOne />
    </div>
  );
}

export default App;