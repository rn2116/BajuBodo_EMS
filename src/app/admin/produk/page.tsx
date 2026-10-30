"use client";

import { useState } from "react";
import Image from "next/image";
import { COSTUMES } from "@/lib/data/mock-costumes";
import { Costume } from "@/types";
import { formatRupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Plus, Search, CheckCircle } from "lucide-react";

export default function AdminProductsPage() {
  const [costumes] = useState<Costume[]>(COSTUMES);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  const filtered = costumes.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.culturalOrigin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-umber">
            Manajemen Katalog & Stok Busana Adat
          </h1>
          <p className="text-xs text-taupe mt-1">
            Kelola data pakaian adat, kelengkapan ornamen/aksesoris, dan status ketersediaan unit.
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddSuccess(true);
            setTimeout(() => setShowAddSuccess(false), 3000);
          }}
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-ivory-50 px-4 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Busana Adat Baru</span>
        </button>
      </div>

      {showAddSuccess && (
        <div className="p-3 bg-sage-light text-sage-dark border border-sage/30 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>Formulir penambahan koleksi adat siap digunakan. Seluruh slot foto dioptimasi.</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe" />
        <input
          type="text"
          placeholder="Cari pakaian berdasarkan nama atau daerah..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-sand bg-ivory focus:outline-none focus:ring-1 focus:ring-gold text-umber"
        />
      </div>

      {/* Products Table */}
      <div className="bg-ivory border border-sand rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-sand text-taupe bg-cream-50/50">
                <th className="py-3 px-3 font-semibold">Busana & Foto</th>
                <th className="py-3 px-3 font-semibold">Asal Tradisi</th>
                <th className="py-3 px-3 font-semibold">Kategori</th>
                <th className="py-3 px-3 font-semibold">Ukuran Tersedia</th>
                <th className="py-3 px-3 font-semibold">Harga Sewa (3 Hari)</th>
                <th className="py-3 px-3 font-semibold">Uang Deposit</th>
                <th className="py-3 px-3 font-semibold text-right">Kelengkapan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/70">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-cream-50/40 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-md overflow-hidden bg-cream-200 border border-sand shrink-0">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-umber block max-w-xs truncate">
                          {item.title}
                        </span>
                        {item.isFeatured && (
                          <span className="text-[10px] text-gold-deep font-semibold">
                            ★ Koleksi Pilihan
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-taupe-dark">{item.culturalOrigin}</td>
                  <td className="py-3.5 px-3">
                    <Badge variant="neutral">{item.category}</Badge>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex gap-1">
                      {item.availableSizes.map((s) => (
                        <span
                          key={s}
                          className="px-1.5 py-0.5 rounded bg-cream-100 border border-sand text-[10px] font-mono text-umber"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-gold-deep">
                    {formatRupiah(item.pricePerPeriod)}
                  </td>
                  <td className="py-3.5 px-3 text-taupe">{formatRupiah(item.securityDeposit)}</td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="text-[11px] text-taupe">
                      {item.includedAccessories.length} Aksesoris
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
