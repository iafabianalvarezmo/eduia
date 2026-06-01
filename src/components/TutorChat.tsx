import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, AlertCircle, RefreshCw, Paperclip, MoreVertical, WifiOff, CheckCircle } from 'lucide-react';
import { Message, UserProfile } from '../types';

interface TutorChatProps {
  userProfile: UserProfile | null;
  selectedTopicId: string | null;
}

export default function TutorChat({ userProfile, selectedTopicId }: TutorChatProps) {
  // Configured with smart preset messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: '¡Hola! Soy tu tutor de IA EduAI. Estoy aquí para ayudarte a entender cualquier concepto académico, resolver ecuaciones paso a paso o repasar temas históricos. \n\n¿En qué te gustaría enfocarnos hoy?',
      timestamp: '13:51'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Connection Error Simulation states
  const [connectionError, setConnectionError] = useState(false);
  const [retryStep, setRetryStep] = useState<number>(0); // 0 = none, 1, 2, 3 = retrying, 4 = success
  const [backoffTime, setBackoffTime] = useState<number>(0);
  const [retryTimerActive, setRetryTimerActive] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, retryStep]);

  // Adjust responses depending on student style and level
  const getSimulatedResponse = (userText: string): string => {
    const textLow = userText.toLowerCase();
    const style = userProfile?.learningStyle || 'visual';
    const level = userProfile?.educationLevel || 'highschool';

    const levelSpanish = {
      primary: 'Primaria (Básico)',
      secondary: 'Secundaria',
      highschool: 'Bachillerato',
      university: 'universitario',
      professional: 'profesional avanzado'
    }[level];

    // Trigger chains of mathematical examples or reviews
    if (textLow.includes('derivada') || textLow.includes('cadena') || textLow.includes('calculo') || selectedTopicId === 'algebra') {
      let formulaBlock = `d/dx [f(g(x))] = f'(g(x)) * g'(x)`;
      
      let baseText = `¡Excelente pregunta sobre cálculo diferencial! Como estás en nivel **${levelSpanish}**, vamos a analizarlo de forma clara. La **regla de la cadena** se utiliza cuando tenemos una función *dentro* de otra función. Es como pelar una cebolla: vas capa por capa.

Formalmente, la regla se escribe así:

\`\`\`latex
${formulaBlock}
\`\`\`

**El truco de oro es:**
1. Derivas primero la función de afuera (la exterior), dejando todo lo de adentro exactamente igual.
2. Luego, multiplicas el resultado por la derivada de lo de adentro (la función interna).`;

      if (style === 'visual') {
        baseText += `\n\n**Visualización didáctica:**
Piensa en una muñeca rusa (Matryoshka). Tienes la muñeca grande $F$ y dentro tienes la muñeca pequeña $G$. Para abrir la muñeca interna, primero tienes que pasar por la muñeca externa: 
\`[Muñeca Grande]'(Muñeca Pequeña) × [Muñeca Pequeña]'\``;
      } else if (style === 'practical') {
        baseText += `\n\n**Ejemplo práctico:**
Si tienes la función $y = (3x + 2)^2$:
1. La función exterior es $()^2$. Su derivada es $2()$. Al dejar lo de adentro queda: $2(3x + 2)$.
2. La función interior es $3x + 2$. Su derivada es $3$.
3. Multiplicamos ambos pasos: 
   $y' = 2(3x + 2) * 3 = 6(3x + 2) = 18x + 12$.`;
      } else {
        baseText += `\n\n**Justificación teórica:**
La tasa de cambio instantánea de la función compuesta respecto a su variable independiente es igual al producto de la derivada de la función exterior evaluada en el rango de la interior y de la derivada de la función interior respecto a la variable principal.`;
      }
      return baseText;
    }

    if (textLow.includes('historia') || textLow.includes('francia') || textLow.includes('revolucion') || selectedTopicId === 'french-rev') {
      return `¡Qué apasionante época histórica! La **Revolución Francesa (1789)** marcó el fin del absolutismo y el nacimiento de las democracias modernas europeas.

A nivel de **${levelSpanish}**, los detonantes principales fueron:
1. **La Crisis Financiera:** Deuda soberana extrema por derroches y apoyo a la guerra de independencia de EEUU.
2. **La Desigualdad Social:** Dividida en Tres Estadosclero, nobleza y el Tercer Estado que soportaba el 100% de impuestos sin representación política.
3. **La Toma de la Bastilla:** El 14 de julio de 1789 como símbolo del levantamiento armado del pueblo.

¿Te vendría bien practicar con un ejercicio dinámico en la pestaña de **Práctica** para fijar estos conocimientos?`;
    }

    if (textLow.includes('estructura') || textLow.includes('dato') || selectedTopicId === 'structures') {
      return `Ah, las **Estructuras de Datos** en programación. ¡El pilar para construir código optimizado!

Para tu nivel **${levelSpanish}**, los tipos principales que debes dominar son:
1. **Lineales:** Arreglos, listas enlazadas, pilas (LIFO) y colas (FIFO).
2. **No Lineales:** Árboles (jerárquicos, como los árboles de búsqueda binaria) y Grafos (nodos interconectados).

Como tu estilo favorito es **${style}**, te aconsejo:
${
  style === 'visual'
    ? 'Graficar de forma secuencial las cajas de memoria y punteros en papel para entender cómo se enlazan los nodos de una lista.'
    : style === 'practical'
    ? 'Escribir una implementación pequeña en código de una Pilas (Push/Pop) usando un arreglo simple en JavaScript o Python.'
    : 'Analizar las complejidades temporales O(1), O(log n) y O(n) detalladamente de cada algoritmo usando teoría matemática.'
}`;
    }

    // Default tutoring response fallback
    return `¡Entendido! Me parece una excelente duda para tu nivel **${levelSpanish}**. 

Para asimilar esto con tu estilo preferido (**${style}**), te propongo desglosarlo en partes:
- **Paso 1:** Definamos primero el concepto clave.
- **Paso 2:** Hagamos un enlace directo con temas que ya conoces.
- **Paso 3:** Realicemos un pequeño ejercicio guiado para validar tu comprensión.

Por favor, dime más detalles o hazme una pregunta más específica sobre este tema.`;
  };

  // Triggered when a topic is selected outside
  useEffect(() => {
    if (selectedTopicId) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        const text = selectedTopicId === 'algebra' 
          ? 'Hola, quiero aprender sobre la regla de la cadena.' 
          : selectedTopicId === 'french-rev'
          ? 'Háblame de la revolución francesa y el tercer estado.'
          : 'Quiero entender mejor las estructuras de datos.';
          
        setMessages(prev => [
          ...prev,
          { id: Date.now() + '-user', sender: 'student', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
          { id: Date.now() + '-ai', sender: 'tutor', text: getSimulatedResponse(text), timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isRichContent: true }
        ]);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [selectedTopicId]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessageText = inputText;
    setInputText('');

    // If simulating error, block messages and show error triggers
    if (connectionError && retryStep < 3 && retryStep > 0) {
      alert('Intento de envío bloqueado temporalmente. Por favor, espera a que termine el flujo de reconexión adaptativo o cancélalo.');
      return;
    }

    // Append student message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: Date.now() + '-user',
      sender: 'student',
      text: userMessageText,
      timestamp
    };

    setMessages(prev => [...prev, userMsg]);

    // Simulate AI typing thinking time
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      // Append AI response
      const aiResponseText = getSimulatedResponse(userMessageText);
      const aiMsg: Message = {
        id: Date.now() + '-ai',
        sender: 'tutor',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRichContent: true
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500); // Strict 1.5s as per SRS Heuristic #1
  };

  // Simulated Connection Error flow with Exponential Backoff
  const triggerConnectionErrorSimulation = () => {
    setConnectionError(true);
    setRetryStep(1);
    setBackoffTime(1); // 1s
    setRetryTimerActive(true);
  };

  // Effect to process backoff automatically
  useEffect(() => {
    if (!retryTimerActive) return;

    let delay = backoffTime * 1000;
    const timer = setTimeout(() => {
      if (retryStep === 1) {
        setRetryStep(2);
        setBackoffTime(2); // Double the backoff duration (2s)
      } else if (retryStep === 2) {
        setRetryStep(3);
        setBackoffTime(3); // Triple backoff duration (3s)
      } else if (retryStep === 3) {
        // Recover cleanly
        setRetryStep(4);
        setRetryTimerActive(false);
        // Turn off error after showing success for 3 seconds
        setTimeout(() => {
          setConnectionError(false);
          setRetryStep(0);
        }, 3000);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [retryStep, retryTimerActive, backoffTime]);

  const cancelRetry = () => {
    setConnectionError(false);
    setRetryStep(0);
    setRetryTimerActive(false);
  };

  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-8.5rem)] md:h-[calc(100vh-5rem)] overflow-hidden bg-slate-50/50 rounded-2xl border border-neutral-150">
      {/* Header Container */}
      <div className="bg-white border-b border-neutral-100 p-4 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-bold text-neutral-800">
              Tutor Personal ({userProfile ? userProfile.name : 'Invitado'})
            </h2>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[11px] font-medium text-emerald-600">En línea • Estilo {userProfile?.learningStyle || 'Visual'}</p>
            </div>
          </div>
        </div>

        {/* Action Button layout */}
        <div className="flex items-center gap-2">
          {/* Simulate Connection Error Button Heuristic #9 */}
          <button
            onClick={triggerConnectionErrorSimulation}
            disabled={connectionError}
            title="Simular fallo y flujo de reintentos con backoff"
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
              connectionError 
                ? 'bg-amber-50 text-amber-600 border-amber-200 opacity-60' 
                : 'bg-red-50 text-red-650 border-red-200 hover:bg-red-100'
            }`}
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simular Error de Red</span>
            <span className="sm:hidden">Forzar Error</span>
          </button>

          <button className="p-2 rounded-full hover:bg-neutral-50 text-neutral-400">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error alert with connection diagnostics and automatic retry progress bar (Heuristic #9) */}
      {connectionError && (
        <div aria-live="aggressive" className="bg-white border-b border-red-100 p-3.5 transition-all text-xs z-10">
          {retryStep < 4 ? (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5 text-red-600">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold">⚠️ Conexión perdida con EduAI Core Server (Heurística #9)</p>
                  <p className="text-neutral-500 mt-0.5">
                    Hubo un problema de enlace. Iniciando **reintento automático exponencial (Backoff)** para no perder tu progreso escolar.
                  </p>
                </div>
              </div>

              {/* Progress visual retry flow steps */}
              <div className="grid grid-cols-3 gap-2 py-1">
                {[1, 2, 3].map((step) => {
                  let barClass = 'bg-neutral-100';
                  let stepText = `Intento ${step}`;
                  if (retryStep > step) {
                    barClass = 'bg-red-500';
                    stepText = `Falló #${step}`;
                  } else if (retryStep === step) {
                    barClass = 'bg-amber-500 animate-pulse';
                    stepText = `Reintentando (${backoffTime}s)...`;
                  }
                  return (
                    <div key={step} className="flex flex-col gap-1 text-center">
                      <div className="h-1.5 rounded-full overflow-hidden w-full relative bg-neutral-100">
                        <div className={`h-full transition-all duration-[2000s] ${barClass}`} style={{ width: retryStep === step ? '100%' : '0%' }} />
                      </div>
                      <span className="text-[9px] font-bold text-neutral-400">{stepText}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={cancelRetry}
                  className="py-1 px-2.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded text-neutral-600 font-semibold cursor-pointer"
                >
                  Cancelar reintentos
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-emerald-600 py-1.5 animate-bounce">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-bold">¡Conexión restaurada con éxito!</p>
                <p className="text-neutral-500">EduAI se ha reconectado de forma transparente. Ya puedes continuar.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Messages Canvas */}
      <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50" id="chat-container">
        <div className="flex justify-center my-1.5">
          <span className="bg-neutral-200/60 text-neutral-600 font-medium text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Sesión de Tutoría Activa
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'student';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[85%] md:max-w-[70%] transition-transform ${
                isUser ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              {/* Tutor avatar */}
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center font-bold">
                  🤖
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`p-3.5 shadow-sm rounded-2xl ${
                  isUser
                    ? 'bg-[#2563eb] text-white rounded-tr-xs'
                    : 'bg-white text-neutral-800 rounded-tl-xs border border-neutral-100'
                }`}
              >
                {msg.isRichContent ? (
                  <div className="grid gap-2.5 text-xs sm:text-sm leading-relaxed font-sans">
                    {msg.text.split('\n\n').map((paragraph, idx) => {
                      // Check for latex block
                      if (paragraph.includes('```latex') || paragraph.includes('`')) {
                        const cleanCode = paragraph.replace(/```latex|```|`/g, '');
                        return (
                          <pre key={idx} className="bg-slate-900 text-slate-100 rounded-xl p-3 font-mono overflow-x-auto text-[11px] sm:text-xs my-1 border border-slate-800 shadow-inner">
                            <code>{cleanCode.trim()}</code>
                          </pre>
                        );
                      }
                      
                      // Split bold labels
                      return (
                        <p key={idx} className="break-words">
                          {paragraph.split('**').map((textChunk, i) => {
                            if (i % 2 === 1) {
                              return <strong key={i} className="font-extrabold text-[#2563eb] dark:text-[#a0c5ff]">{textChunk}</strong>;
                            }
                            return textChunk;
                          })}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm break-words leading-relaxed">{msg.text}</p>
                )}
                <span className={`text-[9px] block mt-1.5 text-right ${isUser ? 'text-blue-200' : 'text-neutral-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Thinking State */}
        {isTyping && (
          <div className="flex gap-2.5 max-w-[85%] md:max-w-[70%] self-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563eb] flex-shrink-0 flex items-center justify-center font-bold">
              🤖
            </div>
            <div className="bg-white border border-neutral-100 p-3.5 rounded-2xl rounded-tl-xs flex items-center gap-2 shadow-sm text-xs text-neutral-500">
              <div className="flex items-center gap-1 pt-1 text-blue-600">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bubble-1" />
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bubble-2" />
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bubble-3" />
              </div>
              <span className="italic font-medium text-neutral-400">El tutor está pensando...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input box */}
      <div className="bg-white border-t border-neutral-100 p-3 flex-shrink-0 shadow-[0_-2px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-neutral-50 border border-neutral-200/90 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#2563eb] focus-within:bg-white transition-all">
          <button
            aria-label="Adjuntar archivo"
            className="p-2 rounded-xl text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Haz una pregunta (ej. 'Enséñame cálculo' o '¿Qué fue la revolución francesa?')..."
            className="w-full bg-transparent border-0 resize-none max-h-24 min-h-[40px] py-2 px-1 focus:outline-none focus:ring-0 text-xs sm:text-sm text-neutral-800 placeholder-neutral-405"
            rows={1}
          />

          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            aria-label="Enviar mensaje"
            className="p-2 rounded-xl bg-[#2563eb] text-white hover:bg-[#1e40af] active:scale-95 transition-all shadow-sm disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <Send className="w-4.5 h-4.5 fill-current" />
          </button>
        </div>
        <p className="text-center text-[10px] text-neutral-400 mt-2">
          La IA puede cometer errores. Considera verificar la información importante.
        </p>
      </div>
    </div>
  );
}
