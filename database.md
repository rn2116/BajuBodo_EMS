# Database Design & PostgreSQL Conventions

## 1. Relasi Entitas
Penyewaan pakaian memisahkan katalog umum dengan unit fisik konkret:
1. `Category`: Wilayah adat (Jawa, Minangkabau, Bali, Bugis, Dayak, Papua, dll.).
2. `Costume`: Entitas katalog (Nama, deskripsi adat, harga sewa dasar per 3 hari, daftar aksesoris, galeri gambar).
3. `CostumeUnit`: Entitas fisik inventaris per ukuran (S, M, L, XL) dengan kode unit unik dan status kondisi (EXCELLENT, GOOD, IN_REPAIR).
4. `Customer`: Data pelanggan (Nama, WhatsApp, nomor identitas).
5. `RentalOrder`: Transaksi sewa dengan tanggal sewa (`startDate`), pengembalian (`endDate`), total harga, uang deposit, dan status rental.
6. `RentalItem`: Pemetaan pesanan dengan unit fisik konkret yang terkunci.

## 2. Aturan Pencegahan Bentrok Jadwal
- Rentang tanggal sewa harus divalidasi dengan menambahkan **Buffer Period (1 hari)** untuk pencucian dan perawatan baju sebelum disewakan kembali:
  `Tersedia jika: NOT (ExistingStart <= RequestedEnd AND (ExistingEnd + 1 day) >= RequestedStart)`
- Gunakan transaksi terisolasi (`prisma.$transaction`) saat mengonfirmasi pesanan agar tidak terjadi perebutan unit di detik yang sama (*race condition*).
