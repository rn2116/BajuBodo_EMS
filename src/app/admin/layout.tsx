import Link from "next/link";
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  ExternalLink,
  Shield,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F5F0] text-umber">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-umber text-ivory-100 flex flex-col justify-between p-5 border-r border-taupe-dark shrink-0">
        <div className="space-y-8">
          {/* Admin Header */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold-medium">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-serif text-sm font-bold text-ivory">
                Admin Galeri
              </span>
              <span className="block text-[10px] text-sand/60 tracking-wider uppercase">
                Sewa Baju Bodo
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-cream-100/10 text-ivory hover:bg-cream-100/20 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-gold-medium" />
              <span>Ringkasan Operasional</span>
            </Link>

            <Link
              href="/admin/pesanan"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sand hover:bg-cream-100/10 hover:text-ivory transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-gold-medium" />
              <span>Daftar Pesanan Sewa</span>
            </Link>

            <Link
              href="/admin/produk"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sand hover:bg-cream-100/10 hover:text-ivory transition-colors"
            >
              <Shirt className="w-4 h-4 text-gold-medium" />
              <span>Katalog & Stok Unit</span>
            </Link>

            <Link
              href="/admin/images"
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sand hover:bg-cream-100/10 hover:text-ivory transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-gold-medium" />
              <span>Manajemen Gambar</span>
            </Link>
          </nav>
        </div>

        {/* Back to Public Web Link */}
        <div className="pt-6 border-t border-taupe-dark">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-sand/80 hover:text-gold-light transition-colors py-2"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Kunjungi Website Publik</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
