import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-primary-600 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary-500 blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-secondary-500 blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight tracking-tight">
            Pronto para Transformar a Identidade Visual e a Percepção do Seu Ambiente?
          </h2>
          <p className="text-xl text-primary-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Valorize seu patrimônio hoje mesmo com a equipe mais preparada de Tubarão e litoral.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5549998326802"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold tracking-wide rounded-lg text-primary-600 bg-white hover:bg-neutral-100 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Falar com Especialista Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
