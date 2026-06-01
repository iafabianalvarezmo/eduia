import React from 'react';
import { TrendingUp, History, ChevronRight, Calculator, Terminal, BookOpen, AlertCircle, ArrowUpRight } from 'lucide-react';
import { SubjectProgress, Topic } from '../types';

interface DashboardProps {
  userName: string;
  onSelectTopic: (topicId: string) => void;
  onNavigateToTab: (tab: 'tutor' | 'exercises') => void;
}

export default function Dashboard({ userName, onSelectTopic, onNavigateToTab }: DashboardProps) {
  const subjects: SubjectProgress[] = [
    {
      name: 'Matemáticas',
      percentage: 82,
      description: 'Llevas un excelente ritmo en Cálculo Diferencial.',
      color: 'primary',
      icon: 'calculate'
    },
    {
      name: 'Programación',
      percentage: 65,
      description: 'Estás a tiempo para la entrega de Estructuras de Datos.',
      color: 'secondary',
      icon: 'code'
    },
    {
      name: 'Historia',
      percentage: 90,
      description: 'Has completado la Unidad 4: Revolución Francesa.',
      color: 'tertiary',
      icon: 'account_balance'
    }
  ];

  const recentTopics: Topic[] = [
    {
      id: 'algebra',
      title: 'Álgebra Lineal',
      subject: 'Matemáticas',
      icon: 'calculate',
      color: 'primary'
    },
    {
      id: 'structures',
      title: 'Estructuras de Datos',
      subject: 'Programación',
      icon: 'terminal',
      color: 'secondary'
    },
    {
      id: 'french-rev',
      title: 'Revolución Francesa',
      subject: 'Historia',
      icon: 'menu_book',
      color: 'tertiary'
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
          ¡Hola, {userName || 'Estudiante'}! 👋
        </h2>
        <p className="text-sm md:text-base text-neutral-500">
          Este es el resumen interactivo de tu rendimiento educativo individual.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Primary Progress Card (Donut chart representation conforming closely to Picture 4) */}
        <div className="md:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col gap-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-neutral-800">Rendimiento General</h3>
            <div className="flex items-center gap-1 text-[#006e2a] bg-[#8ffa9b]/30 py-1 px-3 rounded-full text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>En alza</span>
            </div>
          </div>

          <div
            className="flex-grow flex flex-col sm:flex-row items-center justify-around gap-6 h-full min-h-[220px]"
            aria-label="Gráfico interactivo de progreso general con un setenta y cinco por ciento completado"
          >
            {/* Real SVG Donut Chart */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-neutral-100 fill-none"
                  strokeWidth="12"
                />
                {/* Active circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-[#2563eb] fill-none transition-all duration-1000 ease-out"
                  strokeWidth="12"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 0.75)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-[#2563eb] tracking-tight">75%</span>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mt-0.5">Promedio</span>
              </div>
            </div>

            {/* Side summary details */}
            <div className="flex flex-col gap-4 max-w-xs text-center sm:text-left">
              <h4 className="font-bold text-neutral-850 text-base">Vas por muy buen camino</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Estás rindiendo por encima de la media de tu nivel educativo. Tu estilo de aprendizaje activo te potencia para asimilar conceptos rápidamente.
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="text-xs font-medium bg-blue-50 text-[#2563eb] py-1 px-2.5 rounded-lg border border-blue-100">
                  3 Materias Activas
                </span>
                <span className="text-xs font-medium bg-emerald-50 text-[#006e2a] py-1 px-2.5 rounded-lg border border-emerald-100">
                  Unidad 4 Completa
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Topics (Quick Access) */}
        <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-neutral-100/70">
            <History className="w-5 h-5 text-[#2563eb]" />
            <h3 className="text-base font-bold text-neutral-800">Temas Recientes</h3>
          </div>

          <div className="flex flex-col gap-2">
            {recentTopics.map((topic) => {
              // Soft colors for icons matching style
              const isMath = topic.id === 'algebra';
              const isProg = topic.id === 'structures';
              const iconColor = isMath ? 'bg-blue-50 text-blue-600' : isProg ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-650';

              return (
                <button
                  key={topic.id}
                  onClick={() => onSelectTopic(topic.id)}
                  className="w-full min-h-[44px] flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group focus:outline-none focus:ring-2 focus:ring-blue-100 border border-transparent hover:border-neutral-100 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconColor}`}>
                      {topic.id === 'algebra' && <Calculator className="w-4 h-4" />}
                      {topic.id === 'structures' && <Terminal className="w-4 h-4" />}
                      {topic.id === 'french-rev' && <BookOpen className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-neutral-900 group-hover:text-[#2563eb] transition-colors line-clamp-1">
                        {topic.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{topic.subject}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#2563eb] transition-all transform group-hover:translate-x-0.5 flex-shrink-0" />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onNavigateToTab('tutor')}
            className="w-full mt-auto py-2 rounded-xl border border-blue-250 text-sm font-semibold text-[#2563eb] hover:bg-blue-50/50 hover:border-[#2563eb] active:scale-95 transition-all text-center focus:ring-2 focus:ring-blue-100 cursor-pointer"
          >
            Chatear con el tutor
          </button>
        </div>
      </div>

      {/* Subject Breakdown Progress cards */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-neutral-800">Desglose por Materia</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjects.map((subj) => {
            const isMath = subj.color === 'primary';
            const isProg = subj.color === 'secondary';

            const barColor = isMath ? 'bg-[#2563eb]' : isProg ? 'bg-[#10b981]' : 'bg-[#ef4444]';
            const badgeBg = isMath ? 'bg-blue-50 text-[#2563eb] border-blue-100' : isProg ? 'bg-emerald-50 text-[#10b981] border-emerald-100' : 'bg-red-50 text-[#ef4444] border-red-150';
            const iconBg = isMath ? 'bg-blue-100/60' : isProg ? 'bg-emerald-100/65' : 'bg-red-100/60';

            return (
              <div
                key={subj.name}
                onClick={() => onNavigateToTab(subj.name === 'Historia' ? 'exercises' : 'tutor')}
                className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-neutral-700 ${badgeBg}`}>
                    {subj.name === 'Matemáticas' && <Calculator className="w-5 h-5 text-blue-600" />}
                    {subj.name === 'Programación' && <Terminal className="w-5 h-5 text-emerald-600" />}
                    {subj.name === 'Historia' && <BookOpen className="w-5 h-5 text-red-600" />}
                  </div>
                  <span className={`text-xl font-bold tracking-tight text-right ${isMath ? 'text-blue-600' : isProg ? 'text-emerald-750' : 'text-red-750'}`}>
                    {subj.percentage}%
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-neutral-900 mb-0.5 flex items-center gap-1">
                    {subj.name}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />
                  </h4>
                  <p className="text-xs text-neutral-500 line-clamp-1">{subj.description}</p>
                </div>

                {/* Progress bar track mapping */}
                <div className="w-full mt-2">
                  <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor}`}
                      style={{ width: `${subj.percentage}%` }}
                      role="progressbar"
                      aria-valuenow={subj.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-neutral-400 mt-1.5 font-medium">
                    <span>Nivel {subj.percentage > 80 ? 'Avanzado' : 'Intermedio'}</span>
                    <span>{subj.percentage}% completado</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
