import React, { useState } from "react";
import { Sparkles, ArrowRight, Mail, Lock, AlertCircle, RefreshCw } from "lucide-react";

interface LoginPageProps {
  onSuccess: (credentials: { userEmail: string; userName: string; schoolName: string }) => void;
  onNavigate: (view: "landing" | "register") => void;
}

export default function LoginPage({ onSuccess, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState<string>("mahasiswa@gradai.id");
  const [password, setPassword] = useState<string>("password123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Silakan lengkapi kolom email dan password.");
      return;
    }
    setLoading(true);
    setError(null);

    // Simulated short timeout to feel professional and company-like
    setTimeout(() => {
      setLoading(false);
      // Give them predefined or custom credential mapping
      let userName = "Andi Budiman";
      let schoolName = "Universitas Indonesia";

      if (email !== "mahasiswa@gradai.id") {
        // Parse name from email as a fallback for registrants
        const extracted = email.split("@")[0];
        userName = extracted.charAt(0).toUpperCase() + extracted.slice(1);
        schoolName = "Universitas Mitra GradAI";
      }

      onSuccess({
        userEmail: email,
        userName: userName,
        schoolName: schoolName
      });
    }, 1000);
  };

  const loadPredefinedCreds = () => {
    setEmail("mahasiswa@gradai.id");
    setPassword("password123");
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto py-8 animate-fadeIn" id="login-container">
      <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-md relative">
        {/* Company Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl italic text-white mx-auto shadow-md">
            A
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Selamat Kesadaran Datang Kembali</h3>
            <p className="text-xs text-slate-500">
               Masuk ke akun mahasiswa Anda dan periksa kesiapan lamaran kerja Anda.
            </p>
          </div>
        </div>

        {/* Demo Notification Area */}
        <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-center space-y-1.5 z-10 relative">
          <span className="text-[9px] uppercase tracking-wider text-indigo-750 font-bold block">
            Tester Credentials Ready
          </span>
          <p className="text-[11px] text-slate-600">
            Kolom di bawah sudah kami pre-load dengan akun uji coba mahasiswa demi kemudahan review Anda.
          </p>
          <button 
            type="button"
            onClick={loadPredefinedCreds}
            className="text-[10px] text-indigo-650 hover:underline font-semibold cursor-pointer"
          >
            Reset Kolom ke Akun Uji Coba Himpunan
          </button>
        </div>

        {/* Actual Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider">Alamat Email Kampus</label>
            <div className="relative">
              <input
                id="login-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="misal: nama@kampus.ac.id"
                className="w-full bg-white border border-slate-200 text-slate-850 rounded-xl p-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider">Kata Sandi (Password)</label>
              <span className="text-[10px] text-indigo-600 hover:underline cursor-not-allowed">Reset Password?</span>
            </div>
            
            <div className="relative">
              <input
                id="login-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ketik minimal 6 karakter..."
                className="w-full bg-white border border-slate-200 text-slate-850 rounded-xl p-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-250 text-red-700 text-xs rounded-xl flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            id="btn-login-submit"
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-indigo-600/10"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Membuka Pintu Gerbang Kampus...</span>
              </>
            ) : (
              <>
                <span>Masuk Dashboard Premium (Gemini Active)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Redirect toggle */}
        <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
          <span>Belum tergabung sebagai anggota?</span>{" "}
          <button
            type="button"
            onClick={() => onNavigate("register")}
            className="text-indigo-600 hover:underline font-bold cursor-pointer"
          >
            Daftar Baru Di Sini
          </button>
        </div>
      </div>
    </div>
  );
}
