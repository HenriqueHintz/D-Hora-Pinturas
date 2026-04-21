import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, PaintRoller, Sparkles, Maximize2, VolumeX, Volume2, Play, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────── */
const ESPECIALIDADES = [
  {
    id: '1',
    title: 'Pinturas Técnicas',
    subtitle: 'Acrílica, Látex, Airless & Epóxi',
    description:
      'Aplicações com padrão arquitetônico para projetos que exigem precisão e estética superior — de concessionárias e varejo a grandes áreas industriais.',
    icon: PaintRoller,
    video: '/assets/video 01.mp4',
    items: [
      'Pisos epóxi para concessionárias, varejo e grandes áreas',
      'Pinturas Airless de alto desempenho',
      'Texturas e acabamentos como cimento queimado e grafiato',
      'Uniformidade de superfície em qualquer escala',
    ],
  },
  {
    id: '2',
    title: 'Limpeza Pós-Obra',
    subtitle: 'Entrega no padrão de alto padrão',
    description:
      'Remoção técnica de resíduos de construção sem comprometer superfícies nobres — pronto para entrega ao cliente final.',
    icon: Sparkles,
    video: '/assets/video 02.mp4',
    items: [
      'Remoção técnica de resíduos sem danificar superfícies',
      'Limpeza detalhada de pisos, revestimentos e vidros',
      'Acabamento final pronto para uso ou entrega',
      'Cuidado especial com materiais sensíveis',
    ],
  },
  {
    id: '3',
    title: 'Tratamento de Superfícies',
    subtitle: 'Impermeabilização & Proteção',
    description:
      'Soluções de longa duração para preservar a estética e o desempenho dos materiais, combatendo infiltrações e patologias.',
    icon: Droplets,
    video: '/assets/video 03.mp4',
    items: [
      'Impermeabilização de áreas expostas e estruturais',
      'Tratamento de umidade, infiltrações e patologias',
      'Proteção com resinas e seladores de alto desempenho',
      'Higienização técnica de fachadas e áreas externas',
    ],
  },
];

