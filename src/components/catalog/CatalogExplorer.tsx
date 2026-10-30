"use client";

import { useState, useMemo } from "react";
import { Costume } from "@/types";
import { ProductCard } from "@/components/catalog/ProductCard";
import { CatalogFilter } from "@/components/catalog/CatalogFilter";
import { Sparkles, PackageSearch } from "lucide-react";

interface CatalogExplorerProps {
  initialCostumes: Costume[];
  defaultCategory?: string;
  defaultRegion?: string;
}

export function CatalogExplorer({
  initialCostumes,
  defaultCategory = "ALL",
  defaultRegion = "ALL",
}: CatalogExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(defaultRegion);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [sortBy, setSortBy] = useState("recommended");

  const filteredCostumes = useMemo(() => {
    return initialCostumes
      .filter((costume) => {
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = costume.title.toLowerCase().includes(q);
          const matchOrigin = costume.culturalOrigin.toLowerCase().includes(q);
          const matchDesc = costume.description.toLowerCase().includes(q);
          const matchAcc = costume.includedAccessories.some((acc) =>
            acc.toLowerCase().includes(q)
          );
          if (!matchTitle && !matchOrigin && !matchDesc && !matchAcc) {
            return false;
          }
        }

        // Region Filter
        if (selectedRegion !== "ALL" && costume.region !== selectedRegion) {
          return false;
        }

        // Category Filter
        if (selectedCategory !== "ALL" && costume.category !== selectedCategory) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.pricePerPeriod - b.pricePerPeriod;
        }
        if (sortBy === "price-desc") {
          return b.pricePerPeriod - a.pricePerPeriod;
        }
        // Recommended: Featured first
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [initialCostumes, searchQuery, selectedRegion, selectedCategory, sortBy]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedRegion("ALL");
    setSelectedCategory("ALL");
    setSortBy("recommended");
  };

  return (
    <div className="space-y-6">
      {/* Filter Component */}
      <CatalogFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onReset={handleReset}
      />

      {/* Results Count & Meta */}
      <div className="flex items-center justify-between text-xs text-taupe px-1">
        <span>Menampilkan <strong className="text-umber">{filteredCostumes.length}</strong> koleksi baju adat</span>
        {sortBy === "recommended" && (
          <span className="hidden sm:inline-flex items-center gap-1 text-gold-deep">
            <Sparkles className="w-3.5 h-3.5" />
            Koleksi Terpopuler Ditampilkan Pertama
          </span>
        )}
      </div>

      {/* Product Grid */}
      {filteredCostumes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCostumes.map((costume) => (
            <ProductCard key={costume.id} costume={costume} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-cream-50 border border-sand rounded-2xl max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 bg-sand/60 text-taupe rounded-full flex items-center justify-center mx-auto">
            <PackageSearch className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-umber">
              Koleksi Tidak Ditemukan
            </h4>
            <p className="text-xs text-taupe mt-1 leading-relaxed">
              Tidak ada pakaian adat yang sesuai dengan filter atau kata kunci pencarian Anda.
              Coba sesuaikan pilihan filter atau hubungi kami untuk permintaan busana adat khusus.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center text-xs font-semibold px-4 py-2 bg-umber text-ivory-50 rounded-lg hover:bg-gold-dark transition-colors"
          >
            Tampilkan Semua Busana
          </button>
        </div>
      )}
    </div>
  );
}
