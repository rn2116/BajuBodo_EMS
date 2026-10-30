# Design System & UI/UX Guidelines

## Konsep Visual
**"Indonesian Heritage with Modern Elegance"**
Nuansa budaya Indonesia yang anggun, berwibawa, bersahaja, dan kontemporer. Fokus utama mata tertuju pada keindahan foto baju adat dan detail songket/tenun/aksesoris.

## Design Tokens (Tailwind CSS)
- **Primary Canvas (Putih Gading / Ivory)**: `#FAF8F5`
  - Memberikan nuansa kain sutra/linen alami, jauh lebih hangat dan nyaman di mata daripada `#FFFFFF` datar.
- **Surface / Card (Krem Lembut)**: `#F3EFEA`
  - Kontras lembut untuk kartu produk, container formulir, dan panel filter.
- **Typography & Teks Utama (Cokelat Tua / Deep Umber)**: `#241A14`
  - Tingkat keterbacaan tinggi (WCAG AAA compliant).
- **Secondary Text (Warm Taupe)**: `#6B5E55`
- **Border Lembut (Pale Sand)**: `#E5DDD5`
- **Aksen Utama (Royal Antique Gold)**:
  - Base: `#C59A45`
  - Hover / Deep: `#A37B2C`
  - Light Accent: `#F4EBD9`
- **Status Fungsional**:
  - Tersedia (Sage Green): `#2E6F40`
  - Tidak Tersedia (Terracotta): `#B84A39`
  - Perawatan / Laundry (Ochre): `#C28728`

## Tipografi
- **Headings (H1, H2, H3)**: Font serif berwibawa (misal: *Playfair Display* atau *Cinzel*).
- **Body & Controls**: Font sans-serif bersih dan modern (*Plus Jakarta Sans* atau *Inter*).

## Layout & Responsivitas
- **Mobile First**: Semua halaman harus diuji tampil sempurna pada layar smartphone 360px - 430px.
- **Sticky CTA**: Tombol "Sewa Sekarang" pada halaman detail produk berada pada bilah melayang di bagian bawah layar HP agar mudah dijangkau.
- **Aksesibilitas**: Mematuhi rasio kontras warna WCAG AA, fokus ring yang jelas pada navigasi keyboard, dan mendukung `prefers-reduced-motion`.
