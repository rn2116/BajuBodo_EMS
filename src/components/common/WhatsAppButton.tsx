"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloatingButton() {
  const defaultMessage = encodeURIComponent(
    "Halo Admin Sewa Adat Nusantara, saya ingin berkonsultasi mengenai penyewaan baju adat."
  );

  return (
    <aside aria-label="Kontak WhatsApp Langsung">
      <a
        href={`https://wa.me/6281234567890?text=${defaultMessage}`}
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
    </aside>
  );
}
