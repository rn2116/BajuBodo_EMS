import Link from "next/link";
import Image from "next/image";
import { COSTUMES, CATEGORIES } from "@/lib/data/mock-costumes";
import { ProductCard } from "@/components/catalog/ProductCard";
import { getActiveWebsiteImage } from "@/lib/website-images";
import { getSiteConfig } from "@/lib/config";
import {
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  HeartHandshake,
  ArrowRight,
  Sparkle,
  Layers,
  Compass,
  MessageCircle,
} from "lucide-react";

// Halaman beranda dirender ulang setiap request sehingga gambar Hero yang
// diubah melalui admin "Website Images" langsung tampil tanpa harus
// rebuild/redeploy aplikasi.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const heroImage = await getActiveWebsiteImage("HERO");
  const siteConfig = getSiteConfig();
  const featuredCostumes = COSTUMES.filter((c) => c.isFeatured);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-cream-100 to-ivory border-b border-sand pt-12 pb-20 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-light/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-cream-200/50 rounded-full blur-2xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-200/80 border border-gold/40 text-xs font-medium text-gold-deep">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Penyewaan Baju Bodo Adat Bugis Terpercaya</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-umber leading-[1.15] tracking-tight">
                Kemegahan Baju Bodo Adat Bugis untuk Momen Paling Berharga
              </h1>

              <p className="text-sm sm:text-base text-taupe leading-relaxed max-w-xl">
                Hadirkan aura keagungan warisan leluhur Bugis-Makassar pada pernikahan, wisuda,
                upacara adat, dan sesi foto sakral Anda. Koleksi Baju Bodo autentik, higienis,
                dan dilengkapi aksesoris adat lengkap siap pakai.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/katalog"
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-ivory-50 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all"
                >
                  <span>Jelajahi Katalog Busana</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/katalog?kategori=PASANGAN"
                  className="inline-flex items-center justify-center gap-2 bg-ivory hover:bg-cream border border-sand hover:border-gold text-umber px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all"
                >
                  <span>Set Pasangan Pengantin</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-sand/80 max-w-lg">
                <div>
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-umber">
                    100%
                  </span>
                  <span className="block text-[11px] text-taupe mt-0.5">
                    Kain & Songket Asli
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-umber">
                    Steril
                  </span>
                  <span className="block text-[11px] text-taupe mt-0.5">
                    Cuci Uap & Higienis
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-xl sm:text-2xl font-bold text-umber">
                    Lengkap
                  </span>
                  <span className="block text-[11px] text-taupe mt-0.5">
                    Aksesoris & Mahkota
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-ivory">
                <Image
                  src={heroImage?.url ?? "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop"}
                  alt={heroImage?.name ?? "Baju Bodo Adat Bugis"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-umber/80 via-transparent to-transparent" />

                {/* Floating cultural badge on hero image */}
                <div className="absolute bottom-5 left-5 right-5 bg-ivory/95 backdrop-blur-md p-4 rounded-xl border border-gold/40 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-gold-deep font-semibold">
                        Koleksi Primadona
                      </span>
                      <h2 className="font-serif text-base font-bold text-umber">
                        Baju Adat Minang Suntiang Gadang
                      </h2>
                    </div>
                    <Link
                      href="/katalog/baju-adat-minangkabau-suntiang-emas"
                      className="text-xs font-semibold text-gold-deep hover:underline flex items-center gap-1"
                    >
                      <span>Lihat</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Regions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
            Jelajah Koleksi
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-umber">
            Kekayaan Busana Adat dari Berbagai Daerah Indonesia
          </h2>
          <p className="text-xs sm:text-sm text-taupe leading-relaxed">
            Setiap helai kain menyimpan filosofi luhur dan doa restu. Temukan pakaian adat khas daerah asal atau impian Anda.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/katalog?wilayah=${encodeURIComponent(cat.region)}`}
              className="group bg-cream-50 hover:bg-cream border border-sand hover:border-gold rounded-xl p-4 text-center transition-all flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-10 h-10 rounded-full bg-ivory border border-sand group-hover:border-gold flex items-center justify-center text-umber transition-colors">
                <Compass className="w-5 h-5 text-gold-dark" />
              </div>
              <h3 className="font-serif text-xs sm:text-sm font-bold text-umber group-hover:text-gold-dark transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-taupe group-hover:text-umber transition-colors">
                Lihat Koleksi →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-sand">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
              Rekomendasi Terbaik
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-umber mt-1">
              Koleksi Baju Bodo & Adat Favorit
            </h2>
          </div>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-deep hover:text-gold-dark transition-colors"
          >
            <span>Lihat Semua Koleksi ({COSTUMES.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCostumes.map((costume) => (
            <ProductCard key={costume.id} costume={costume} />
          ))}
        </div>
      </section>

      {/* Why Rent with Us / Nilai Keunggulan */}
      <section className="bg-cream-100/70 border-y border-sand py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
              Keunggulan Layanan
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-umber">
              Mengapa Memilih Sewa Baju Bodo?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-ivory border border-sand rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center text-gold-deep">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-umber">
                Higienitas Terjamin
              </h3>
              <p className="text-xs text-taupe leading-relaxed">
                Setiap busana melewati pencucian uap khusus, setrika aromatik tradisional, dan
                sterilisasi penuh setelah dipakai.
              </p>
            </div>

            <div className="bg-ivory border border-sand rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center text-gold-deep">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-umber">
                Aksesoris Lengkap
              </h3>
              <p className="text-xs text-taupe leading-relaxed">
                Sudah termasuk mahkota (suntiang/gelungan), bros, kalung, kain songket, keris, dan perhiasan pelengkap tanpa biaya tersembunyi.
              </p>
            </div>

            <div className="bg-ivory border border-sand rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center text-gold-deep">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-umber">
                Jadwal Tanpa Bentrok
              </h3>
              <p className="text-xs text-taupe leading-relaxed">
                Sistem otomatis mengunci 1 hari buffer pembersihan setelah pemakaian untuk memastikan busana Anda tiba dalam kondisi prima.
              </p>
            </div>

            <div className="bg-ivory border border-sand rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center text-gold-deep">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-umber">
                Uang Jaminan Transparan
              </h3>
              <p className="text-xs text-taupe leading-relaxed">
                Deposit jaminan dicatat secara tertulis dan dikembalikan penuh saat busana kembali dalam kondisi utuh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Steps How to Rent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
            Alur Sewa Praktis
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-umber">
            4 Langkah Mudah Menyewa Baju Adat
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative bg-cream-50 border border-sand rounded-xl p-6 text-center space-y-3">
            <div className="w-8 h-8 rounded-full bg-umber text-ivory-50 text-xs font-bold flex items-center justify-center mx-auto">
              1
            </div>
            <h3 className="font-serif text-sm font-bold text-umber">Pilih Pakaian & Ukuran</h3>
            <p className="text-xs text-taupe leading-relaxed">
              Pilih baju adat yang sesuai dengan tema acara Anda beserta ukuran yang diinginkan.
            </p>
          </div>

          <div className="relative bg-cream-50 border border-sand rounded-xl p-6 text-center space-y-3">
            <div className="w-8 h-8 rounded-full bg-umber text-ivory-50 text-xs font-bold flex items-center justify-center mx-auto">
              2
            </div>
            <h3 className="font-serif text-sm font-bold text-umber">Tentukan Tanggal & Ajukan</h3>
            <p className="text-xs text-taupe leading-relaxed">
              Pilih tanggal sewa dan tanggal kembali. Sistem memeriksa ketersediaan slot secara otomatis.
            </p>
          </div>

          <div className="relative bg-cream-50 border border-sand rounded-xl p-6 text-center space-y-3">
            <div className="w-8 h-8 rounded-full bg-umber text-ivory-50 text-xs font-bold flex items-center justify-center mx-auto">
              3
            </div>
            <h3 className="font-serif text-sm font-bold text-umber">Konfirmasi WhatsApp & DP</h3>
            <p className="text-xs text-taupe leading-relaxed">
              Kirim rincian pemesanan ke admin via WhatsApp untuk pembayaran DP penguncian jadwal.
            </p>
          </div>

          <div className="relative bg-cream-50 border border-sand rounded-xl p-6 text-center space-y-3">
            <div className="w-8 h-8 rounded-full bg-umber text-ivory-50 text-xs font-bold flex items-center justify-center mx-auto">
              4
            </div>
            <h3 className="font-serif text-sm font-bold text-umber">Penerimaan & Pengembalian</h3>
            <p className="text-xs text-taupe leading-relaxed">
              Ambil busana di galeri atau via kurir. Kembalikan tepat waktu untuk pencairan kembali uang deposit.
            </p>
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-umber text-ivory-50 rounded-2xl p-8 sm:p-12 relative overflow-hidden border-2 border-gold flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-gold-light">
              <Sparkle className="w-3.5 h-3.5" />
              <span>Konsultasi Ukuran & Fitting Gratis di Galeri</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory leading-snug">
              Bingung Menentukan Ukuran atau Aksesoris Adat yang Sesuai?
            </h2>
            <p className="text-xs sm:text-sm text-sand/80 leading-relaxed">
              Tim perias dan kurator budaya kami siap membantu Anda mencocokkan ukuran tubuh,
              kelengkapan sanggul/mahkota, serta pakem tradisi yang tepat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            {siteConfig.whatsappNumber ? (
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Halo Admin, saya ingin konsultasi pakaian adat dan fitting"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-xl font-semibold text-xs tracking-wide shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Hubungi Admin WhatsApp
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center gap-2 bg-[#25D366]/40 text-white py-3.5 px-6 rounded-xl font-semibold text-xs tracking-wide shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                Hubungi Admin WhatsApp
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
