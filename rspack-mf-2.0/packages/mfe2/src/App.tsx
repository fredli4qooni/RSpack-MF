import CounterTwo from './components/CounterTwo';

/**
 * Komponen App untuk mfe2.
 * Berfungsi sebagai "etalase" untuk development MFE 2 secara terisolasi.
 *
 * @component
 * @returns {JSX.Element} Tampilan standalone untuk MFE 2.
 */
function App() {
  return (
    <div>
      <h1>MFE 2 (Standalone Mode)</h1>
      <p>Ini adalah tampilan untuk development MFE 2 secara terisolasi.</p>
      <hr />
      <CounterTwo />
    </div>
  );
}

export default App;