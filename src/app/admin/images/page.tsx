"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  ImageMinus,
  ImagePlus,
  Upload,
  AlertCircle,
  CheckCircle,
  Trash2,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import {
  listWebsiteImages,
  uploadWebsiteImage,
  updateWebsiteImage,
  deleteWebsiteImage,
  type WebsiteImage,
  type WebsiteImageLocation,
} from "@/lib/website-images";

const LOCATION_OPTIONS: { value: WebsiteImageLocation; label: string }[] = [
  { value: "HERO", label: "Hero (Halaman Beranda)" },
  { value: "BANNER", label: "Banner Promosi" },
  { value: "CATEGORY", label: "Gambar Kategori" },
  { value: "DECORATIVE", label: "Gambar Dekoratif / Section" },
];

const LOCATION_LABEL: Record<WebsiteImageLocation, string> = {
  HERO: "Hero (Halaman Beranda)",
  BANNER: "Banner Promosi",
  CATEGORY: "Gambar Kategori",
  DECORATIVE: "Gambar Dekoratif / Section",
};

export default function AdminWebsiteImagesPage() {
  const [images, setImages] = useState<WebsiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [openUpload, setOpenUpload] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState<WebsiteImageLocation>("DECORATIVE");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formCostumeId, setFormCostumeId] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listWebsiteImages();
      setImages(data);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const resetForm = () => {
    setFormName("");
    setFormLocation("DECORATIVE");
    setFormIsActive(true);
    setFormCostumeId("");
    setFormFile(null);
    setEditingId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (formFile) formData.append("file", formFile);
    formData.append("name", formName);
    formData.append("location", formLocation);
    formData.append("isActive", formIsActive ? "on" : "off");
    formData.append("costumeId", formCostumeId);

    let result: { success: boolean; message: string };
    if (editingId) {
      result = await updateWebsiteImage(editingId, null, formData);
    } else {
      result = await uploadWebsiteImage(null, formData);
    }

    if (result.success) {
      showNotification("success", result.message);
      resetForm();
      setOpenUpload(false);
      await fetchImages();
    } else {
      showNotification("error", result.message);
    }
  };

  const handleReplace = (image: WebsiteImage) => {
    setEditingId(image.id);
    setFormName(image.name);
    setFormLocation(image.location);
    setFormIsActive(image.isActive);
    setFormCostumeId(image.costumeId ?? "");
    setFormFile(null);
    setOpenUpload(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus gambar ini? File fisik juga akan dibuang.")) {
      return;
    }
    const result = await deleteWebsiteImage(id);
    if (result.success) {
      showNotification("success", result.message);
      await fetchImages();
    } else {
      showNotification("error", result.message);
    }
  };

  const toggleActive = async (image: WebsiteImage) => {
    const formData = new FormData();
    formData.append("name", image.name);
    formData.append("location", image.location);
    formData.append("isActive", !image.isActive ? "on" : "off");
    formData.append("costumeId", image.costumeId ?? "");

    const result = await updateWebsiteImage(image.id, null, formData);
    if (result.success) {
      showNotification("success", result.message);
      await fetchImages();
    } else {
      showNotification("error", result.message);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-umber flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-gold-dark" />
            Manajemen Gambar Website
          </h1>
          <p className="text-xs text-taupe mt-1">
            Kelola gambar yang ditampilkan di website client (Hero, Banner, Kategori, dan
            dekoratif) tanpa mengubah source code.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setOpenUpload(true);
          }}
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-ivory-50 px-4 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Unggah Gambar Baru</span>
        </button>
      </div>

      {notification && (
        <div
          className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
            notification.type === "success"
              ? "bg-sage-light text-sage-dark border border-sage/30"
              : "bg-terracotta-light text-terracotta-dark border border-terracotta/30"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Upload / Replace Form */}
      <div
        className={`bg-cream-50 border border-sand rounded-xl p-6 sm:p-8 space-y-4 ${
          openUpload ? "" : "hidden"
        }`}
      >
        <h2 className="font-serif text-lg font-bold text-umber">
          {editingId ? "Ganti Gambar" : "Unggah Gambar Baru"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-umber">
              Nama / Label Gambar
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Contoh: Hero Halaman Beranda"
              required
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-sand bg-ivory text-umber focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-umber">
              Lokasi Penggunaan
            </label>
            <select
              value={formLocation}
              onChange={(e) => setFormLocation(e.target.value as WebsiteImageLocation)}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-sand bg-ivory text-umber font-medium focus:outline-none focus:ring-1 focus:ring-gold"
            >
              {LOCATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-umber">
              <input
                type="checkbox"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="w-4 h-4 text-gold border-sand rounded focus:ring-gold"
              />
              Aktifkan / Tampilkan di Website
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-umber">
              ID Kostum Terkait (Opsional)
            </label>
            <input
              type="text"
              value={formCostumeId}
              onChange={(e) => setFormCostumeId(e.target.value)}
              placeholder="Contoh: cst-sulawesi-baju-bodo"
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-sand bg-ivory text-umber focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <p className="text-[10px] text-taupe/60">
              Kosongkan jika gambar bukan milik kostum tertentu.
            </p>
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-umber">
              Pilih File Gambar
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleFileChange}
              className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-sand bg-ivory text-umber focus:outline-none focus:ring-2 focus:ring-gold"
            />
            {formFile && (
              <p className="text-[10px] text-taupe/60">
                {formFile.name} • {(formFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </div>

          <div className="sm:col-span-2 flex gap-2">
            <button
              type="submit"
              disabled={!formFile && !editingId}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-ivory-50 font-semibold py-3 px-6 rounded-xl text-xs transition-colors"
            >
              {editingId ? (
                <>
                  <ImageMinus className="w-4 h-4" /> Simpan Perubahan
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" /> Simpan Gambar
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setOpenUpload(false);
              }}
              className="inline-flex items-center text-xs text-taupe hover:text-umber py-3 px-4 rounded-lg border border-sand bg-ivory transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>

      {/* Image List */}
      <div className="bg-ivory border border-sand rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-taupe text-xs">Memuat daftar gambar...</div>
        ) : images.length === 0 ? (
          <div className="p-8 text-center text-taupe text-xs">
            Belum ada gambar website. Unggah gambar pertama melalui tombol di atas.
          </div>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-sand text-taupe bg-cream-50/50">
                <th className="py-3 px-3 font-semibold">Preview</th>
                <th className="py-3 px-3 font-semibold">Nama</th>
                <th className="py-3 px-3 font-semibold">Lokasi</th>
                <th className="py-3 px-3 font-semibold">Kostum</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/70">
              {images.map((img) => (
                <tr
                  key={img.id}
                  className="hover:bg-cream-50/40 transition-colors"
                >
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-md overflow-hidden bg-cream-200 border border-sand shrink-0">
                        <Image
                          src={img.url}
                          alt={img.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-gold-deep hover:underline font-mono flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Buka File
                      </a>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-medium text-umber block truncate max-w-xs">
                      {img.name}
                    </span>
                    <span className="text-[10px] text-taupe">{img.url}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-semibold text-taupe">
                      {LOCATION_LABEL[img.location]}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] text-taupe">
                      {img.costumeId ?? "-"}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => toggleActive(img)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-colors ${
                        img.isActive
                          ? "bg-sage-light text-sage-dark border-sage/30"
                          : "bg-terracotta-light text-terracotta-dark border-terracotta/30"
                      }`}
                    >
                      {img.isActive ? "Aktif" : "Nonaktif"}
                    </button>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleReplace(img)}
                        className="p-1.5 text-gold-deep hover:text-gold-dark hover:bg-gold-light/40 rounded transition-colors"
                        aria-label="Ganti gambar"
                      >
                        <ImagePlus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="p-1.5 text-terracotta-dark hover:text-terracotta hover:bg-terracotta-light/40 rounded transition-colors"
                        aria-label="Hapus gambar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="text-xs text-taupe/60 mt-2">
        <RefreshCw className="w-3 h-3 inline mr-1 text-taupe/40" />
        Perubahan gambar akan muncul di website client setelah halaman dimuat ulang/cache
        diperbarui. File disimpan di <code className="text-umber">public/uploads/website-images/</code>.
      </div>
    </div>
  );
}
