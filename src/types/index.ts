export type GenderCategory = "PRIA" | "WANITA" | "PASANGAN" | "ANAK";

export type UnitSize = "S" | "M" | "L" | "XL" | "ALL_SIZE";

export type UnitCondition = "EXCELLENT" | "GOOD" | "IN_REPAIR";

export type OrderStatus =
  | "PENDING_DP"
  | "CONFIRMED"
  | "ACTIVE_RENTED"
  | "RETURNED"
  | "CANCELLED";

export interface Category {
  id: string;
  name: string;
  region: string; // e.g. "Sumatera", "Jawa", "Bali & Nusa Tenggara", "Sulawesi", "Kalimantan", "Papua & Maluku"
  slug: string;
  description: string;
}

export interface CostumeUnit {
  id: string;
  costumeId: string;
  size: UnitSize;
  unitCode: string;
  condition: UnitCondition;
  isAvailable: boolean;
}

export interface Costume {
  id: string;
  slug: string;
  title: string;
  region: string;
  category: GenderCategory;
  pricePerPeriod: number; // Harga sewa paket dasar (standar 3 hari)
  securityDeposit: number; // Uang jaminan refundable
  description: string;
  culturalOrigin: string; // Asal adat suku/daerah (e.g. "Minangkabau, Sumatera Barat")
  includedAccessories: string[]; // e.g. ["Suntiang Emas", "Kain Songket", "Salempang", "Kalung"]
  availableSizes: UnitSize[];
  images: string[];
  isFeatured?: boolean;
}

export interface RentalBookingInput {
  costumeId: string;
  size: UnitSize;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  customerName: string;
  customerWhatsApp: string;
  customerEmail?: string;
  deliveryAddress: string;
  notes?: string;
}

export interface RentalBookingSummary {
  bookingCode: string;
  costumeTitle: string;
  size: UnitSize;
  startDate: string;
  endDate: string;
  rentalDurationDays: number;
  rentalFee: number;
  securityDeposit: number;
  totalEstimatedAmount: number;
  customerName: string;
  customerWhatsApp: string;
  status: OrderStatus;
  createdAt: string;
}
