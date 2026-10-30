import { OrderStatus, UnitSize } from "@/types";

export interface AdminOrderRecord {
  id: string;
  bookingCode: string;
  costumeTitle: string;
  size: UnitSize;
  customerName: string;
  customerWhatsApp: string;
  startDate: string;
  endDate: string;
  bufferEndDate: string;
  rentalFee: number;
  securityDeposit: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export const INITIAL_ADMIN_ORDERS: AdminOrderRecord[] = [
  {
    id: "ord-001",
    bookingCode: "SEWA-202610-MIN1",
    costumeTitle: "Baju Adat Minangkabau Suntiang Gadang",
    size: "M",
    customerName: "Ayu Pratiwi",
    customerWhatsApp: "081298765432",
    startDate: "2026-11-02",
    endDate: "2026-11-04",
    bufferEndDate: "2026-11-05",
    rentalFee: 450000,
    securityDeposit: 200000,
    totalAmount: 650000,
    status: "ACTIVE_RENTED",
    createdAt: "2026-10-28",
  },
  {
    id: "ord-002",
    bookingCode: "SEWA-202610-JAW2",
    costumeTitle: "Set Beskap & Kebaya Solo Putri Kraton",
    size: "L",
    customerName: "Bagus Wicaksono",
    customerWhatsApp: "081311223344",
    startDate: "2026-11-06",
    endDate: "2026-11-08",
    bufferEndDate: "2026-11-09",
    rentalFee: 550000,
    securityDeposit: 250000,
    totalAmount: 800000,
    status: "CONFIRMED",
    createdAt: "2026-10-29",
  },
  {
    id: "ord-003",
    bookingCode: "SEWA-202610-BAL3",
    costumeTitle: "Busana Adat Bali Payas Agung Kerajaan",
    size: "S",
    customerName: "Ni Made Saraswati",
    customerWhatsApp: "081987654321",
    startDate: "2026-11-10",
    endDate: "2026-11-12",
    bufferEndDate: "2026-11-13",
    rentalFee: 480000,
    securityDeposit: 200000,
    totalAmount: 680000,
    status: "PENDING_DP",
    createdAt: "2026-10-29",
  },
  {
    id: "ord-004",
    bookingCode: "SEWA-202610-BUG4",
    costumeTitle: "Baju Bodo Tokko Bangsawan Bugis",
    size: "M",
    customerName: "Andi Tenri",
    customerWhatsApp: "085244556677",
    startDate: "2026-10-25",
    endDate: "2026-10-27",
    bufferEndDate: "2026-10-28",
    rentalFee: 380000,
    securityDeposit: 150000,
    totalAmount: 530000,
    status: "RETURNED",
    createdAt: "2026-10-20",
  },
];
