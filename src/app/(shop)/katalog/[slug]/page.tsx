import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { COSTUMES } from "@/lib/data/mock-costumes";
import { BookingForm } from "@/components/booking/BookingForm";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { formatRupiah } from "@/lib/utils";
import {
  ChevronRight,
  Sparkles,
  Check,
  Info,
  Layers,
  HelpCircle,
} from "lucide-react";

interface CostumeDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return COSTUMES.map((costume) => ({
    slug: costume.slug,
  }));
}

export function generateMetadata({ params }: CostumeDetailPageProps) {
  const costume = COSTUMES.find((c) => c.slug === params.slug);
  if (!costume) return { title: "Busana Tidak Ditemukan" };

  return {
    title: `${costume.title} - Sewa Baju Adat Nusantara`,
    description: costume.description,
  };
}

export default function CostumeDetailPage({ params }: CostumeDetailPageProps) {
  const costume = COSTUMES.find((c) => c.slug === params.slug);

  if (!costume) {
    notFound();
  }

  // Related costumes
  const relatedCostumes = COSTUMES.filter(
    (c) => c.id !== costume.id && (c.region === costume.region || c.category === costume.category)
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-taupe">
        <Link href="/" className="hover:text-umber transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-sand-dark" />
        <Link href="/katalog" className="hover:text-umber transition-colors">
          Katalog
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-sand-dark" />
        <span className="text-umber font-medium truncate max-w-[200px] sm:max-w-none">
          {costume.title}
        </span>
      </nav>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Photos, Cultural Description, Accessories */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream-200 border border-sand shadow-sm">
              <Image
                src={costume.images[0]}
                alt={costume.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="gold" className="shadow-sm">
                  {costume.category}
                </Badge>
                <Badge variant="neutral" className="shadow-sm">
                  {costume.culturalOrigin}
                </Badge>
              </div>
            </div>

            {/* Sub images if any */}
            {costume.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {costume.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden border border-sand bg-cream-100 cursor-pointer hover:border-gold transition-colors"
                  >
                    <Image
                      src={img}
                      alt={`${costume.title} ${idx + 1}`}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Title & Region */}
          <div className="space-y-3 border-b border-sand pb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-deep">
              Asal Tradisi: {costume.culturalOrigin}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-umber">
              {costume.title}
            </h1>
            <div className="flex flex-wrap items-baseline gap-3 pt-1">
              <span className="text-2xl font-bold text-gold-deep">
                {formatRupiah(costume.pricePerPeriod)}
              </span>
              <span className="text-xs text-taupe">
                / Paket Standar 3 Hari (Termasuk Hari Ambil & Kembali)
              </span>
            </div>
          </div>

          {/* Cultural & Philosophical Story */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-umber flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-dark" />
              Makna & Filosofi Busana
            </h3>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed">
              {costume.description}
            </p>
          </div>

          {/* Included Accessories Checklist */}
          <div className="bg-cream-50 border border-sand rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-umber flex items-center gap-2">
                <Layers className="w-4 h-4 text-gold-dark" />
                Daftar Kelengkapan yang Disertakan
              </h3>
              <span className="text-[11px] text-sage-dark font-medium bg-sage-light px-2.5 py-0.5 rounded-full">
                Paket Komplit Siap Pakai
              </span>
            </div>
            <p className="text-xs text-taupe">
              Semua ornamen di bawah ini sudah termasuk dalam harga sewa dasar tanpa biaya tambahan:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {costume.includedAccessories.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-xs text-umber bg-ivory p-2 rounded-lg border border-sand/70"
                >
                  <Check className="w-3.5 h-3.5 text-sage-dark shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Size Chart Guidance */}
          <div className="bg-ivory border border-sand rounded-xl p-6 space-y-3 text-xs">
            <h3 className="font-serif text-sm font-bold text-umber flex items-center gap-1.5">
              <Info className="w-4 h-4 text-gold-dark" />
              Panduan Ukuran Busana Adat
            </h3>
            <p className="text-taupe leading-relaxed">
              Sebagian besar pakaian adat Nusantara menggunakan sistem lilitan kain songket/jarik serta
              manset beludru fleksibel. Jika ragu dengan ukuran tubuh Anda:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-center">
              <div className="bg-cream-50 p-2 rounded border border-sand">
                <span className="block font-bold text-umber">Size S</span>
                <span className="text-[10px] text-taupe">LD 84-88 cm</span>
              </div>
              <div className="bg-cream-50 p-2 rounded border border-sand">
                <span className="block font-bold text-umber">Size M</span>
                <span className="text-[10px] text-taupe">LD 90-96 cm</span>
              </div>
              <div className="bg-cream-50 p-2 rounded border border-sand">
                <span className="block font-bold text-umber">Size L</span>
                <span className="text-[10px] text-taupe">LD 98-104 cm</span>
              </div>
              <div className="bg-cream-50 p-2 rounded border border-sand">
                <span className="block font-bold text-umber">Size XL</span>
                <span className="text-[10px] text-taupe">LD 106-114 cm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Form */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <BookingForm costume={costume} />

          {/* Quick Consultation helper */}
          <div className="bg-ivory border border-sand rounded-xl p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-taupe">
              <HelpCircle className="w-4 h-4 text-gold-dark shrink-0" />
              <span>Butuh custom fitting atau sewa rombongan?</span>
            </div>
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                `Halo Admin, saya ingin tanya sewa rombongan untuk baju: ${costume.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-deep hover:underline shrink-0"
            >
              Chat Tim Ahli
            </a>
          </div>
        </div>
      </div>

      {/* Related Costumes */}
      {relatedCostumes.length > 0 && (
        <div className="pt-12 border-t border-sand space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-umber">
              Koleksi Terkait Lainnya
            </h3>
            <Link
              href="/katalog"
              className="text-xs font-semibold text-gold-deep hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCostumes.map((rel) => (
              <ProductCard key={rel.id} costume={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
