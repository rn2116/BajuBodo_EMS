"use server";

import { db } from "@/lib/db";
import { existsSync } from "fs";
import { unlink, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads", "website-images");

export type WebsiteImageLocation = "HERO" | "BANNER" | "CATEGORY" | "DECORATIVE";

export interface WebsiteImage {
  id: string;
  name: string;
  url: string;
  location: WebsiteImageLocation;
  isActive: boolean;
  costumeId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Memastikan direktori penyimpanan gambar tersedia.
 */
function ensureUploadDir(): void {
  if (!existsSync(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Mengambil seluruh gambar website yang terdaftar, diurutkan lokasi dan tanggal.
 * Bersifat server-side; digunakan oleh Server Component dan Server Action.
 */
export async function listWebsiteImages(): Promise<WebsiteImage[]> {
  try {
    const rows = await db.websiteImage.findMany({
      orderBy: [{ location: "asc" }, { createdAt: "desc" }],
    });
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      url: row.url,
      location: row.location as WebsiteImageLocation,
      isActive: row.isActive,
      costumeId: row.costumeId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  } catch (error) {
    // Basis data belum tersedia / belum di-migrasi. Kembalikan kosong agar
    // halaman client tetap render dengan fallback gambar default.
    console.error("[websiteImages] Gagal mengambil daftar gambar:", error);
    return [];
  }
}

/**
 * Mengambil satu gambar berdasarkan lokasi penggunaan.
 */
export async function getWebsiteImageByLocation(
  location: WebsiteImageLocation
): Promise<WebsiteImage | null> {
  const images = await listWebsiteImages();
  return images.find((img) => img.location === location) ?? null;
}

/**
 * Mengambil gambar aktif (isActive) untuk lokasi tertentu.
 */
export async function getActiveWebsiteImage(
  location: WebsiteImageLocation
): Promise<WebsiteImage | null> {
  const images = await listWebsiteImages();
  return images.find((img) => img.location === location && img.isActive) ?? null;
}

/**
 * Server Action: unggah gambar baru dan simpan metadata ke database.
 */
export async function uploadWebsiteImage(
  _prevState: { success: boolean; message: string } | null,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  ensureUploadDir();

  const file = formData.get("file") as File | null;
  const name = (formData.get("name") as string) || "";
  const location = (formData.get("location") as WebsiteImageLocation) || "DECORATIVE";
  const isActive = formData.get("isActive") === "on";
  const costumeId = (formData.get("costumeId") as string) || undefined;

  if (!file || file.size === 0) {
    return { success: false, message: "File gambar harus dipilih." };
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return {
      success: false,
      message: "Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau AVIF.",
    };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { success: false, message: "Ukuran file maksimal 5 MB." };
  }
  if (!name.trim()) {
    return { success: false, message: "Nama/label gambar harus diisi." };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const fileName = `${Date.now()}-${safeName}.${ext}`;
    const filePath = join(UPLOAD_DIR, fileName);

    await writeFile(filePath, buffer);

    const url = `/uploads/website-images/${fileName}`;

    await db.websiteImage.create({
      data: {
        name: name.trim(),
        url,
        location,
        isActive,
        costumeId: costumeId || null,
      },
    });

    return { success: true, message: "Gambar berhasil diunggah." };
  } catch (error) {
    console.error("[websiteImages] Gagal mengunggah gambar:", error);
    return { success: false, message: "Gagal menyimpan gambar ke server." };
  }
}

/**
 * Server Action: perbarui metadata dan/atau ganti file gambar existing.
 */
export async function updateWebsiteImage(
  id: string,
  _prevState: { success: boolean; message: string } | null,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const name = (formData.get("name") as string) || "";
  const location = (formData.get("location") as WebsiteImageLocation) || "DECORATIVE";
  const isActive = formData.get("isActive") === "on";
  const costumeId = (formData.get("costumeId") as string) || undefined;
  const file = formData.get("file") as File | null;

  try {
    const existing = await db.websiteImage.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, message: "Gambar tidak ditemukan." };
    }

    let url = existing.url;

    if (file && file.size > 0) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        return {
          success: false,
          message: "Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau AVIF.",
        };
      }
      if (file.size > MAX_FILE_SIZE) {
        return { success: false, message: "Ukuran file maksimal 5 MB." };
      }

      ensureUploadDir();
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const safeName = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "gambar";
      const fileName = `${Date.now()}-${safeName}.${ext}`;
      const filePath = join(UPLOAD_DIR, fileName);

      await writeFile(filePath, buffer);
      url = `/uploads/website-images/${fileName}`;

      if (existing.url.startsWith("/uploads/")) {
        const oldPath = join(process.cwd(), "public", existing.url);
        try {
          if (existsSync(oldPath)) await unlink(oldPath);
        } catch {
          // Abaikan jika file lama sudah tidak tersedia.
        }
      }
    }

    await db.websiteImage.update({
      where: { id },
      data: {
        name: name.trim() || existing.name,
        url,
        location,
        isActive,
        costumeId: costumeId || null,
      },
    });

    return { success: true, message: "Gambar berhasil diperbarui." };
  } catch (error) {
    console.error("[websiteImages] Gagal memperbarui gambar:", error);
    return { success: false, message: "Gagal memperbarui gambar." };
  }
}

/**
 * Server Action: hapus gambar beserta file fisiknya.
 */
export async function deleteWebsiteImage(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const existing = await db.websiteImage.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, message: "Gambar tidak ditemukan." };
    }

    await db.websiteImage.delete({ where: { id } });

    if (existing.url.startsWith("/uploads/")) {
      const filePath = join(process.cwd(), "public", existing.url);
      try {
        if (existsSync(filePath)) await unlink(filePath);
      } catch {
        // Abaikan jika file sudah tidak ada.
      }
    }

    return { success: true, message: "Gambar berhasil dihapus." };
  } catch (error) {
    console.error("[websiteImages] Gagal menghapus gambar:", error);
    return { success: false, message: "Gagal menghapus gambar." };
  }
}
