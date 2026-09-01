import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "home"
  | "welcome"
  | "how-it-works"
  | "first-challenge"
  | "lesson1"
  | "lesson2"
  | "lesson3"
  | "lesson-depth"
  | "lesson-lines"
  | "lesson-center"
  | "lesson-vertical"
  | "practice"
  | "practice-correct"
  | "practice-incorrect"
  | "ready"
  | "menu"
  | "level-intro"
  | "question"
  | "feedback-correct"
  | "feedback-incorrect"
  | "level-result"
  | "unlock-next"
  | "profile"
  | "connect";

interface Question {
  id: number;
  challenge: string;
  question: string;
  image?: string;
  options: { id: string; text: string }[];
  correct: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
  exclamation: string;
}

interface Level {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  intro: string;
  concept: string;
  questions: Question[];
  badge: string;
  badgeName: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const LEVELS: Level[] = [
  {
    id: 1,
    emoji: "📷",
    title: "PLANOS",
    subtitle: "Aprende a elegir el encuadre correcto.",
    intro: "El plano determina qué parte de una persona, objeto o escena aparece dentro del encuadre. Elegir el plano correcto puede cambiar completamente el impacto de una fotografía.",
    concept: "¿Qué es un plano?",
    badge: "📷",
    badgeName: "Maestro de los Planos",
    questions: [
      {
        id: 1,
        challenge: "RETO 01",
        question: "Quieres mostrar el detalle de un producto, como el diseño de una joya o la textura de un objeto. ¿Qué plano utilizarías?",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=450&fit=crop&auto=format",
        options: [
          { id: "A", text: "Plano general" },
          { id: "B", text: "Plano medio" },
          { id: "C", text: "Plano detalle" },
          { id: "D", text: "Plano entero" },
        ],
        correct: "C",
        exclamation: "¡CORRECTO!",
        feedbackCorrect: "El plano detalle permite destacar una parte específica del producto y dirigir la atención del espectador hacia ese elemento.",
        feedbackIncorrect: "Ese plano muestra una parte más amplia de la escena. Para destacar un detalle específico del producto utilizamos el plano detalle.",
      },
      {
        id: 2,
        challenge: "RETO 02",
        question: "Quieres mostrar la expresión del rostro de una persona en un video testimonial. ¿Qué plano utilizarías?",
        image: "https://www.dzoom.org.es/wp-content/uploads/2008/11/rakicevic-nenad-507632-1024x682.jpg",
        options: [
          { id: "A", text: "Plano general" },
          { id: "B", text: "Plano entero" },
          { id: "C", text: "Primer plano" },
          { id: "D", text: "Plano detalle" },
        ],
        correct: "C",
        exclamation: "¡EXCELENTE!",
        feedbackCorrect: "El primer plano permite destacar el rostro y las expresiones de una persona, generando mayor conexión emocional.",
        feedbackIncorrect: "Para capturar emociones y expresiones necesitamos acercarnos más. El primer plano enfoca el rostro de la persona.",
      },
      {
        id: 3,
        challenge: "RETO 03",
        question: "Un emprendedor quiere grabar un video hablando con sus clientes y mostrar su rostro junto con parte de su cuerpo. ¿Qué plano es más adecuado?",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=220&fit=crop&auto=format",
        options: [
          { id: "A", text: "Plano general" },
          { id: "B", text: "Plano medio" },
          { id: "C", text: "Plano detalle" },
          { id: "D", text: "Primerísimo primer plano" },
        ],
        correct: "B",
        exclamation: "¡CORRECTO!",
        feedbackCorrect: "El plano medio muestra al personaje desde la cintura hacia arriba y funciona muy bien para entrevistas, tutoriales y videos para redes sociales.",
        feedbackIncorrect: "Para videos donde el emprendedor habla a la cámara, el plano medio es ideal: muestra el rostro y parte del cuerpo, sin perder el contexto.",
      },
      {
        id: 4,
        challenge: "RETO 04",
        question: "Una cafetería quiere mostrar su local completo para que los clientes conozcan el ambiente y el espacio. ¿Qué plano utilizarías?",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=220&fit=crop&auto=format",
        options: [
          { id: "A", text: "Primer plano" },
          { id: "B", text: "Plano detalle" },
          { id: "C", text: "Plano medio" },
          { id: "D", text: "Plano general" },
        ],
        correct: "D",
        exclamation: "¡MUY BIEN!",
        feedbackCorrect: "El plano general permite mostrar un espacio amplio y ayuda a contextualizar dónde ocurre la acción.",
        feedbackIncorrect: "Para mostrar un espacio completo necesitamos abrir el encuadre. El plano general captura el ambiente de todo el local.",
      },
      {
        id: 5,
        challenge: "RETO 05",
        question: "Un emprendedor vende perfumes y quiere destacar el logotipo y los detalles del envase para Instagram. ¿Qué plano sería más efectivo?",
        image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=220&fit=crop&auto=format",
        options: [
          { id: "A", text: "Plano general" },
          { id: "B", text: "Plano entero" },
          { id: "C", text: "Plano detalle" },
          { id: "D", text: "Plano americano" },
        ],
        correct: "C",
        exclamation: "¡PERFECTO!",
        feedbackCorrect: "Los detalles ayudan a mostrar características del producto y pueden hacer que una fotografía comercial sea más atractiva.",
        feedbackIncorrect: "Para mostrar el logotipo y texturas del envase necesitamos acercarnos mucho. El plano detalle es ideal para fotografía de productos.",
      },
    ],
  },
  {
    id: 2,
    emoji: "📐",
    title: "ÁNGULOS",
    subtitle: "Descubre cómo cambiar la percepción de una imagen.",
    intro: "La posición de la cámara puede cambiar completamente cómo percibimos un producto o persona. Un simple cambio de ángulo transforma el mensaje visual.",
    concept: "¿Qué es un ángulo?",
    badge: "🎯",
    badgeName: "Maestro del Encuadre",
    questions: [
      {
        id: 1,
        challenge: "RETO 01",
        question: "Quieres que un producto se vea más grande, fuerte e imponente. ¿Qué ángulo utilizarías?",
        options: [
          { id: "A", text: "Picado" },
          { id: "B", text: "Normal" },
          { id: "C", text: "Contrapicado" },
          { id: "D", text: "Cenital" },
        ],
        correct: "C",
        exclamation: "¡CORRECTO!",
        feedbackCorrect: "El contrapicado coloca la cámara por debajo del sujeto y puede hacerlo parecer más grande o dominante.",
        feedbackIncorrect: "Para dar sensación de poder y tamaño, la cámara debe estar por debajo del objeto. Eso se llama contrapicado.",
      },
      {
        id: 2,
        challenge: "RETO 02",
        question: "Quieres mostrar un plato de comida desde arriba para que se vean todos los ingredientes. ¿Qué ángulo usarías?",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=220&fit=crop&auto=format",
        options: [
          { id: "A", text: "Normal" },
          { id: "B", text: "Cenital" },
          { id: "C", text: "Contrapicado" },
          { id: "D", text: "Nadir" },
        ],
        correct: "B",
        exclamation: "¡EXCELENTE!",
        feedbackCorrect: "El ángulo cenital coloca la cámara directamente arriba del sujeto mirando hacia abajo — muy popular para fotografía de alimentos.",
        feedbackIncorrect: "Para fotografiar desde arriba hacia abajo usamos el ángulo cenital. Es ideal para mostrar platos de comida.",
      },
      {
        id: 3,
        challenge: "RETO 03",
        question: "Grabas un video de un emprendedor caminando hacia la cámara para mostrar su producto. ¿Qué ángulo es más natural?",
        options: [
          { id: "A", text: "Picado" },
          { id: "B", text: "Cenital" },
          { id: "C", text: "Normal" },
          { id: "D", text: "Contrapicado" },
        ],
        correct: "C",
        exclamation: "¡CORRECTO!",
        feedbackCorrect: "El ángulo normal coloca la cámara a la altura de los ojos del sujeto, creando una perspectiva natural y cercana.",
        feedbackIncorrect: "Para crear una sensación natural y directa, usamos el ángulo normal: la cámara a la altura de los ojos.",
      },
      {
        id: 4,
        challenge: "RETO 04",
        question: "Quieres hacer que un personaje se vea pequeño o vulnerable en una escena. ¿Qué ángulo utilizarías?",
        options: [
          { id: "A", text: "Contrapicado" },
          { id: "B", text: "Picado" },
          { id: "C", text: "Normal" },
          { id: "D", text: "Nadir" },
        ],
        correct: "B",
        exclamation: "¡MUY BIEN!",
        feedbackCorrect: "El picado coloca la cámara por encima del sujeto mirando hacia abajo, haciendo que parezca más pequeño o vulnerable.",
        feedbackIncorrect: "Cuando la cámara está arriba mirando hacia abajo (picado), el sujeto parece más pequeño y menos poderoso.",
      },
      {
        id: 5,
        challenge: "RETO 05",
        question: "Fotografías una botella de producto a la misma altura. ¿Qué ángulo estás usando?",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSktLLn_VZ6snAqMigixq-hTg27Q5mSkY3xioQpd7OHtg&s=10",
        options: [
          { id: "A", text: "Picado" },
          { id: "B", text: "Cenital" },
          { id: "C", text: "Normal" },
          { id: "D", text: "Nadir" },
        ],
        correct: "C",
        exclamation: "¡PERFECTO!",
        feedbackCorrect: "El ángulo normal es cuando la cámara está al mismo nivel que el sujeto. Es el ángulo más usado en fotografía de productos.",
        feedbackIncorrect: "Cuando la cámara está a la misma altura que el objeto, estamos usando el ángulo normal.",
      },
    ],
  },
];

const BADGES = [
  { emoji: "📷", name: "Explorador Visual", desc: "Completaste tu primer reto" },
  { emoji: "🎯", name: "Maestro del Encuadre", desc: "Completaste el Nivel 2" },
  { emoji: "💡", name: "Experto en Luz", desc: "Completa Iluminación" },
  { emoji: "🎨", name: "Maestro de la Composición", desc: "Completa Composición" },
  { emoji: "📱", name: "Creador de Contenido", desc: "Completa Redes Sociales" },
  { emoji: "🏆", name: "Director Visual", desc: "Completa todos los niveles" },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function ProgressBar({ current, total, color = "#f59e0b" }: { current: number; total: number; color?: string }) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full h-2 rounded-full" style={{ background: "#2d2f45" }}>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function Stars({ filled, total = 3 }: { filled: number; total?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`w-6 h-6 transition-all ${i < filled ? "text-amber-400" : "text-slate-700"}`} fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Tag({ children, color = "#f59e0b" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: color + "22", color, fontFamily: "'Outfit', sans-serif" }}>
      {children}
    </span>
  );
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: "#080a0f" }}>
      <div className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden flex flex-col"
        style={{ background: "#0b0c10", boxShadow: "0 30px 80px rgba(0,0,0,0.9), 0 0 0 1px #1e2030", minHeight: "780px" }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-1 flex-shrink-0">
          <span className="text-xs text-slate-500 font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>9:41</span>
          <div className="flex gap-1 items-center">
            <div className="w-3.5 h-2 rounded-sm border border-slate-600 relative">
              <div className="absolute inset-0.5 right-0.5 bg-slate-500 rounded-sm" />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

function BottomNav({ active, onNav }: { active: string; onNav: (s: Screen) => void }) {
  const items = [
    { id: "menu", label: "Inicio", icon: <path d="M10 2L2 8v10h6v-5h4v5h6V8L10 2z" /> },
    { id: "profile", label: "Progreso", icon: <><circle cx="10" cy="6" r="3" /><path d="M2 20c0-4.4 3.6-8 8-8s8 3.6 8 8" /></> },
    { id: "connect", label: "Conecta", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
  ];
  return (
    <div className="flex-shrink-0 flex border-t" style={{ borderColor: "#1e2030", background: "#0b0c10" }}>
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button key={item.id} onClick={() => onNav(item.id as Screen)}
            className="flex-1 flex flex-col items-center py-3 gap-1 transition-all"
            style={{ color: isActive ? "#f59e0b" : "#475569" }}>
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {item.icon}
            </svg>
            <span className="text-xs font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── ONBOARDING DOT INDICATOR ────────────────────────────────────────────────

function DotIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="rounded-full transition-all duration-300"
          style={{ width: i === current - 1 ? "20px" : "6px", height: "6px", background: i === current - 1 ? "#f59e0b" : "#2d2f45" }} />
      ))}
    </div>
  );
}

