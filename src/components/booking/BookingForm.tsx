"use client";

import { useState } from "react";
import { Costume, UnitSize } from "@/types";
import { formatRupiah, formatDateIndo } from "@/lib/utils";
import { calculateRentalBreakdown } from "@/features/booking/availability";
import { addDays, format, parseISO, differenceInCalendarDays } from "date-fns";
import { Calendar, ShieldCheck, CheckCircle2, MessageCircle, AlertCircle } from "lucide-react";

interface BookingFormProps {
  costume: Costume;
}

export function BookingForm({ costume }: BookingFormProps) {
  const today = format(new Date(), "yyyy-MM-dd");
  const defaultStart = format(addDays(new Date(), 2), "yyyy-MM-dd");
  const defaultEnd = format(addDays(new Date(), 4), "yyyy-MM-dd");

  const [selectedSize, setSelectedSize] = useState<UnitSize>(costume.availableSizes[0] || "M");
  const [startDate, setStartDate] = useState<string>(defaultStart);
  const [endDate, setEndDate] = useState<string>(defaultEnd);
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsApp, setCustomerWhatsApp] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Calculate rental duration
  const startD = parseISO(startDate);
  const endD = parseISO(endDate);
  const daysDiff = Math.max(1, differenceInCalendarDays(endD, startD) + 1);

  const breakdown = calculateRentalBreakdown(
    costume.pricePerPeriod,
    costume.securityDeposit,
    daysDiff
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim()) {
      setErrorMessage("Mohon cantumkan nama lengkap penyewa.");
      return;
    }

    if (!customerWhatsApp.trim() || customerWhatsApp.length < 9) {
      setErrorMessage("Mohon cantumkan nomor WhatsApp aktif yang valid.");
      return;
    }

    if (differenceInCalendarDays(endD, startD) < 0) {
      setErrorMessage("Tanggal pengembalian tidak boleh sebelum tanggal sewa.");
      return;
    }

    // Generate unique booking code
    const generatedCode = `SEWA-${format(new Date(), "yyyyMMdd")}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;
    setBookingCode(generatedCode);
    setIsSuccess(true);
  };

  const getWhatsAppBookingLink = () => {
    const text = `*FORMULIR PENYEWAAN BAJU ADAT*
----------------------------------------
*Kode Pesanan:* ${bookingCode}
*Pakaian:* ${costume.title}
*Ukuran:* ${selectedSize}
*Asal Adat:* ${costume.culturalOrigin}
----------------------------------------
*Nama Penyewa:* ${customerName}
*No. WhatsApp:* ${customerWhatsApp}
*Alamat Pengiriman/Fitting:* ${deliveryAddress || "-"}
*Tanggal Sewa:* ${formatDateIndo(startDate)}
*Tanggal Kembali:* ${formatDateIndo(endDate)}
*Durasi:* ${breakdown.durationDays} Hari
----------------------------------------
*Biaya Sewa:* ${formatRupiah(breakdown.rentalFee)}
*Uang Jaminan (Deposit):* ${formatRupiah(breakdown.securityDeposit)}
*Total Estimasi:* ${formatRupiah(breakdown.totalEstimatedAmount)}
----------------------------------------
*Catatan:* ${customerNotes || "Tidak ada"}

