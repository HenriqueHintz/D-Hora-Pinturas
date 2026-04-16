import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Especialidades', href: '#especialidades' },
    { name: 'Localização', href: '#localizacao' },
    { name: 'Contato', href: '#contato' },
  ];

  // Scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10) * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-100/85 backdrop-blur-xl border-b border-neutral-300/30 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#inicio" className="flex items-center gap-2.5 sm:gap-3 group">
                <img
                  src="/assets/logo 01.png"
                  alt="D'Hora Pinturas & Limpezas"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shadow-sm ring-1 ring-neutral-300/50 transition-all duration-500 group-hover:ring-primary-500/30 group-hover:shadow-md"
                  width={48}
                  height={48}
                  loading="eager"
                />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-base sm:text-lg text-neutral-900 leading-tight tracking-tight">D'Hora</span>
                  <span className="text-[0.6rem] sm:text-[0.65rem] font-medium text-neutral-400 tracking-[0.16em] sm:tracking-[0.18em]">PINTURAS & LIMPEZAS</span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-neutral-500 hover:text-neutral-900 text-[0.82rem] font-medium tracking-[0.04em] transition-colors duration-300 after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-neutral-900 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <a
                href="https://wa.me/5549998326802"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-[0.45rem] border border-neutral-900 text-[0.78rem] font-medium tracking-[0.04em] rounded-full text-neutral-900 bg-transparent hover:bg-neutral-900 hover:text-white transition-all duration-400 ease-out"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                Fale Conosco
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-[60] inline-flex items-center justify-center w-10 h-10 rounded-lg text-neutral-500 hover:text-neutral-900 transition-all duration-300 focus:outline-none"
                aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ease-out ${
          isMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-neutral-100/98 backdrop-blur-2xl" />

        {/* Close Button (Voltar) */}
        <div className="absolute top-0 left-0 right-0 px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-end z-20">
          <button
            onClick={closeMenu}
            className={`inline-flex items-center justify-center pl-4 pr-3 py-2 rounded-full text-neutral-600 hover:text-neutral-900 bg-neutral-200/50 hover:bg-neutral-300/60 transition-all duration-300 focus:outline-none ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: isMenuOpen ? '150ms' : '0ms' }}
            aria-label="Voltar e fechar menu"
          >
            <span className="text-[0.75rem] font-bold tracking-[0.06em] uppercase mr-2 mt-[1px]">Voltar</span>
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          <nav className="flex flex-col items-center gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`text-2xl font-serif font-bold text-neutral-800 hover:text-primary-500 tracking-tight py-3 px-6 rounded-xl transition-all duration-300 hover:bg-neutral-200/40 ${
                  isMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${150 + index * 80}ms` : '0ms',
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div
            className={`w-12 h-px bg-neutral-300 my-8 transition-all duration-500 ${
              isMenuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '500ms' : '0ms' }}
          />

          {/* CTA */}
          <a
            href="https://wa.me/5549998326802"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className={`inline-flex items-center justify-center px-6 py-3 border border-neutral-900 text-[0.88rem] font-medium tracking-[0.04em] rounded-full text-neutral-900 bg-transparent hover:bg-neutral-900 hover:text-white transition-all duration-400 ease-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '580ms' : '0ms' }}
          >
            <Phone className="w-4 h-4 mr-2" />
            Fale Conosco
          </a>

          {/* Subtle brand mark at bottom */}
          <div
            className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-500 ${
              isMenuOpen ? 'opacity-40' : 'opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '650ms' : '0ms' }}
          >
            <span className="text-[0.65rem] font-medium text-neutral-400 tracking-[0.2em]">
              D'HORA PINTURAS & LIMPEZAS
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
