# Security Guidelines

## 1. Validasi Input & Server Boundaries
- Semua data dari formulir publik (pemesanan, pencarian, kontak) WAJIB divalidasi di server menggunakan skema **Zod**.
- Sanitasi input string untuk mencegah XSS.
- Gunakan kueri Prisma berparameter untuk mencegah SQL Injection.

## 2. Autentikasi & Otorisasi Admin
- Rute `/admin/*` dan Server Actions khusus admin diproteksi dengan verifikasi sesi di server.
- Tidak boleh mengekspos token rahasia, kredensial database, atau password hash ke bundel JavaScript klien.
- Gunakan environment variable terisolasi (`DATABASE_URL`, `ADMIN_SECRET`) yang disimpan di `.env`.

## 3. Pencegahan Abuse & Rate Limiting
- Nomor WhatsApp divalidasi ke format Indonesia (`08...` atau `+62...`).
- Batasi pengiriman formulir pesanan berulang dalam waktu singkat untuk mencegah spam booking.