Halo Admin Sewa Adat Nusantara, saya ingin konfirmasi ketersediaan dan pembayaran DP untuk pesanan di atas. Terima kasih!`;

    return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
  };

  if (isSuccess) {
    return (
      <div className="bg-cream-50 border-2 border-gold rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-sage-light text-sage-dark rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-umber">
            Permohonan Sewa Berhasil Dibuat
          </h3>
          <p className="text-xs text-taupe max-w-md mx-auto">
            Slot pakaian adat Anda telah disiapkan. Silakan klik tombol di bawah untuk meneruskan
            rincian pesanan ke WhatsApp Admin kami guna verifikasi dan instruksi DP.
          </p>
        </div>

        {/* Booking Summary Box */}
        <div className="bg-ivory border border-sand rounded-xl p-5 space-y-3 text-xs">
          <div className="flex justify-between pb-2 border-b border-sand">
            <span className="text-taupe">Kode Booking:</span>
            <span className="font-mono font-bold text-umber text-sm">{bookingCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-taupe">Pakaian:</span>
            <span className="font-semibold text-umber text-right">{costume.title} (Size {selectedSize})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-taupe">Periode Sewa:</span>
            <span className="font-semibold text-umber">
              {formatDateIndo(startDate)} - {formatDateIndo(endDate)} ({breakdown.durationDays} Hari)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-taupe">Penyewa:</span>
            <span className="font-semibold text-umber">{customerName} ({customerWhatsApp})</span>
          </div>
          <div className="pt-3 border-t border-sand flex justify-between text-sm">
            <span className="font-semibold text-umber">Total Biaya + Deposit:</span>
            <span className="font-bold text-gold-deep">{formatRupiah(breakdown.totalEstimatedAmount)}</span>
          </div>
          <p className="text-[11px] text-taupe pt-1 italic">
            *Uang jaminan (deposit) {formatRupiah(breakdown.securityDeposit)} akan dikembalikan penuh setelah baju kembali dalam keadaan baik.
          </p>
        </div>

        {/* CTA to WhatsApp */}
        <div className="space-y-3">
          <a
            href={getWhatsAppBookingLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-xl font-semibold text-sm shadow-md transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Konfirmasi ke WhatsApp Admin Sekarang
          </a>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="w-full text-center text-xs text-taupe hover:text-umber py-2 transition-colors"
          >
            Edit Formulir atau Buat Pesanan Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cream-50 border border-sand rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
    >
      <div className="border-b border-sand pb-4">
        <h3 className="font-serif text-xl font-bold text-umber">Formulir Sewa Baju Adat</h3>
        <p className="text-xs text-taupe mt-1">
          Pilih ukuran dan tanggal acara Anda. Jadwal disinkronkan dengan jeda higienitas laundry 1 hari.
        </p>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-terracotta-light text-terracotta-dark border border-terracotta/30 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Size Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-umber uppercase tracking-wider">
          Pilih Ukuran Busana
        </label>
        <div className="flex flex-wrap gap-2.5">
          {costume.availableSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                selectedSize === size
                  ? "bg-umber text-ivory-50 border-umber shadow-sm"
                  : "bg-ivory text-umber border-sand hover:border-gold"
              }`}
            >
              Ukuran {size}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-umber flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold-dark" />
            Tanggal Mulai Sewa
          </label>
          <input
            type="date"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-sand bg-ivory focus:outline-none focus:ring-2 focus:ring-gold text-umber"
          />
          <span className="text-[10px] text-taupe block">Hari pengambilan / pengiriman</span>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-umber flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold-dark" />
            Tanggal Selesai (Kembali)
          </label>
          <input
            type="date"
            min={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full text-xs font-medium px-3.5 py-2.5 rounded-lg border border-sand bg-ivory focus:outline-none focus:ring-2 focus:ring-gold text-umber"
          />
          <span className="text-[10px] text-taupe block">Hari pengembalian ke galeri</span>
        </div>
      </div>

      {/* Customer Info */}
      <div className="space-y-3.5 pt-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-umber">
            Nama Lengkap Penyewa *
          </label>
          <input
            type="text"
            placeholder="Contoh: Raden Siti Rahmawati"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-sand bg-ivory focus:outline-none focus:ring-2 focus:ring-gold text-umber placeholder:text-taupe/60"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-umber">
            Nomor WhatsApp Aktif *
          </label>
          <input
            type="tel"
            placeholder="Contoh: 081234567890"
            value={customerWhatsApp}
            onChange={(e) => setCustomerWhatsApp(e.target.value)}
            required
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-sand bg-ivory focus:outline-none focus:ring-2 focus:ring-gold text-umber placeholder:text-taupe/60"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-umber">
            Alamat Pengiriman / Fitting (Opsional)
          </label>
          <textarea
            rows={2}
            placeholder="Alamat lengkap jika ingin opsi pengiriman kurir galeri..."
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full text-xs px-3.5 py-2 rounded-lg border border-sand bg-ivory focus:outline-none focus:ring-2 focus:ring-gold text-umber placeholder:text-taupe/60 resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-umber">
            Catatan Acara / Aksesoris Khusus (Opsional)
          </label>
          <input
            type="text"
            placeholder="Contoh: Untuk acara akad nikah, butuh cadangan jarik"
            value={customerNotes}
            onChange={(e) => setCustomerNotes(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-sand bg-ivory focus:outline-none focus:ring-2 focus:ring-gold text-umber placeholder:text-taupe/60"
          />
        </div>
      </div>

      {/* Pricing Breakdown Live Calculation */}
      <div className="bg-ivory border border-sand rounded-xl p-4 space-y-2 text-xs">
        <div className="flex justify-between text-taupe">
          <span>Durasi Sewa:</span>
          <span className="font-semibold text-umber">{breakdown.durationDays} Hari</span>
        </div>
        <div className="flex justify-between text-taupe">
          <span>Biaya Sewa Paket:</span>
          <span className="font-semibold text-umber">{formatRupiah(breakdown.rentalFee)}</span>
        </div>
        <div className="flex justify-between text-taupe pb-2 border-b border-sand">
          <span>Uang Jaminan / Deposit (Refundable):</span>
          <span className="font-semibold text-umber">{formatRupiah(breakdown.securityDeposit)}</span>
        </div>
        <div className="flex justify-between text-sm pt-1">
          <span className="font-bold text-umber">Total Estimasi Pembayaran:</span>
          <span className="font-bold text-gold-deep">{formatRupiah(breakdown.totalEstimatedAmount)}</span>
        </div>
      </div>

      {/* Hygiene and buffer notice */}
      <div className="flex items-start gap-2 text-[11px] text-taupe bg-cream-100 p-3 rounded-lg border border-sand/70">
        <ShieldCheck className="w-4 h-4 text-sage-dark shrink-0 mt-0.5" />
        <span>
          Setiap pakaian adat telah disterilisasi dan dicuci uap khusus. Sistem mengunci 1 hari jeda
          setelah tanggal sewa Anda untuk menjamin kualitas terbaik.
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gold hover:bg-gold-dark text-ivory-50 font-semibold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
      >
        Ajukan Penyewaan Sekarang
      </button>
    </form>
  );
}