// ─── WELCOME SCREEN ───────────────────────────────────────────────────────────

function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between flex-1 px-6 pb-8 pt-6">
      <DotIndicator current={1} total={3} />

      <div className="flex flex-col items-center text-center gap-4 flex-1 justify-center">
        {/* Illustration */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }} />
          {/* Phone + person illustration */}
          <svg viewBox="0 0 140 140" className="w-40 h-40" fill="none">
            {/* Person body */}
            <circle cx="70" cy="42" r="18" fill="#1e2030" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="70" cy="42" r="12" fill="#f59e0b" fillOpacity="0.3" />
            {/* Face */}
            <circle cx="65" cy="40" r="2.5" fill="#f59e0b" />
            <circle cx="75" cy="40" r="2.5" fill="#f59e0b" />
            <path d="M65 47 Q70 51 75 47" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Body */}
            <path d="M52 90 Q52 68 70 65 Q88 68 88 90" fill="#1e2030" stroke="#2d2f45" strokeWidth="1.5" />
            {/* Phone in hand */}
            <rect x="80" y="58" width="28" height="44" rx="5" fill="#16171f" stroke="#f59e0b" strokeWidth="2" />
            <rect x="83" y="63" width="22" height="30" rx="2" fill="#f59e0b" fillOpacity="0.15" />
            {/* Camera icon on phone */}
            <rect x="89" y="68" width="10" height="8" rx="2" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="94" cy="72" r="2" fill="#f59e0b" fillOpacity="0.6" />
            {/* Stars around */}
            <text x="20" y="55" fontSize="14" fill="#f59e0b" opacity="0.7">✦</text>
            <text x="108" y="38" fontSize="10" fill="#6366f1" opacity="0.7">✦</text>
            <text x="28" y="90" fontSize="8" fill="#10b981" opacity="0.6">✦</text>
          </svg>
        </div>

        <div>
          <h1 className="text-4xl font-black mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: "#f1f5f9" }}>
            ¡Hola! 👋
          </h1>
          <p className="text-xl font-black mb-3" style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #fcd34d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            No necesitas saber fotografía.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <span className="font-bold text-white">ENCUADRA</span> te enseñará paso a paso cómo crear mejores fotos y videos para tu negocio.
          </p>
        </div>
      </div>

      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10", boxShadow: "0 8px 32px rgba(245,158,11,0.3)" }}>
        CONTINUAR
      </button>
    </div>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

