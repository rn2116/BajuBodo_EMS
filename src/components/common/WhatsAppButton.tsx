"use client";

import { MessageCircle } from "lucide-react";
import { getSiteConfig, getWhatsAppUrl } from "@/lib/config";

export function WhatsAppFloatingButton() {
  const siteConfig = getSiteConfig();
  const defaultMessage =
    "Halo Admin Sewa Baju Bodo, saya ingin berkonsultasi mengenai penyewaan pakaian adat.";

  // Jika nomor WhatsApp pemilik belum dikonfigurasi, tautan akan mengarah ke
  // wa.me tanpa nomor (pemilik website harus mengisi NEXT_PUBLIC_WHATSAPP_NUMBER).
  const whatsappUrl = siteConfig.whatsappNumber
    ? getWhatsAppUrl(siteConfig.whatsappNumber, defaultMessage)
    : "";

  return (
    <aside aria-label="Kontak WhatsApp Langsung">
      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
          aria-label="Konsultasi cepat via WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="hidden sm:inline text-xs font-semibold tracking-wide">
            Tanya Sewa Adat
          </span>
        </a>
      ) : (
        <button
          disabled
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366]/40 text-white px-4 py-3 rounded-full shadow-lg group focus:outline-none"
          aria-label="Nomor WhatsApp belum dikonfigurasi"
          title="Atur NEXT_PUBLIC_WHATSAPP_NUMBER di .env untuk mengaktifkan tombol WhatsApp."
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="hidden sm:inline text-xs font-semibold tracking-wide">
            WhatsApp Belum Diatur
          </span>
        </button>
      )}
    </aside>
  );
}
