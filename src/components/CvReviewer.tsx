import React, { useState, useRef } from "react";
import { FileDown, Upload, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, RefreshCw, Clipboard } from "lucide-react";
import { CvReviewResponse } from "../types";

export default function CvReviewer() {
  const [cvText, setCvText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CvReviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReview = async () => {
    if (!cvText.trim()) {
      setError("Harap isi atau tempelkan teks CV Anda terlebih dahulu.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/cv-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText }),
      });
      if (!response.ok) {
        throw new Error("Gagal mengulas CV. Coba lagi beberapa saat lagi.");
      }
      const data: CvReviewResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Ada error saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        setCvText(text);
        setError(null);
      }
    };
    reader.readAsText(file);
  };

  // Pre-fill a sample layout to let student try quickly
  const loadSampleCV = () => {
    setCvText(`NAMA: Andi Budiman
EMAIL: andi.budiman@email.com | TELP: 08123456789
LinkedIn: linkedin.com/in/andibudiman

Pendidikan:
S1 Teknik Informatika - Universitas Indonesia (2022 - Sekarang)
IPK: 3.1 / 4.0

Keahlian:
HTML, CSS, Javascript, PHP, Microsoft Office, Photoshop, Teamwork, Komunikasi Baik.

Pengalaman Kerja / Organisasi:
- Anggota divisi humas Himpunan Mahasiswa Informatika (2023)
  * Membantu membuat caption instagram publikasi acara bulanan.
  * Menjadi panitia bagian dokumentasi foto.
- Kerja Praktek Magang sebagai IT Support di PT Maju Mundur (2 Bulan - 2024)
  * Membantu membenahi printer kantor yang macet.
  * Menginstall ulang Windows pada komputer staff admin.`);
    setError(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="cv-reviewer-container">
      {/* Header */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-1">📄 ATS CV Reviewer & Grader</h3>
        <p className="text-slate-500 text-sm">
          Tempelkan teks CV Anda, atau pilih file teks (.txt) untuk mendapatkan penilaian kecocokan ATS serta rincian kelemahan yang wajib diperbaiki.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 block">Isi CV (Text)</label>
              <button
                type="button"
                onClick={loadSampleCV}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors cursor-pointer"
              >
                Gunakan Contoh CV Mahasiswa
              </button>
            </div>

            {/* Drag Drop Area simulated as text-area */}
            <textarea
              id="cv-text-area"
              className="w-full h-80 p-3 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-sans leading-relaxed resize-y"
              placeholder="Gunakan tombal contoh atau paste teks CV Anda di sini..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
            />

            {/* Custom file selector block */}
            <div className="flex items-center space-x-3 justify-center border-2 border-dashed border-slate-200 rounded-lg p-4 bg-slate-50">
              <Upload className="w-5 h-5 text-slate-400" />
              <div className="text-xs text-slate-500 text-center">
                <span 
                  onClick={() => fileInputRef.current?.click()} 
                  className="text-indigo-600 hover:underline font-semibold cursor-pointer"
                >
                  Pilih file .txt CV Anda
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt"
                  className="hidden"
                />
              </div>
            </div>

            {error && (
              <div id="cv-error" className="p-3 bg-red-50 text-red-600 text-xs rounded-lg flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              id="btn-analyze-cv"
              onClick={handleReview}
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium text-sm flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 transition-colors shadowCursor transition ${
                loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menganalisis CV Terbaik Anda...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Mulai Analisis CV Sekarang (AI)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Analysis Column */}
        <div className="lg:col-span-7 space-y-6">
          {!result && !loading && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                <Clipboard className="w-8 h-8 text-slate-400 animate-pulse" />
              </div>
              <h4 className="text-slate-700 font-bold mb-1">Hasil Analisis CV Akan Muncul Di Sini</h4>
              <p className="text-slate-500 text-xs max-w-sm">
                AI akan membaca kesesuaian kata kunci ATS, menilai daya saing, mendeteksi kelemahan, dan menyusun roadmap revisi instan.
              </p>
            </div>
          )}

          {loading && (
            <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center h-full min-h-[400px] space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <Sparkles className="w-6 h-6 text-indigo-500 absolute top-5 left-5 animate-bounce" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-slate-800 font-bold text-base">Sedang Memproses Evaluasi HRD...</h4>
                <p className="text-slate-400 text-xs max-w-sm animate-pulse">
                  Gemini sedang mencocokkan kata kerja aksi industri, penataan tata bahasa, dan memeriksa kompatibilitas ATS sistem fungsional.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6 animate-fadeIn" id="cv-result-display">
              {/* ATS Score & Brief Summary */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border-b border-slate-100 pb-6">
                <div className="text-center sm:text-left space-y-2">
                  <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-semibold">
                    Simulated ATS Score Result
                  </span>
                  <h4 className="text-lg font-bold text-slate-800">Evaluasi Resume Saya</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                {/* Circular Score Badge */}
                <div className="grow-0 shrink-0 text-center">
                  <div className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 ${
                    result.score >= 80 
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700" 
                      : result.score >= 60 
                      ? "border-amber-500 bg-amber-50 text-amber-700" 
                      : "border-red-500 bg-red-50 text-red-700"
                  }`}>
                    <span className="text-3xl font-extrabold">{result.score}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider">ATS Score</span>
                  </div>
                </div>
              </div>

              {/* Weaknesses Section */}
              <div className="space-y-3">
                <h5 className="font-bold text-slate-800 flex items-center space-x-2 text-sm md:text-base">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>Kelemahan CV yang Terdeteksi ({result.weaknesses.length})</span>
                </h5>
                <ul className="space-y-2.5">
                  {result.weaknesses.map((weakness, i) => (
                    <li key={i} className="flex items-start text-sm text-slate-600 pl-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 mr-2 shrink-0"></span>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements Suggestions */}
              <div className="space-y-3 pt-2">
                <h5 className="font-bold text-slate-800 flex items-center space-x-2 text-sm md:text-base">
                  <Lightbulb className="w-5 h-5 text-indigo-500" />
                  <span>Saran Improvement & Langkah Struktur ({result.improvements.length})</span>
                </h5>
                <div className="grid grid-cols-1 gap-2.5">
                  {result.improvements.map((improvement, i) => (
                    <div key={i} className="flex items-start bg-indigo-50/50 border border-indigo-100 rounded-lg p-3 text-sm text-indigo-950">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-2.5 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{improvement}</span>
                    </div>
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
