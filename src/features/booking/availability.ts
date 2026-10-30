import { isBefore, isWithinInterval, parseISO } from "date-fns";

export interface DateRangeCheck {
  startDate: string; // "YYYY-MM-DD"
  endDate: string;   // "YYYY-MM-DD"
}

export interface ExistingBookingSlot {
  startDate: string;
  endDate: string;
  bufferEndDate: string; // endDate + 1 hari pembersihan
  unitCode: string;
}

/**
 * Memeriksa apakah rentang tanggal yang diminta beririsan (bentrok)
 * dengan jadwal pesanan yang sudah ada, termasuk 1 hari jeda laundry/perawatan.
 */
export function isSlotConflicting(
  requested: DateRangeCheck,
  existingSlots: ExistingBookingSlot[]
): boolean {
  const reqStart = parseISO(requested.startDate);
  const reqEnd = parseISO(requested.endDate);

  if (isBefore(reqEnd, reqStart)) {
    return true; // Tanggal selesai tidak boleh sebelum tanggal mulai
  }

  for (const slot of existingSlots) {
    const existStart = parseISO(slot.startDate);
    const existEndWithBuffer = parseISO(slot.bufferEndDate);

    // Rumus Overlap: (ReqStart <= ExistEndWithBuffer) && (ReqEnd >= ExistStart)
    const isOverlapping =
      (reqStart <= existEndWithBuffer && reqEnd >= existStart) ||
      isWithinInterval(reqStart, { start: existStart, end: existEndWithBuffer }) ||
      isWithinInterval(reqEnd, { start: existStart, end: existEndWithBuffer });

    if (isOverlapping) {
      return true;
    }
  }

  return false;
}

/**
 * Menghitung rincian biaya sewa berdasarkan durasi.
 * Standar paket: 3 hari (1 hari pengambilan, 1 hari acara, 1 hari pengembalian).
 * Kelebihan hari dihitung proporsional per hari (misal 30% dari harga paket).
 */
export function calculateRentalBreakdown(
  basePricePerPeriod: number,
  securityDeposit: number,
  durationDays: number
) {
  const standardPeriodDays = 3;
  let rentalFee = basePricePerPeriod;

  if (durationDays > standardPeriodDays) {
    const extraDays = durationDays - standardPeriodDays;
    const extraFeePerDay = Math.round((basePricePerPeriod / standardPeriodDays) * 0.9);
    rentalFee += extraDays * extraFeePerDay;
  }

  return {
    durationDays,
    rentalFee,
    securityDeposit,
    totalEstimatedAmount: rentalFee + securityDeposit,
  };
}
