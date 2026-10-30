"use client";

import { Search, RotateCcw } from "lucide-react";

interface CatalogFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedRegion: string;
  onRegionChange: (r: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  sortBy: string;
  onSortChange: (s: string) => void;
  onReset: () => void;
}

export function CatalogFilter({
  searchQuery,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  onReset,
}: CatalogFilterProps) {
  const regions = [
    { label: "Semua Wilayah", value: "ALL" },
    { label: "Sumatera", value: "Sumatera" },
    { label: "Jawa", value: "Jawa" },
    { label: "Bali & Nusa Tenggara", value: "Bali & Nusa Tenggara" },
    { label: "Sulawesi", value: "Sulawesi" },
    { label: "Kalimantan", value: "Kalimantan" },
  ];

  const categories = [
    { label: "Semua Kategori", value: "ALL" },
    { label: "Wanita", value: "WANITA" },
    { label: "Pria", value: "PRIA" },
    { label: "Pasangan Pengantin", value: "PASANGAN" },
    { label: "Anak-Anak", value: "ANAK" },
  ];

  const hasActiveFilter =
    searchQuery !== "" ||
    selectedRegion !== "ALL" ||
    selectedCategory !== "ALL" ||
    sortBy !== "recommended";

  return (
    <div className="bg-cream-50 border border-sand rounded-xl p-4 sm:p-6 mb-8 space-y-4">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe" />
        <input
          type="text"
          placeholder="Cari baju adat (misal: Suntiang Minang, Beskap Solo, Payas Bali, Baju Bodo)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-sand bg-ivory focus:outline-none focus:ring-2 focus:ring-gold text-umber placeholder:text-taupe/60"
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-2 border-t border-sand/70">
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Region Selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-taupe font-medium hidden sm:inline">Wilayah:</span>
            <select
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-sand bg-ivory text-umber font-medium focus:outline-none focus:ring-1 focus:ring-gold"
            >
              {regions.map((reg) => (
                <option key={reg.value} value={reg.value}>
                  {reg.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-taupe font-medium hidden sm:inline">Kategori:</span>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-sand bg-ivory text-umber font-medium focus:outline-none focus:ring-1 focus:ring-gold"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-taupe font-medium hidden sm:inline">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg border border-sand bg-ivory text-umber font-medium focus:outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="recommended">Koleksi Pilihan</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Reset Filters */}
        {hasActiveFilter && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs text-taupe hover:text-umber transition-colors py-1 px-2.5 rounded border border-sand bg-ivory"
          >
            <RotateCcw className="w-3 h-3 text-gold-dark" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>
    </div>
  );
}
