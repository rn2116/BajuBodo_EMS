"use client";

import { useState } from "react";
import { INITIAL_ADMIN_ORDERS, AdminOrderRecord } from "@/features/admin/mock-orders";
import { COSTUMES } from "@/lib/data/mock-costumes";
import { formatRupiah } from "@/lib/utils";
import { OrderStatus } from "@/types";
import {
  ShoppingBag,
  Clock,
  Sparkles,
  Shirt,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<AdminOrderRecord[]>(INITIAL_ADMIN_ORDERS);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const statusConfig: Record<
    OrderStatus,
    { label: string; bg: string; text: string; border: string }
  > = {
    PENDING_DP: {
      label: "Menunggu DP",
      bg: "bg-terracotta-light",
      text: "text-terracotta-dark",
      border: "border-terracotta/30",
    },
    CONFIRMED: {
      label: "DP Terbayar / Terjadwal",
      bg: "bg-gold-light",
      text: "text-gold-deep",
      border: "border-gold/30",
    },
    ACTIVE_RENTED: {
      label: "Sedang Disewa",
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    RETURNED: {
      label: "Selesai / Dikembalikan",
      bg: "bg-sage-light",
      text: "text-sage-dark",
      border: "border-sage/30",
    },
    CANCELLED: {
      label: "Dibatalkan",
      bg: "bg-gray-100",
      text: "text-gray-600",
      border: "border-gray-200",
    },
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const filteredOrders = orders.filter((ord) => {
    if (filterStatus === "ALL") return true;
    return ord.status === filterStatus;
  });

  const activeRentedCount = orders.filter((o) => o.status === "ACTIVE_RENTED").length;
  const pendingDpCount = orders.filter((o) => o.status === "PENDING_DP").length;
  const confirmedCount = orders.filter((o) => o.status === "CONFIRMED").length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-umber">
            Dasbor Operasional Galeri
          </h1>
          <p className="text-xs text-taupe mt-1">
            Pantau status pesanan, verifikasi pelunasan DP, dan jadwal buffer pencucian baju adat.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-sage-light text-sage-dark px-3 py-1.5 rounded-full font-medium border border-sage/30">
            Sistem Jadwal: Aktif (Buffer 1 Hari Otomatis)
          </span>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-ivory border border-sand rounded-xl p-5 space-y-1">
          <div className="flex items-center justify-between text-taupe text-xs">
            <span>Sedang Disewa</span>
            <Shirt className="w-4 h-4 text-blue-600" />
          </div>
          <span className="block text-2xl font-bold text-umber">{activeRentedCount}</span>
          <span className="text-[11px] text-taupe block">Pakaian aktif di tangan penyewa</span>
        </div>

        <div className="bg-ivory border border-sand rounded-xl p-5 space-y-1">
          <div className="flex items-center justify-between text-taupe text-xs">
            <span>Menunggu DP</span>
            <Clock className="w-4 h-4 text-terracotta-dark" />
          </div>
          <span className="block text-2xl font-bold text-umber">{pendingDpCount}</span>
          <span className="text-[11px] text-taupe block">Perlu verifikasi WhatsApp</span>
        </div>

        <div className="bg-ivory border border-sand rounded-xl p-5 space-y-1">
          <div className="flex items-center justify-between text-taupe text-xs">
            <span>Jadwal Terkonfirmasi</span>
            <CheckCircle2 className="w-4 h-4 text-gold-deep" />
          </div>
          <span className="block text-2xl font-bold text-umber">{confirmedCount}</span>
          <span className="text-[11px] text-taupe block">Siap disiapkan / disetrika</span>
        </div>

        <div className="bg-ivory border border-sand rounded-xl p-5 space-y-1">
          <div className="flex items-center justify-between text-taupe text-xs">
            <span>Koleksi Katalog</span>
            <Sparkles className="w-4 h-4 text-gold-dark" />
          </div>
          <span className="block text-2xl font-bold text-umber">{COSTUMES.length}</span>
          <span className="text-[11px] text-taupe block">Model busana adat aktif</span>
        </div>
      </div>

      {/* Orders Management Table */}
      <div className="bg-ivory border border-sand rounded-xl overflow-hidden shadow-sm space-y-4 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-serif text-lg font-bold text-umber flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-gold-dark" />
            <span>Daftar Pesanan Sewa Masuk</span>
          </h2>

          {/* Filter status buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-taupe mr-1">Status:</span>
            {["ALL", "PENDING_DP", "CONFIRMED", "ACTIVE_RENTED", "RETURNED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  filterStatus === st
                    ? "bg-umber text-ivory-50"
                    : "bg-cream-100 text-taupe hover:text-umber"
                }`}
              >
                {st === "ALL" ? "Semua" : statusConfig[st as OrderStatus]?.label || st}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-sand text-taupe bg-cream-50/50">
                <th className="py-3 px-3 font-semibold">Kode & Tanggal</th>
                <th className="py-3 px-3 font-semibold">Penyewa & Kontak</th>
                <th className="py-3 px-3 font-semibold">Busana & Ukuran</th>
                <th className="py-3 px-3 font-semibold">Periode Sewa (Buffer)</th>
                <th className="py-3 px-3 font-semibold">Total Biaya</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Aksi Operasional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/70">
              {filteredOrders.map((ord) => {
                const conf = statusConfig[ord.status];
                return (
                  <tr key={ord.id} className="hover:bg-cream-50/40 transition-colors">
                    <td className="py-3.5 px-3">
                      <span className="font-mono font-bold text-umber block">
                        {ord.bookingCode}
                      </span>
                      <span className="text-[10px] text-taupe">{ord.createdAt}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-umber block">{ord.customerName}</span>
                      <a
                        href={`https://wa.me/62${ord.customerWhatsApp.replace(/^0/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-green-700 hover:underline font-mono"
                      >
                        <MessageCircle className="w-3 h-3 text-green-600" />
                        {ord.customerWhatsApp}
                      </a>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-medium text-umber block max-w-xs truncate">
                        {ord.costumeTitle}
                      </span>
                      <span className="text-[10px] text-taupe">Ukuran: {ord.size}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="block font-medium text-umber">
                        {ord.startDate} s/d {ord.endDate}
                      </span>
                      <span className="text-[10px] text-taupe block">
                        Buffer cuci: s/d {ord.bufferEndDate}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-gold-deep block">
                        {formatRupiah(ord.totalAmount)}
                      </span>
                      <span className="text-[10px] text-taupe">
                        Deposit: {formatRupiah(ord.securityDeposit)}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${conf.bg} ${conf.text} ${conf.border}`}
                      >
                        {conf.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {ord.status === "PENDING_DP" && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, "CONFIRMED")}
                          className="px-2.5 py-1 rounded bg-gold hover:bg-gold-dark text-ivory-50 text-[11px] font-semibold transition-colors"
                        >
                          Konfirmasi DP
                        </button>
                      )}
                      {ord.status === "CONFIRMED" && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, "ACTIVE_RENTED")}
                          className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-colors"
                        >
                          Serahkan Baju
                        </button>
                      )}
                      {ord.status === "ACTIVE_RENTED" && (
                        <button
                          onClick={() => handleUpdateStatus(ord.id, "RETURNED")}
                          className="px-2.5 py-1 rounded bg-sage hover:bg-sage-dark text-white text-[11px] font-semibold transition-colors"
                        >
                          Kembali & Refund Deposit
                        </button>
                      )}
                      {ord.status === "RETURNED" && (
                        <span className="text-[11px] text-taupe italic">
                          Selesai & Lunas
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
