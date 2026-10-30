# BajuBodo EMS — Sistem Manajemen & Penyewaan Pakaian Adat Nusantara

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

Platform digital terintegrasi untuk layanan penyewaan dan manajemen operasional busana adat Nusantara (seperti Baju Bodo khas Bugis-Makassar, adat Minang, Jawa, Bali, dan daerah lainnya) dengan pendekatan arsitektur modern, performa tinggi, dan estetika warisan budaya Indonesia.

---

## 📋 Daftar Isi
1. [Latar Belakang & Visi](#-latar-belakang--visi)
2. [Prinsip Desain & Filosofi](#-prinsip-desain--filosofi)
3. [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
4. [Arsitektur Sistem & Struktur Direktori](#-arsitektur-sistem--struktur-direktori)
5. [Alur Bisnis & Logika Inti](#-alur-bisnis--logika-inti)
6. [Keamanan & Validasi](#-keamanan--validasi)
7. [Panduan Instalasi & Menjalankan Aplikasi](#-panduan-instalasi--menjalankan-aplikasi)
8. [Peraturan & Panduan Pengembangan (Rules)](#-peraturan--panduan-pengembangan-rules)

---

## 🏛️ Latar Belakang & Visi

Penyewaan busana adat Nusantara membutuhkan ketelitian inventaris fisik yang tinggi: satu model baju adat memiliki berbagai ukuran, kelengkapan aksesoris adat (bando, mahkota/saloko, gelang, kalung, pending), dan jadwal sewa yang rentan bentrok jika tidak diperhitungkan waktu pencucian/laundry. 

**BajuBodo EMS** dirancang untuk:
- Memudahkan calon penyewa menjelajahi katalog busana adat autentik dan melakukan pemesanan secara transparan.
- Membantu pemilik usaha menyewakan busana adat tanpa resiko bentrok jadwal fisik baju antar pelanggan.
- Memberikan pengalaman pengguna yang anggun, berwibawa, responsif di ponsel, dan terbebas dari dekorasi murahan (*anti-slop*).

---

## 🎨 Prinsip Desain & Filosofi

### 1. *Indonesian Heritage with Modern Elegance*
Desain mengusung estetika warisan budaya Indonesia yang bersahaja, hangat, dan kontemporer:
- **Canvas Utama (Ivory / Putih Gading - `#FAF8F5`)**: Menggambarkan kehangatan kain tenun dan sutra alam, nyaman di mata.
- **Surface / Card (Krem Lembut - `#F3EFEA`)**: Kontras lembut untuk kartu katalog dan panel formulir.
- **Teks Utama (Deep Umber / Cokelat Tua - `#241A14`)**: Tingkat keterbacaan tinggi yang memenuhi standar aksesibilitas WCAG AAA.
- **Aksen Kehormatan (Royal Antique Gold - `#C59A45`)**: Menonjolkan elemen interaktif, lencana unggulan, dan aksen khas busana adat kerajaan Nusantara.

### 2. *Anti-Slop Quality Standard*
- **Konten Nyata**: Dilarang menggunakan *Lorem Ipsum*. Seluruh nama pakaian, asal daerah, dan aksesoris menggunakan data adat yang akurat.
- **Tanpa Metrik Palsu**: Tidak ada chart atau angka statistik tiruan yang tidak memiliki fungsi bisnis riil.
- **Ikonografi Terpadu**: Menggunakan paket ikon `lucide-react`, dilarang mencampuradukkan emoji sebagai pengganti ikon UI.
- **Mobile-First Accessibility**: Diuji optimal pada layar smartphone (360px – 430px) dengan tombol aksi utama (*Sticky CTA*) yang mudah dijangkau satu tangan.

---

## ⚡ Teknologi yang Digunakan

| Kategori | Teknologi | Kegunaan |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | React Server Components, server actions, dan rendering optimal |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict type-safety, dilarang `any`, pencegahan error sejak kompilasi |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utilitas desain sistem berbasis token warna budaya Nusantara |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Relational database untuk transaksi sewa dan inventaris terstruktur |
| **ORM** | [Prisma ORM](https://www.prisma.io/) | Schema modelling, migrasi database, dan type-safe database client |
| **Validation** | [Zod v4](https://zod.dev/) | Skema validasi input form dan data mutasi di sisi server |
| **Icons & Date** | `lucide-react`, `date-fns` | Ikon visual konsisten dan manipulasi tanggal sewa yang akurat |

---

## 🏗️ Arsitektur Sistem & Struktur Direktori

Sistem mengadopsi pola **Next.js App Router** dengan pemisahan tegas antara Server Components dan Client Components:

```text
ems-app/
├── prisma/
│   └── schema.prisma        # Definisi skema PostgreSQL & relasi entitas
├── public/                  # Aset statis & gambar publik
├── src/
│   ├── app/
│   │   ├── (shop)/          # Rute Publik (Katalog, Detail, Sewa, Kontak)
│   │   │   ├── katalog/     # Halaman katalog dengan filter dinamis
│   │   │   ├── kontak/      # Layanan informasi & bantuan pelanggan
│   │   │   └── page.tsx     # Landing page publik bernuansa budaya
│   │   ├── admin/           # Rute Backoffice Terproteksi
│   │   │   ├── login/       # Autentikasi pengelola
│   │   │   ├── pesanan/     # Manajemen pesanan & status pengembalian
│   │   │   ├── produk/      # Manajemen katalog & unit fisik inventaris
│   │   │   └── page.tsx     # Dashboard analitik operasional
│   │   ├── globals.css      # Desain token dan reset CSS
│   │   └── layout.tsx       # Root layout aplikasi
│   ├── components/
│   │   ├── ui/              # Komponen primitif (Button, Modal, Input, Badge)
│   │   ├── common/          # Layout global (Navbar, Footer, WhatsApp CTA)
│   │   ├── catalog/         # Domain katalog (ProductCard, Filter, Explorer)
│   │   └── booking/         # Formulir sewa & DateRangePicker
│   ├── features/            # Modul logika fitur terisolasi
│   ├── lib/
│   │   ├── db.ts            # Instansiasi Prisma Client (Singleton)
│   │   ├── utils.ts         # Utilitas pemformatan mata uang (Rupiah) & kelas CSS
│   │   └── validations/     # Skema validasi Zod untuk Server Actions
│   └── types/               # Type definitions aplikasi
├── .env.example             # Template konfigurasi environment (aman di-commit)
├── architecture.md          # Dokumentasi arsitektur modular
├── design.md                # Dokumentasi panduan desain sistem
├── database.md              # Dokumentasi konvensi database
├── security.md              # Dokumentasi standar keamanan
├── rules.md                 # Standar kualitas kode & penulisan
└── anti-slop.md             # Checklist anti-slop pra-deploy
```

---

## 🔄 Alur Bisnis & Logika Inti

### 1. Pemisahan Katalog (`Costume`) vs Unit Fisik (`CostumeUnit`)
Satu jenis pakaian adat (misalnya *Baju Bodo Tokko Khas Bugis*) memiliki banyak unit fisik nyata di lemari penyimpanan dengan ukuran berbeda (S, M, L, XL) dan kondisi unik (`EXCELLENT`, `GOOD`, `IN_REPAIR`). Pelanggan menyewa katalog, dan sistem memesankan unit fisik tertentu.

### 2. Algoritma Buffer Laundry (Pencegahan Tabrakan Jadwal)
Pakaian adat berbahan sutra, beludru, atau bordir emas memerlukan waktu pembersihan khusus setelah kembali. Sistem menerapkan **Buffer Period 1 Hari Pembersihan**:
```
bufferEndDate = endDate + 1 hari
Ketersediaan Unit:
Tersedia jika: NOT (ExistingStart <= RequestedEnd AND ExistingBufferEnd >= RequestedStart)
```
Dengan formula ini, unit baju yang dikembalikan pada tanggal 10 tidak dapat disewa oleh orang lain pada tanggal 11, melainkan baru siap disewakan kembali pada tanggal 12.

### 3. Transaksi Atomik Terisolasi
Semua reservasi dijalankan di dalam `prisma.$transaction`. Jika dua pelanggan memesan unit baju yang sama di detik yang sama, transaksi kedua akan ditolak dengan pesan error yang ramah dan unit tidak akan terduplikasi (*race condition proof*).

---

## 🛡️ Keamanan & Validasi

1. **Server-Side Validation**: Seluruh data formulir dari pengguna (identitas, tanggal sewa, catatan) divalidasi menggunakan skema **Zod** sebelum diproses database.
2. **Kueri Terparameter**: Menggunakan Prisma ORM yang secara otomatis mencegah celah keamanan **SQL Injection**.
3. **Proteksi Informasi Rahasia**: File `.env` yang memuat `DATABASE_URL` dan `ADMIN_SECRET` secara ketat diabaikan oleh `.gitignore` dan dilarang masuk ke repositori git publik.
4. **Isolasi Rute Admin**: Akses ke direktori `/admin/*` diverifikasi melalui session di sisi server dan tidak mengekspos hash rahasia ke bundel JavaScript browser.

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

### 1. Prasyarat Sistem
- **Node.js**: Versi 18.18.0 atau yang lebih baru
- **NPM / PNPM**: Pengelola paket bawaan
- **PostgreSQL**: Database server lokal atau cloud (misal: Supabase / Neon / Docker)

### 2. Kloning Repositori
```bash
git clone https://github.com/rn2116/BajuBodo_EMS.git
cd BajuBodo_EMS
```

### 3. Pasang Dependensi
```bash
npm install
```

### 4. Konfigurasi Variabel Lingkungan
Salin file template `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Sesuaikan nilai konfigurasi di dalam file `.env`:
```env
# PostgreSQL Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/ems_baju_adat?schema=public"

# Admin Authentication Secret (minimal 32 karakter)
ADMIN_SECRET="ganti-dengan-rahasia-admin-yang-kuat-minimal-32-karakter"

# Public Configuration
NEXT_PUBLIC_SITE_NAME="Sewa Adat Nusantara"
NEXT_PUBLIC_WHATSAPP_NUMBER="6281234567890"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 5. Sinkronisasi Database Prisma
Jalankan sinkronisasi skema ke database PostgreSQL:
```bash
npx prisma db push
```
*(Opsional)* Buka Prisma Studio untuk melihat data secara visual:
```bash
npx prisma studio
```

### 6. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser pada alamat [http://localhost:3000](http://localhost:3000).

Untuk mengakses portal administrasi, arahkan browser ke [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 📜 Peraturan & Panduan Pengembangan (Rules)

Setiap pengembang yang berkontribusi pada proyek ini wajib mematuhi standar berikut:

1. **Strict TypeScript**: 
   - Dilarang keras menggunakan tipe `any`, `@ts-ignore`, atau casting `as unknown as T` tanpa validasi runtime.
   - Semua fungsi, parameter, dan hasil Server Actions harus memiliki tipe data yang eksplisit.
2. **Server Components First**:
   - Jadikan Server Components sebagai default untuk membaca data langsung dari database.
   - Gunakan direktif `'use client'` hanya pada batas interaktif (event handler, form state, kalender pemilih tanggal).
3. **Verifikasi Sebelum Komit**:
   - Jalankan verifikasi tipe sebelum mengajukan perubahan kode:
     ```bash
     npx tsc --noEmit
     npm run build
     ```
4. **Keamanan Kredensial**:
   - Jangan pernah menyertakan kredensial nyata, kata sandi, atau token API ke dalam commit git.
5. **Bahasa Teknis**:
   - Dokumentasi, commit message, dan laporan perubahan disajikan secara jelas dan lugas dalam Bahasa Indonesia.

---

**BajuBodo EMS** — *Melestarikan Keagungan Budaya Nusantara Melalui Teknologi Modern.*
