"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles, MessageCircle, ShieldCheck } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur-md border-b border-sand">
      {/* Top micro announcement bar */}
      <div className="bg-umber text-ivory-100 text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-gold-medium" />
        <span>Penyewaan Baju Adat Nusantara Terlengkap — Seluruh Busana Higienis & Siap Pakai</span>
        <span className="hidden md:inline text-sand">|</span>
        <span className="hidden md:inline-flex items-center gap-1 text-gold-light">
          <ShieldCheck className="w-3.5 h-3.5" /> Garansi Bersih & Terawat
        </span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-cream-200 border border-gold flex items-center justify-center shadow-sm group-hover:border-gold-dark transition-colors">
            <span className="font-serif text-xl font-bold text-umber">SA</span>
          </div>
          <div>
            <span className="block font-serif text-xl font-bold tracking-tight text-umber group-hover:text-gold-dark transition-colors">
              Sewa Adat
            </span>
            <span className="block text-[11px] uppercase tracking-widest text-taupe font-medium -mt-1">
              Nusantara Heritage
            </span>
          </div>
        </Link>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-umber hover:text-gold-dark transition-colors"
          >
            Beranda
          </Link>
          <Link
            href="/katalog"
            className="text-sm font-medium text-umber hover:text-gold-dark transition-colors"
          >
            Katalog Baju Adat
          </Link>
          <Link
            href="/katalog?kategori=PASANGAN"
            className="text-sm font-medium text-umber hover:text-gold-dark transition-colors"
          >
            Set Pasangan
          </Link>
          <Link
            href="/kontak"
            className="text-sm font-medium text-umber hover:text-gold-dark transition-colors"
          >
            Kontak & Lokasi
          </Link>
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Sewa%20Adat%20Nusantara,%20saya%20ingin%20tanya%20ketersediaan%20baju%20adat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-md border border-gold text-umber hover:bg-gold-light/60 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-gold-dark" />
            Konsultasi WhatsApp
          </a>

          <Link
            href="/katalog"
            className="inline-flex items-center text-xs font-semibold px-5 py-2.5 rounded-md bg-gold hover:bg-gold-dark text-ivory-50 shadow-sm transition-colors"
          >
            Eksplor Katalog
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-umber hover:text-gold-dark focus:outline-none"
          aria-label="Buka Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-50 border-b border-sand px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-umber rounded-md hover:bg-cream"
          >
            Beranda
          </Link>
          <Link
            href="/katalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-umber rounded-md hover:bg-cream"
          >
            Katalog Baju Adat
          </Link>
          <Link
            href="/katalog?kategori=PASANGAN"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-umber rounded-md hover:bg-cream"
          >
            Set Pasangan Pengantin
          </Link>
          <Link
            href="/kontak"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-umber rounded-md hover:bg-cream"
          >
            Kontak & Lokasi Galeri
          </Link>
          <div className="pt-2 border-t border-sand flex flex-col gap-2">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin%20Sewa%20Adat%20Nusantara,%20saya%20ingin%20tanya%20ketersediaan%20baju%20adat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-md border border-gold text-umber"
            >
              <MessageCircle className="w-4 h-4 text-gold-dark" />
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
