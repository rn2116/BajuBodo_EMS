# AGENTS.md — Website Penyewaan Baju Adat Nusantara

Selamat datang di proyek penyewaan baju adat Indonesia berbasis Next.js App Router, TypeScript, dan PostgreSQL.

## Core Rules & Architecture
1. **Bahasa Teknis**: Seluruh penjelasan teknis dan keputusan arsitektur disajikan dalam Bahasa Indonesia.
2. **Server Components Default**: Gunakan React Server Components (RSC) untuk fetching data dan rendering utama. Tambahkan `'use client'` hanya untuk komponen interaktif (state, hooks, form input dinamis).
3. **Pencegahan Bentrok Sewa**: Setiap pemesanan harus memvalidasi tanggal mulai & selesai dengan buffer 1 hari pembersihan/laundry terhadap unit fisik baju adat.
4. **Anti-Slop**: Tidak ada metrics palsu, filler text tidak bermakna, dekorasi berlebihan, atau animasi yang mengganggu. Desain mengusung estetika warisan budaya Indonesia dengan palet krem, putih gading, cokelat tua, dan aksen emas.

## Modular Documentation Navigation
Panduan mendalam terkonfigurasi pada file-file berikut:
- [`rules.md`](file:///home/rafly/Web%20Project/ems-app/rules.md): Prinsip clean code, alur kerja, penanganan error tanpa `any`.
- [`design.md`](file:///home/rafly/Web%20Project/ems-app/design.md): Sistem desain, token warna (krem/gading/cokelat/emas), tipografi, dan responsivitas mobile-first.
- [`architecture.md`](file:///home/rafly/Web%20Project/ems-app/architecture.md): Struktur folder modular/feature-based, batasan Client/Server, dan Server Actions.
- [`database.md`](file:///home/rafly/Web%20Project/ems-app/database.md): Skema PostgreSQL + Prisma, relasi kategori-baju-unit-pesanan.
- [`security.md`](file:///home/rafly/Web%20Project/ems-app/security.md): Validasi input server via Zod, pencegahan injection, sanitasi formulir, dan isolasi transaksi.
- [`anti-slop.md`](file:///home/rafly/Web%20Project/ems-app/anti-slop.md): Checklist kualitas akhir UI dan kode.
