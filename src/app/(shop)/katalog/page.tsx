import { COSTUMES } from "@/lib/data/mock-costumes";
import { CatalogExplorer } from "@/components/catalog/CatalogExplorer";
import { Sparkles } from "lucide-react";

interface CatalogPageProps {
  searchParams?: {
    wilayah?: string;
    kategori?: string;
  };
}

export const metadata = {
  title: "Katalog Baju Adat Nusantara | Sewa Adat Nusantara",
  description:
    "Eksplorasi koleksi busana adat lengkap dari berbagai daerah Indonesia. Minangkabau, Jawa, Bali, Bugis, Dayak, Aceh, dan Batak dengan kualitas higienis dan aksesoris lengkap.",
};

export default function CatalogPage({ searchParams }: CatalogPageProps) {
  const defaultRegion = searchParams?.wilayah || "ALL";
  const defaultCategory = searchParams?.kategori || "ALL";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Catalog Header */}
      <div className="space-y-2 border-b border-sand pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-gold-deep tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Katalog Lengkap Adat Nusantara</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-umber">
          Koleksi Baju Adat Indonesia
        </h1>
        <p className="text-xs sm:text-sm text-taupe max-w-2xl leading-relaxed">
          Pilih busana tradisional dengan kemegahan tenun dan songket otentik.
          Setiap paket sewa telah mencakup aksesoris lengkap, perhiasan adat, serta perawatan laundry profesional.
        </p>
      </div>

      {/* Interactive Explorer with Filters & Search */}
      <CatalogExplorer
        initialCostumes={COSTUMES}
        defaultCategory={defaultCategory}
        defaultRegion={defaultRegion}
      />
    </div>
  );
}
