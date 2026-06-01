import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  History, 
  ChevronRight, 
  Calculator, 
  Terminal, 
  BookOpen, 
  LayoutDashboard, 
  MessageSquare, 
  Award, 
  User, 
  LogOut, 
  Menu, 
  X,
  School,
  CheckCircle,
  HelpCircle,
  BookMarked
} from 'lucide-react';
import { UserProfile, ActiveTab } from './types';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import TutorChat from './components/TutorChat';
import QuizEvaluator from './components/QuizEvaluator';

export default function App() {
  // Onboarding phase tracking. If null, starts with register screen
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    name: 'Estudiante',
    email: 'estudiante@eduai.edu',
    educationLevel: 'highschool',
    learningStyle: 'visual'
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  
  // Mobile Navigation Drawer/Menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Score reporting modal configuration
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [lastQuizScore, setLastQuizScore] = useState<number | null>(null);

  const handleRegister = (profile: UserProfile) => {
    setUserProfile(profile);
    setActiveTab('dashboard');
  };

  const handleSkipOnboarding = () => {
    setUserProfile({
      name: 'Estudiante Invitado',
      email: 'invitado@eduai.com',
      educationLevel: 'university',
      learningStyle: 'practical'
    });
    setActiveTab('dashboard');
  };

  const handleSelectTopicFromDashboard = (topicId: string) => {
    setSelectedTopicId(topicId);
    if (topicId === 'french-rev') {
      setActiveTab('exercises');
    } else {
      setActiveTab('tutor');
    }
  };

  const handleQuizFinished = (score: number) => {
    setLastQuizScore(score);
    setShowScoreModal(true);
  };

  const handleLogout = () => {
    setUserProfile(null);
    setActiveTab('dashboard');
  };

  // Pre-load specific topic ID triggers
  const executeQuizFromDashboard = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('exercises');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans flex flex-col md:flex-row relative">
      
      {/* 1. Onboarding Register overlay when userProfile is null */}
      {!userProfile ? (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-[#f8fafc]" id="register-container">
          <div className="mb-6 flex items-center gap-1.5">
            <span className="w-10 h-10 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-blue-250/50">
              E
            </span>
            <span className="text-xl font-bold text-[#2563eb] tracking-tight">EduAI</span>
          </div>
          <RegisterForm onRegister={handleRegister} onSkip={handleSkipOnboarding} />
        </div>
      ) : (
        <>
          {/* Header Mobile AppBar */}
          <header className="md:hidden fixed top-0 left-0 w-full z-40 flex items-center justify-between px-4 h-14 bg-white shadow-xs border-b border-[#e2e8f0]">
            <div className="flex items-center gap-3">
              <button
                aria-label="Toggle Navigation Menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 rounded-full text-[#64748b] hover:bg-slate-50 active:scale-90 transition-all cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-1">
                <span className="w-7 h-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  E
                </span>
                <span className="text-base font-extrabold text-[#2563eb] tracking-tight">EduAI</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* System Online Status Indicator in header */}
              <div id="status-indicator" className="flex items-center gap-1.5 text-xs text-[#64748b]">
                <div id="status-dot" className="w-2 h-2 bg-[#10b981] rounded-full"></div>
                <span className="hidden sm:inline">Sistema Online</span>
              </div>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-8 h-8 rounded-full overflow-hidden border transition-all ${
                  activeTab === 'profile' ? 'ring-2 ring-[#2563eb]' : 'border-[#e2e8f0]'
                }`}
              >
                <div className="w-full h-full bg-blue-50 text-[#2563eb] flex items-center justify-center text-xs font-bold uppercase">
                  {userProfile.name.substring(0, 2)}
                </div>
              </button>
            </div>
          </header>

          {/* Desktop Left Sidebar navigation in polished styling */}
          <nav className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-[#1e293b] flex-col py-6 px-4 z-30 border-r border-[#e2e8f0]/10 shadow-sm">
            <div className="flex items-center justify-between pb-6 px-2 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-blue-500/20">
                  E
                </span>
                <div>
                  <h1 className="font-bold text-white text-lg tracking-wider" style={{ letterSpacing: '0.5px' }}>EduAI</h1>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-px">Tutoría Adaptativa</p>
                </div>
              </div>

              {/* Status Dot */}
              <div id="status-indicator" className="flex items-center gap-1 text-[10px] text-slate-400">
                <div id="status-dot" className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></div>
              </div>
            </div>

            {/* Sidebar main navigation options */}
            <div className="flex flex-col gap-1 mt-6">
              {[
                { tabID: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { tabID: 'tutor', label: 'Tutor IA', icon: MessageSquare },
                { tabID: 'exercises', label: 'Ejercicios', icon: Award }
              ].map((navItem) => {
                const Icon = navItem.icon;
                const isSelected = activeTab === navItem.tabID;
                return (
                  <button
                    key={navItem.tabID}
                    onClick={() => {
                      setActiveTab(navItem.tabID as ActiveTab);
                      if (navItem.tabID !== 'tutor') setSelectedTopicId(null);
                    }}
                    className={`w-full min-h-[44px] flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-all cursor-pointer border-l-4 ${
                      isSelected
                        ? 'bg-white/10 text-white border-l-[#2563eb]'
                        : 'text-slate-405 text-slate-405/85 hover:bg-white/5 hover:text-white border-l-transparent text-[#64748b]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    {navItem.label}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Profile view in Sidebar bottom with slate polish theme */}
            <div className="mt-auto bg-slate-800/80 rounded-2xl p-4 border border-slate-750 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2563eb]/20 text-white flex items-center justify-center font-bold text-sm uppercase">
                  {userProfile.name.substring(0, 2)}
                </div>
                <div className="max-w-[130px]">
                  <p className="text-xs font-bold text-white line-clamp-1">{userProfile.name}</p>
                  <p className="text-[10px] text-slate-400 mt-px capitalize">{userProfile.learningStyle} • {userProfile.educationLevel}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-700">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="py-1 px-2 hover:bg-slate-700/60 transition-colors text-[11px] font-bold text-[#2563eb] rounded-lg text-center cursor-pointer"
                >
                  Ver Perfil
                </button>
                <button
                  onClick={handleLogout}
                  className="py-1 px-2 hover:text-red-400 text-[11px] text-slate-400 font-bold flex items-center justify-center gap-1 rounded-lg cursor-pointer"
                >
                  <LogOut className="w-3 h-3 text-red-400" />
                  Salir
                </button>
              </div>
            </div>
          </nav>

          {/* Collapsible Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-[#0f172a]/40 backdrop-blur-xs flex">
              <div className="w-72 bg-white h-full flex flex-col p-5 shadow-2xl animate-in slide-in-from-left duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#2563eb] text-white flex items-center justify-center font-bold text-sm">
                      E
                    </span>
                    <span className="text-lg font-bold text-[#2563eb] tracking-tight">EduAI</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-slate-50 text-[#64748b] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  {[
                    { tabID: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                    { tabID: 'tutor', label: 'Tutor IA', icon: MessageSquare },
                    { tabID: 'exercises', label: 'Ejercicios', icon: Award },
                    { tabID: 'profile', label: 'Mi Perfil Estudiantil', icon: User }
                  ].map((navItem) => {
                    const Icon = navItem.icon;
                    const isSelected = activeTab === navItem.tabID;
                    return (
                      <button
                        key={navItem.tabID}
                        onClick={() => {
                          setActiveTab(navItem.tabID as ActiveTab);
                          if (navItem.tabID !== 'tutor') setSelectedTopicId(null);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full min-h-[44px] flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold cursor-pointer border ${
                          isSelected
                            ? 'bg-blue-50/70 text-[#2563eb] border-[#cbd5e1] font-bold'
                            : 'text-[#64748b] hover:bg-slate-50 border-transparent'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {navItem.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-auto pt-4 border-t border-[#e2e8f0]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center font-bold text-sm">
                      {userProfile.name.substring(0, 1)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0f172a]">{userProfile.name}</p>
                      <p className="text-xs text-[#64748b] capitalize">{userProfile.learningStyle} • {userProfile.educationLevel}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-xl border border-[#ef4444] text-[#ef4444] hover:bg-red-50 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión actual
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Application Area (Padded to handle side and top navigations) */}
          <main className="flex-grow w-full md:pl-64 pt-14 md:pt-0 max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col min-h-screen">
            {/* View Switching router */}
            <div className="flex-grow flex flex-col">
              
              {activeTab === 'dashboard' && (
                <div className="animate-fade-in">
                  <Dashboard 
                    userName={userProfile.name} 
                    onSelectTopic={handleSelectTopicFromDashboard} 
                    onNavigateToTab={(tab) => {
                      setActiveTab(tab);
                      setSelectedTopicId(null);
                    }}
                  />
                </div>
              )}

              {activeTab === 'tutor' && (
                <div className="flex-grow flex flex-col">
                  <TutorChat userProfile={userProfile} selectedTopicId={selectedTopicId} />
                </div>
              )}

              {activeTab === 'exercises' && (
                <div className="animate-fade-in flex flex-col gap-4">
                  <QuizEvaluator onQuizFinished={handleQuizFinished} initialQuizId={selectedTopicId || undefined} />
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="w-full max-w-xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col gap-6">
                  <div className="pb-4 border-b border-neutral-100 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-neutral-800">Perfil Estudiantil Conectado</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">Adaptabilidad activa EduAI</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-5 bg-neutral-50 p-4 rounded-xl border border-neutral-150">
                    <div className="w-16 h-16 rounded-full bg-[#005bbf] text-white text-xl font-bold flex items-center justify-center uppercase shadow-sm flex-shrink-0">
                      {userProfile.name.substring(0, 2)}
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="text-lg font-bold text-neutral-900">{userProfile.name}</h4>
                      <p className="text-xs text-neutral-500">{userProfile.email}</p>
                      <span className="inline-block bg-[#8ffa9b]/35 text-[#00531e] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full mt-2 uppercase tracking-wide border border-emerald-100">
                        Sesión Verificada
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-neutral-150 p-4 rounded-xl flex flex-col gap-1.5 bg-white">
                      <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Nivel de Estudio</p>
                      <div className="flex items-center gap-2 text-neutral-800 font-bold">
                        <School className="w-4 h-4 text-[#005bbf]" />
                        <span className="capitalize">{userProfile.educationLevel}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed">
                        Tus explicaciones y retos se asocian de manera transparente a este nivel académico.
                      </p>
                    </div>

                    <div className="border border-neutral-150 p-4 rounded-xl flex flex-col gap-1.5 bg-white">
                      <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Estilo de Aprendizaje</p>
                      <div className="flex items-center gap-2 text-[#00752d] font-bold">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span className="capitalize">{userProfile.learningStyle}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed">
                        El bot tutor prioriza {userProfile.learningStyle === 'visual' ? 'ejemplos con metáforas y gráficos' : userProfile.learningStyle === 'practical' ? 'ejercicios aplicados para resolver paso a paso' : 'demostraciones teóricas profundas'} durante las clases.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex gap-2 justify-end">
                    <button
                      onClick={handleLogout}
                      className="min-h-[44px] px-4 py-2 bg-red-50 text-red-500 font-bold rounded-xl text-xs hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      Cerrar Sesión Activa
                    </button>
                    <button
                      onClick={() => {
                        setUserProfile(null);
                        setActiveTab('dashboard');
                      }}
                      className="min-h-[44px] px-4 py-2 bg-neutral-100 text-neutral-600 font-bold rounded-xl text-xs hover:bg-neutral-200 transition-colors"
                    >
                      Editar Preferencias
                    </button>
                  </div>
                </div>
              )}

            </div>
          </main>

          {/* Score Report Modal dialog */}
          {showScoreModal && lastQuizScore !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs" id="congratulations-modal">
              <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-neutral-100 text-center animate-in scale-in duration-200">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#006e2a]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">¡Evaluación Finalizada!</h3>
                <p className="text-xs text-neutral-400 mb-4 uppercase tracking-wider">Rendimiento Registrado</p>

                <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-150 mb-5">
                  <span className="block text-[#005bbf] text-3xl font-extrabold">{lastQuizScore === 100 ? '100%' : lastQuizScore.toFixed(0) + '%'}</span>
                  <p className="text-xs text-neutral-500 mt-1">
                    {lastQuizScore >= 80 
                      ? '¡Excelente puntuación! Demuestras un alto nivel educativo.' 
                      : lastQuizScore >= 50 
                      ? 'Buen progreso. Repasa con el tutor interactivo para consolidar tus aciertos.' 
                      : 'Sigue practicando, el tutor de IA puede aclararte cada fallo.'}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setShowScoreModal(false);
                      setActiveTab('tutor');
                    }}
                    className="min-h-[44px] py-2.5 bg-[#005bbf] hover:bg-[#004bb0] text-sm text-white font-semibold rounded-xl tracking-tight shadow-md transition-all h-11"
                  >
                    Aclarar dudas con el Tutor
                  </button>
                  <button
                    onClick={() => {
                      setShowScoreModal(false);
                      setActiveTab('dashboard');
                    }}
                    className="min-h-[44px] py-2.5 bg-neutral-100 hover:bg-neutral-200 text-sm text-neutral-700 font-semibold rounded-xl h-11 transition-all"
                  >
                    Volver a mi progreso
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Mobile navigation bar bar mapping */}
          <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center h-16 bg-white border-t border-neutral-150 py-1 shadow-md">
            {[
              { tabID: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { tabID: 'tutor', label: 'Tutor', icon: MessageSquare },
              { tabID: 'exercises', label: 'Práctica', icon: Award }
            ].map((navItem) => {
              const Icon = navItem.icon;
              const isSelected = activeTab === navItem.tabID;
              return (
                <button
                  key={navItem.tabID}
                  onClick={() => {
                    setActiveTab(navItem.tabID as ActiveTab);
                    if (navItem.tabID !== 'tutor') setSelectedTopicId(null);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${
                    isSelected ? 'text-[#005bbf] font-boldScale' : 'text-neutral-400'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-[10px] tracking-tight">{navItem.label}</span>
                </button>
              );
            })}
          </nav>
        </>
      )}
    </div>
  );
}