/* ─── Video Preview Panel ───────────────────────────────────── */
function VideoPreview({ service, onNext, onPrev }: { service: (typeof ESPECIALIDADES)[0], onNext: () => void, onPrev: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  /* Whenever the active service changes → reset and pause */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
  }, [service.id]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const expandVideo = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.controls = true;
    video.muted = false;
    setIsMuted(false);
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
    const onExit = () => {
      if (!document.fullscreenElement) {
        video.controls = false;
        document.removeEventListener('fullscreenchange', onExit);
      }
    };
    document.addEventListener('fullscreenchange', onExit);
    if (video.requestFullscreen) video.requestFullscreen();
    else if ((video as any).webkitRequestFullscreen) (video as any).webkitRequestFullscreen();
  }, []);

  return (
    <div className="esp-preview__shell" onClick={togglePlay} style={{ cursor: 'pointer' }}>
      {/* Navigation Arrows */}
      <div className="esp-preview__nav-arrows">
        <button className="esp-preview__nav-btn" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Vídeo anterior">
          <ChevronLeft size={24} />
        </button>
        <button className="esp-preview__nav-btn" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Próximo vídeo">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Crossfade between videos */}
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="esp-preview__inner"
        >
          <video
            ref={videoRef}
            src={service.video}
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            className="esp-preview__video"
            aria-label={`Vídeo demonstrativo: ${service.title}`}
          />

          {/* Play Overlay */}
          <div className={`esp-preview__play-overlay ${isPlaying ? 'esp-preview__play-overlay--hidden' : ''}`}>
            <div className="esp-preview__play-btn">
              <Play size={32} className="esp-preview__play-icon" color="#7A3B10" fill="#7A3B10" />
            </div>
          </div>

          {/* Gradient veil */}
          <div className="esp-preview__gradient" />

          {/* Top-left: service label */}
          <div className="esp-preview__label">
            <service.icon className="esp-preview__label-icon" />
            <span>{service.title}</span>
          </div>

          {/* Bottom: branding + controls */}
          <div className="esp-preview__controls">
            <div className="esp-preview__branding">
              <img src="/assets/logo 01.png" alt="D'Hora" className="esp-preview__branding-logo" />
              <span className="esp-preview__branding-name">D'Hora Pinturas</span>
            </div>
            <div className="esp-preview__btns">
              <button
                className="esp-preview__btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Ativar áudio' : 'Desativar áudio'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button className="esp-preview__btn" onClick={expandVideo} aria-label="Expandir vídeo">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────── */
export default function DetailedServices() {
  const [activeId, setActiveId] = useState(ESPECIALIDADES[0].id);
  const activeService = ESPECIALIDADES.find((s) => s.id === activeId)!;
  const currentIndex = ESPECIALIDADES.findIndex((s) => s.id === activeId);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % ESPECIALIDADES.length;
    setActiveId(ESPECIALIDADES[nextIndex].id);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + ESPECIALIDADES.length) % ESPECIALIDADES.length;
    setActiveId(ESPECIALIDADES[prevIndex].id);
  }, [currentIndex]);

  const handleItemClick = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    setActiveId(id);
    
    // Smoothly ensure the item is in view, useful on mobile when expanding
    if (window.innerWidth < 1024) {
      const target = e.currentTarget as HTMLElement;
      setTimeout(() => {
        const rect = target.getBoundingClientRect();
        if (rect.bottom > window.innerHeight || rect.top < 0) {
          target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 350); // delay to let Framer Motion expand height first
    }
  };

  return (
    <section id="especialidades" className="esp-section">
      <div className="esp-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="specialties-header"
        >
          <span className="specialties-label">Especialidades</span>
          <h3 className="specialties-heading">Detalhes dos Nossos Serviços</h3>
          <p className="specialties-subheading">
            Conheça a fundo o que podemos fazer pelo seu imóvel, sempre com
            técnicas modernas e produtos de alta performance.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="esp-layout">

          {/* ── LEFT: service list ── */}
          <div className="esp-list" role="list">
            {ESPECIALIDADES.map((service, i) => {
              const isActive = service.id === activeId;
              return (
                <motion.div
                  key={service.id}
                  role="listitem"
                  className={`esp-item ${isActive ? 'esp-item--active' : ''}`}
                  onClick={(e) => handleItemClick(service.id, e)}
                  onMouseEnter={() => window.innerWidth >= 1024 && setActiveId(service.id)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  {/* Left edge bar */}
                  <div className={`esp-item__bar ${isActive ? 'esp-item__bar--active' : ''}`} />

                  {/* Number */}
                  <span className="esp-item__num">{String(i + 1).padStart(2, '0')}</span>

                  {/* Body */}
                  <div className="esp-item__body">

                    {/* Title row */}
                    <div className="esp-item__top">
                      <div className="esp-item__icon-wrap">
                        <service.icon className="esp-item__icon" />
                      </div>
                      <div className="flex-1">
                        <p className="esp-item__title">{service.title}</p>
                        <p className="esp-item__subtitle">{service.subtitle}</p>
                      </div>
                    </div>

                    {/* Expanded detail — animated height */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="esp-item__detail">
                            <p className="esp-item__description">{service.description}</p>
                            <ul className="esp-item__list">
                              {service.items.map((item, j) => (
                                <li key={j} className="esp-item__list-item">
                                  <span className="esp-item__bullet" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            <a
                              href={`https://wa.me/5549998326802?text=Olá! Gostaria de saber mais sobre o serviço de ${service.title}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="specialty-card__cta"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>Solicitar orçamento</span>
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* No inline mobile video - we rely on the main video column below */}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── RIGHT: sticky video preview ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="esp-preview-col"
          >
            <VideoPreview service={activeService} onNext={handleNext} onPrev={handlePrev} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
