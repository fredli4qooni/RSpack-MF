/**
 * Komponen CounterOne adalah microfrontend yang mandiri.
 * Bertanggung jawab untuk menampilkan dan mengelola state penghitung sederhana
 * yang dimulai dari 0 dan bertambah 1 setiap kali tombol ditekan.
 *
 * @component
 * @returns {JSX.Element} Elemen JSX yang dirender untuk komponen penghitung.
 * @example
 * // Cara menggunakan komponen ini di aplikasi lain:
 * import CounterOne from 'mfe1/CounterOne';
 *
 * function MyPage() {
 *   return <CounterOne />;
 * }
 */
declare const CounterOne: () => import("react/jsx-runtime").JSX.Element;
export default CounterOne;
