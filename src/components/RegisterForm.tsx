import React, { useState } from 'react';
import { Mail, Lock, School, Eye, Shield, BookOpen, ArrowRight, User } from 'lucide-react';
import { UserProfile, EducationLevel, LearningStyle } from '../types';

interface RegisterFormProps {
  onRegister: (profile: UserProfile) => void;
  onSkip: () => void;
}

export default function RegisterForm({ onRegister, onSkip }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('highschool');
  const [learningStyle, setLearningStyle] = useState<LearningStyle>('visual');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = 'El correo electrónico es requerido';
    if (!name) newErrors.name = 'El nombre es requerido';
    if (!password) newErrors.password = 'La contraseña es requerida';
    else if (password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onRegister({
      name,
      email,
      educationLevel,
      learningStyle
    });
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-neutral-100 transition-all">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2563eb] tracking-tight mb-2">
          Comienza tu viaje de aprendizaje
        </h1>
        <p className="text-sm text-neutral-550">
          Únete a EduAI para una experiencia educativa personalizada.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Nombre Input */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-neutral-700" htmlFor="name">
            Nombre del Estudiante
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" aria-hidden="true" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
              className={`w-full pl-10 pr-3 py-2.5 border rounded-xl bg-neutral-50 focus:ring-2 focus:ring-[#2563eb] focus:bg-white outline-none transition-all text-sm ${
                errors.name ? 'border-red-500 ring-2 ring-red-100' : 'border-neutral-300'
              }`}
              placeholder="Juan Pérez"
              required
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Correo Input */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-neutral-700" htmlFor="email">
            Correo Electrónico
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" aria-hidden="true" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
              }}
              className={`w-full pl-10 pr-3 py-2.5 border rounded-xl bg-neutral-50 focus:ring-2 focus:ring-[#2563eb] focus:bg-white outline-none transition-all text-sm ${
                errors.email ? 'border-red-500 ring-2 ring-red-100' : 'border-neutral-300'
              }`}
              placeholder="tu@email.com"
              required
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Contraseña Input */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-neutral-700" htmlFor="password">
            Contraseña
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" aria-hidden="true" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
              }}
              className={`w-full pl-10 pr-10 py-2.5 border rounded-xl bg-neutral-50 focus:ring-2 focus:ring-[#2563eb] focus:bg-white outline-none transition-all text-sm ${
                errors.password ? 'border-red-500 ring-2 ring-red-100' : 'border-neutral-300'
              }`}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded text-neutral-400 hover:text-neutral-600 focus:outline-none p-1"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
        </div>

        {/* Nivel Educativo Dropdown */}
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-neutral-700" htmlFor="education_level">
            Nivel Educativo
          </label>
          <div className="relative">
            <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" aria-hidden="true" />
            <select
              id="education_level"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value as EducationLevel)}
              className="w-full pl-10 pr-10 py-2.5 border border-neutral-300 rounded-xl bg-neutral-50 focus:ring-2 focus:ring-[#2563eb] focus:bg-white outline-none transition-all text-sm appearance-none cursor-pointer text-neutral-800"
            >
              <option value="primary">Primaria (Básico)</option>
              <option value="secondary">Secundaria (Medio)</option>
              <option value="highschool">Bachillerato (Medio Superior)</option>
              <option value="university">Universitario (Pregrado)</option>
              <option value="professional">Profesional / Adulto</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400" aria-hidden="true">
              ▼
            </span>
          </div>
        </div>

        {/* Estilo de Aprendizaje Radio Buttons */}
        <div className="space-y-1.5 pt-1">
          <label className="block text-sm font-semibold text-neutral-700">
            Estilo de Aprendizaje Preferido
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'visual', label: 'Visual', icon: Eye, color: 'text-blue-500' },
              { value: 'practical', label: 'Práctico', icon: Shield, color: 'text-emerald-500' },
              { value: 'theoretical', label: 'Teórico', icon: BookOpen, color: 'text-amber-500' }
            ].map((option) => {
              const Icon = option.icon;
              const isSelected = learningStyle === option.value;
              return (
                <label key={option.value} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="learning_style"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => setLearningStyle(option.value as LearningStyle)}
                    className="sr-only"
                  />
                  <div className={`flex flex-col items-center p-3 border rounded-xl transition-all duration-200 text-center select-none ${
                    isSelected
                      ? 'bg-blue-50/70 border-2 border-[#2563eb] text-[#2563eb] font-semibold scale-[1.02]'
                      : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:border-neutral-300'
                  }`}>
                    <Icon className={`w-5 h-5 mb-1 transition-colors ${isSelected ? 'text-[#2563eb]' : 'text-neutral-400 group-hover:text-neutral-500'}`} />
                    <span className="text-xs">{option.label}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full min-h-[44px] bg-[#2563eb] hover:bg-[#1e40af] active:scale-[0.98] focus:ring-4 focus:ring-blue-105 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4 text-sm cursor-pointer"
        >
          Registrarme
          <ArrowRight className="w-4 h-4 ml-0.5" />
        </button>

        <div className="text-center pt-2">
          <p className="text-xs text-neutral-550">
            ¿Quieres probar la plataforma primero?{' '}
            <button
              type="button"
              onClick={onSkip}
              className="text-[#2563eb] hover:underline font-semibold focus:outline-none p-1 cursor-pointer"
            >
              Entrar como estudiante invitado
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
