import React, { useState } from "react";
import { Sparkles, ArrowRight, User, Mail, Lock, BookOpen, Target, AlertCircle, RefreshCw } from "lucide-react";

interface RegisterPageProps {
  onSuccess: (credentials: { userEmail: string; userName: string; schoolName: string }) => void;
  onNavigate: (view: "landing" | "login") => void;
}

export default function RegisterPage({ onSuccess, onNavigate }: RegisterPageProps) {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [university, setUniversity] = useState<string>("Universitas Airlangga");
  const [targetJob, setTargetJob] = useState<string>("Software Engineer");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sampleUniversities = [
    "Universitas Indonesia",
    "Institut Teknologi Bandung",
    "Universitas Gadjah Mada",
    "Universitas Airlangga",
    "Universitas Bina Nusantara (Binus)",
    "Institut Teknologi Sepuluh Nopember (ITS)"
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || !email.trim() || !password.trim() || !university.trim()) {
      setError("Harap isi semua kolom wajib di bawah.");
      return;
    }
    if (password.length < 6) {
      setError("Kata sandi harus minimal 6 karakter demi keamanan.");
      return;
    }
    setLoading(true);
    setError(null);

    // Simulated short response
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        userEmail: email,
        userName: fullname,
        schoolName: university
      });
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto py-4 animate-fadeIn" id="register-container">
      <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl space-y-5 shadow-md relative">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-indigo-55 border border-indigo-100/80 text-indigo-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Premium Student Account (Free)</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Buat Akun Mahasiswa Baru</h3>
          <p className="text-xs text-slate-500">
            Dapatkan hak akses untuk menggunakan pilar asisten robot ATS & simulator interview Jessica secara penuh.
          </p>
        </div>

        {/* Form elements */}
        <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-650 block uppercase tracking-wider">Nama Lengkap</label>
            <div className="relative">
              <input
                id="reg-name-input"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Contoh: Rian Hidayat"
                className="w-full bg-white border border-slate-200 text-slate-855 rounded-xl p-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
                required
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-650 block uppercase tracking-wider">Email Kampus / Umum</label>
            <div className="relative">
              <input
                id="reg-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="misal: rian@student.unair.ac.id"
                className="w-full bg-white border border-slate-200 text-slate-855 rounded-xl p-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
                required
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-650 block uppercase tracking-wider">Buat Password Baru</label>
            <div className="relative">
              <input
                id="reg-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter..."
                className="w-full bg-white border border-slate-200 text-slate-855 rounded-xl p-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* University selector dropdown with input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-655 block uppercase tracking-wider">Perguruan Tinggi / Universitas</label>
            <div className="relative">
              <select
                id="reg-univ-select"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full bg-white border border-slate-200 text-slate-855 rounded-xl p-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10 appearance-none cursor-pointer"
              >
                {sampleUniversities.map((univ, idx) => (
                  <option key={idx} value={univ}>{univ}</option>
                ))}
              </select>
              <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Target Job Role */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-655 block uppercase tracking-wider">Cita-Cita Pekerjaan Target</label>
            <div className="relative">
              <input
                id="reg-job-input"
                type="text"
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                placeholder="misal: Product Manager, Flutter Developer, UI/UX"
                className="w-full bg-white border border-slate-200 text-slate-855 rounded-xl p-3 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
              />
              <Target className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            id="btn-register-submit"
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-indigo-600/10 transition-all"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Membuat Akun Portofolio...</span>
              </>
            ) : (
              <>
                <span>Daftar Akun & Gabung Premium</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Redirect toggle */}
        <div className="text-center text-xs text-slate-500 border-t border-slate-100 pt-3">
          <span>Sudah terdaftar sebagai mahasiswa?</span>{" "}
          <button
            type="button"
            onClick={() => onNavigate("login")}
            className="text-indigo-600 hover:underline font-bold cursor-pointer"
          >
            Masuk Di Sini
          </button>
        </div>
      </div>
    </div>
  );
}
