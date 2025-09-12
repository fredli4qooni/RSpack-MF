import MfeLoader from './components/MfeLoader';

// Definisikan konfigurasi MFE kita di satu tempat
const mfeConfig = {
  mfe1: {
    remoteUrl: 'http://localhost:3001/remoteEntry.js',
    scope: 'mfe1',
    module: './CounterOne',
  },
  mfe2: {
    remoteUrl: 'http://localhost:3002/remoteEntry.js',
    scope: 'mfe2',
    module: './CounterTwo',
  },
};

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dasbor Host App (Manual Script Loading)</h1>
      <p>Pendekatan ini memberikan kontrol penuh atas pemuatan dan percobaan ulang MFE.</p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <MfeLoader name="mfe1" {...mfeConfig.mfe1} />
        <MfeLoader name="mfe2" {...mfeConfig.mfe2} />
      </div>
    </div>
  );
}

export default App;