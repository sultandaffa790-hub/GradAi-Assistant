import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  FileText, 
  MessageSquare, 
  Compass, 
  Linkedin, 
  BookOpen, 
  Award, 
  Settings, 
  Maximize2,
  ChevronRight,
  TrendingUp,
  Briefcase,
  LogOut,
  LogIn,
  UserPlus,
  Home,
  User,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import CvReviewer from "./components/CvReviewer";
import InterviewSimulator from "./components/InterviewSimulator";
import SkillGapAnalyzer from "./components/SkillGapAnalyzer";
import LinkedInOptimizer from "./components/LinkedInOptimizer";
import SpecSection from "./components/SpecSection";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { ActiveTool } from "./types";

interface UserProfile {
  email: string;
  name: string;
  school: string;
}

export default function App() {
  const [activeView, setActiveView] = useState<"landing" | "login" | "register" | "dashboard">("landing");
  const [activeTab, setActiveTab] = useState<ActiveTool>("spec");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Load user profile from localStorage if exists for smooth persistence
  useEffect(() => {
    const cached = localStorage.getItem("gradai_user_session");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setUserProfile(parsed);
        setActiveView("dashboard");
      } catch (err) {
        localStorage.removeItem("gradai_user_session");
      }
    }
  }, []);

  const handleLoginSuccess = (creds: { userEmail: string; userName: string; schoolName: string }) => {
    const profile: UserProfile = {
      email: creds.userEmail,
      name: creds.userName,
      school: creds.schoolName
    };
    setUserProfile(profile);
    localStorage.setItem("gradai_user_session", JSON.stringify(profile));
    setActiveView("dashboard");
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setUserProfile(null);
    localStorage.removeItem("gradai_user_session");
    setActiveView("landing");
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col p-4 md:p-6 overflow-x-hidden">
      {/* Top Corporate Navigation */}
      <nav className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4 shrink-0 transition" id="bento-navigation">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView(userProfile ? "dashboard" : "landing")}>
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl italic text-white shadow-lg shadow-indigo-600/30">
            A
          </div>
          <div>
            <span className="text-lg md:text-xl font-bold tracking-tight block text-slate-800">
              GradAI <span className="text-indigo-600">Assistant</span>
            </span>
            <span className="text-[10px] text-slate-500 tracking-wider block font-semibold hover:text-indigo-600 transition">
              🎓 INDONESIAN CAMPUS TO INDUSTRY HUB
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          <button 
            onClick={() => setActiveView(userProfile ? "dashboard" : "landing")}
            className={`text-xs font-bold tracking-wider uppercase transition flex items-center gap-1.5 cursor-pointer ${activeView === "landing" || activeView === "dashboard" ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600"}`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Utama</span>
          </button>
          
          <button 
            onClick={() => {
              if (userProfile) {
                setActiveView("dashboard");
                setActiveTab("spec");
              } else {
                setActiveView("login");
              }
            }}
            className={`text-xs font-bold tracking-wider uppercase transition flex items-center gap-1.5 cursor-pointer ${activeTab === "spec" && activeView === "dashboard" ? "text-indigo-600" : "text-slate-500 hover:text-indigo-600"}`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>System PRD</span>
          </button>
        </div>

        {/* Desktop Right Side CTA buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Active indicator */}
          <div className="bg-white px-4 py-1.5 rounded-full border border-slate-200 text-xs flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-slate-600 font-medium font-mono">Gemini 3.5 Active</span>
          </div>

          {userProfile ? (
            <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
              {/* User Avatar Circle */}
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-800 block leading-tight">{userProfile.name}</span>
                <span className="text-[9px] text-indigo-600 block font-semibold truncate max-w-[150px]">{userProfile.school}</span>
              </div>
              <div className="w-9 h-9 bg-indigo-50 rounded-full border-2 border-indigo-200/50 overflow-hidden flex items-center justify-center text-xs font-black select-none text-indigo-700">
                {userProfile.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase()}
              </div>
              <button 
                id="btn-logout-navbar"
                onClick={handleLogout}
                className="p-2 bg-white hover:bg-slate-50 text-red-500 hover:text-red-700 rounded-xl border border-slate-200 transition cursor-pointer"
                title="Keluar dari Akun"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView("login")}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </button>
              <button
                onClick={() => setActiveView("register")}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Daftar Gratis</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle Menu */}
        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dynamic dropdown navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border border-slate-200 rounded-2xl p-4 mb-4 space-y-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-2.5">
            <button 
              onClick={() => { setActiveView(userProfile ? "dashboard" : "landing"); setMobileMenuOpen(false); }}
              className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-indigo-600" />
              <span>Halaman Utama</span>
            </button>
            <button 
              onClick={() => { 
                if (userProfile) {
                  setActiveView("dashboard");
                  setActiveTab("spec");
                } else {
                  setActiveView("login");
                }
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Dokumen Spesifikasi PRD</span>
            </button>
          </div>

          <div className="border-t border-slate-200 pt-3">
            {userProfile ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {userProfile.name[0]}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block leading-tight">{userProfile.name}</span>
                    <span className="text-[10px] text-slate-500 block truncate max-w-[200px]">{userProfile.school}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-650 border border-red-200/50 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Keluar Akun</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setActiveView("login"); setMobileMenuOpen(false); }}
                  className="py-2 border border-slate-200 hover:bg-slate-50 bg-white rounded-xl text-xs font-bold text-slate-650 text-center flex items-center justify-center gap-1.5 transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => { setActiveView("register"); setMobileMenuOpen(false); }}
                  className="py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-6">
        
        {/* VIEW 1: GUEST LANDING PAGE */}
        {activeView === "landing" && (
          <LandingPage onNavigate={(view) => setActiveView(view)} />
        )}

        {/* VIEW 2: LOGIN PAGE */}
        {activeView === "login" && (
          <LoginPage 
            onSuccess={handleLoginSuccess} 
            onNavigate={(view) => setActiveView(view)} 
          />
        )}

        {/* VIEW 3: REGISTER PAGE */}
        {activeView === "register" && (
          <RegisterPage 
            onSuccess={handleLoginSuccess} 
            onNavigate={(view) => setActiveView(view)} 
          />
        )}

        {/* VIEW 4: PREMIUM INTERACTIVE DASHBOARD VIEW */}
        {activeView === "dashboard" && userProfile && (
          <div className="space-y-6 animate-fadeIn transition-all">
            {/* Short Dashboard Introduction */}
            <div className="bg-gradient-to-r from-indigo-50/50 via-white to-white border border-indigo-100/50 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-full font-bold">
                    PREMIUM MEMBER
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Sesi Aktif Edukasi</span>
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900">
                  Selamat Berlatih, {userProfile.name}! 👋
                </h1>
                <p className="text-slate-600 text-xs md:text-sm">
                  Almamater: <span className="text-indigo-600 font-bold">{userProfile.school}</span>. Silakan pilih salah satu Bento Modul di bawah untuk mulai simulasi bimbingan karier Anda.
                </p>
              </div>
              
              <div className="shrink-0 flex gap-2">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4" id="main-bento-grid">
              
              {/* Bento Box 1: Platform Specs / PRD (Wide Header-Level Card) */}
              <div 
                onClick={() => setActiveTab("spec")}
                className={`col-span-1 md:col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 cursor-pointer relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 shadow-xs ${
                  activeTab === "spec" ? "ring-2 ring-indigo-550 shadow-md bg-indigo-50/10" : "hover:border-indigo-150 hover:bg-slate-50/40"
                }`}
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition">
                  <BookOpen className="w-24 h-24 text-indigo-200" />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest">
                    <BookOpen className="w-4 h-4" />
                    <span>Product Requirements</span>
                  </div>
                  <span className="text-[10px] bg-indigo-555/20 border border-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold">
                    PRD Spec
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2">Spesifikasi Lengkap & Sistem</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Baca PRD lengkap mengenai platform bimbingan ini: tantangan mahasiswa, alur data API, rancangan skema JSON, dan milestone rilis.
                </p>
                <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:underline mt-auto">
                  <span>Buka Dokumen Spesifikasi</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Bento Box 2: CV Reviewer */}
              <div 
                onClick={() => setActiveTab("cv")}
                className={`col-span-1 md:col-span-6 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 cursor-pointer relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 shadow-xs ${
                  activeTab === "cv" ? "ring-2 ring-indigo-550 shadow-md bg-indigo-50/10" : "hover:border-indigo-150 hover:bg-slate-50/40"
                }`}
              >
                <div className="absolute top-4 right-4 text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/50 px-2 py-0.5 rounded-full">
                  ATS Standard
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pilar 1</span>
                </div>

                <h3 className="text-base font-bold text-slate-800 mb-1">CV Reviewer & ATS Grader</h3>
                <p className="text-slate-600 text-xs mb-4">Uji skor kesiapan CV, temukan kesalahan penulisan, dan pelajari saran kalimat kerja industri.</p>
                
                {/* Embedded Micro-Chart Visual */}
                <div className="bg-slate-50 p-3.5 border border-slate-200 rounded-2xl flex items-center gap-4 mb-4">
                  <div className="relative shrink-0">
                    <svg className="w-14 h-14 transform -rotate-90">
                      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-200" />
                      <circle cx="28" cy="28" r="24" stroke="currentColor" stroke-width="5" fill="transparent" className="text-indigo-600" stroke-dasharray="150" stroke-dashoffset="27" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-black text-slate-800">82</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase font-bold text-indigo-600 tracking-wider">Simulasi Rata-rata</span>
                    <span className="text-slate-600 text-[11px] block leading-tight font-medium">Banyak CV mahasiswa belum mencantumkan metrik persentase performa kerja.</span>
                  </div>
                </div>

                <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:underline">
                  <span>Mulai Review CV Saya</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Bento Box 3: Interview Simulator */}
              <div 
                onClick={() => setActiveTab("interview")}
                className={`col-span-1 md:col-span-6 lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-5 cursor-pointer relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 shadow-xs ${
                  activeTab === "interview" ? "ring-2 ring-indigo-550 shadow-md bg-indigo-50/10" : "hover:border-indigo-150 hover:bg-slate-50/40"
                }`}
              >
                <div className="absolute top-4 right-4 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/50 px-2 py-0.5 rounded-full">
                  Jessica AI HR
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pilar 2</span>
                </div>

                <h3 className="text-base font-bold text-slate-800 mb-1">Interview Simulator</h3>
                <p className="text-slate-600 text-xs mb-3">Simulasi interaktif tanya jawab behavioral method STAR berbekal feedback tips instan.</p>

                {/* Embedded Mini chat showcase to fit Bento style */}
                <div className="bg-slate-50 p-3 border border-slate-200 rounded-2xl mb-4 space-y-1.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Jessica (HR Manager):</span>
                  <p className="text-[11px] italic text-slate-700 line-clamp-2">
                    "Bagaimana Anda menyelesaikan konflik internal dalam kerja tim mahasiswa?"
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:underline">
                  <span>Buka Simulator Wawancara</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Bento Box 4: Skill Gap Analyzer */}
              <div 
                onClick={() => setActiveTab("roadmap")}
                className={`col-span-1 md:col-span-6 lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 cursor-pointer relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 shadow-xs ${
                  activeTab === "roadmap" ? "ring-2 ring-indigo-550 shadow-md bg-indigo-50/10" : "hover:border-indigo-150 hover:bg-slate-50/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2 items-center">
                    <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
                      <Compass className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pilar 3</span>
                  </div>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200/50 px-2.5 py-0.5 rounded-full font-semibold">
                    Target Roadmap
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 mb-1">Skill Gap Analyzer & Roadmap</h3>
                <p className="text-slate-600 text-xs mb-3">Bandingkan resume Anda saat ini dengan standar industri untuk merumuskan fase-fase belajar proyek portofolio.</p>

                {/* Simulated progress meters */}
                <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50 p-3 border border-slate-200 rounded-2xl">
                  <div>
                    <div className="flex justify-between text-[9px] font-bold uppercase text-slate-500 mb-1">
                      <span>Python / SQL</span>
                      <span className="text-emerald-600">92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] font-bold uppercase text-slate-500 mb-1">
                      <span>System Design</span>
                      <span className="text-indigo-600">40% GAP</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:underline">
                  <span>Formula Roadmap Belajar</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Bento Box 5: LinkedIn Optimizer */}
              <div 
                onClick={() => setActiveTab("linkedin")}
                className={`col-span-1 md:col-span-6 lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 cursor-pointer relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 shadow-xs ${
                  activeTab === "linkedin" ? "ring-2 ring-indigo-550 shadow-md bg-indigo-50/10" : "hover:border-indigo-150 hover:bg-slate-50/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2 items-center">
                    <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pilar 4</span>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-750 border border-blue-200/50 px-2.5 py-0.5 rounded-full font-semibold">
                    Branding SEO
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 mb-1">LinkedIn Profile Optimizer</h3>
                <p className="text-slate-600 text-xs mb-3">Rewrite Headline dan deskripsi Tentang Saya (About) bernarasi kuat agar mudah ditemukan Headhunter.</p>

                {/* Keyword tag previews resembling Bento grid layout */}
                <div className="flex flex-wrap gap-1.5 mb-4 bg-slate-50 p-3 border border-slate-200 rounded-2xl">
                  <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/45">#AgilePM</span>
                  <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/45">#ReactArchitect</span>
                  <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/45">#DataPipelines</span>
                  <span className="text-[8px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/45">#ProductVision</span>
                </div>

                <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:underline">
                  <span>Optimasi Profil LinkedIn</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>

            {/* Selected Interactive Playground Workspace Indicator */}
            <div className="border-t border-slate-200 pt-6 mt-2" id="interactive-workspace-header">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></div>
                  <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-800 uppercase sm:normal-case">
                    Console: {
                      activeTab === "spec" ? "Platform Requirements Document" :
                      activeTab === "cv" ? "ATS CV Review Panel" :
                      activeTab === "interview" ? "Mock Interview Sandbox" :
                      activeTab === "roadmap" ? "Skill Gap Analyzer" :
                      "LinkedIn Branding Optimizer"
                    }
                  </h2>
                </div>
                
                {/* Quick Pill Selector Tabs */}
                <div className="flex flex-wrap gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
                  <button 
                    onClick={() => setActiveTab("spec")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${activeTab === "spec" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    PRD Spec
                  </button>
                  <button 
                    onClick={() => setActiveTab("cv")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${activeTab === "cv" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    CV Reviewer
                  </button>
                  <button 
                    onClick={() => setActiveTab("interview")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${activeTab === "interview" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    Interview
                  </button>
                  <button 
                    onClick={() => setActiveTab("roadmap")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${activeTab === "roadmap" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    Roadmap
                  </button>
                  <button 
                    onClick={() => setActiveTab("linkedin")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${activeTab === "linkedin" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    LinkedIn
                  </button>
                </div>
              </div>

              {/* Core Interactive Sandbox Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 md:p-8 shadow-sm transition" id="workspace-viewport">
                {activeTab === "spec" && <SpecSection />}
                {activeTab === "cv" && <CvReviewer />}
                {activeTab === "interview" && <InterviewSimulator />}
                {activeTab === "roadmap" && <SkillGapAnalyzer />}
                {activeTab === "linkedin" && <LinkedInOptimizer />}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Branding built identically to guidelines */}
      <footer className="mt-12 border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-slate-500 gap-4">
        <div>© 2026 GRADAI PLATFORM - AI CAREER ASSISTANT</div>
        <div className="flex gap-6 flex-wrap justify-center">
          <span className="cursor-pointer hover:text-slate-850 transition" onClick={() => setActiveView("landing")}>Kesiapan Kerja Mahasiswa</span>
          <span>Sertifikasi Kompetensi</span>
          <span className="text-indigo-600 font-bold italic normal-case tracking-normal">Premium Student Access Active</span>
        </div>
      </footer>
    </div>
  );
}
