import React, { useState } from "react";
import { Compass, Sparkles, AlertCircle, Calendar, CheckSquare, Search, BookOpen, RefreshCw, ChevronRight } from "lucide-react";
import { SkillRoadmapResponse, RoadmapPhase } from "../types";

export default function SkillGapAnalyzer() {
  const [dreamJob, setDreamJob] = useState<string>("Product Manager");
  const [currentSkills, setCurrentSkills] = useState<string>("Bisa marketing sedikit, pintar presentasi, suka riset");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SkillRoadmapResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleJobs = [
    { title: "Product Manager", current: "Bisa marketing sedikit, pintar presentasi, suka riset" },
    { title: "Data Scientist", current: "Bisa matematika dasar, tahu Python sedikit, senang olah Excel" },
    { title: "Full-Stack Web Developer", current: "Bisa HTML, CSS dasar, belum mengerti Javascript & backend" },
    { title: "UI/UX Designer", current: "Bisa menggambar manual, hobi utak-atik Canva, punya selera visual" }
  ];

  const handleAnalyze = async () => {
    if (!dreamJob.trim()) {
      setError("Isi cita-cita karier target Anda terlebih dahulu.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/skill-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dreamJob, currentSkills }),
      });
      if (!response.ok) {
        throw new Error("Gagal menganalisis peta jalan belajar Anda. Coba lagi.");
      }
      const data: SkillRoadmapResponse = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Terjadi galat.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (job: typeof sampleJobs[0]) => {
    setDreamJob(job.title);
    setCurrentSkills(job.current);
    setError(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="skill-gap-analyzer-container">
      {/* Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-150">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-indigo-650 uppercase tracking-widest">Industry Navigator</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-sans">🗺️ Skill Gap Analyzer & Roadmap</h3>
        <p className="text-slate-650 text-sm mt-1 leading-relaxed">
          Bandingkan skill Anda saat ini dengan standard industri. Cari jalan tercepat untuk menutupi kesenjangan kompetensi (gap) Anda dengan target karier impian.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4 shadow-xs">
            <h4 className="text-sm font-bold text-slate-800 block border-b border-slate-100 pb-2">Target Pekerjaan Anda</h4>
            
            {/* Quick choices */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Contoh Posisi Populer</span>
              <div className="flex flex-wrap gap-2">
                {sampleJobs.map((job, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(job)}
                    className="text-xs bg-slate-50 hover:bg-slate-100 text-slate-705 px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer border border-slate-200"
                  >
                    {job.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Form Fields */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider">Cita-cita Karier Masa Depan</label>
                <div className="relative">
                  <input
                    type="text"
                    value={dreamJob}
                    onChange={(e) => setDreamJob(e.target.value)}
                    placeholder="Contoh: Senior Data Engineer, Product Manager"
                    className="w-full bg-white border border-slate-200 text-slate-850 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-9"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block uppercase tracking-wider">Latar Belakang / Skill Anda Sekarang</label>
                <textarea
                  value={currentSkills}
                  onChange={(e) => setCurrentSkills(e.target.value)}
                  placeholder="Tuliskan pengalaman organisasi, pemrograman dasar, soft-skill, kompetensi bahasa, dll."
                  className="w-full h-28 bg-white border border-slate-200 text-slate-850 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed resize-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-750 text-xs rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              id="btn-analyze-skills"
              onClick={handleAnalyze}
              disabled={loading}
              className={`w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm flex items-center justify-center space-x-2 transition cursor-pointer shadow-md shadow-indigo-600/10`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Merakit Roadmap Belajar...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Kalkulasi Gap & Bikin Roadmap (AI)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-7 space-y-6">
          {!result && !loading && (
            <div className="bg-slate-100/40 border border-slate-200 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="p-3 bg-white rounded-full border border-slate-150 mb-3 text-slate-500 shadow-xs">
                <Compass className="w-8 h-8 animate-pulse" />
              </div>
              <h4 className="text-slate-800 font-bold mb-1">Custom Roadmap Belajar Belum Dihasilkan</h4>
              <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
                Asisten Mentor Karier kami akan menganalisis teknologi/softskill kunci yang belum Anda kuasai, menyusunnya dalam timeline logis per minggu lengkap dengan proyek pembuktian portofolio.
              </p>
            </div>
          )}

          {loading && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] space-y-4 shadow-xs">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <Compass className="w-6 h-6 text-indigo-500 absolute top-5 left-5 animate-bounce" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-slate-800 font-bold">Sedang Mengkalkulasi Kesenjangan Kompetensi...</h4>
                <p className="text-slate-400 text-xs max-w-sm animate-pulse">
                  Gemini sedang mengunduh standar industri, merancang penataan roadmap pembelajaran terstruktur berfokus pada proyek portofolio.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fadeIn" id="skills-result-display">
              {/* Gap Analysis Box */}
              <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-3 shadow-xs">
                <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider inline-block">
                  Skill Gap Evaluation
                </span>
                <h4 className="text-base font-bold text-slate-800">Analisis Kesenjangan Kompetensi Anda:</h4>
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl text-slate-700 text-sm leading-relaxed">
                  {result.gapAnalysis}
                </div>
              </div>

              {/* Dynamic Roadmap Steps */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Rencana Aksi & Timeline Belajar</h4>
                
                <div className="space-y-4">
                  {result.roadmap.map((step, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-5 relative overflow-hidden shadow-xs">
                      <div className="absolute top-0 right-0 bg-indigo-50 text-[10px] text-indigo-700 font-semibold px-4 py-1.5 border-b border-l border-slate-150 rounded-tr-3xl">
                        {step.duration}
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-7 h-7 bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center rounded-lg font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="space-y-4 text-sm w-full">
                          <div>
                            <h5 className="font-bold text-slate-850 text-sm md:text-base leading-tight pr-16">{step.phase}</h5>
                            <span className="text-[11px] text-slate-500 block mt-0.5">Target waktu: {step.duration}</span>
                          </div>

                          {/* Skill checklist tags */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Sub-Skills Wajib Dikuasai:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {step.skillsToLearn.map((skill, sIdx) => (
                                <span key={sIdx} className="bg-slate-50 border border-slate-150 text-slate-705 text-xs px-2.5 py-1 rounded-lg">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Plan Project */}
                          <div className="bg-slate-50 border border-slate-150 rounded-xl p-3.5 space-y-1">
                            <span className="text-[10px] text-indigo-700 uppercase font-bold tracking-wider flex items-center gap-1">
                              <CheckSquare className="w-3.5 h-3.5" /> Proyek Portofolio Mandiri
                            </span>
                            <p className="text-slate-650 text-xs leading-relaxed font-sans">{step.actionPlan}</p>
                          </div>

                          {/* Ref resources */}
                          {step.resources && step.resources.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider flex items-center gap-1">
                                <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Referensi Belajar Terbaik:
                              </span>
                              <div className="flex flex-col gap-1 pl-1">
                                {step.resources.map((res, rIdx) => (
                                  <div key={rIdx} className="text-xs text-slate-650 flex items-center font-medium">
                                    <ChevronRight className="w-3 h-3 text-indigo-600 mr-1 shrink-0" />
                                    <span>{res}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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
