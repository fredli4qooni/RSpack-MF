import CounterTwo from './components/CounterTwo';

/**
 * Komponen App untuk mfe2 (versi 1.5).
 * Berfungsi sebagai "etalase" untuk development MFE 2 secara terisolasi.
 *
 * @component
 * @returns {JSX.Element} Tampilan standalone untuk MFE 2.
 */
function App() {
  return (
    <div>
      <h1>MFE 2 (Standalone Mode)</h1>
      <CounterTwo />
    </div>
  );
}

export default App;