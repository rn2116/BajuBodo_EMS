export interface SiteConfig {
  name: string;
  whatsappNumber: string;
  siteUrl: string;
}

/**
 * Konfigurasi publik situs yang diambil dari environment variable.
 * Nilai default hanya digunakan saat environment variable belum diatur,
 * sehingga pemilik website tidak perlu mengubah source code untuk
 * menyesuaikan nama atau nomor WhatsApp pemilik.
 */
export function getSiteConfig(): SiteConfig {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Sewa Baju Bodo",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  };
}

/**
 * Bangun tautan WhatsApp (wa.me) dari nomor dan teks pesan.
 * Nomor harus dalam format internasional tanpa tanda "+" (contoh: 6281234567890).
 */
export function getWhatsAppUrl(whatsappNumber: string, text: string): string {
  const cleaned = whatsappNumber.replace(/^\+/, "").replace(/\s/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(text)}`;
}
