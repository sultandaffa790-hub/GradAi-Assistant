import React from "react";
import { 
  Sparkles, 
  FileText, 
  MessageSquare, 
  Compass, 
  Linkedin, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Users, 
  Zap, 
  ChevronRight,
  TrendingUp,
  Award
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (view: "login" | "register" | "dashboard") => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const steps = [
    {
      title: "Ulasan CV Standard ATS",
      desc: "Koreksi formatting, hitung skor keterbacaan robot penyeleksi, dan isi kata kerja aksi.",
      icon: <FileText className="w-5 h-5 text-amber-450" />,
      tag: "Pilar 1",
      colorBg: "bg-amber-500/10 border-amber-500/25 text-amber-450"
    },
    {
      title: "Simulasi Wawancara AI",
      desc: "Dialog langsung interaktif dengan Jessica (AI HR) menggunakan panduan behavior STAR.",
      icon: <MessageSquare className="w-5 h-5 text-indigo-400" />,
      tag: "Pilar 2",
      colorBg: "bg-indigo-500/10 border-indigo-500/25 text-indigo-400"
    },
    {
      title: "Skill Gap & Peta Jalan",
      desc: "Analisis kesiapan kompetensi Anda lalu miliki kurikulum belajar berfokus proyek murni.",
      icon: <Compass className="w-5 h-5 text-emerald-450" />,
      tag: "Pilar 3",
      colorBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-450"
    },
    {
      title: "Optimasi LinkedIn SEO",
      desc: "Dapatkan rewrite Headline & Tentang Saya (About) yang disukai algoritma & headhunter.",
      icon: <Linkedin className="w-5 h-5 text-blue-400" />,
      tag: "Pilar 4",
      colorBg: "bg-blue-500/10 border-blue-500/25 text-blue-400"
    }
  ];

  return (
    <div className="space-y-16 py-4 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white p-8 md:p-14 text-center md:text-left shadow-sm">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 text-xs text-indigo-700 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pendamping Kelulusan Angkatan 2026/2027</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Kuasai Persiapan Kerja <br />
              <span className="text-indigo-600">Tanpa Bingung</span> & Ragu.
            </h1>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
              Hubungkan CV, asah kecapakan berkisah saat wawancara, periksa gap kompetensi industri, dan optimasikan jangkauan online LinkedIn Anda menggunakan kecerdasan buatan Gemini terbaru.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                id="btn-hero-register"
                onClick={() => onNavigate("register")}
                className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-indigo-600/10 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Daftar Akun Mahasiswa (Free)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="btn-hero-login"
                onClick={() => onNavigate("login")}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-750 font-bold rounded-xl text-sm transition border border-slate-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Masuk Akun Premium</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 text-xs text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-indigo-600" /> Sesuai Regulasi Kemendikbud</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-indigo-600" /> Sesuai Standar ATS Global</span>
            </div>
          </div>

          {/* Graphical Bento representation for Hero */}
          <div className="md:col-span-5 hidden md:block">
            <div className="relative">
              {/* Decorative accent behind */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl blur opacity-15"></div>
              
              <div className="relative bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-slate-150">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-550 block font-bold">RATA-RATA PENERIMAAN</span>
                      <span className="text-sm font-extrabold text-slate-800">85% Kenaikan Lolos ATS</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-indigo-700">
                    <span>Kemajuan Kompetensi Mahasiswa</span>
                    <span>Ready</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-150 flex items-center justify-between text-xs text-slate-500">
                  <span>Gemini Large Reasoning Model</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/50 rounded font-mono text-[9px] font-bold">V3.5 FLASH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Placement Metrics Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="company-metrics-panel">
        {[
          { num: "12,400+", label: "Mahasiswa Terdaftar", sub: "Dari 85+ Kampus Indonesia" },
          { num: "82/100", label: "Skor Rata-Rata ATS", sub: "Meningkat dari basis 45" },
          { num: "3,800+", label: "Portofolio Terbangun", sub: "Oleh Skill Roadmap AI" },
          { num: "94.8%", label: "Tingkat Kepuasan", sub: "Sesi Coaching Tersimulasi" }
        ].map((met, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 text-center md:text-left space-y-1 shadow-xs">
            <h4 className="text-2xl md:text-3xl font-black text-indigo-650">{met.num}</h4>
            <p className="text-xs font-bold text-slate-800 block">{met.label}</p>
            <span className="text-[10px] text-slate-500 block leading-tight">{met.sub}</span>
          </div>
        ))}
      </div>

      {/* Feature Bento Grid Overview */}
      <div className="space-y-6" id="landing-pilar-features">
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest pl-0.5">Premium Features Platform</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-sans">4 Pilar Pelatihan Digital GradAI</h2>
          <p className="text-slate-600 text-xs md:text-sm max-w-xl leading-relaxed">
            Tidak ada lagi tebakan liar. Seluruh fitur terintegrasi satu sama lain untuk membekali masa depan kesiapan karier Anda secara tuntas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((pilar, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 hover:border-indigo-300 rounded-3xl p-5 hover:-translate-y-1 hover:shadow-md transition duration-300 space-y-4 group relative shadow-xs"
            >
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-150">
                  {pilar.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pilar.colorBg.replace(/text-[a-z]+-4[0-9]0/g, 'text-indigo-600').replace(/bg-[a-z]+-500\/10/g, 'bg-indigo-50/50').replace(/border-[a-z]+-500\/25/g, 'border-indigo-100')}`}>
                  {pilar.tag}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition">{pilar.title}</h3>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">{pilar.desc}</p>
              </div>
              <div className="flex items-center text-xs text-slate-500 group-hover:text-indigo-600 pt-2 cursor-pointer font-semibold" onClick={() => onNavigate("login")}>
                <span>Aktifkan Modul</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Testimonials Block */}
      <div className="bg-slate-100/40 border border-slate-200 rounded-3xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Kisah Sukses Alumni Kampus Indonesia</h3>
          <p className="text-xs text-slate-500">Dari ketidakpastian resume menuju penawaran kontrak profesional idaman.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              words: "Sebelumnya saya heran kenapa lamaran magang selalu ditolak mentah-mentah. Setelah dicheck di GradAI, ternyata format tabel CV saya memecahkan sistem ATS. AI memberi instruksi rapih, merevisi headline, dan sekarang saya magang di GOTO Group!",
              name: "Nabila Saraswati",
              campus: "Universitas Indonesia",
              job: "Product Manager Intern @ GOTO"
            },
            {
              words: "Simulasi Wawancara dengan Jessica sangat membantu melupakan kebiasaan kaku saat berbicara. AI menilai kekurangan metode STAR saya dengan kritis namun mendalam. Sesi interview aslinya terasa seperti simulasi GradAI!",
              name: "Rian Hidayat",
              campus: "Institut Teknologi Bandung",
              job: "Junior Backend Eng @ Traveloka"
            },
            {
              words: "Saya tidak pernah terpikir mencantumkan keyword spesifik di LinkedIn. LinkedIn Optimizer GradAI mendesain headline dengan formula SEO yang sangat dahsyat. Dalam 2 minggu ada 3 recruiter menawari interview via DM LinkedIn.",
              name: "Kevin Pratama",
              campus: "Universitas Bina Nusantara",
              job: "Associate UI/UX Designer @ Blibli"
            }
          ].map((testi, idx) => (
            <div key={idx} className="bg-white border border-slate-150 p-5 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-sm transition">
              <p className="text-slate-650 text-xs leading-relaxed italic mb-4">
                "{testi.words}"
              </p>
              <div className="border-t border-slate-100 pt-3 flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-xs text-indigo-700 border border-indigo-100">
                  {testi.name[0]}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">{testi.name}</span>
                  <span className="text-[10px] text-indigo-600 block font-semibold">{testi.job}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call To Action Footer Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 border border-indigo-500 rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-lg shadow-indigo-600/10">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl opacity-20"></div>
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
            Siap Melompati Batas Rasa Ragu Anda Hari Ini?
          </h3>
          <p className="text-indigo-100 text-xs md:text-sm leading-relaxed opacity-95">
            Bergabunglah bersama ribuan rekan mahasiswa di seluruh Indonesia yang telah mengotomatisasi peningkatan kualitas profil profesional mereka. Gratis selamanya untuk akun pemula.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate("register")}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-indigo-50 text-indigo-900 font-extrabold rounded-xl text-xs transition cursor-pointer shadow-md"
            >
              Mulai Daftar Gratis Seketika
            </button>
            <button
              onClick={() => onNavigate("login")}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-700/50 hover:bg-indigo-700/80 text-white font-extrabold rounded-xl text-xs border border-indigo-400/30 transition cursor-pointer"
            >
              Sudah Punya Akun Mahasiswa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
