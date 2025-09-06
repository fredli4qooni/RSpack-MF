# Microfrontend dengan Rspack & Module Federation

Repositori ini berisi studi kasus dan kode implementasi untuk membangun arsitektur microfrontend menggunakan Rspack. Tujuannya adalah untuk membandingkan secara langsung implementasi menggunakan **Module Federation v1.5** (bawaan Rspack) dan **Module Federation v2.0** (menggunakan `@module-federation/enhanced`).

## Struktur Proyek

Repositori ini berisi dua proyek monorepo yang independen:

-   **`/rspack-mf-2.0`**: Implementasi menggunakan Module Federation v2.0.
    -   **Fitur Unggulan:** Pembuatan tipe TypeScript otomatis (`.d.ts`) untuk type safety lintas aplikasi.
    -   **Dependensi Kunci:** `@module-federation/enhanced`.

-   **`/rspack-mf-1.5`**: Implementasi menggunakan Module Federation v1.5.
    -   **Fitur Unggulan:** Menggunakan "mesin" Module Federation inti yang terintegrasi langsung ke dalam Rspack.
    -   **Penanganan Tipe:** Bergantung 100% pada file deklarasi tipe (`.d.ts`) yang dibuat secara manual.

## Cara Menjalankan Proyek

Setiap proyek di dalam repositori ini adalah monorepo yang dikelola oleh `pnpm workspaces`.

### Menjalankan Proyek v2.0

1.  **Navigasi ke direktori proyek:**
    ```bash
    cd rspack-mf-2.0
    ```
2.  **Instal dependensi:**
    ```bash
    pnpm install
    ```
3.  **Jalankan semua aplikasi (host & remotes) secara bersamaan:**
    ```bash
    pnpm --filter mfe1 dev
    pnpm --filter mfe2 dev
    pnpm --filter host-app dev
    ```
4.  **Akses aplikasi:**
    -   Host (Gabungan): `http://localhost:3000`
    -   MFE1 (Standalone): `http://localhost:3001`
    -   MFE2 (Standalone): `http://localhost:3002`

### Menjalankan Proyek v1.5

1.  **Navigasi ke direktori proyek:**
    ```bash
    cd rspack-mf-1.5
    ```
2.  **Instal dependensi:**
    ```bash
    pnpm install
    ```
3.  **Jalankan semua aplikasi (host & remotes) secara bersamaan:**
    ```bash
    pnpm --filter mfe1 dev
    pnpm --filter mfe2 dev
    pnpm --filter host-app dev
    ```
4.  **Akses aplikasi:**
    -   Host (Gabungan): `http://localhost:3000`
    -   MFE1 (Standalone): `http://localhost:3001`
    -   MFE2 (Standalone): `http://localhost:3002`

## Analisis

Untuk analisis perbandingan yang mendalam, silakan merujuk ke artikel Medium [https://medium.com/@fredlifourqoni9/membangun-microfrontend-dengan-rspack-perbandingan-module-federation-v1-5-vs-v2-0-f1241d83690e].