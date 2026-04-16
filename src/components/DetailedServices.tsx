import { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Droplets, PaintRoller, Sparkles, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const detailedServices = [
  {
    id: 'pintura',
    title: 'Pinturas Técnicas & Pisos Epóxi',
    description: 'Aplicações com padrão arquitetônico para projetos que exigem precisão e estética.',
    icon: PaintRoller,
    video: '/assets/video 01.mp4',
    items: [
      'Pisos epóxi para concessionárias, varejo e grandes áreas',
      'Pinturas técnicas (acrílica, látex e Airless) para alto desempenho',
      'Texturas e acabamentos como cimento queimado e grafiato',
      'Tratamento de superfícies para acabamento uniforme e durável'
    ]
  },
  {
    id: 'limpeza',
    title: 'Limpeza Técnica Pós-Obra',
    description: 'Entrega do espaço no nível de apresentação exigido por projetos de alto padrão.',
    icon: Sparkles,
    video: '/assets/video 02.mp4',
    items: [
      'Remoção técnica de resíduos de obra sem danificar superfícies',
      'Limpeza detalhada de pisos, revestimentos e vidros',
      'Acabamento final pronto para uso ou entrega ao cliente',
      'Cuidado com materiais nobres e superfícies sensíveis'
    ]
  },
  {
    id: 'protecao',
    title: 'Proteção & Tratamento de Superfícies',
    description: 'Soluções para preservar estética, durabilidade e desempenho dos materiais.',
    icon: Droplets,
    video: '/assets/video 03.mp4',
    items: [
      'Impermeabilização de áreas expostas e estruturais',
      'Tratamento de umidade, infiltrações e patologias',
      'Proteção de superfícies com resinas e seladores',
      'Higienização técnica de fachadas e áreas externas'
    ]
  }
];

function VideoCard({ service, index }: { service: typeof detailedServices[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const expandVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Enable native controls and unmute for fullscreen experience
    video.controls = true;
    video.muted = false;
    setIsMuted(false);
    
    if (!video.paused) {
      // already playing
    } else {
      video.play();
      setIsPlaying(true);
    }

    const exitHandler = () => {
      if (!document.fullscreenElement) {
        video.controls = false;
        document.removeEventListener('fullscreenchange', exitHandler);
      }
    };
    document.addEventListener('fullscreenchange', exitHandler);

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    }
  }, []);

  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`specialty-card ${isReversed ? 'specialty-card--reversed' : ''}`}
    >
      {/* Video Side */}
      <div className="specialty-card__video-wrapper">
        <div className="specialty-card__video-container" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={service.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="specialty-card__video"
            aria-label={`Vídeo demonstrativo: ${service.title}`}
          />

          {/* Play / Pause Overlay */}
          <div className={`specialty-card__play-overlay ${isPlaying ? 'specialty-card__play-overlay--hidden' : ''}`}>
            <div className="specialty-card__play-btn">
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="specialty-card__play-icon" />}
            </div>
          </div>

          {/* Mute Toggle */}
          <button
            className="specialty-card__mute-btn"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            aria-label={isMuted ? 'Ativar áudio' : 'Desativar áudio'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Expand / Fullscreen Button */}
          <button
            className="specialty-card__expand-btn"
            onClick={(e) => {
              e.stopPropagation();
              expandVideo();
            }}
            aria-label="Expandir vídeo"
          >
            <Maximize2 size={18} />
          </button>

          {/* Logo Branding Overlay */}
          <div className="specialty-card__branding">
            <img src="/assets/logo 01.png" alt="D'Hora" className="specialty-card__branding-logo" />
            <span className="specialty-card__branding-name hidden sm:block">D'Hora Pinturas & Limpezas</span>
          </div>

          {/* Video Gradient Overlay */}
          <div className="specialty-card__video-gradient" />
        </div>
      </div>

      {/* Text Side */}
      <div className="specialty-card__content">
        <div className="specialty-card__header">
          <div className="specialty-card__icon-wrapper">
            <service.icon className="specialty-card__icon" />
          </div>
          <h4 className="specialty-card__title">{service.title}</h4>
        </div>

        {service.description && (
          <p className="text-[0.88rem] text-neutral-400 leading-relaxed -mt-1 mb-3 italic">{service.description}</p>
        )}

        <ul className="specialty-card__list">
          {service.items.map((item, i) => (
            <li key={i} className="specialty-card__list-item">
              <span className="specialty-card__bullet" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/5549998326802?text=Olá! Gostaria de saber mais sobre o serviço de ${service.title}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="specialty-card__cta"
        >
          <span>Solicitar orçamento</span>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function DetailedServices() {
  return (
    <section id="especialidades" className="specialties-section">
      <div className="specialties-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="specialties-header"
        >
          <span className="specialties-label">Especialidades</span>
          <h3 className="specialties-heading">
            Detalhes dos Nossos Serviços
          </h3>
          <p className="specialties-subheading">
            Conheça a fundo o que podemos fazer pelo seu imóvel, sempre com técnicas modernas e produtos de alta performance.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="specialties-grid">
          {detailedServices.map((service, index) => (
            <VideoCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
