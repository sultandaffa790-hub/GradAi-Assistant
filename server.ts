import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it to your environment or secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

app.use(express.json());

// --- API ROUTES ---

// 1. CV Reviewer API
app.post("/api/cv-review", async (req, res) => {
  try {
    const { cvText } = req.body;
    if (!cvText || typeof cvText !== "string" || cvText.trim().length === 0) {
      res.status(400).json({ error: "Isi teks CV tidak boleh kosong." });
      return;
    }

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Lakukan analisis kritis dan tinjauan mendalam (deep review) terhadap isi CV berikut dalam Bahasa Indonesia.
Berikan masukan yang berfokus pada kelayakan lulus penapisan ATS (Applicant Tracking System), kelemahan struktural/bahasa, serta usulan konkret agar relevan dengan industri saat ini.

Isi CV:
"""
${cvText}
"""`,
      config: {
        systemInstruction: "Anda adalah HR Manager senior sekaligus pakar penulisan resume profesional (ATS specialist). Berikan masukan berkualitas, jujur, kritis tapi membangun dalam format JSON yang bersih.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: "Perkiraan skor kesiapan ATS CV (skala 0 - 100)"
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Daftar aspek yang melemahkan isi CV atau formatnya"
            },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Rekomendasi taktis langkah demi langkah untuk merevisi CV"
            },
            explanation: {
              type: Type.STRING,
              description: "Ulasan umum komprehensif mengenai profil dan CV pelamar ini"
            }
          },
          required: ["score", "weaknesses", "improvements", "explanation"]
        }
      }
    });

    const resultText = response.text || "{}";
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("CV Review Error:", error);
    res.status(500).json({ error: error.message || "Gagal melakukan analisis CV." });
  }
});

// 2. Interview SIMULATOR API
app.post("/api/interview/chat", async (req, res) => {
  try {
    const { role, history, userResponse } = req.body;
    if (!role) {
      res.status(400).json({ error: "Posisi jabatan target (role) harus ditentukan." });
      return;
    }

    const ai = getAiClient();
    
    // Construct rich context from chat history
    let threadContext = "";
    if (history && history.length > 0) {
      threadContext = history.map((msg: any) => {
        return `${msg.sender === "ai" ? "HR" : "Kandidat"}: ${msg.text}`;
      }).join("\n");
    } else {
      threadContext = "Simulasi baru dimulai.";
    }

    const promptMessage = `Simulasi Wawancara Kerja posisi: **${role}**

Riwayat percakapan sejauh ini:
${threadContext}

Response Jawaban Terbaru Kandidat:
"${userResponse || ""}"

Tolong berikan:
1. Evaluasi jujur (feedback) atas jawaban terakhir Kandidat tersebut (terutama jika ada aspek STAR method yang kurang atau poin kunci).
2. Tips singkat untuk meningkatkan kualitas jawabannya.
3. Pertanyaan lanjutan (nextQuestion) yang berbobot, melatih pemikiran kritis kandidat, dan relevan dengan posisi ${role}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptMessage,
      config: {
        systemInstruction: "Anda adalah Pewawancara (Interviewer / HR Head) yang sangat berpengalaman dari sebuah top company global. Anda ramah namun taktis, senang menantang kandidat dengan pertanyaan mendalam yang logis. Berkomunikasilah dalam Bahasa Indonesia yang formal dan sopan, kembalikan data dalam format JSON resmi.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: {
              type: Type.STRING,
              description: "Feedback komprehensif atas jawaban kandidat sebelumnya"
            },
            tips: {
              type: Type.STRING,
              description: "Tips taktis untuk memperbaiki atau memperjelas jawaban kandidat"
            },
            nextQuestion: {
              type: Type.STRING,
              description: "Satu pertanyaan wawancara berikutnya untuk kandidat"
            }
          },
          required: ["feedback", "tips", "nextQuestion"]
        }
      }
    });

    const resultText = response.text || "{}";
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Interview SIM Error:", error);
    res.status(500).json({ error: error.message || "Gagal memproses simulasi interview." });
  }
});

