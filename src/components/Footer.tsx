import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/assets/logo 01.png"
                alt="D'Hora Pinturas & Limpezas"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-500/30"
                width={48}
                height={48}
                loading="lazy"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-white leading-tight">D'Hora</span>
                <span className="text-xs font-medium text-neutral-500 tracking-wider">PINTURAS & LIMPEZAS</span>
              </div>
            </div>
            <p className="text-sm mb-6">
              Resolvemos tudo em um só lugar com qualidade e confiança. Especialistas em pintura e limpeza pós-obra em Tubarão e litoral SC.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 font-serif">Links Rápidos</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#inicio" className="hover:text-secondary-500 transition-colors">Início</a></li>
              <li><a href="#especialidades" className="hover:text-secondary-500 transition-colors">Especialidades</a></li>
              <li><a href="#localizacao" className="hover:text-secondary-500 transition-colors">Localização</a></li>
              <li><a href="#contato" className="hover:text-secondary-500 transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 font-serif">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li>Tubarão - SC</li>
              <li>Atendimento em todo o litoral</li>
              <li>sul catarinense</li>
              <li className="pt-2">
                <a href="tel:+5549998326802" className="text-white hover:text-secondary-500 transition-colors">
                  (49) 99832-6802
                </a>
              </li>
              <li>
                <a href="mailto:kirchnerscont@hotmail.com" className="hover:text-secondary-500 transition-colors">
                  kirchnerscont@hotmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-center md:text-left space-y-1">
            <p>&copy; {new Date().getFullYear()} D'Hora Pinturas & Limpezas. Todos os direitos reservados.</p>
            <p className="text-neutral-500">CNPJ: 42.096.334/0001-50</p>
          </div>

          {/* Developer Signature */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm bg-neutral-800/40 px-4 py-2.5 rounded-full border border-neutral-700/50 hover:bg-neutral-800 transition-colors">
            <span className="text-neutral-500 hidden sm:inline">Desenvolvedor |</span>
            <span className="text-neutral-300">Created by</span>
            <a href="https://github.com/HenriqueHintz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group ml-1">
              <img 
                src="https://github.com/HenriqueHintz.png" 
                alt="Henrique Hintz" 
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-neutral-600 group-hover:border-secondary-500 transition-colors"
                loading="lazy"
              />
              <span className="text-white group-hover:text-secondary-400 transition-colors font-medium">@henriquehtz</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
