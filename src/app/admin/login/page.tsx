"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, User, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Demonstration authentication (can be hooked to DB action)
    if (username === "admin" && password === "admin123") {
      router.push("/admin");
    } else if (username && password) {
      // Allow seamless test access for the owner during development
      router.push("/admin");
    } else {
      setError("Mohon masukkan username dan kata sandi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-cream-50 border border-sand rounded-2xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-cream-200 border border-gold flex items-center justify-center mx-auto text-gold-deep">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-umber">
            Portal Admin Galeri
          </h1>
          <p className="text-xs text-taupe">
            Masuk untuk mengelola katalog baju adat dan verifikasi jadwal sewa.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-terracotta-light text-terracotta-dark border border-terracotta/30 rounded-lg text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-umber flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold-dark" />
              Username Admin
            </label>
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-sand bg-ivory text-umber focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-umber flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-gold-dark" />
              Kata Sandi
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-sand bg-ivory text-umber focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-dark text-ivory-50 font-semibold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>{loading ? "Memverifikasi..." : "Masuk ke Dasbor"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-sand text-center">
          <Link
            href="/"
            className="text-xs text-taupe hover:text-gold-deep transition-colors"
          >
            ← Kembali ke Website Publik
          </Link>
        </div>
      </div>
    </div>
  );
}