// 3. Skill Gap Analyzer API
app.post("/api/skill-roadmap", async (req, res) => {
  try {
    const { dreamJob, currentSkills } = req.body;
    if (!dreamJob) {
      res.status(400).json({ error: "Cita-cita karier (dream job) tidak boleh kosong." });
      return;
    }

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Saya bercita-cita menjadi seorang: **${dreamJob}**
Keahlian/latar belakang saya saat ini: "${currentSkills || "Belum ada / masih pemula"}"

Tolong buatkan analisis kesenjangan kompetensi (skill gap) dan susun roadmap belajar konkret berfokus pada kesiapan siap kerja (industry-ready).`,
      config: {
        systemInstruction: "Anda adalah Tech Lead, Product Director, atau Chief Business Officer yang paham betul standar industri saat ini. Anda bertindak sebagai Career Mentor yang menyusun peta jalan belajar yang logis, sistematis, dan langsung bisa dieksekusi. Respons harus berupa JSON sesuai tipe skema yang ditentukan.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            gapAnalysis: {
              type: Type.STRING,
              description: "Analisis deskriptif tajam mengenai kesenjangan kompetensi user dengan tuntutan pasar saat ini"
            },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING, description: "Nama fase atau level pembelajaran (misal: Fase 1: Dasar Pemrograman)" },
                  duration: { type: Type.STRING, description: "Estimasi lama waktu pengerjaan (misal: Minggu 1-4)" },
                  skillsToLearn: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Teknologi, framework, atau soft-skill yang wajib dikuasai di fase ini"
                  },
                  actionPlan: { type: Type.STRING, description: "Tugas praktis atau proyek kecil konkret yang harus diselesaikan untuk pembuktian" },
                  resources: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Rekomendasi referensi (platform kursus, buku, dokumentasi resmi)"
                  }
                },
                required: ["phase", "duration", "skillsToLearn", "actionPlan", "resources"]
              }
            }
          },
          required: ["gapAnalysis", "roadmap"]
        }
      }
    });

    const resultText = response.text || "{}";
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Skill Gap Error:", error);
    res.status(500).json({ error: error.message || "Gagal membuat analisis roadmap skill." });
  }
});

// 4. LinkedIn Profile Optimizer API
app.post("/api/linkedin-optimize", async (req, res) => {
  try {
    const { experiences, targetRole } = req.body;
    if (!targetRole) {
      res.status(400).json({ error: "Target posisi (target role) harus diisi." });
      return;
    }

    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Bantu saya merevisi profil LinkedIn untuk menarik perhatian HRD & Matchmaking algorithm LinkedIn.
Target Posisi: **${targetRole}**
Kondisi Pengalaman / Riwayat Saat Ini:
"${experiences || "Mahasiswa aktif yang ingin berkarir profesional."}"

Tolong buatkan usulan optimasi headline LinkedIn yang memikat berkemampuan SEO tinggi, resume summary (Tentang Saya) yang kuat bercerita, serta daftar keyword rekomendasi.`,
      config: {
        systemInstruction: "Anda adalah LinkedIn Career Advisor, Growth Marketer, dan Talent Specialist yang ahli dalam personal branding digital para profesional muda. Berikan data keluaran berstruktur JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headlineOptions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Daftar 3 model opsi headline yang persuasif, kaya keyword, menggunakan pemisah estetik"
            },
            summary: {
              type: Type.STRING,
              description: "Summary profil LinkedIn (About section) bercerita (storytelling style), profesional, dengan Call-to-Action kontak di akhir."
            },
            keyKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Kata kunci berbobot tinggi untuk dipasang di bagian Skills / Experience LinkedIn agar mudah dijaring recruiter"
            }
          },
          required: ["headlineOptions", "summary", "keyKeywords"]
        }
      }
    });

    const resultText = response.text || "{}";
    res.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("LinkedIn Optimizer Error:", error);
    res.status(500).json({ error: error.message || "Gagal mengoptimasi profil LinkedIn." });
  }
});


// --- VITE WEB MIDDLEWARE CONFIGURATION ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running beautifully on http://0.0.0.0:${PORT}`);
  });
}

startServer();
