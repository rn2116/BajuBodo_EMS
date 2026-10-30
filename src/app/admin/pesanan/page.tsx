"use client";

import { useState } from "react";
import { INITIAL_ADMIN_ORDERS, AdminOrderRecord } from "@/features/admin/mock-orders";
import { formatRupiah } from "@/lib/utils";
import { OrderStatus } from "@/types";
import { Search, MessageCircle, CalendarCheck } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrderRecord[]>(INITIAL_ADMIN_ORDERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.costumeTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = selectedStatus === "ALL" || o.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border-b border-sand pb-6">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-umber">
          Daftar Lengkap Pesanan & Jadwal Sewa
        </h1>
        <p className="text-xs text-taupe mt-1">
          Lacak pengembalian baju adat, penyerahan unit, pencatatan buffer laundry, dan pencairan deposit jaminan.
        </p>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe" />
          <input
            type="text"
            placeholder="Cari kode booking atau nama penyewa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-sand bg-ivory text-umber focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-end">
          <span className="text-taupe">Filter:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-sand bg-ivory text-umber text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gold"
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING_DP">Menunggu DP</option>
            <option value="CONFIRMED">Dikonfirmasi</option>
            <option value="ACTIVE_RENTED">Sedang Disewa</option>
            <option value="RETURNED">Selesai / Dikembalikan</option>
          </select>
        </div>
      </div>

      {/* Orders Cards / Table */}
      <div className="space-y-3">
        {filtered.map((order) => (
          <div
            key={order.id}
            className="bg-ivory border border-sand rounded-xl p-5 hover:border-gold transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-umber">
                  {order.bookingCode}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold border bg-cream-100 text-taupe-dark">
                  {order.status}
                </span>
              </div>
              <h3 className="font-serif text-base font-bold text-umber">
                {order.costumeTitle} (Size {order.size})
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-taupe">
                <span>Penyewa: <strong>{order.customerName}</strong></span>
                <span>•</span>
                <a
                  href={`https://wa.me/62${order.customerWhatsApp.replace(/^0/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline flex items-center gap-1 font-mono font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  {order.customerWhatsApp}
                </a>
              </div>
              <div className="text-xs text-taupe flex items-center gap-2 pt-1">
                <CalendarCheck className="w-3.5 h-3.5 text-gold-dark" />
                <span>
                  Periode Sewa: <strong>{order.startDate} s/d {order.endDate}</strong>
                </span>
                <span className="text-[10px] bg-sand/60 px-2 py-0.5 rounded text-umber">
                  Buffer laundry: s/d {order.bufferEndDate}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-sand">
              <div className="text-left md:text-right">
                <span className="text-[11px] text-taupe block">Total + Deposit</span>
                <span className="text-base font-bold text-gold-deep">
                  {formatRupiah(order.totalAmount)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {order.status === "PENDING_DP" && (
                  <button
                    onClick={() => handleStatusChange(order.id, "CONFIRMED")}
                    className="px-3 py-1.5 rounded-lg bg-gold hover:bg-gold-dark text-ivory-50 text-xs font-semibold transition-colors"
                  >
                    Konfirmasi DP
                  </button>
                )}
                {order.status === "CONFIRMED" && (
                  <button
                    onClick={() => handleStatusChange(order.id, "ACTIVE_RENTED")}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                  >
                    Serahkan Pakaian
                  </button>
                )}
                {order.status === "ACTIVE_RENTED" && (
                  <button
                    onClick={() => handleStatusChange(order.id, "RETURNED")}
                    className="px-3 py-1.5 rounded-lg bg-sage hover:bg-sage-dark text-white text-xs font-semibold transition-colors"
                  >
                    Tandai Kembali & Refund Deposit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
