/**
 * Komponen CounterTwo adalah microfrontend independen.
 * Komponen ini menampilkan penghitung yang dimulai dari 100
 * dan bertambah 5 setiap kali tombol ditekan.
 * Ini sengaja dibuat berbeda dari CounterOne untuk menunjukkan independensi MFE.
 *
 * @component
 * @returns {JSX.Element} Elemen JSX yang dirender untuk komponen penghitung kedua.
 */
declare const CounterTwo: () => import("react/jsx-runtime").JSX.Element;
export default CounterTwo;
