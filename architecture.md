# Architecture & Folder Conventions

## 1. Next.js App Router Structure
- `src/app/(shop)/`: Rute publik untuk penyewa baju adat (Beranda, Katalog, Detail, Kontak, Cek Pesanan).
- `src/app/admin/`: Rute terproteksi untuk pengelolaan produk baju adat dan operasional pesanan sewa.
- `src/components/ui/`: Komponen primitif tanpa ketergantungan logika bisnis (Button, Input, Badge, Dialog, Modal).
- `src/components/common/`: Komponen tata letak global (Navbar, Footer, Floating WhatsApp CTA).
- `src/components/catalog/`: Komponen domain katalog (ProductCard, FilterDrawer, SearchInput).
- `src/components/booking/`: Komponen formulir sewa, pemilihan rentang tanggal (DateRangePicker).
- `src/lib/`: Instansiasi Prisma Client (`db.ts`), utilitas formatting (`utils.ts`), dan skema validasi Zod (`validations/`).

## 2. Server vs Client Boundaries
- **Server Component (Default)**: Fetching data langsung dari database / repository function tanpa API round-trip.
- **Client Component (`'use client'`)**: Terisolasi pada batas interaktivitas pengguna:
  - Form state handling.
  - Kalender seleksi tanggal interaktif.
  - Filter interaktif katalog.
  - Modal dan drawer.

## 3. Data Flow & Mutations
- Seluruh mutasi (pembuatan pesanan, pembaruan status) wajib menggunakan **Server Actions** dengan validasi Zod di server.
- Hindari pembuatan API endpoint Route Handler kecuali untuk integrasi eksternal (misal: webhook payment gateway).
