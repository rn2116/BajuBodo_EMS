import Link from "next/link";
import { Sparkles, MapPin, Phone, Clock, ShieldCheck, HeartHandshake } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-umber text-sand-light border-t-2 border-gold pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-taupe-dark">
          {/* Brand & Culture Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cream-100/10 border border-gold flex items-center justify-center">
                <span className="font-serif text-lg font-bold text-gold-medium">SA</span>
              </div>
              <span className="font-serif text-xl font-bold text-ivory-50 tracking-wide">
                Sewa Baju Bodo
              </span>
            </div>
            <p className="text-xs text-sand/80 leading-relaxed">
              Melestarikan keagungan Baju Bodo adat Bugis-Makassar dengan layanan penyewaan profesional,
              higienis, dan terpercaya untuk momen pernikahan, wisuda, upacara adat, serta sesi foto sakral.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-medium">
              <Sparkles className="w-4 h-4" />
              <span>Warisan Budaya • Perawatan Higienis</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-ivory tracking-wider uppercase">
              Koleksi Adat
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/katalog?wilayah=Sumatera" className="hover:text-gold-light transition-colors">
                  Baju Adat Minang, Aceh & Batak
                </Link>
              </li>
              <li>
                <Link href="/katalog?wilayah=Jawa" className="hover:text-gold-light transition-colors">
                  Beskap & Kebaya Jawa (Solo & Jogja)
                </Link>
              </li>
              <li>
                <Link href="/katalog?wilayah=Bali" className="hover:text-gold-light transition-colors">
                  Payas Agung & Busana Adat Bali
                </Link>
              </li>
              <li>
                <Link href="/katalog?wilayah=Sulawesi" className="hover:text-gold-light transition-colors">
                  Baju Bodo Bugis & Busana Toraja
                </Link>
              </li>
              <li>
                <Link href="/katalog?kategori=ANAK" className="hover:text-gold-light transition-colors">
                  Busana Adat Cilik & Kartinian
                </Link>
              </li>
            </ul>
          </div>

          {/* Rental Assurance */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-ivory tracking-wider uppercase">
              Standar Layanan
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-medium shrink-0 mt-0.5" />
                <span>Pencucian uap khusus & sterilisasi sebelum dan sesudah setiap sewa.</span>
              </li>
              <li className="flex items-start gap-2">
                <HeartHandshake className="w-4 h-4 text-gold-medium shrink-0 mt-0.5" />
                <span>Paket sewa standar 3 hari dengan jeda buffer laundry terjamin.</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-gold-medium shrink-0 mt-0.5" />
                <span>Aksesoris lengkap (mahkota, keris, perhiasan) terawat rapi.</span>
              </li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-ivory tracking-wider uppercase">
              Galeri & Kontak
            </h4>
            <div className="space-y-2.5 text-xs text-sand/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-medium shrink-0 mt-0.5" />
                <span>Galeri Baju Bodo, Jl. Cempaka Putih Raya No. 45, Jakarta Pusat</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-medium shrink-0" />
                <span>+62 812-3456-7890 (WhatsApp Admin)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-medium shrink-0" />
                <span>Senin - Sabtu: 09.00 - 18.00 WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sand/60 gap-4">
          <p>© {new Date().getFullYear()} Sewa Baju Bodo. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <Link href="/kontak" className="hover:text-gold-light transition-colors">
              Kebijakan Sewa & Deposit
            </Link>
            <Link href="/admin/login" className="hover:text-gold-light transition-colors">
              Portal Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
