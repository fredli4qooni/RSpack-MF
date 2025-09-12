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
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      style={{
        backgroundColor: '#646cff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '0.6em 1.2em',
        fontSize: '1em',
        fontWeight: 500,
        fontFamily: 'inherit',
        cursor: 'pointer',
        transition: 'border-color 0.25s',
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;