function HowItWorksScreen({ onNext }: { onNext: () => void }) {
  const steps = [
    { emoji: "🧠", label: "APRENDE", desc: "Descubre conceptos audiovisuales de forma sencilla.", color: "#6366f1" },
    { emoji: "🎯", label: "PRACTICA", desc: "Pon a prueba lo que acabas de aprender.", color: "#f59e0b" },
    { emoji: "🏆", label: "SUPERA EL RETO", desc: "Completa desafíos y gana XP.", color: "#10b981" },
  ];

  return (
    <div className="flex flex-col items-center justify-between flex-1 px-6 pb-8 pt-6">
      <DotIndicator current={2} total={3} />

      <div className="flex flex-col items-center text-center gap-5 flex-1 justify-center w-full">
        <div>
          <h2 className="text-3xl font-black text-slate-100" style={{ fontFamily: "'Outfit', sans-serif" }}>¿Cómo funciona?</h2>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {steps.map((step, i) => (
            <div key={i}>
              <div className="flex items-center gap-4 px-4 py-4 rounded-2xl"
                style={{ background: "#1e2030", border: `1.5px solid ${step.color}30` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: step.color + "18", border: `1.5px solid ${step.color}40` }}>
                  {step.emoji}
                </div>
                <div className="text-left">
                  <p className="font-black text-sm mb-0.5" style={{ fontFamily: "'Outfit', sans-serif", color: step.color }}>{step.label}</p>
                  <p className="text-slate-300 text-xs leading-snug" style={{ fontFamily: "'Nunito', sans-serif" }}>{step.desc}</p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center my-1">
                  <div className="w-px h-4" style={{ background: "linear-gradient(to bottom, #2d2f45, transparent)" }} />
                  <span className="text-slate-600 text-xs ml-1">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-slate-400 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Tu progreso <span className="text-amber-400 font-bold">desbloquea nuevos niveles.</span>
        </p>
      </div>

      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10", boxShadow: "0 8px 32px rgba(245,158,11,0.3)" }}>
        EMPEZAR
      </button>
    </div>
  );
}

// ─── FIRST CHALLENGE ──────────────────────────────────────────────────────────

function FirstChallengeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between flex-1 px-6 pb-8 pt-6">
      <DotIndicator current={3} total={3} />

      <div className="flex flex-col items-center text-center gap-5 flex-1 justify-center w-full">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
          style={{ background: "linear-gradient(135deg, #f59e0b20, #f59e0b35)", border: "2px solid #f59e0b50" }}>
          📷
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-100 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Tu aventura comienza aquí 📷</h2>
          <p className="text-slate-300 text-sm leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Primero aprenderás a elegir el encuadre correcto.
          </p>
        </div>

        <div className="w-full px-5 py-5 rounded-2xl" style={{ background: "linear-gradient(135deg, #1e2030, #16171f)", border: "1.5px solid #f59e0b30" }}>
          <Tag>NIVEL 1</Tag>
          <h3 className="text-2xl font-black mt-2 mb-1" style={{ fontFamily: "'Outfit', sans-serif", color: "#f59e0b" }}>PLANOS</h3>
          <p className="text-slate-300 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Aprende qué mostrar y cuánto mostrar dentro de una imagen.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-slate-500 text-xs">📚 3 lecciones</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-500 text-xs">🎯 5 retos</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-500 text-xs">⭐ 500 XP</span>
          </div>
        </div>
      </div>

      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10", boxShadow: "0 8px 32px rgba(245,158,11,0.3)" }}>
        APRENDER PLANOS
      </button>
    </div>
  );
}

// ─── LESSON 1 — ¿QUÉ ES UN PLANO? ────────────────────────────────────────────

function Lesson1Screen({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState<"far" | "close">("far");

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 pt-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>MINI ESCUELA</p>
          <p className="text-slate-500 text-xs mt-0.5" style={{ fontFamily: "'Nunito', sans-serif" }}>Lección 1 de 3 · Antes de jugar, aprende lo básico.</p>
        </div>
        <ProgressBar current={1} total={7} />
      </div>

      <h2 className="text-xl font-black text-slate-100 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>¿Qué es un plano?</h2>

      {/* Interactive camera illustration */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-4 flex-shrink-0" style={{ height: "200px", background: "#1e2030", border: "1.5px solid #2d2f45" }}>
        <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=280&fit=crop&auto=format"
          alt="Persona como ejemplo de plano"
          className="w-full h-full object-cover transition-all duration-700"
          style={{ objectPosition: step === "far" ? "center center" : "center top", transform: step === "close" ? "scale(1.7)" : "scale(1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,12,16,0.7) 0%, transparent 50%)" }} />
        {/* Reticle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.5 }}>
          <div className="w-20 h-20 rounded-full border-2 border-amber-400" style={{ boxShadow: "0 0 0 9999px rgba(11,12,16,0.3)" }} />
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          <button onClick={() => setStep("far")} className="px-3 py-1 rounded-full text-xs font-bold transition-all"
            style={{ background: step === "far" ? "#f59e0b" : "rgba(11,12,16,0.7)", color: step === "far" ? "#0b0c10" : "#94a3b8", fontFamily: "'Outfit', sans-serif" }}>
            📷 Lejos
          </button>
          <button onClick={() => setStep("close")} className="px-3 py-1 rounded-full text-xs font-bold transition-all"
            style={{ background: step === "close" ? "#f59e0b" : "rgba(11,12,16,0.7)", color: step === "close" ? "#0b0c10" : "#94a3b8", fontFamily: "'Outfit', sans-serif" }}>
            🔍 Cerca
          </button>
        </div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
        El plano determina <span className="font-bold text-white">cuánto de una persona, objeto o escena</span> aparece dentro de la imagen.
      </p>

      <div className="flex gap-3 mb-6">
        <div className="flex-1 px-3 py-3 rounded-xl text-center" style={{ background: "#1e2030", border: "1.5px solid #2d2f45" }}>
          <p className="text-2xl mb-1">⬅️</p>
          <p className="text-slate-300 text-xs font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>Más lejos</p>
          <p className="text-slate-500 text-xs">= vemos más</p>
        </div>
        <div className="flex items-center">
          <svg viewBox="0 0 20 20" className="w-5 h-5 text-slate-600" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1 px-3 py-3 rounded-xl text-center" style={{ background: "#1e2030", border: "1.5px solid #2d2f45" }}>
          <p className="text-2xl mb-1">➡️</p>
          <p className="text-slate-300 text-xs font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>Más cerca</p>
          <p className="text-slate-500 text-xs">= vemos menos</p>
        </div>
      </div>

      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95 mt-auto"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10" }}>
        ENTENDIDO →
      </button>
    </div>
  );
}

// ─── LESSON 2 — COMPARACIÓN DE PLANOS ────────────────────────────────────────

function Lesson2Screen({ onNext }: { onNext: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const planes = [
    { id: "general", label: "Plano general", emoji: "🏙️", desc: "Muestra el espacio y el contexto. Da al espectador una visión completa de la escena.", crop: "center center", zoom: "scale(1)", color: "#6366f1" },
    { id: "medio", label: "Plano medio", emoji: "👤", desc: "Desde la cintura hacia arriba. Ideal para tutoriales, entrevistas y redes sociales.", crop: "center top", zoom: "scale(1.4)", color: "#f59e0b" },
    { id: "primer", label: "Primer plano", emoji: "😊", desc: "Destaca el rostro y las expresiones. Genera conexión emocional con el espectador.", crop: "center 15%", zoom: "scale(2.2)", color: "#10b981" },
    { id: "detalle", label: "Plano detalle", emoji: "🔍", desc: "Destaca una característica específica. Perfecto para productos, texturas y logotipos.", crop: "center 30%", zoom: "scale(3.5)", color: "#ec4899" },
  ];

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 pt-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>MINI ESCUELA</p>
          <p className="text-slate-500 text-xs mt-0.5">Lección 2 de 3</p>
        </div>
        <ProgressBar current={2} total={7} />
      </div>

      <h2 className="text-xl font-black text-slate-100 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Comparación de planos</h2>
      <p className="text-slate-400 text-xs mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>Toca cada tarjeta para ver la explicación 👇</p>

      <div className="flex flex-col gap-2.5 mb-6 flex-1">
        {planes.map((p) => {
          const isOpen = expanded === p.id;
          return (
            <button key={p.id} onClick={() => setExpanded(isOpen ? null : p.id)}
              className="rounded-2xl overflow-hidden text-left transition-all duration-300"
              style={{ background: "#1e2030", border: `1.5px solid ${isOpen ? p.color : "#2d2f45"}`, transform: isOpen ? "scale(1.02)" : "scale(1)" }}>
              <div className="relative overflow-hidden" style={{ height: isOpen ? "120px" : "64px", transition: "height 0.3s ease" }}>
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=200&fit=crop&auto=format"
                  alt={p.label}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{ objectPosition: p.crop, transform: p.zoom }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(11,12,16,0.8) 0%, transparent 60%)` }} />
                <div className="absolute inset-0 flex items-center px-4 gap-3">
                  <span className="text-2xl flex-shrink-0">{p.emoji}</span>
                  <div>
                    <p className="font-black text-sm text-slate-100" style={{ fontFamily: "'Outfit', sans-serif", color: p.color }}>{p.label}</p>
                    {isOpen && <p className="text-slate-200 text-xs mt-1 leading-snug" style={{ fontFamily: "'Nunito', sans-serif" }}>{p.desc}</p>}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10" }}>
        SIGUIENTE →
      </button>
    </div>
  );
}

// ─── LESSON 3 — PLANO DETALLE ─────────────────────────────────────────────────

function Lesson3Screen({ onNext }: { onNext: () => void }) {
  const [view, setView] = useState<"before" | "after">("before");

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 pt-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>MINI ESCUELA</p>
          <p className="text-slate-500 text-xs mt-0.5">Lección 3 de 3</p>
        </div>
        <ProgressBar current={3} total={7} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xl font-black text-slate-100" style={{ fontFamily: "'Outfit', sans-serif" }}>PLANO DETALLE</h2>
        <Tag color="#10b981">Ideal para productos</Tag>
      </div>

      <p className="text-slate-300 text-sm leading-snug mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Sirve para destacar una <span className="font-bold text-white">característica específica</span> de un producto.
      </p>

      {/* Before/After toggle */}
      <div className="flex gap-2 p-1 rounded-xl mb-3" style={{ background: "#1e2030" }}>
        {(["before", "after"] as const).map((v) => (
          <button key={v} onClick={() => setView(v)} className="flex-1 py-2 rounded-lg font-bold text-sm transition-all"
            style={{ fontFamily: "'Outfit', sans-serif", background: view === v ? "#f59e0b" : "transparent", color: view === v ? "#0b0c10" : "#94a3b8" }}>
            {v === "before" ? "Sin detalle" : "Con detalle"}
          </button>
        ))}
      </div>

      {/* Comparison image */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-4 flex-shrink-0" style={{ height: "180px", background: "#1e2030" }}>
        <img src="https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=260&fit=crop&auto=format"
          alt="Ejemplo de plano detalle con perfume"
          className="w-full h-full object-cover transition-all duration-700"
          style={{ objectPosition: view === "before" ? "center center" : "center 30%", transform: view === "after" ? "scale(1.8)" : "scale(1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,12,16,0.6) 0%, transparent 60%)" }} />
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-bold px-2 py-1 rounded-lg"
            style={{ background: view === "after" ? "#10b98199" : "rgba(11,12,16,0.7)", color: "white", fontFamily: "'Outfit', sans-serif" }}>
            {view === "before" ? "Plano normal" : "✓ Plano detalle"}
          </span>
        </div>
      </div>

      {/* Examples */}
      <div className="flex flex-col gap-1.5 mb-5">
        {["El brillo de un anillo.", "La textura de un postre.", "El diseño de un perfume."].map((ex, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-amber-400 text-xs">✦</span>
            <p className="text-slate-300 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>{ex}</p>
          </div>
        ))}
      </div>

      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95 mt-auto"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10" }}>
        PRACTICAR
      </button>
    </div>
  );
}

// ─── LESSON DEPTH — CREA PROFUNDIDAD ─────────────────────────────────────────

function LessonDepthScreen({ onNext }: { onNext: () => void }) {
  const [showLabels, setShowLabels] = useState(false);

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 pt-3">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>CONCEPTOS VISUALES</p>
        <h2 className="text-xl font-black text-slate-100 mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Crea profundidad</h2>
      </div>

      {/* Cinematic image with layer labels */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-4 cursor-pointer flex-shrink-0"
        style={{ height: "220px", background: "#1e2030" }}
        onClick={() => setShowLabels((v) => !v)}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop&auto=format"
          alt="Espacio con profundidad visual — escritorio de trabajo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(11,12,16,0.35)" }} />

        {/* Layer indicators */}
        {showLabels && (
          <>
            {/* Front line */}
            <div className="absolute bottom-14 left-0 right-0 h-px" style={{ background: "rgba(99,102,241,0.7)" }} />
            {/* Mid line */}
            <div className="absolute bottom-24 left-0 right-0 h-px" style={{ background: "rgba(245,158,11,0.7)" }} />
            {/* Back line */}
            <div className="absolute bottom-36 left-0 right-0 h-px" style={{ background: "rgba(16,185,129,0.7)" }} />

            {/* Labels */}
            <div className="absolute bottom-10 right-3">
              <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: "#6366f1cc", color: "white", fontFamily: "'Outfit', sans-serif" }}>PRIMER PLANO</span>
            </div>
            <div className="absolute bottom-20 right-3">
              <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: "#f59e0bcc", color: "#0b0c10", fontFamily: "'Outfit', sans-serif" }}>SUJETO</span>
            </div>
            <div className="absolute bottom-32 right-3">
              <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: "#10b981cc", color: "white", fontFamily: "'Outfit', sans-serif" }}>FONDO</span>
            </div>
          </>
        )}

        {/* Tap hint */}
        {!showLabels && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-3 py-2 rounded-full text-xs font-bold" style={{ background: "rgba(11,12,16,0.75)", color: "#f59e0b", fontFamily: "'Outfit', sans-serif", border: "1px solid #f59e0b50" }}>
              👆 Toca para ver las capas
            </div>
          </div>
        )}
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Agregar <span className="font-bold text-white">capas</span> hace que tus fotos se sientan más profundas y envolventes. Combina elementos en primer plano, sujeto y fondo.
      </p>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {[
          { label: "Primer plano", color: "#6366f1", sub: "Objetos cerca" },
          { label: "Sujeto", color: "#f59e0b", sub: "Elemento principal" },
          { label: "Fondo", color: "#10b981", sub: "Entorno" },
        ].map((layer, i) => (
          <div key={i} className="flex flex-col items-center py-3 px-2 rounded-xl text-center"
            style={{ background: layer.color + "12", border: `1.5px solid ${layer.color}40` }}>
            <div className="w-2 h-2 rounded-full mb-1.5" style={{ background: layer.color }} />
            <p className="text-xs font-black leading-tight" style={{ color: layer.color, fontFamily: "'Outfit', sans-serif" }}>{layer.label}</p>
            <p className="text-slate-500 text-xs mt-0.5">{layer.sub}</p>
          </div>
        ))}
      </div>

      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95 mt-auto"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10" }}>
        ENTENDIDO →
      </button>
    </div>
  );
}

