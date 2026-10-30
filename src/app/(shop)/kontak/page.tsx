import {
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageCircle,
  ShieldAlert,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Kontak & Kebijakan Sewa | Sewa Adat Nusantara",
  description:
    "Hubungi galeri Sewa Adat Nusantara. Pelajari lokasi galeri, panduan fitting baju adat, dan aturan deposit pengembalian.",
};

export default function ContactPage() {
  const faqs = [
    {
      q: "Berapa lama standar durasi penyewaan?",
      a: "Standar penyewaan adalah paket 3 hari: Hari 1 untuk pengambilan/pengiriman busana, Hari 2 untuk pemakaian acara, dan Hari 3 untuk pengembalian ke galeri kami sebelum pukul 18.00 WIB.",
    },
    {
      q: "Bagaimana sistem pengembalian uang jaminan (deposit)?",
      a: "Uang jaminan (deposit) akan langsung ditransfer kembali 100% penuh secara real-time ke rekening/e-wallet Anda segera setelah baju adat dan seluruh aksesoris dicek oleh tim galeri kami dalam kondisi baik.",
    },
    {
      q: "Apakah saya perlu mencuci baju adat sebelum dikembalikan?",
      a: "TIDAK PERLU. Busana adat kami terbuat dari kain tenun, songket, sutra, dan beludru yang memerlukan metode dry clean dan uap khusus. Anda cukup mengembalikan pakaian dan aksesoris ke dalam kantong busana (garment bag) yang kami sediakan.",
    },
    {
      q: "Bisakah saya mencoba ukuran (fitting) terlebih dahulu?",
      a: "Tentu bisa! Anda sangat dipersilakan datang ke galeri kami di Jakarta Pusat untuk mencoba pakaian dan konsultasi ornamen adat dengan membuat janji temu terlebih dahulu via WhatsApp.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-2 border-b border-sand pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-gold-deep tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Layanan Informasi & Galeri</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-umber">
          Kontak & Kebijakan Sewa
        </h1>
        <p className="text-xs sm:text-sm text-taupe max-w-2xl leading-relaxed">
          Kami siap melayani kebutuhan busana adat Anda untuk pernikahan, acara wisuda,
          pemotretan adat, dan pagelaran budaya.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Cards & Studio Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-cream-50 border border-sand rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="font-serif text-xl font-bold text-umber">
              Galeri Pusat Sewa Adat
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-taupe">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-cream-200 border border-sand flex items-center justify-center shrink-0 text-gold-deep">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-umber">Alamat Galeri Fitting:</span>
                  <p className="mt-0.5 leading-relaxed">
                    Jl. Cempaka Putih Raya No. 45, Cempaka Putih, Jakarta Pusat, DKI Jakarta 10510
                  </p>
                  <span className="block text-[11px] text-taupe mt-1">
                    (Dekat Halte Busway Cempaka Timur / Tersedia parkir mobil & motor)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-cream-200 border border-sand flex items-center justify-center shrink-0 text-gold-deep">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-umber">Telepon & WhatsApp:</span>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-deep hover:underline font-mono text-xs font-semibold block mt-0.5"
                  >
                    +62 812-3456-7890 (Layanan Konsultasi Cepat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-cream-200 border border-sand flex items-center justify-center shrink-0 text-gold-deep">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-umber">Jam Operasional Galeri:</span>
                  <p className="mt-0.5">
                    Senin – Sabtu: 09.00 – 18.00 WIB
                    <br />
                    Minggu / Hari Libur: Khusus dengan Perjanjian Fitting
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-cream-200 border border-sand flex items-center justify-center shrink-0 text-gold-deep">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold text-umber">Email Korespondensi:</span>
                  <span className="text-umber">halo@sewaadatnusantara.com</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sand">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20jadwalkan%20fitting%20baju%20adat%20di%20galeri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-xl font-semibold text-xs tracking-wide shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Jadwalkan Kunjungan Fitting via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Rental Rules & FAQ */}
        <div className="lg:col-span-6 space-y-6">
          {/* Transparent Rental Rules */}
          <div className="bg-ivory border border-sand rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-serif text-xl font-bold text-umber flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-gold-dark" />
              Kebijakan Sewa & Uang Jaminan
            </h2>
            <ul className="space-y-3 text-xs text-taupe leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-deep mt-1.5 shrink-0" />
                <span>
                  <strong>Uang Jaminan (Security Deposit):</strong> Wajib dibayarkan saat pelunasan sewa dan akan dikembalikan utuh maksimal 1x24 jam setelah busana diterima kembali di galeri.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-deep mt-1.5 shrink-0" />
                <span>
                  <strong>Keterlambatan Pengembalian:</strong> Keterlambatan tanpa konfirmasi dikenakan biaya Rp 50.000/hari yang dipotong dari uang jaminan.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-deep mt-1.5 shrink-0" />
                <span>
                  <strong>Keutuhan Aksesoris:</strong> Perhiasan adat (suntiang, bros, keris, gelang) dihitung jumlah itemnya sebelum dan sesudah sewa untuk menghindari kehilangan.
                </span>
              </li>
            </ul>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-cream-50 border border-sand rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-serif text-xl font-bold text-umber flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-gold-dark" />
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-ivory border border-sand/80 rounded-xl p-4 space-y-1.5"
                >
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-umber">
                    {faq.q}
                  </h3>
                  <p className="text-xs text-taupe leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
