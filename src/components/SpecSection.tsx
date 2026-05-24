import React from "react";
import { BookOpen, Target, Cpu, TrendingUp, Compass, Award, ShieldAlert } from "lucide-react";

export default function SpecSection() {
  return (
    <div className="space-y-8 animate-fadeIn" id="spec-section">
      {/* Hero Overview */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-2xl p-6 md:p-8 shadow-md">
        <div className="flex items-center space-x-3 mb-3">
          <BookOpen className="w-8 h-8 text-indigo-200" />
          <span className="text-sm font-semibold tracking-wider text-indigo-100 uppercase">Product Requirement Document (PRD)</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">🎓 AI Career Assistant (Spesifikasi Lengkap)</h2>
        <p className="text-indigo-50/90 max-w-3xl text-sm md:text-base leading-relaxed">
          Dokumen spesifikasi komprehensif untuk pengembangan platform bimbingan karier berbasis kecerdasan buatan, dirancang khusus untuk menjembatani kesenjangan kompetensi akademis mahasiswa dengan tuntutan dunia kerja industri.
        </p>
      </div>

      {/* Grid of Core Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Masalah & Target Pengguna */}
        <div id="spec-problem" className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Problem Statement & Target</h3>
          </div>
          <ul className="space-y-3 text-slate-600 text-sm leading-relaxed">
            <li>
              <strong className="text-slate-800">1. Kurangnya Kesiapan ATS CV:</strong> Mahasiswa sering menggunakan template tidak standar yang gagal lolos seleksi otomatis (ATS) HRD perusahaan nasional/multinasional.
            </li>
            <li>
              <strong className="text-slate-800">2. Kecemasan Interview Kerja:</strong> Ketiadaan wadah simulasi interaktif yang realistis dan bebas rasa malu untuk berlatih merespon pertanyaan perilaku (behavioral style).
            </li>
            <li>
              <strong className="text-slate-800">3. Kesenjangan Teori vs Industri:</strong> Sulitnya mengidentifikasi keterampilan teknis terbaru (framework/tooling) yang benar-benar dicari industri aktif saat ini.
            </li>
            <li>
              <strong className="text-slate-800">4. Branding LinkedIn yang Lemah:</strong> Profil LinkedIn mahasiswa seringkali kosong, tidak memiliki kata kunci relevan, dan headline/summary tidak menjual diri secara taktis.
            </li>
          </ul>
        </div>

        {/* Fitur Utama Spesifikasi */}
        <div id="spec-features" className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Spesifikasi 4 Pilar Fitur</h3>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
            <div className="border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-700 block">📄 CV Reviewer & ATS Grader</span>
              Menganalisis file/teks CV, mendeteksi kesalahan struktur, menghiung estimasi skor kelulusan ATS, serta merekomendasikan penggantian kata kerja/pola kalimat pasif.
            </div>
            <div className="border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-700 block">💬 Real-Time Interview Simulator</span>
              Modul chat interaktif di mana AI bersikap layaknya HR Lead. Menghasilkan feedback setelah jawaban pengguna dan menyodorkan pertanyaan tindak lanjut yang dinamis.
            </div>
            <div className="border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-700 block">🗺️ Skill Gap Analyzer & Roadmap</span>
              Memetakan gap kompetensi berdasarkan profesi target, memberikan visualisasi alur timeline belajar lengkap dengan referensi belajar resmi.
            </div>
            <div>
              <span className="font-bold text-slate-700 block">🔗 LinkedIn Enhancer SEO</span>
              Menyusun ulang Headline & Summary profil profesional penarik perhatian LinkedIn algorithm dan headhunter melalui optimasi SEO kata kunci.
            </div>
          </div>
        </div>
      </div>

      {/* Arsitektur Sistem */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Arsitektur Aliran Data (Teknis)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <span className="font-semibold text-slate-800 block mb-1">1. Frontend Layer (React/Vite)</span>
            Didesain menggunakan antarmuka interaktif, responsif, dan animasi fluid dari Tailwind CSS. Form input diolah secara transparan tanpa loading layar penuh demi pengalaman mulus pengguna.
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <span className="font-semibold text-slate-800 block mb-1">2. Endpoint Safe Proxy (Express)</span>
            Menjaga kerahasiaan API Key Google Gemini dengan memproses seluruh permintaan AI di sisi server-side. Validasi skema JSON memastikan data terstruktur stabil dikirim ke klien.
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <span className="font-semibold text-slate-800 block mb-1">3. Brain Engine (Google Gemini 3.5)</span>
            Menggunakan <code className="text-indigo-600 font-mono">gemini-3.5-flash</code>. Mengandalkan skema JSON format kaku (<code className="text-xs">responseSchema</code>) untuk menjamin data tersaji dalam struktur tabel atau butiran rekomendasi yang presisi.
          </div>
        </div>
      </div>

      {/* Rencana Masa Depan & Strategi Skalabilitas */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-indigo-900">Rencana Pengembangan Lanjutan (Roadmap Platform)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-700">
          <div className="space-y-2">
            <h4 className="font-semibold text-indigo-950 flex items-center">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
              Audio & Speech Mock-Interview (V2)
            </h4>
            <p className="pl-4 leading-relaxed text-slate-600">
              Menghubungkan <code className="text-xs font-mono">gemini-3.1-flash-tts-preview</code> untuk memungkinkan simulasi wawancara verbal dua arah menggunakan suara secara instan tanpa mengetik.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-indigo-950 flex items-center">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
              Auto-Generator PDF CV (V2)
            </h4>
            <p className="pl-4 leading-relaxed text-slate-600">
              Pengguna tidak hanya mendapat review, melainkan dapat memilih langsung template ATS-friendly dan mengunduh file PDF hasil racikan AI secara instan.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-indigo-950 flex items-center">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
              Integrasi Portofolio & Pekerjaan (V3)
            </h4>
            <p className="pl-4 leading-relaxed text-slate-600">
              Analisis cerdas yang membandingkan portfolio GitHub/Behance dengan daftar loker aktif di pasar, memberikan rekomendasi kecocokan persentase lamaran kerja.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-indigo-950 flex items-center">
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
              Sertifikasi & Kredensial Pengguna (V3)
            </h4>
            <p className="pl-4 leading-relaxed text-slate-600">
              Asosiasi pembelajaran dari rekomendasi roadmap ke modul kuis mini bertandakan sertifikat digital kelulusan sebagai portofolio baru mahasiswa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
