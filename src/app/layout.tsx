import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sewa Adat Nusantara | Penyewaan Baju Adat Indonesia Elegan & Higienis",
  description:
    "Layanan penyewaan baju adat Nusantara terlengkap, profesional, dan higienis. Koleksi busana adat Minangkabau, Jawa Solo & Jogja, Bali Payas Agung, Bugis Makassar, Dayak, dan Aceh dengan aksesoris lengkap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-ivory text-umber selection:bg-gold-light selection:text-gold-deep">
        {children}
      </body>
    </html>
  );
}
