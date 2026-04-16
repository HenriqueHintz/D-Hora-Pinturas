export default function Location() {
  return (
    <section id="localizacao" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-primary-500 font-semibold tracking-wide uppercase text-sm mb-2">Nossa Localização</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-neutral-900">
            Onde Estamos
          </h3>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Sediados em Tubarão, levamos agilidade e qualidade para toda a região e o litoral sul catarinense.
          </p>
        </div>
        
        <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 h-48 sm:h-64 md:h-80 lg:h-96 w-full max-w-5xl mx-auto relative bg-neutral-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113162.5935745191!2d-49.0835456!3d-28.4822005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95214eaa12345678%3A0x123456789abcdef!2sTubar%C3%A3o%2C%20SC!5e0!3m2!1spt-BR!2sbr!4v1650000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização D'Hora Pinturas e Limpezas"
            className="absolute inset-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
