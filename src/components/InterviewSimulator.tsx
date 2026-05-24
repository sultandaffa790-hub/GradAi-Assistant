import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Play, Send, RefreshCw, Award, BookOpen, AlertCircle, Sparkles, User, ShieldAlert } from "lucide-react";
import { ChatMessage, InterviewSimResponse } from "../types";

export default function InterviewSimulator() {
  const [role, setRole] = useState<string>("Software Engineer");
  const [customRole, setCustomRole] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputAnswer, setInputAnswer] = useState<string>("");
  
  // Historical evaluations to show current feedback in detail
  const [latestFeedback, setLatestFeedback] = useState<{
    feedback: string;
    tips: string;
  } | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const availableRoles = [
    "Software Engineer",
    "Digital Marketing Specialist",
    "Product Manager",
    "UI/UX Designer",
    "Data Analyst",
    "Human Resources (HR)"
  ];

  useEffect(() => {
    // Scroll to bottom on new messages
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startInterview = async () => {
    setStarted(true);
    setLoading(true);
    setMessages([]);
    setLatestFeedback(null);

    const activeRole = role === "Lainnya" ? customRole : role;
    const initialText = `Halo! Terima kasih sudah hadir dalam sesi simulasi interview hari ini untuk posisi **${activeRole}**. 

Saya Jessica, Senior Talent Acquisition yang akan memandu wawancara Anda. Kita akan menguji aspek kompetensi teknis, kecakapan umum, serta kesiapan attitude Anda.

Untuk memulai, *bisakah Anda ceritakan secara singkat tentang diri Anda, fokus studi Anda, dan mengapa Anda tertarik dengan posisi ${activeRole} ini?*`;
    
    setTimeout(() => {
      setMessages([
        {
          id: "1",
          sender: "ai",
          text: initialText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
      setLoading(false);
    }, 1200);
  };

  const handleSendAnswer = async () => {
    if (!inputAnswer.trim() || loading) return;

    const activeRole = role === "Lainnya" ? customRole : role;
    const userMsgId = Date.now().toString();
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: inputAnswer,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, newUserMessage]);
    const currentInput = inputAnswer;
    setInputAnswer("");
    setLoading(true);

    try {
      // Send chat history to Express server Gemini endpoint
      const response = await fetch("/api/interview/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: activeRole,
          history: [...messages, newUserMessage],
          userResponse: currentInput
        })
      });

      if (!response.ok) {
        throw new Error("Gagal mengolah jawaban sim. Cobalah lagi.");
      }

      const data: InterviewSimResponse = await response.json();

      // Set evaluations
      setLatestFeedback({
        feedback: data.feedback,
        tips: data.tips
      });

      // Add feedback notice & new question
      const aiReplyText = `**[Feedback Jawaban Anda]:** ${data.feedback}\n\n**[Tips HR]:** ${data.tips}\n\n---\n\n**[Pertanyaan Berikutnya]:**\n${data.nextQuestion}`;
      
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: aiReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "ai",
          text: "Maaf, koneksi server terganggu. Bisakah Anda mengulangi pernyataan terakhir Anda?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetInterview = () => {
    setStarted(false);
    setMessages([]);
    setLatestFeedback(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="interview-sim-container">
      {/* Header */}
      <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">💬 AI HR Interview Simulator</h3>
            <p className="text-slate-500 text-sm">
              Latih kesiapan mental dan ketangkasan merespon pertanyaan HRD secara interaktif, berstruktur STAR, serta dapatkan feedback langsung.
            </p>
          </div>
          {started && (
            <button
              onClick={resetInterview}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ganti Posisi Kerja</span>
            </button>
          )}
        </div>
      </div>

      {!started ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Pilih Pekerjaan Target & Mulai Sesi</h4>
            <p className="text-slate-500 text-xs">
              AI akan menjadi Interviewer HR berpengalaman khusus di bidang yang Anda pilih.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 block">Posisi Jabatan (Job Role)</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {availableRoles.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
                <option value="Lainnya">Lainnya (Tulis Sendiri)...</option>
              </select>
            </div>

            {role === "Lainnya" && (
              <div className="space-y-2 animate-fadeIn">
                <label className="text-sm font-semibold text-slate-700 block">Tulis Nama Posisi Anda</label>
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Contoh: Mobile Developer, Copywriter, Social Media Manager"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <button
              onClick={startInterview}
              disabled={role === "Lainnya" && !customRole.trim()}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-lg text-sm shadow flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>Mulai Wawancara Simulasi</span>
            </button>
          </div>
        </div>
      ) : (
        <div id="interview-simulation-active" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-[550px]">
            {/* HR Representative Profile banner */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 rounded-t-xl flex items-center space-x-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-indigo-150 border border-indigo-200 flex items-center justify-center font-bold text-indigo-700 uppercase">
                JS
              </div>
              <div>
                <span className="text-sm font-bold text-slate-800 block">Jessica (Pewawancara HR Senior)</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-semibold">
                  Mock-Interview Posisi: {role === "Lainnya" ? customRole : role}
                </span>
              </div>
            </div>

            {/* Scrollable messages block */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-4 rounded-xl max-w-[85%] shadow-xs leading-relaxed text-sm ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-none whitespace-pre-wrap"
                  }`}>
                    {msg.sender === "ai" ? (
                      <div>
                        {/* Clean output for user friendly markdown look */}
                        {msg.text.split("\n\n").map((chunk, j) => {
                          if (chunk.startsWith("**[Feedback Jawaban Anda]:**")) {
                            return (
                              <div key={j} className="mb-3 p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg text-xs text-indigo-950">
                                <span className="font-bold text-indigo-700 block mb-1">💡 Evaluasi Jawaban Terakhir:</span>
                                {chunk.replace("**[Feedback Jawaban Anda]:**", "").trim()}
                              </div>
                            );
                          }
                          if (chunk.startsWith("**[Tips HR]:**")) {
                            return (
                              <div key={j} className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-950">
                                <span className="font-bold text-emerald-700 block mb-1">🎯 Tips Penyusunan STAR Method:</span>
                                {chunk.replace("**[Tips HR]:**", "").trim()}
                              </div>
                            );
                          }
                          if (chunk.startsWith("**[Pertanyaan Berikutnya]:**")) {
                            return (
                              <div key={j} className="text-slate-800 font-medium pl-2 border-l-4 border-indigo-500 py-1 bg-indigo-50/30">
                                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider mb-1 text-indigo-600">Pertanyaan Wawancara Baru:</span>
                                {chunk.replace("**[Pertanyaan Berikutnya]:**", "").replace("---\n\n", "").trim()}
                              </div>
                            );
                          }
                          return <p key={j} className="mb-2 text-slate-800 text-sm whitespace-pre-wrap">{chunk}</p>;
                        })}
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                    <span className={`text-[9px] block text-right mt-1 ${msg.sender === "user" ? "text-indigo-200" : "text-slate-400"}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs text-slate-500 text-xs flex items-center space-x-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                    <span>Ibu Jessica sedang menilai jawaban Anda sekilas...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat writing input field */}
            <div className="p-3 bg-white border-t border-slate-200 rounded-b-xl flex gap-2">
              <input
                id="interview-input"
                type="text"
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAnswer()}
                disabled={loading}
                placeholder="Ketik balasan jawaban terbaik Anda di sini..."
                className="flex-1 p-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                id="btn-send-answer"
                onClick={handleSendAnswer}
                disabled={loading || !inputAnswer.trim()}
                className="px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-sm flex items-center justify-center cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Sidebar: Dynamic Coaching Manual */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5 h-fit">
            <h4 className="font-bold text-slate-800 text-sm md:text-base flex items-center space-x-2 border-b border-slate-100 pb-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <span>Kunci Menjawab Metode STAR</span>
            </h4>

            <div className="space-y-3.5 text-xs text-slate-600">
              <p className="leading-relaxed">
                Recruiter sangat suka dengan jawaban terstruktur. Pastikan jawaban Anda berisikan ramuan 4 unsur:
              </p>
              
              <div className="space-y-2">
                <div className="p-2 border-l-2 border-indigo-500 bg-indigo-50/50 rounded-r">
                  <span className="font-bold text-indigo-950 block">S - Situation (Situasi)</span>
                  Jelaskan konteks proyek atau masalah lama yang Anda hadapi.
                </div>
                <div className="p-2 border-l-2 border-indigo-400 bg-indigo-50/30 rounded-r">
                  <span className="font-bold text-indigo-950 block">T - Task (Tugas)</span>
                  Uraikan peran & tanggung jawab serta tantangan Anda.
                </div>
                <div className="p-2 border-l-2 border-emerald-500 bg-emerald-50 rounded-r">
                  <span className="font-bold text-emerald-950 block">A - Action (Tindakan)</span>
                  Langkah konkret apa yang Anda kerjakan mengatasi masalah itu.
                </div>
                <div className="p-2 border-l-2 border-amber-500 bg-amber-50 rounded-r">
                  <span className="font-bold text-amber-950 block">R - Result (Hasil)</span>
                  Akhir cerita terbaik, sertakan angka pencapaian bila ada!
                </div>
              </div>
            </div>

            {latestFeedback && (
              <div className="bg-indigo-50 border border-indigo-150 p-4 rounded-xl space-y-2 animate-fadeIn">
                <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider block">Live Coaching Card</span>
                <p className="text-xs text-indigo-950 font-bold leading-normal">
                  Fokus Tips Terkini:
                </p>
                <p className="text-xs text-indigo-900 leading-relaxed italic bg-white/70 p-2.5 rounded-lg border border-indigo-100">
                  "{latestFeedback.tips}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
