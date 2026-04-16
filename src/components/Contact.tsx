import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // --- Input Masks ---
  const maskPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : '';
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const maskName = (value: string): string => {
    return value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setFormData(prev => ({ ...prev, phone: maskPhone(value) }));
    } else if (name === 'name') {
      setFormData(prev => ({ ...prev, name: maskName(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Construct WhatsApp message
      const text = `Olá! Meu nome é ${formData.name}. Gostaria de um orçamento para ${formData.service}. \n\nMensagem: ${formData.message}`;
      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/5549998326802?text=${encodedText}`, '_blank');
      
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <section id="contato" className="py-20 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Info */}
          <div className="lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-secondary-500 font-semibold tracking-wide uppercase text-sm mb-2">Fale Conosco</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
                Solicite Seu Orçamento Gratuito
              </h3>
              <p className="text-neutral-400 mb-10 leading-relaxed">
                Estamos prontos para atender sua necessidade com agilidade e profissionalismo. Preencha o formulário ou entre em contato direto pelos nossos canais.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <Phone className="w-6 h-6 text-secondary-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Telefone / WhatsApp</h4>
                    <a href="https://wa.me/5549998326802" className="text-neutral-400 hover:text-secondary-500 transition-colors">
                      (49) 99832-6802
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <Mail className="w-6 h-6 text-secondary-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">E-mail</h4>
                    <a href="mailto:kirchnerscont@hotmail.com" className="text-neutral-400 hover:text-secondary-500 transition-colors">
                      kirchnerscont@hotmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                    <MapPin className="w-6 h-6 text-secondary-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Endereço</h4>
                    <p className="text-neutral-400">
                      Tubarão - SC<br />
                      Atendimento em todo o litoral<br />
                      sul catarinense
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_32px_-8px_rgba(0,0,0,0.08)] border border-neutral-200/50"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Nome Completo *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/60 outline-none transition-all duration-300 text-neutral-900"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">WhatsApp / Telefone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={15}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/60 outline-none transition-all duration-300 text-neutral-900"
                      placeholder="(49) 90000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/60 outline-none transition-all duration-300 text-neutral-900"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">Serviço de Interesse *</label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-neutral-900 bg-white"
                    >
                      <option value="">Selecione um serviço</option>
                      <option value="Pintura Residencial">Pintura Residencial</option>
                      <option value="Pintura Predial">Pintura Predial</option>
                      <option value="Pintura Industrial">Pintura Industrial</option>
                      <option value="Limpeza Pós-Obra">Limpeza Pós-Obra</option>
                      <option value="Impermeabilização">Impermeabilização</option>
                      <option value="Outros">Outros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Mensagem / Detalhes da Obra</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-neutral-900 resize-none"
                    placeholder="Conte-nos um pouco sobre o que você precisa..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-8 py-3.5 text-[0.9rem] font-semibold tracking-wide rounded-lg text-white transition-all duration-300 ${
                    isSubmitting ? 'bg-neutral-300 cursor-not-allowed' : 'bg-primary-500 hover:bg-primary-600 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-800 rounded-lg text-sm font-medium text-center">
                    Mensagem preparada! Você será redirecionado para o WhatsApp.
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
