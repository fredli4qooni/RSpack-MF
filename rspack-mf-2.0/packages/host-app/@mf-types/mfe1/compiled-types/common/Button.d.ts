import React, { type ComponentPropsWithoutRef } from 'react';
type ButtonProps = ComponentPropsWithoutRef<'button'>;
/**
 * Komponen Button generik untuk digunakan di seluruh MFE.
 * Komponen ini menyediakan gaya dasar yang konsisten untuk semua tombol.
 * Menerima semua props standar dari elemen <button> HTML.
 *
 * @component
 * @param {ButtonProps} props - Props untuk komponen Button.
 * @returns {JSX.Element} Elemen tombol yang digayakan.
 */
declare const Button: React.FC<ButtonProps>;
export default Button;