// ─── LESSON LINES — DIRIGE LA MIRADA ─────────────────────────────────────────

function LessonLinesScreen({ onNext }: { onNext: () => void }) {
  const [showLines, setShowLines] = useState(false);

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 pt-3">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>CONCEPTOS VISUALES</p>
        <h2 className="text-xl font-black text-slate-100 mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Dirige la mirada</h2>
      </div>

      {/* Architectural photo with perspective lines */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-4 cursor-pointer flex-shrink-0"
        style={{ height: "220px", background: "#1e2030" }}
        onClick={() => setShowLines((v) => !v)}>
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=300&fit=crop&auto=format"
          alt="Pasillo arquitectónico con líneas de perspectiva"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(11,12,16,0.3)" }} />

        {showLines && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 220" preserveAspectRatio="none">
            {/* Converging perspective lines */}
            <line x1="0" y1="220" x2="200" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,4" opacity="0.85" />
            <line x1="400" y1="220" x2="200" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,4" opacity="0.85" />
            <line x1="0" y1="160" x2="200" y2="80" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
            <line x1="400" y1="160" x2="200" y2="80" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
            {/* Vanishing point */}
            <circle cx="200" cy="80" r="8" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.9" />
            <circle cx="200" cy="80" r="3" fill="#f59e0b" opacity="0.9" />
          </svg>
        )}

        {showLines && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2">
            <span className="text-xs font-black px-2 py-1 rounded" style={{ background: "#f59e0bdd", color: "#0b0c10", fontFamily: "'Outfit', sans-serif", whiteSpace: "nowrap" }}>
              PUNTO DE FUGA
            </span>
          </div>
        )}
        {showLines && (
          <div className="absolute bottom-4 left-4">
            <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: "rgba(11,12,16,0.8)", color: "#f59e0b", fontFamily: "'Outfit', sans-serif" }}>
              LÍNEAS → SUJETO
            </span>
          </div>
        )}

        {!showLines && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-3 py-2 rounded-full text-xs font-bold" style={{ background: "rgba(11,12,16,0.75)", color: "#f59e0b", fontFamily: "'Outfit', sans-serif", border: "1px solid #f59e0b50" }}>
              👆 Toca para ver las líneas guía
            </div>
          </div>
        )}
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Las <span className="font-bold text-white">líneas guía</span> pueden llevar la mirada directamente hacia el punto que quieres destacar. Úsalas a tu favor.
      </p>

      <div className="flex flex-col gap-2 mb-6">
        {[
          { emoji: "🏗️", text: "Bordes de edificios y pasillos" },
          { emoji: "🛤️", text: "Caminos, carreteras y calles" },
          { emoji: "📐", text: "Estanterías, mesas y superficies" },
        ].map((tip, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: "#1e2030", border: "1px solid #2d2f45" }}>
            <span className="text-lg">{tip.emoji}</span>
            <p className="text-slate-300 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>{tip.text}</p>
          </div>
        ))}
      </div>

      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95 mt-auto"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10" }}>
        PRACTICAR
      </button>
    </div>
  );
}

// ─── LESSON CENTER — COMPOSICIÓN CENTRADA ─────────────────────────────────────

function LessonCenterScreen({ onNext }: { onNext: () => void }) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 pt-3">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>CONCEPTOS VISUALES</p>
        <h2 className="text-xl font-black text-slate-100 mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>El centro funciona</h2>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden mb-4 cursor-pointer flex-shrink-0"
        style={{ height: "220px", background: "#1e2030" }}
        onClick={() => setShowGuide((v) => !v)}>
        <img
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=300&fit=crop&crop=faces&auto=format"
          alt="Persona centrada en el encuadre"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(11,12,16,0.3)" }} />

        {showGuide && (
          <>
            {/* Center vertical line */}
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2" style={{ background: "rgba(99,102,241,0.8)" }} />
            {/* Center horizontal line */}
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2" style={{ background: "rgba(99,102,241,0.5)" }} />
            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "rgba(99,102,241,0.8)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: "#6366f1" }} />
              </div>
            </div>
            {/* Labels */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2">
              <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: "#6366f1cc", color: "white", fontFamily: "'Outfit', sans-serif", whiteSpace: "nowrap" }}>CENTRO</span>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="text-xs font-black px-2 py-0.5 rounded" style={{ background: "#6366f1cc", color: "white", fontFamily: "'Outfit', sans-serif", whiteSpace: "nowrap" }}>SUJETO CENTRADO ✓</span>
            </div>
          </>
        )}

        {!showGuide && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-3 py-2 rounded-full text-xs font-bold" style={{ background: "rgba(11,12,16,0.75)", color: "#f59e0b", fontFamily: "'Outfit', sans-serif", border: "1px solid #f59e0b50" }}>
              👆 Toca para ver la guía
            </div>
          </div>
        )}
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Colocar al sujeto en el <span className="font-bold text-white">centro del encuadre</span> transmite orden, equilibrio y estabilidad. Funciona muy bien para productos y retratos.
      </p>

      <div className="flex gap-3 mb-6">
        {[
          { emoji: "⚖️", label: "Equilibrio", color: "#6366f1" },
          { emoji: "🎯", label: "Impacto", color: "#f59e0b" },
          { emoji: "✨", label: "Simetría", color: "#10b981" },
        ].map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center py-3 rounded-xl text-center"
            style={{ background: v.color + "12", border: `1.5px solid ${v.color}30` }}>
            <span className="text-xl mb-1">{v.emoji}</span>
            <p className="text-xs font-bold" style={{ color: v.color, fontFamily: "'Outfit', sans-serif" }}>{v.label}</p>
          </div>
        ))}
      </div>

      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95 mt-auto"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10" }}>
        SIGUIENTE →
      </button>
    </div>
  );
}

// ─── LESSON VERTICAL — PIENSA EN VERTICAL ─────────────────────────────────────

function LessonVerticalScreen({ onNext }: { onNext: () => void }) {
  const [active, setActive] = useState<"reel" | "story" | "short">("reel");

  const formats = {
    reel: { label: "REEL", color: "#ec4899", desc: "Hasta 90 segundos. Máxima visibilidad en Instagram." },
    story: { label: "STORY", color: "#f59e0b", desc: "24 horas de duración. Ideal para contenido rápido." },
    short: { label: "SHORT", color: "#ef4444", desc: "Corto y dinámico. Perfecto para YouTube." },
  };

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 pt-3">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>CONCEPTOS VISUALES</p>
        <h2 className="text-xl font-black text-slate-100 mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Piensa en vertical</h2>
      </div>

      <div className="flex gap-4 mb-5 items-start justify-center">
        {/* Vertical phone frame */}
        <div className="flex flex-col items-center">
          <div className="relative rounded-2xl overflow-hidden flex-shrink-0"
            style={{ width: "100px", height: "178px", background: "#1e2030", border: `2px solid ${formats[active].color}`, boxShadow: `0 0 20px ${formats[active].color}40` }}>
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=356&fit=crop&auto=format"
              alt="Contenido vertical para redes sociales"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,12,16,0.7) 0%, transparent 50%)" }} />
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="text-xs font-black" style={{ color: formats[active].color, fontFamily: "'Outfit', sans-serif" }}>{formats[active].label}</span>
            </div>
            <div className="absolute top-2 right-2">
              <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(11,12,16,0.8)", color: "#94a3b8", fontFamily: "'Outfit', sans-serif" }}>9:16</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-2" style={{ fontFamily: "'Outfit', sans-serif" }}>1080×1920</p>
        </div>

        {/* Format selector */}
        <div className="flex flex-col gap-2 flex-1">
          {(Object.entries(formats) as [typeof active, typeof formats[typeof active]][]).map(([key, fmt]) => (
            <button key={key} onClick={() => setActive(key)}
              className="flex flex-col px-3 py-2.5 rounded-xl text-left transition-all"
              style={{ background: active === key ? fmt.color + "18" : "#1e2030", border: `1.5px solid ${active === key ? fmt.color + "60" : "#2d2f45"}` }}>
              <p className="font-black text-sm" style={{ color: active === key ? fmt.color : "#64748b", fontFamily: "'Outfit', sans-serif" }}>{fmt.label}</p>
              {active === key && <p className="text-slate-300 text-xs mt-0.5 leading-snug" style={{ fontFamily: "'Nunito', sans-serif" }}>{fmt.desc}</p>}
            </button>
          ))}
        </div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Nunito', sans-serif" }}>
        El formato <span className="font-bold text-white">vertical 9:16</span> aprovecha toda la pantalla del teléfono y funciona especialmente bien para contenido de redes sociales.
      </p>

      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95 mt-auto"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10" }}>
        PRACTICAR →
      </button>
    </div>
  );
}

