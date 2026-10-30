import Link from "next/link";
import Image from "next/image";
import { Costume } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Calendar } from "lucide-react";

interface ProductCardProps {
  costume: Costume;
}

export function ProductCard({ costume }: ProductCardProps) {
  const categoryLabels: Record<string, { label: string; variant: "gold" | "sage" | "neutral" | "terracotta" }> = {
    PRIA: { label: "Pria", variant: "neutral" },
    WANITA: { label: "Wanita", variant: "gold" },
    PASANGAN: { label: "Pasangan", variant: "sage" },
    ANAK: { label: "Anak-Anak", variant: "neutral" },
  };

  const catMeta = categoryLabels[costume.category] || { label: costume.category, variant: "neutral" };

  return (
    <article className="group bg-cream-50 rounded-xl overflow-hidden border border-sand hover:border-gold transition-all duration-300 hover:shadow-md flex flex-col">
      {/* Product Image Frame */}
      <Link
        href={`/katalog/${costume.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-cream-200"
      >
        <Image
          src={costume.images[0]}
          alt={costume.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-umber/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant={catMeta.variant}>{catMeta.label}</Badge>
          {costume.isFeatured && (
            <Badge variant="gold" className="flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-gold-deep" />
              <span>Koleksi Favorit</span>
            </Badge>
          )}
        </div>

        {/* Region Tag */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="bg-umber/80 backdrop-blur-sm text-ivory-50 text-[11px] px-2.5 py-1 rounded-md font-medium tracking-wide">
            {costume.culturalOrigin}
          </span>
        </div>
      </Link>

      {/* Product Info Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-umber group-hover:text-gold-dark transition-colors line-clamp-1">
            <Link href={`/katalog/${costume.slug}`}>{costume.title}</Link>
          </h3>
          <p className="text-xs text-taupe mt-1.5 line-clamp-2 leading-relaxed">
            {costume.description}
          </p>

          {/* Included accessories summary */}
          <div className="mt-3 text-[11px] text-taupe-dark bg-cream-100 p-2 rounded-md border border-sand/60">
            <span className="font-semibold text-umber">Set Termasuk: </span>
            <span>{costume.includedAccessories.slice(0, 3).join(", ")}</span>
            {costume.includedAccessories.length > 3 && (
              <span className="text-gold-deep font-medium"> +{costume.includedAccessories.length - 3} lainnya</span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-sand flex items-center justify-between">
          <div>
            <span className="block text-[11px] text-taupe">Harga Sewa (3 Hari)</span>
            <span className="text-base font-bold text-gold-deep">
              {formatRupiah(costume.pricePerPeriod)}
            </span>
          </div>

          <Link
            href={`/katalog/${costume.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-md bg-umber hover:bg-gold-dark text-ivory-50 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Cek Jadwal</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
