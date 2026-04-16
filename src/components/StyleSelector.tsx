import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Paintbrush, Check } from 'lucide-react';

export type HeroStyle = 'default' | 'granizo' | 'quartzo' | 'ceramica';

interface StyleOption {
  id: HeroStyle;
  label: string;
  subtitle: string;
  preview: string; // CSS gradient for the swatch
}

const styleOptions: StyleOption[] = [
  {
    id: 'default',
    label: 'Original',
    subtitle: 'Tom clássico',
    preview: 'linear-gradient(135deg, #2C1E16, #3E2A1F)',
  },
  {
    id: 'granizo',
    label: 'Granizo',
    subtitle: 'Frio & cristalino',
    preview: 'linear-gradient(135deg, #1a2a3a, #2d4a6a, #4a7a9a)',
  },
  {
    id: 'quartzo',
    label: 'Quartzo',
    subtitle: 'Elegante & luminoso',
    preview: 'linear-gradient(135deg, #2a1a2e, #4a2a5a, #6a3a7a)',
  },
  {
    id: 'ceramica',
    label: 'Cerâmica',
    subtitle: 'Quente & artesanal',
    preview: 'linear-gradient(135deg, #3a2010, #5a3520, #7a4a2a)',
  },
];

const STORAGE_KEY = 'dhora-hero-style';

interface StyleSelectorProps {
  onStyleChange: (style: HeroStyle) => void;
}

export default function StyleSelector({ onStyleChange }: StyleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStyle, setActiveStyle] = useState<HeroStyle>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ['default', 'granizo', 'quartzo', 'ceramica'].includes(saved)) {
        return saved as HeroStyle;
      }
    } catch {}
    return 'default';
  });
  const menuRef = useRef<HTMLDivElement>(null);

  // Sync initial style on mount
  useEffect(() => {
    onStyleChange(activeStyle);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const selectStyle = useCallback((style: HeroStyle) => {
    setActiveStyle(style);
    onStyleChange(style);
    try {
      localStorage.setItem(STORAGE_KEY, style);
    } catch {}
    // Keep menu open briefly so user sees the check mark
    setTimeout(() => setIsOpen(false), 400);
  }, [onStyleChange]);

  return (
    <div ref={menuRef} className="style-selector">
      {/* Trigger Button */}
      <motion.button
        className="style-selector__trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Escolher estilo de pintura"
        aria-expanded={isOpen}
      >
        <Paintbrush size={20} />
        <span className="style-selector__trigger-label">Estilos</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="style-selector__menu"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="style-selector__menu-header">
              <Paintbrush size={14} />
              <span>Estilo de Pintura</span>
            </div>

            <div className="style-selector__options">
              {styleOptions.map((option, i) => {
                const isActive = activeStyle === option.id;
                return (
                  <motion.button
                    key={option.id}
                    className={`style-selector__option ${isActive ? 'style-selector__option--active' : ''}`}
                    onClick={() => selectStyle(option.id)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="style-selector__swatch"
                      style={{ background: option.preview }}
                    />
                    <div className="style-selector__option-text">
                      <span className="style-selector__option-label">{option.label}</span>
                      <span className="style-selector__option-subtitle">{option.subtitle}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        className="style-selector__check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <Check size={14} />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