// ─── PRACTICE QUIZ ────────────────────────────────────────────────────────────

function PracticeScreen({ onAnswer }: { onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const opts = [
    { id: "A", label: "Plano general", zoom: "scale(1)", pos: "center center" },
    { id: "B", label: "Plano medio", zoom: "scale(1.5)", pos: "center 20%" },
    { id: "C", label: "Plano detalle", zoom: "scale(2.8)", pos: "center 35%" },
  ];

  const handleSelect = (id: string) => {
    if (selected) return;
    setSelected(id);
    setTimeout(() => onAnswer(id === "C"), 600);
  };

  return (
    <div className="flex flex-col flex-1 px-5 pb-6 pt-3">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🎯</span>
        <div>
          <p className="text-sm font-black text-slate-100" style={{ fontFamily: "'Outfit', sans-serif" }}>PRUEBA RÁPIDA</p>
          <p className="text-slate-500 text-xs">Demuestra lo que aprendiste</p>
        </div>
      </div>

      {/* Product image */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-4" style={{ height: "140px", background: "#1e2030" }}>
        <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=200&fit=crop&auto=format"
          alt="Anillo de joyería para la prueba" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,12,16,0.65) 0%, transparent 55%)" }} />
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ background: "rgba(11,12,16,0.7)", color: "#fcd34d", fontFamily: "'Outfit', sans-serif" }}>💍 Joyería</span>
        </div>
      </div>

      <p className="text-slate-100 font-semibold text-sm leading-snug mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Una emprendedora vende joyería y quiere mostrar el detalle de un anillo. ¿Qué plano elegirías?
      </p>

      {/* Visual options */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {opts.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrect = opt.id === "C";
          let border = "#2d2f45";
          if (isSelected) border = isCorrect ? "#10b981" : "#ef4444";
          else if (selected && isCorrect) border = "#10b98150";

          return (
            <button key={opt.id} onClick={() => handleSelect(opt.id)}
              className="flex flex-col rounded-xl overflow-hidden transition-all duration-200 active:scale-95"
              style={{ border: `2px solid ${border}`, cursor: selected ? "default" : "pointer" }}>
              <div className="relative overflow-hidden" style={{ height: "80px", background: "#16171f" }}>
                <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=160&fit=crop&auto=format"
                  alt={opt.label} className="w-full h-full object-cover transition-all duration-500"
                  style={{ objectPosition: opt.pos, transform: opt.zoom }} />
              </div>
              <div className="py-1.5 px-1 text-center" style={{ background: isSelected && isCorrect ? "#10b98118" : isSelected ? "#ef444418" : "#1e2030" }}>
                <p className="text-xs font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: isSelected ? (isCorrect ? "#10b981" : "#ef4444") : "#94a3b8" }}>
                  {opt.id}
                </p>
                <p className="text-xs leading-tight" style={{ fontFamily: "'Nunito', sans-serif", color: "#64748b", fontSize: "10px" }}>{opt.label}</p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-slate-500 text-xs text-center" style={{ fontFamily: "'Nunito', sans-serif" }}>Las imágenes muestran cómo se ve cada tipo de plano</p>
    </div>
  );
}

// ─── PRACTICE CORRECT ─────────────────────────────────────────────────────────

function PracticeCorrectScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between flex-1 px-6 pb-8 pt-6">
      <div />
      <div className="flex flex-col items-center text-center gap-5">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
          style={{ background: "linear-gradient(135deg, #10b98120, #10b98135)", border: "2px solid #10b98150" }}>
          🎉
        </div>
        <div>
          <h2 className="text-3xl font-black" style={{ fontFamily: "'Outfit', sans-serif", color: "#10b981" }}>¡MUY BIEN!</h2>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
            El plano detalle dirige la atención hacia una característica específica del producto.
          </p>
        </div>
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl"
          style={{ background: "linear-gradient(135deg, #f59e0b12, #f59e0b22)", border: "1.5px solid #f59e0b40" }}>
          <span className="text-3xl">⭐</span>
          <div>
            <p className="text-amber-400 font-black text-2xl" style={{ fontFamily: "'Outfit', sans-serif" }}>+20 XP</p>
            <p className="text-slate-400 text-xs">¡Lección completada!</p>
          </div>
        </div>
      </div>
      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", boxShadow: "0 8px 32px rgba(16,185,129,0.25)" }}>
        CONTINUAR
      </button>
    </div>
  );
}

// ─── PRACTICE INCORRECT ───────────────────────────────────────────────────────

function PracticeIncorrectScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between flex-1 px-6 pb-8 pt-6">
      <div />
      <div className="flex flex-col items-center text-center gap-5 w-full">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
          style={{ background: "linear-gradient(135deg, #f59e0b20, #f59e0b35)", border: "2px solid #f59e0b50" }}>
          💡
        </div>
        <div>
          <h2 className="text-3xl font-black" style={{ fontFamily: "'Outfit', sans-serif", color: "#f59e0b" }}>¡CASI!</h2>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Mira cómo cambia la imagen cuando acercamos la cámara. La respuesta correcta es <span className="font-bold text-white">Plano detalle</span>.
          </p>
        </div>
        <div className="w-full px-4 py-4 rounded-2xl text-left" style={{ background: "#1e2030", border: "1.5px solid #2d2f45" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>Recuerda</p>
          <p className="text-slate-300 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
            El plano detalle acerca la cámara para mostrar solo una parte específica del objeto. Perfecto para joyería, texturas y logotipos.
          </p>
        </div>
      </div>
      <button onClick={onRetry} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "white", boxShadow: "0 8px 32px rgba(99,102,241,0.25)" }}>
        INTENTAR DE NUEVO
      </button>
    </div>
  );
}

// ─── READY TO PLAY ────────────────────────────────────────────────────────────

function ReadyScreen({ onStart, practiceXP }: { onStart: () => void; practiceXP: number }) {
  const items = [
    { label: "Lección completada", done: true },
    { label: "Práctica completada", done: true },
    { label: "Reto desbloqueado 🔓", done: true },
  ];
  return (
    <div className="flex flex-col items-center justify-between flex-1 px-6 pb-8 pt-6">
      <div />
      <div className="flex flex-col items-center text-center gap-5 w-full">
        <div className="text-5xl">🎯</div>
        <div>
          <h2 className="text-2xl font-black text-slate-100" style={{ fontFamily: "'Outfit', sans-serif" }}>¡Ya estás listo!</h2>
          <p className="text-slate-400 text-sm mt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>Ahora pondremos a prueba lo que aprendiste.</p>
        </div>

        <div className="w-full flex flex-col gap-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "#1e2030", border: "1.5px solid #10b98140" }}>
              <span className="text-emerald-400 font-bold">✓</span>
              <p className="text-slate-200 text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>{item.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 py-3 rounded-xl w-full justify-center"
          style={{ background: "#f59e0b12", border: "1px solid #f59e0b30" }}>
          <span className="text-amber-400">⭐</span>
          <p className="text-amber-400 font-black text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>+{practiceXP} XP obtenidos</p>
        </div>
      </div>

      <button onClick={onStart} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10", boxShadow: "0 8px 32px rgba(245,158,11,0.3)" }}>
        COMENZAR RETO
      </button>
    </div>
  );
}

// ─── UNLOCK NEXT LEVEL ────────────────────────────────────────────────────────

function UnlockNextScreen({ unlockedLevel, onContinue }: { unlockedLevel: Level | null; onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between flex-1 px-6 pb-8 pt-6">
      <div />
      <div className="flex flex-col items-center text-center gap-5 w-full">
        <div className="text-5xl">🔓</div>
        <div>
          <h2 className="text-2xl font-black" style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #fcd34d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            ¡Nuevo nivel desbloqueado!
          </h2>
        </div>
        {unlockedLevel ? (
          <div className="w-full px-5 py-5 rounded-2xl"
            style={{ background: "linear-gradient(135deg, #1e2030, #16171f)", border: "1.5px solid #f59e0b40" }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{unlockedLevel.emoji}</span>
              <div>
                <Tag>NIVEL {unlockedLevel.id}</Tag>
                <h3 className="text-xl font-black mt-1" style={{ fontFamily: "'Outfit', sans-serif", color: "#f59e0b" }}>{unlockedLevel.title}</h3>
              </div>
            </div>
            <p className="text-slate-300 text-sm text-left" style={{ fontFamily: "'Nunito', sans-serif" }}>{unlockedLevel.subtitle}</p>
          </div>
        ) : (
          <p className="text-slate-300 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>
            ¡Has completado todos los niveles disponibles! Próximamente habrá más contenido.
          </p>
        )}
      </div>
      <button onClick={onContinue} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10", boxShadow: "0 8px 32px rgba(245,158,11,0.3)" }}>
        CONTINUAR
      </button>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between flex-1 px-6 pb-8 pt-4">
      <div className="flex flex-col items-center gap-3 mt-6">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #f59e0b, #6366f1)", boxShadow: "0 8px 32px rgba(245,158,11,0.3)" }}>
          <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
            <rect x="6" y="12" width="36" height="26" rx="4" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2.5" />
            <circle cx="24" cy="25" r="7" fill="white" fillOpacity="0.9" />
            <circle cx="24" cy="25" r="4" fill="white" fillOpacity="0.25" />
            <rect x="15" y="8" width="6" height="4" rx="1.5" fill="white" fillOpacity="0.7" />
          </svg>
        </div>
        <div className="text-center mt-1">
          <h1 className="text-5xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #fcd34d)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            ENCUADRA
          </h1>
          <p className="text-slate-300 text-base mt-2 font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>Aprende a contar historias visuales</p>
          <p className="text-slate-500 text-sm mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>Aprende. Practica. Crea.</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2.5 my-6">
        {[
          { emoji: "📷", title: "Planos", sub: "Nivel 1 · Disponible", unlocked: true },
          { emoji: "📐", title: "Ángulos", sub: "Nivel 2", unlocked: false },
          { emoji: "💡", title: "Iluminación", sub: "Nivel 3", unlocked: false },
          { emoji: "🎨", title: "Composición", sub: "Nivel 4", unlocked: false },
          { emoji: "📱", title: "Contenido para redes", sub: "Nivel 5", unlocked: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: "#1e2030", border: "1px solid #2d2f45", opacity: item.unlocked ? 1 : 0.45 }}>
            <span className="text-xl">{item.emoji}</span>
            <div className="flex-1">
              <p className="font-bold text-slate-100 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.title}</p>
              <p className="text-slate-500 text-xs">{item.sub}</p>
            </div>
            {item.unlocked
              ? <Tag>Nuevo</Tag>
              : <svg viewBox="0 0 20 20" className="w-4 h-4 text-slate-600" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>}
          </div>
        ))}
      </div>

      <button onClick={onStart} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10", boxShadow: "0 8px 32px rgba(245,158,11,0.3)" }}>
        COMENZAR
      </button>
    </div>
  );
}

