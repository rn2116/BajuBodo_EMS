# Anti-Slop Quality Checklist

Gunakan checklist ini sebelum menyelesaikan setiap fitur:

### 1. Desain & Konten (UI/UX)
- [ ] Tidak ada filler text sembarangan ("Lorem ipsum dolor sit amet..."). Gunakan deskripsi pakaian adat Indonesia yang nyata dan bermakna.
- [ ] Tidak ada grafik, metrik, atau chart palsu yang tidak ada fungsi bisnisnya.
- [ ] Tidak ada penggunaan emoji berlebihan sebagai ikon. Gunakan paket ikon konsisten (`lucide-react`).
- [ ] Tidak ada animasi lambat/memusingkan yang mengganggu navigasi pengguna.
- [ ] Warna konsisten dengan tema budaya: krem, putih gading, cokelat tua, dan aksen emas.

### 2. Kode & Arsitektur
- [ ] Tidak ada tipe `any`, `@ts-ignore`, atau casting paksa tanpa pemeriksaan tipe.
- [ ] Tidak ada `console.log` sisa debugging pada kode produksi.
- [ ] Menggunakan Server Components kecuali interaktivitas memang membutuhkan Client Component.
- [ ] Semua state penting (loading, empty state, error message, disabled button) ditangani dengan jelas.
- [ ] Build & Typecheck berjalan bersih tanpa error.
