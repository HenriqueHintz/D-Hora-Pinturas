import { useState, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import StyleSelector, { type HeroStyle } from './StyleSelector';

const PAINT_DURATION = 1200;

const accentColors: Record<HeroStyle, string> = {
  default: 'rgba(255, 140, 0, 0.1)',
  granizo: 'rgba(100, 180, 220, 0.12)',
  quartzo: 'rgba(180, 100, 200, 0.12)',
  ceramica: 'rgba(200, 120, 60, 0.12)',
};



export default function Hero() {
  const [heroStyle, setHeroStyle] = useState<HeroStyle>('default');
  const [isPainting, setIsPainting] = useState(false);
  const [paintKey, setPaintKey] = useState(0);
  const isFirstLoad = useRef(true);
  const paintTimeout = useRef<number>();

  const handleStyleChange = useCallback((newStyle: HeroStyle) => {
    // First load (from localStorage) — skip animation
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      setHeroStyle(newStyle);
      return;
    }

    if (newStyle === heroStyle) return;

    // Clear any pending timeout from rapid clicks
    if (paintTimeout.current) clearTimeout(paintTimeout.current);

    // Set new style immediately (CSS transitions handle badge/text/CTA)
    setHeroStyle(newStyle);

    // Trigger paint animation
    setIsPainting(true);
    setPaintKey(prev => prev + 1);

    paintTimeout.current = window.setTimeout(() => {
      setIsPainting(false);
    }, PAINT_DURATION);
  }, [heroStyle]);

  return (
    <section
      id="inicio"
      className="hero-section"
      data-style={heroStyle}
    >
      {/* Background Layers — opacity-controlled via data-style */}
      <div className="hero-bg hero-bg--default" aria-hidden="true" />
      <div className="hero-bg hero-bg--granizo" aria-hidden="true" />
      <div className="hero-bg hero-bg--quartzo" aria-hidden="true" />
      <div className="hero-bg hero-bg--ceramica" aria-hidden="true" />

      {/* Paint Wipe Overlay — circular reveal synced with brush */}
      {isPainting && (
        <div
          key={paintKey}
          className="hero-paint-wipe"
          style={{ background: accentColors[heroStyle] }}
          aria-hidden="true"
        />
      )}

      {/* Subtle Texture Overlay */}
      <div className="hero-texture" aria-hidden="true" />

      {/* Decorative Accent Glow */}
      <div className="hero-glow" aria-hidden="true" />

      {/* Style Selector */}
      <StyleSelector onStyleChange={handleStyleChange} />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-3xl">
          {/* Mobile Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:hidden mb-4"
          >
            <span className="hero-badge" style={{ fontSize: '0.65rem' }}>
              PINTURAS, PISOS, LIMPEZAS & REVESTIMENTOS
            </span>
          </motion.div>

          {/* Desktop Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block mb-4"
          >
            <span className="hero-badge">
              PINTURAS, PISOS, LIMPEZAS & REVESTIMENTOS
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Precisão Técnica para Projetos de <span className="underline decoration-2 underline-offset-4 hero-accent-text">Alto<span className="hidden md:inline"> </span><br className="md:hidden" />Padrão</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block text-lg md:text-xl text-neutral-200 mb-5 max-w-2xl leading-relaxed"
          >
            Pinturas e Pisos aplicados com rigor técnico em concessionárias, empresas e projetos arquitetônicos.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base md:text-lg text-white/70 italic border-l-2 border-white/20 pl-4 mb-10 max-w-xl"
          >
            Elevando a qualidade do ambiente, a percepção visual e a identidade de cada espaço.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
          >
            <a
              href="#contato"
              className="hero-cta-primary"
            >
              Solicitar Proposta Técnica
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="https://wa.me/5549998326802"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-secondary"
            >
              <MessageCircle className="mr-2 w-5 h-5 text-green-500" />
              Falar no WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