// ─── MENU ─────────────────────────────────────────────────────────────────────

function MenuScreen({ completedLevels, totalXP, onSelectLevel }: { completedLevels: number[]; totalXP: number; onSelectLevel: (lvl: Level) => void }) {
  const totalLevels = LEVELS.length + 3;
  const progress = Math.round((completedLevels.length / totalLevels) * 100);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-5 pb-4 pt-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-black text-slate-100" style={{ fontFamily: "'Outfit', sans-serif" }}>Elige tu reto</h1>
          <p className="text-slate-500 text-xs">Desbloquea todos los niveles</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#f59e0b18", border: "1px solid #f59e0b30" }}>
          <span className="text-amber-400 text-sm">⭐</span>
          <span className="font-bold text-amber-400 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{totalXP} XP</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5 px-4 py-3 rounded-2xl" style={{ background: "#1e2030", border: "1px solid #2d2f45" }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-slate-300 text-xs font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>Progreso general</p>
          <p className="text-amber-400 text-xs font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>{progress}%</p>
        </div>
        <ProgressBar current={completedLevels.length} total={totalLevels} />
      </div>

      {/* Level cards */}
      <div className="flex flex-col gap-3">
        {LEVELS.map((level, i) => {
          const isCompleted = completedLevels.includes(level.id);
          const isUnlocked = i === 0 || completedLevels.includes(LEVELS[i - 1]?.id);
          return (
            <button key={level.id} onClick={() => isUnlocked && onSelectLevel(level)} disabled={!isUnlocked}
              className="flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all active:scale-[0.98]"
              style={{ background: "#1e2030", border: `1.5px solid ${isCompleted ? "#10b98140" : isUnlocked ? "#f59e0b30" : "#2d2f45"}`, opacity: isUnlocked ? 1 : 0.5 }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: isCompleted ? "#10b98118" : isUnlocked ? "#f59e0b18" : "#1e2030", border: `1.5px solid ${isCompleted ? "#10b98140" : isUnlocked ? "#f59e0b40" : "#2d2f45"}` }}>
                {level.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-black text-slate-100 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Nivel {level.id} — {level.title}
                  </p>
                </div>
                <p className="text-slate-400 text-xs leading-snug">{level.subtitle}</p>
                {isCompleted && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <Stars filled={3} total={3} />
                    <span className="text-emerald-400 text-xs font-bold ml-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Completado</span>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0">
                {isCompleted
                  ? <span className="text-emerald-400 text-lg">✓</span>
                  : isUnlocked
                  ? <svg viewBox="0 0 20 20" className="w-4 h-4 text-amber-400" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                  : <svg viewBox="0 0 20 20" className="w-4 h-4 text-slate-600" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>}
              </div>
            </button>
          );
        })}

        {/* Locked future levels */}
        {[
          { emoji: "💡", title: "ILUMINACIÓN", sub: "Aprende a utilizar la luz en tus fotografías.", lvl: 3 },
          { emoji: "🎨", title: "COMPOSICIÓN", sub: "Organiza los elementos dentro del encuadre.", lvl: 4 },
          { emoji: "📱", title: "CONTENIDO PARA REDES", sub: "Convierte tus conocimientos en contenido que vende.", lvl: 5 },
        ].map((item) => (
          <div key={item.lvl} className="flex items-center gap-4 px-4 py-4 rounded-2xl opacity-40"
            style={{ background: "#1e2030", border: "1.5px solid #2d2f45" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "#16171f", border: "1.5px solid #2d2f45" }}>
              {item.emoji}
            </div>
            <div className="flex-1">
              <p className="font-black text-slate-100 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>Nivel {item.lvl} — {item.title}</p>
              <p className="text-slate-400 text-xs">{item.sub}</p>
            </div>
            <svg viewBox="0 0 20 20" className="w-4 h-4 text-slate-600 flex-shrink-0" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LEVEL INTRO ──────────────────────────────────────────────────────────────

function LevelIntroScreen({ level, onStart, onBack }: { level: Level; onStart: () => void; onBack: () => void }) {
  const planTypes = level.id === 1
    ? ["Plano general", "Plano entero", "Plano americano", "Plano medio", "Primer plano", "Plano detalle"]
    : ["Ángulo normal", "Picado", "Contrapicado", "Cenital", "Nadir"];

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-5 pb-6 pt-2">
      <button onClick={onBack} className="flex items-center gap-1 text-slate-500 text-sm mb-4 hover:text-slate-300 transition-colors" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        Menú
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "#f59e0b18", border: "1.5px solid #f59e0b40" }}>
          {level.emoji}
        </div>
        <div>
          <Tag>NIVEL {level.id}</Tag>
          <h2 className="text-2xl font-black text-slate-100 mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{level.title}</h2>
        </div>
      </div>

      {/* Concept card */}
      <div className="px-4 py-4 rounded-2xl mb-4" style={{ background: "#1e2030", border: "1.5px solid #2d2f45" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>
          {level.concept}
        </p>
        <p className="text-slate-300 text-sm leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
          {level.intro}
        </p>
      </div>

      {/* Types */}
      <p className="text-xs font-bold uppercase tracking-widest mb-3 px-1" style={{ color: "#94a3b8", fontFamily: "'Outfit', sans-serif" }}>
        Tipos que aprenderás
      </p>
      <div className="flex flex-col gap-2 mb-6">
        {planTypes.map((name, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: "#16171f", border: "1px solid #2d2f45" }}>
            <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black flex-shrink-0"
              style={{ background: "#f59e0b22", color: "#f59e0b", fontFamily: "'Outfit', sans-serif" }}>
              {i + 1}
            </span>
            <p className="text-slate-300 text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>{name}</p>
          </div>
        ))}
      </div>

      {/* XP info */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl mb-6" style={{ background: "#f59e0b0d", border: "1px solid #f59e0b25" }}>
        <span className="text-slate-300 text-sm" style={{ fontFamily: "'Nunito', sans-serif" }}>Puntuación máxima</span>
        <span className="font-black text-amber-400 text-lg" style={{ fontFamily: "'Outfit', sans-serif" }}>500 XP</span>
      </div>

      <button onClick={onStart} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10", boxShadow: "0 8px 32px rgba(245,158,11,0.3)" }}>
        EMPEZAR RETO
      </button>
    </div>
  );
}

// ─── QUESTION ─────────────────────────────────────────────────────────────────

function QuestionScreen({ level, question, questionIndex, totalQuestions, xp, onAnswer }: {
  level: Level; question: Question; questionIndex: number; totalQuestions: number; xp: number; onAnswer: (correct: boolean, selected: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (selected) return;
    setSelected(id);
    setTimeout(() => onAnswer(id === question.correct, id), 500);
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-5 pb-6 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <Tag>{level.emoji} {level.title}</Tag>
        <div className="flex items-center gap-1.5">
          <span className="text-amber-400 text-sm">⭐</span>
          <span className="font-bold text-slate-200 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{xp} XP</span>
        </div>
      </div>

      <ProgressBar current={questionIndex} total={totalQuestions} />
      <div className="flex justify-between items-center mt-1.5 mb-3">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>{question.challenge}</span>
        <span className="text-slate-500 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>Pregunta {questionIndex + 1} de {totalQuestions}</span>
      </div>

      {/* Image */}
      {question.image && (
        <div className="w-full rounded-2xl overflow-hidden mb-4 relative flex-shrink-0" style={{ height: "160px", background: "#1e2030" }}>
          <img src={question.image} alt="Referencia visual del reto" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,12,16,0.5) 0%, transparent 60%)" }} />
        </div>
      )}

      {/* Question */}
      <p className="text-slate-100 font-semibold text-sm leading-snug mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {question.question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrect = opt.id === question.correct;
          let borderColor = "#2d2f45";
          let bg = "#1e2030";
          let badgeBg = "#2d2f45";
          let badgeText = "#94a3b8";
          let textColor = "#f1f5f9";

          if (selected) {
            if (isSelected && isCorrect) { borderColor = "#10b981"; bg = "#10b98112"; badgeBg = "#10b981"; badgeText = "white"; textColor = "#10b981"; }
            else if (isSelected && !isCorrect) { borderColor = "#ef4444"; bg = "#ef444412"; badgeBg = "#ef4444"; badgeText = "white"; textColor = "#ef4444"; }
            else if (!isSelected && isCorrect) { borderColor = "#10b98150"; }
          }

          return (
            <button key={opt.id} onClick={() => handleSelect(opt.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150 active:scale-[0.98]"
              style={{ background: bg, border: `1.5px solid ${borderColor}`, cursor: selected ? "default" : "pointer" }}>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                style={{ background: badgeBg, color: badgeText, fontFamily: "'Outfit', sans-serif" }}>
                {opt.id}
              </span>
              <span className="font-semibold text-sm" style={{ color: textColor, fontFamily: "'Nunito', sans-serif" }}>{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── FEEDBACK CORRECT ─────────────────────────────────────────────────────────

function FeedbackCorrect({ question, onNext, isLast }: { question: Question; onNext: () => void; isLast: boolean }) {
  return (
    <div className="flex flex-col items-center justify-between flex-1 px-6 pb-8 pt-4">
      <div />
      <div className="flex flex-col items-center text-center gap-5 w-full">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
          style={{ background: "linear-gradient(135deg, #10b98120, #10b98135)", border: "2px solid #10b98150" }}>
          🎉
        </div>
        <div>
          <h2 className="text-3xl font-black" style={{ fontFamily: "'Outfit', sans-serif", color: "#10b981" }}>{question.exclamation}</h2>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {question.feedbackCorrect}
          </p>
        </div>
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl w-full"
          style={{ background: "linear-gradient(135deg, #f59e0b12, #f59e0b22)", border: "1.5px solid #f59e0b40" }}>
          <span className="text-3xl">⭐</span>
          <div>
            <p className="text-amber-400 font-black text-2xl" style={{ fontFamily: "'Outfit', sans-serif" }}>+100 XP</p>
            <p className="text-slate-400 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>¡Sigue así!</p>
          </div>
        </div>
        <Stars filled={3} />
      </div>
      <button onClick={onNext} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
        style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #10b981, #059669)", color: "white", boxShadow: "0 8px 32px rgba(16,185,129,0.25)" }}>
        {isLast ? "VER RESULTADO" : "SIGUIENTE RETO →"}
      </button>
    </div>
  );
}

// ─── FEEDBACK INCORRECT ───────────────────────────────────────────────────────

function FeedbackIncorrect({ question, onRetry }: { question: Question; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between flex-1 px-6 pb-8 pt-4">
      <div />
      <div className="flex flex-col items-center text-center gap-5 w-full">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
          style={{ background: "linear-gradient(135deg, #ef444420, #ef444435)", border: "2px solid #ef444450" }}>
          📸
        </div>
        <div>
          <h2 className="text-3xl font-black" style={{ fontFamily: "'Outfit', sans-serif", color: "#ef4444" }}>CASI...</h2>
          <p className="text-slate-300 text-sm mt-3 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {question.feedbackIncorrect}
          </p>
        </div>
        <div className="w-full px-4 py-4 rounded-2xl text-left" style={{ background: "#1e2030", border: "1.5px solid #2d2f45" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>💡 Tip</p>
          <p className="text-slate-300 text-sm leading-snug" style={{ fontFamily: "'Nunito', sans-serif" }}>
            La respuesta correcta era: <span className="font-bold text-white">{question.options.find(o => o.id === question.correct)?.text}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <button onClick={onRetry} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
          style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "white", boxShadow: "0 8px 32px rgba(99,102,241,0.25)" }}>
          INTENTAR DE NUEVO
        </button>
      </div>
    </div>
  );
}

// ─── LEVEL RESULT ─────────────────────────────────────────────────────────────

function LevelResultScreen({ level, score, total, onNextLevel, onMenu }: {
  level: Level; score: number; total: number; onNextLevel: () => void; onMenu: () => void;
}) {
  const stars = score >= total ? 3 : score >= total * 0.6 ? 2 : 1;
  const xp = score * 100;
  const pct = Math.round((score / total) * 100);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-5 pb-6 pt-3">
      {/* Header */}
      <div className="text-center mb-5">
        <Tag color="#10b981">NIVEL {level.id} COMPLETADO</Tag>
        <h2 className="text-2xl font-black text-slate-100 mt-2" style={{ fontFamily: "'Outfit', sans-serif" }}>¡FELICIDADES!</h2>
        <p className="text-slate-400 text-sm mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>Has completado el Nivel {level.id} — {level.title}</p>
      </div>

      {/* Badge */}
      <div className="flex flex-col items-center mb-5">
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-2"
          style={{ background: "linear-gradient(135deg, #f59e0b20, #f59e0b35)", border: "2px solid #f59e0b50" }}>
          🏆
        </div>
        <p className="font-black text-amber-400 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{level.badgeName}</p>
        <Stars filled={stars} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Correctas", value: `${score}/${total}` },
          { label: "Puntuación", value: `${xp} XP` },
          { label: "Precisión", value: `${pct}%` },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center py-3 rounded-xl" style={{ background: "#1e2030", border: "1px solid #2d2f45" }}>
            <p className="font-black text-lg text-slate-100" style={{ fontFamily: "'Outfit', sans-serif" }}>{stat.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="px-4 py-3 rounded-xl mb-4" style={{ background: "#1e2030", border: "1px solid #2d2f45" }}>
        <div className="flex justify-between mb-2">
          <p className="text-slate-400 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>Nivel completado</p>
          <p className="text-emerald-400 text-xs font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>100%</p>
        </div>
        <ProgressBar current={total} total={total} color="#10b981" />
      </div>

      {/* What learned */}
      <div className="px-4 py-4 rounded-2xl mb-5" style={{ background: "#1e2030", border: "1.5px solid #2d2f45" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>Aprendiste</p>
        {level.questions.slice(0, 3).map((q, i) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <span className="text-emerald-400 mt-0.5 flex-shrink-0 text-xs">✓</span>
            <p className="text-slate-300 text-xs leading-snug" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {q.options.find(o => o.id === q.correct)?.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={onNextLevel} className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
          style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10", boxShadow: "0 8px 32px rgba(245,158,11,0.25)" }}>
          SIGUIENTE NIVEL →
        </button>
        <button onClick={onMenu} className="w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95"
          style={{ fontFamily: "'Outfit', sans-serif", background: "transparent", color: "#94a3b8", border: "1.5px solid #2d2f45" }}>
          VOLVER AL MENÚ
        </button>
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────

function ProfileScreen({ completedLevels, totalXP }: { completedLevels: number[]; totalXP: number }) {
  const totalLevels = 5;
  const progress = Math.round((completedLevels.length / totalLevels) * 100);
  const correctAnswers = completedLevels.length * 5;

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-5 pb-4 pt-3">
      <h2 className="text-xl font-black text-slate-100 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>MI PROGRESO</h2>

      {/* XP Card */}
      <div className="px-5 py-4 rounded-2xl mb-4 flex items-center gap-4"
        style={{ background: "linear-gradient(135deg, #f59e0b18, #f59e0b28)", border: "1.5px solid #f59e0b40" }}>
        <span className="text-4xl">⭐</span>
        <div>
          <p className="font-black text-3xl text-amber-400" style={{ fontFamily: "'Outfit', sans-serif" }}>{totalXP} XP</p>
          <p className="text-slate-400 text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>Nivel actual: {Math.max(1, completedLevels.length)}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Completados", value: completedLevels.length },
          { label: "Correctas", value: correctAnswers },
          { label: "Precisión", value: `${completedLevels.length > 0 ? 100 : 0}%` },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center py-3 rounded-xl" style={{ background: "#1e2030", border: "1px solid #2d2f45" }}>
            <p className="font-black text-lg text-slate-100" style={{ fontFamily: "'Outfit', sans-serif" }}>{s.value}</p>
            <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="px-4 py-3 rounded-xl mb-4" style={{ background: "#1e2030", border: "1px solid #2d2f45" }}>
        <div className="flex justify-between mb-2">
          <p className="text-slate-300 text-xs font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>Progreso total</p>
          <p className="text-amber-400 text-xs font-bold">{progress}%</p>
        </div>
        <ProgressBar current={completedLevels.length} total={totalLevels} />
      </div>

      {/* Badges */}
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#94a3b8", fontFamily: "'Outfit', sans-serif" }}>Insignias</p>
      <div className="grid grid-cols-3 gap-2">
        {BADGES.map((badge, i) => {
          const earned = i < completedLevels.length;
          return (
            <div key={i} className="flex flex-col items-center py-3 px-2 rounded-2xl text-center"
              style={{ background: earned ? "#1e2030" : "#16171f", border: `1.5px solid ${earned ? "#f59e0b40" : "#2d2f45"}`, opacity: earned ? 1 : 0.45 }}>
              <span className="text-3xl mb-1">{earned ? badge.emoji : "🔒"}</span>
              <p className="text-slate-200 text-xs font-bold leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>{badge.name}</p>
              <p className="text-slate-500 text-xs mt-0.5 leading-tight">{badge.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CONNECT ──────────────────────────────────────────────────────────────────

function ConnectScreen() {
  const [tab, setTab] = useState<"emprendedor" | "creador">("emprendedor");
  const [sector, setSector] = useState<string | null>(null);
  const sectors = ["☕ Comida", "👗 Ropa", "💄 Belleza", "💻 Tecnología", "🧶 Artesanía", "🛠️ Servicios"];

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-5 pb-4 pt-3">
      <h2 className="text-xl font-black text-slate-100 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>CONECTA</h2>
      <p className="text-slate-400 text-sm mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>¿Necesitas contenido profesional para tu negocio?</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 p-1 rounded-xl" style={{ background: "#1e2030" }}>
        {(["emprendedor", "creador"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className="flex-1 py-2 rounded-lg font-bold text-sm transition-all"
            style={{ fontFamily: "'Outfit', sans-serif", background: tab === t ? "#f59e0b" : "transparent", color: tab === t ? "#0b0c10" : "#94a3b8" }}>
            {t === "emprendedor" ? "Soy emprendedor" : "Soy creador"}
          </button>
        ))}
      </div>

      {tab === "emprendedor" ? (
        <>
          <div className="px-4 py-4 rounded-2xl mb-4" style={{ background: "#1e2030", border: "1.5px solid #2d2f45" }}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Conecta con jóvenes creadores audiovisuales y convierte tus ideas en contenido que <span className="font-bold text-white">vende</span>.
            </p>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6366f1", fontFamily: "'Outfit', sans-serif" }}>¿Qué vendes?</p>
            <div className="grid grid-cols-3 gap-2">
              {sectors.map((s) => (
                <button key={s} onClick={() => setSector(s === sector ? null : s)}
                  className="py-2 px-2 rounded-xl text-xs font-bold text-center transition-all"
                  style={{ fontFamily: "'Outfit', sans-serif", background: s === sector ? "#f59e0b20" : "#16171f", border: `1.5px solid ${s === sector ? "#f59e0b60" : "#2d2f45"}`, color: s === sector ? "#f59e0b" : "#94a3b8" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          {sector && (
            <div className="px-4 py-3 rounded-xl mb-4" style={{ background: "#10b98112", border: "1.5px solid #10b98140" }}>
              <p className="text-emerald-400 text-sm font-semibold" style={{ fontFamily: "'Nunito', sans-serif" }}>
                ✓ Recomendación para <span className="font-bold">{sector}</span>: usa plano detalle con iluminación lateral y ángulo normal para resaltar tu producto.
              </p>
            </div>
          )}
          <button className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
            style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #f59e0b, #f97316)", color: "#0b0c10" }}>
            SOLICITAR CONTENIDO
          </button>
        </>
      ) : (
        <>
          <div className="px-4 py-4 rounded-2xl mb-4" style={{ background: "#1e2030", border: "1.5px solid #2d2f45" }}>
            <p className="text-slate-300 text-sm leading-relaxed mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Pon tus conocimientos en práctica y <span className="font-bold text-white">crea contenido para emprendimientos reales</span>. Construye tu portafolio mientras ayudas a otros.
            </p>
            {[
              { emoji: "💼", title: "Proyectos reales", sub: "Trabaja con emprendedores que necesitan contenido" },
              { emoji: "📈", title: "Construye tu portafolio", sub: "Cada proyecto es una nueva pieza para mostrar" },
              { emoji: "💰", title: "Genera ingresos", sub: "Cobra por tu talento y conocimiento" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-3">
                <span className="text-lg flex-shrink-0 mt-0.5">{item.emoji}</span>
                <div>
                  <p className="font-bold text-slate-100 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>{item.title}</p>
                  <p className="text-slate-400 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all active:scale-95"
            style={{ fontFamily: "'Outfit', sans-serif", background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "white", boxShadow: "0 8px 32px rgba(99,102,241,0.25)" }}>
            QUIERO SER CREADOR
          </button>
        </>
      )}
    </div>
  );
}

// ─── APP (State machine) ──────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeLevel, setActiveLevel] = useState<Level>(LEVELS[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [practiceXP, setPracticeXP] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const navScreens: Screen[] = ["menu", "profile", "connect"];
  const showNav = navScreens.includes(screen) || screen === "level-intro";

  // Onboarding flow (first time only)
  const handleStart = () => setScreen(isFirstTime ? "welcome" : "menu");

  // Onboarding steps
  const handleWelcomeNext = () => setScreen("how-it-works");
  const handleHowItWorksNext = () => setScreen("first-challenge");
  const handleFirstChallengeNext = () => setScreen("lesson1");
  const handleLesson1Next = () => setScreen("lesson2");
  const handleLesson2Next = () => setScreen("lesson3");
  const handleLesson3Next = () => setScreen("lesson-depth");

  const handleDepthNext = () => setScreen("lesson-lines");
  const handleLinesNext = () => setScreen("lesson-center");
  const handleCenterNext = () => setScreen("lesson-vertical");
  const handleVerticalNext = () => setScreen("practice");

  const handlePracticeAnswer = (correct: boolean) => {
    if (correct) {
      setPracticeXP(20);
      setTotalXP((x) => x + 20);
      setScreen("practice-correct");
    } else {
      setScreen("practice-incorrect");
    }
  };
  const handlePracticeCorrectNext = () => setScreen("ready");
  const handlePracticeRetry = () => setScreen("practice");

  const handleReadyStart = () => {
    setIsFirstTime(false);
    setActiveLevel(LEVELS[0]);
    setQuestionIndex(0);
    setCorrectCount(0);
    setScreen("question");
  };

  // Level selection from menu
  const handleSelectLevel = (level: Level) => {
    setActiveLevel(level);
    setQuestionIndex(0);
    setCorrectCount(0);
    setScreen("level-intro");
  };
  const handleStartQuestions = () => setScreen("question");

  // Main game
  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setTotalXP((x) => x + 100);
      setCorrectCount((c) => c + 1);
      setScreen("feedback-correct");
    } else {
      setScreen("feedback-incorrect");
    }
  };

  const handleNext = () => {
    const isLast = questionIndex >= activeLevel.questions.length - 1;
    if (isLast) {
      if (!completedLevels.includes(activeLevel.id)) {
        setCompletedLevels((l) => [...l, activeLevel.id]);
      }
      setScreen("level-result");
    } else {
      setQuestionIndex((i) => i + 1);
      setScreen("question");
    }
  };

  const handleRetry = () => setScreen("question");

  const handleNextLevel = () => {
    const nextIndex = LEVELS.findIndex((l) => l.id === activeLevel.id) + 1;
    const nextLevel = nextIndex < LEVELS.length ? LEVELS[nextIndex] : null;
    if (nextLevel) setActiveLevel(nextLevel);
    setScreen("unlock-next");
  };

  const handleUnlockContinue = () => setScreen("menu");

  const handleNav = (s: Screen) => setScreen(s);

  const currentQuestion = activeLevel.questions[questionIndex];
  const isLastQuestion = questionIndex >= activeLevel.questions.length - 1;
  const nextLevelData = LEVELS.find((l) => l.id === activeLevel.id + 1) ?? null;

  return (
    <PhoneFrame>
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* ── Onboarding ── */}
        {screen === "home" && <HomeScreen onStart={handleStart} />}
        {screen === "welcome" && <WelcomeScreen onNext={handleWelcomeNext} />}
        {screen === "how-it-works" && <HowItWorksScreen onNext={handleHowItWorksNext} />}
        {screen === "first-challenge" && <FirstChallengeScreen onNext={handleFirstChallengeNext} />}
        {screen === "lesson1" && <Lesson1Screen onNext={handleLesson1Next} />}
        {screen === "lesson2" && <Lesson2Screen onNext={handleLesson2Next} />}
        {screen === "lesson3" && <Lesson3Screen onNext={handleLesson3Next} />}
        {screen === "lesson-depth" && <LessonDepthScreen onNext={handleDepthNext} />}
        {screen === "lesson-lines" && <LessonLinesScreen onNext={handleLinesNext} />}
        {screen === "lesson-center" && <LessonCenterScreen onNext={handleCenterNext} />}
        {screen === "lesson-vertical" && <LessonVerticalScreen onNext={handleVerticalNext} />}
        {screen === "practice" && <PracticeScreen onAnswer={handlePracticeAnswer} />}
        {screen === "practice-correct" && <PracticeCorrectScreen onNext={handlePracticeCorrectNext} />}
        {screen === "practice-incorrect" && <PracticeIncorrectScreen onRetry={handlePracticeRetry} />}
        {screen === "ready" && <ReadyScreen onStart={handleReadyStart} practiceXP={practiceXP} />}

        {/* ── Main game ── */}
        {screen === "menu" && <MenuScreen completedLevels={completedLevels} totalXP={totalXP} onSelectLevel={handleSelectLevel} />}
        {screen === "level-intro" && <LevelIntroScreen level={activeLevel} onStart={handleStartQuestions} onBack={() => setScreen("menu")} />}
        {screen === "question" && (
          <QuestionScreen level={activeLevel} question={currentQuestion} questionIndex={questionIndex}
            totalQuestions={activeLevel.questions.length} xp={totalXP} onAnswer={handleAnswer} />
        )}
        {screen === "feedback-correct" && (
          <FeedbackCorrect question={currentQuestion} onNext={handleNext} isLast={isLastQuestion} />
        )}
        {screen === "feedback-incorrect" && (
          <FeedbackIncorrect question={currentQuestion} onRetry={handleRetry} />
        )}
        {screen === "level-result" && (
          <LevelResultScreen level={activeLevel} score={correctCount} total={activeLevel.questions.length}
            onNextLevel={handleNextLevel} onMenu={() => setScreen("menu")} />
        )}
        {screen === "unlock-next" && (
          <UnlockNextScreen unlockedLevel={nextLevelData} onContinue={handleUnlockContinue} />
        )}

        {/* ── Profile & Connect ── */}
        {screen === "profile" && <ProfileScreen completedLevels={completedLevels} totalXP={totalXP} />}
        {screen === "connect" && <ConnectScreen />}

        {/* Bottom nav */}
        {showNav && <BottomNav active={screen === "level-intro" ? "menu" : screen} onNav={handleNav} />}
      </div>
    </PhoneFrame>
  );
}
