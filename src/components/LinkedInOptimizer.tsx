import React, { useState } from "react";
import { Sparkles, Linkedin, Award, AlertCircle, Copy, Check, RefreshCw, Key, FileText } from "lucide-react";
import { LinkedInOptimizeResponse } from "../types";

export default function LinkedInOptimizer() {
  const [targetRole, setTargetRole] = useState<string>("Product Manager Intern");
  const [experiences, setExperiences] = useState<string>("Mahasiswa Semester 6 Sistem Informasi UI. Aktif di Himpunan Mahasiswa sebagai VP External Relations. Menyukai manajemen produk dan pernah ikut project kelompok membuat MVP e-commerce sederhana.");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<LinkedInOptimizeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const sampleProfiles = [
    {
      role: "Product Manager Intern",
      xp: "Mahasiswa Semester 6 Sistem Informasi UI. Aktif di Himpunan Mahasiswa sebagai VP External Relations. Menyukai manajemen produk dan pernah ikut project kelompok membuat MVP e-commerce sederhana."
    },
    {
      role: "Junior Web Developer",
      xp: "Lulusan S1 Informatika Binus. Menyukai React.js dan Node.js. Punya 1 proyek magang 3 bulan membuat dashboard keuangan internal perusahaan swasta."
    },
    {
      role: "UI/UX Designer",
      xp: "Mahasiswa Desain Komunikasi Visual semester 8. Mahir menggunakan Figma, Adobe Illustrator. Hobi membuat redesign aplikasi transportasi online untuk portofolio dribbble."
    }
  ];

  const handleOptimize = async () => {
    if (!targetRole.trim()) {
      setError("Isi target posisi karir impian Anda terlebih dahulu.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/linkedin-optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole, experiences }),
      });
      if (!response.ok) {
        throw new Error("Gagal mengoptimasi profil LinkedIn Anda. Coba lagi.");
      }
      const data: LinkedInOptimizeResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Gagal membangun optimasi kata kunci LinkedIn.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text: string, type: "headline" | "summary", index?: number) => {
    navigator.clipboard.writeText(text);
    if (type === "headline" && index !== undefined) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  const loadSample = (sample: typeof sampleProfiles[0]) => {
    setTargetRole(sample.role);
    setExperiences(sample.xp);
    setError(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="linkedin-optimizer-container">
      {/* Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-150">
            <Linkedin className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-blue-650 uppercase tracking-widest">Digital Branding</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-sans">🔗 LinkedIn Profile Optimizer</h3>
        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
          Hasilkan opsi headline LinkedIn yang memikat berkemampuan SEO tinggi (Search Engine Optimization) serta summary (Tentang Saya) berbentuk bercerita yang dinikmati para rekruter profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4 shadow-xs">
            <h4 className="text-sm font-bold text-slate-800 block border-b border-slate-100 pb-2">Atur Profile Saya</h4>

            {/* Suggestions buttons */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Gunakan Data Contoh</span>
              <div className="flex flex-wrap gap-2">
                {sampleProfiles.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => loadSample(item)}
                    className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer border border-slate-200 hover:border-slate-350"
                  >
                    {item.role}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider">Target Posisi Pekerjaan</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Contoh: Frontend Developer, Social Media Manager"
                  className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider">Tulis Riwayat Singkat / Pengalaman Anda</label>
                <textarea
                  value={experiences}
                  onChange={(e) => setExperiences(e.target.value)}
                  placeholder="Ceritakan kuliah Anda saat ini, organisasi, prestasi akademis, hobi profesional, atau proyek kecil yang pernah dibuat..."
                  className="w-full h-32 bg-white border border-slate-200 text-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              id="btn-optimize-linkedin"
              onClick={handleOptimize}
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 cursor-pointer transition shadow-md shadow-indigo-600/10"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Mengoptimasi Personal Branding Anda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Optimasi LinkedIn (AI)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results output */}
        <div className="lg:col-span-7 space-y-6">
          {!result && !loading && (
            <div className="bg-slate-100/40 border border-slate-200 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="p-3 bg-white rounded-full border border-slate-150 mb-3 text-blue-600 shadow-xs">
                <Linkedin className="w-8 h-8 animate-pulse" />
              </div>
              <h4 className="text-slate-800 font-bold mb-1">Branding Siap Ditulis Ulang</h4>
              <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
                Platform akan merancang headline berbobot SEO yang menarik rekruter lewat pencarian LinkedIn, menyusun summary profesional, & memberikan kata kunci krusial untuk dipasang di portofolio Anda.
              </p>
            </div>
          )}

          {loading && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] space-y-4 shadow-xs">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <Linkedin className="w-6 h-6 text-indigo-500 absolute top-5 left-5 animate-bounce" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-slate-800 font-bold">Sedang Merancang Personal Branding Terbaik...</h4>
                <p className="text-slate-400 text-xs max-w-sm animate-pulse">
                  Gemini sedang menyusun headline SEO bergaya profesional, serta mendesain paragraf Tentang Saya (About) dengan metode storytelling yang taktis.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fadeIn" id="linkedin-result-display">
              {/* Headline Options */}
              <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-3 shadow-xs">
                <div className="flex items-center space-x-2 text-xs font-bold text-indigo-700 uppercase tracking-widest">
                  <Award className="w-4 h-4" />
                  <span>Pilihan Headline LinkedIn Baru (SEO & Memukau)</span>
                </div>
                <p className="text-[11px] text-slate-500">Pilih salah satu model headline di bawah ini untuk dipasang di bagian headline utama akun LinkedIn Anda:</p>
                
                <div className="space-y-2 pt-1">
                  {result.headlineOptions.map((headline, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl flex justify-between items-center group relative gap-3">
                      <span className="text-slate-800 text-xs md:text-sm font-medium leading-relaxed">
                        {headline}
                      </span>
                      <button
                        onClick={() => handleCopyText(headline, "headline", idx)}
                        className="p-2 bg-white hover:bg-slate-50 text-slate-550 hover:text-slate-800 rounded-lg shrink-0 cursor-pointer border border-slate-200 transition shadow-xs"
                        title="Copy headline"
                      >
                        {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-650" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Storytelling About / Summary */}
              <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-3 shadow-xs">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-blue-750 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                    <FileText className="w-4 h-4" /> Rewrite "About Me" / Tentang Saya
                  </span>
                  <button
                    onClick={() => handleCopyText(result.summary, "summary")}
                    className="text-xs bg-slate-50 border border-slate-200 text-indigo-700 hover:text-indigo-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl text-slate-700 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {result.summary}
                </div>
              </div>

              {/* Skills Keywords suggestion for Search Matchmaking */}
              <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-2 shadow-xs">
                <span className="text-[10px] text-slate-550 uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-indigo-650" /> Keyword Rekomendasi (SEO Matchmaking)
                </span>
                <p className="text-[11px] text-slate-500">Pasangkan keyword penunjang ini pada menu "Keahlian" (Skills) profil LinkedIn Anda agar mudah diidentifikasi rekruter profesional:</p>
                <div className="flex flex-wrap gap-2 pt-1.5">
                  {result.keyKeywords.map((tag, idx) => (
                    <span key={idx} className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1.5 rounded-xl font-medium border border-indigo-100/50">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
