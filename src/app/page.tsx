"use client";

import { useState, useRef } from "react";
import AgendarModal from "@/components/AgendarModal";

const WHATSAPP_NUMBER = "50660776079";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const testimonials = [
  { image: "/images/testimonio-1.webp" },
  { image: "/images/testimonio-2.webp" },
  { image: "/images/testimonio-3.webp" },
  { image: "/images/testimonio-4.webp" },
  { image: "/images/testimonio-5.webp" },
];

function WhatsAppIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function TestimonialCard({ image }: { image: string }) {
  return (
    <div className="bg-white border border-[var(--color-outline-variant)]/30 shadow-sm rounded-2xl w-[300px] sm:w-[350px] flex-shrink-0 overflow-hidden">
      <img src={image} alt="Reseña de estudiante" className="w-full h-auto object-contain" />
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollCarousel(dir: "left" | "right") {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.querySelector("div")?.offsetWidth ?? 320;
    carouselRef.current.scrollBy({ left: dir === "right" ? cardWidth + 24 : -(cardWidth + 24), behavior: "smooth" });
  }

  return (
    <div className="relative min-h-screen">
      <AgendarModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      {/* Background orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[var(--color-secondary-container)]/40 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-[var(--color-primary-fixed)]/50 rounded-full blur-[140px] -z-10 pointer-events-none" />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-[var(--color-outline-variant)]/30 shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-5 py-4">
          <div className="text-xl font-bold tracking-tight text-[#5956e0]">
            Química con Priscilla
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-lg font-bold border-b-2 border-[#5956e0] pb-1 text-[#5956e0]">Inicio</a>
            <a href="#planes" className="text-lg hover:text-[#5956e0] transition-colors pb-1 text-[var(--color-outline)]">Planes</a>
            <a href="#testimonios" className="text-lg hover:text-[#5956e0] transition-colors pb-1 text-[var(--color-outline)]">Testimonios</a>
            <a href="#contacto" className="text-lg hover:text-[#5956e0] transition-colors pb-1 text-[var(--color-outline)]">Contacto</a>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="hidden md:flex items-center gap-2 text-white text-sm font-semibold tracking-widest uppercase px-6 py-3 rounded-full hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg bg-[#5956e0]"
          >
            <span>Agendar Clase</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden text-[#5956e0] p-2"
            aria-label="Menú"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-outline-variant)]/30 bg-white px-5 py-4 flex flex-col gap-4">
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#5956e0]">Inicio</a>
            <a href="#planes" onClick={() => setMobileMenuOpen(false)} className="text-lg text-[var(--color-outline)] hover:text-[#5956e0] transition-colors">Planes</a>
            <a href="#testimonios" onClick={() => setMobileMenuOpen(false)} className="text-lg text-[var(--color-outline)] hover:text-[#5956e0] transition-colors">Testimonios</a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-lg text-[var(--color-outline)] hover:text-[#5956e0] transition-colors">Contacto</a>
            <button
              onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
              className="flex items-center justify-center gap-2 text-white text-sm font-semibold tracking-widest uppercase px-6 py-3 rounded-full bg-[#5956e0] hover:opacity-90 transition-opacity mt-2"
            >
              <span>Agendar Clase</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </nav>

      <main>
        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[#5956e0] via-[#bb99ff] to-[#decdff] pt-[100px] md:pt-[140px] px-5 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center z-10 w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6 text-sm font-semibold tracking-widest uppercase text-white animate-fade-in-up-1 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Cupos Abiertos 2026
            </div>
            <h1 className="text-[32px] md:text-[48px] font-semibold leading-tight text-white mb-6 max-w-2xl animate-fade-in-up-1 tracking-tight">
              Tutorías de química con Priscilla
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-xl animate-fade-in-up-2 leading-relaxed">
              Tutorías de química personalizadas para estudiantes de colegio o primer año de la U. Domina los conceptos con una metodología clara, moderna y adaptada a tu ritmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up-3">
              <div className="animate-float">
                <a href="#planes" className="block w-full sm:w-auto bg-white text-[#5956e0] text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full text-center hover:shadow-lg hover:shadow-white/30 transition-all hover:-translate-y-1">
                  Ver Planes
                </a>
              </div>
              <div className="animate-float-delayed">
                <a href="#contacto" className="block w-full sm:w-auto bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold tracking-widest uppercase px-8 py-4 rounded-full text-center hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                  Contáctame
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* QUIÉN SOY */}
        <section className="py-20 relative bg-[var(--color-surface)]" id="quien-soy">
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-[40px] font-bold mb-6 text-[#5956e0]">¿Quién es la profe?</h2>
                <p className="text-xl text-[var(--color-on-surface-variant)] mb-4 leading-relaxed">
                  Hola! Mi nombre es Priscilla. Soy graduada de Bachillerato en Química de la Universidad de Costa Rica y doy tutorías de química totalmente desde el 2022. He apoyado a estudiantes de Colegios Científicos, colegios de Bachillerato Internacional y a estudiantes de Universidad de diversas carreras como Ingeniería Química, Biotecnología, Medicina y otras Ciencias de la Salud.
                </p>
                <p className="text-xl text-[var(--color-on-surface-variant)] mb-4 leading-relaxed">
                  También poseo un bachillerato relacionado a Negocios Internacionales (Conocido como LEINN International) de la Universidad Española Mondragon y un Técnico en Análisis de Datos de la UCENFOTEC.
                </p>
                <p className="text-xl text-[var(--color-on-surface-variant)] leading-relaxed">
                  Actualmente trabajo como analista de datos en Uber, además de dar tutorías de química!
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--color-primary-container)]/20 rounded-3xl transform translate-x-4 translate-y-4 -z-10" />
                <img
                  src="/images/priscilla.webp"
                  alt="Priscilla"
                  className="rounded-3xl w-full h-auto object-cover shadow-lg border border-[var(--color-outline-variant)]/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* METODOLOGÍA */}
        <section className="py-20 relative bg-[var(--color-surface-container-low)]" id="metodologia">
          <div className="max-w-4xl mx-auto px-5">
            <div className="text-center mb-12">
              <h2 className="text-[40px] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#5956e0] to-[#403ac7] inline-block">
                La metodología
              </h2>
            </div>
            <div className="glass-panel p-8 md:p-12 rounded-3xl">
              <p className="text-lg text-[var(--color-on-surface-variant)] mb-8 leading-relaxed">
                Metodología personalizada a las necesidades del estudiante, en la cuál tomamos en cuenta las exigencias específicas del curso que esté llevando el estudiante, y damos apoyo al estudiante a través de:
              </p>
              <ul className="space-y-4 text-lg text-[var(--color-on-surface-variant)]">
                {[
                  "Clases en vivo y personalizadas",
                  "Materiales de apoyo para practicar desde casa",
                  "Resolución de dudas",
                  "Y seguimiento personalizado del estudiante a través de su curso de química",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[var(--color-primary)] mt-1">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PLANES */}
        <section className="py-20 relative" id="planes">
          <div className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-16">
              <h2 className="text-[40px] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#5956e0] to-[#403ac7] inline-block">
                Planes de Estudio
              </h2>
              <p className="text-lg text-[var(--color-on-surface-variant)] max-w-2xl mx-auto">
                Selecciona el formato que mejor se adapte a tus objetivos académicos.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Card 1 */}
              <div className="glass-panel rounded-3xl p-8 lg:p-10 flex flex-col relative overflow-hidden border-[var(--color-primary)]/30 shadow-[0_20px_40px_-15px_rgba(89,86,224,0.1)] group hover:bg-white/60 transition-colors duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary-container)]/20 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-6 right-6 bg-[var(--color-inverse-surface)] text-[var(--color-inverse-on-surface)] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">Popular</div>
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-secondary-fixed)] flex items-center justify-center text-[var(--color-on-secondary-fixed)] mb-6">
                  <span className="material-symbols-outlined text-3xl">person</span>
                </div>
                <h3 className="text-[24px] font-semibold text-[var(--color-on-surface)] mb-3">Clases Individuales</h3>
                <p className="text-[var(--color-on-surface-variant)] flex-grow mb-8 leading-relaxed">
                  Ayuda personalizada para repasar la teoría vista en clase y llevar la materia al día, para sentirse seguros a la hora de realizar los exámenes!
                </p>
                <div className="border-t border-[var(--color-outline-variant)]/30 pt-6 mt-auto">
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-[32px] font-bold text-[var(--color-primary)]">₡8.000</span>
                    <span className="text-[var(--color-on-surface-variant)] pb-1">/ hora</span>
                  </div>
                  <button onClick={() => setModalOpen(true)} className="block w-full text-center border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-semibold tracking-widest uppercase py-3 rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                    Agendar Clase
                  </button>
                </div>
              </div>
              {/* Card 2 */}
              <div className="glass-panel rounded-3xl p-8 lg:p-10 flex flex-col relative overflow-hidden group hover:bg-white/60 transition-colors duration-500">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-primary-container)]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-fixed)] flex items-center justify-center text-[var(--color-on-primary-fixed)] mb-6">
                  <span className="material-symbols-outlined text-3xl">school</span>
                </div>
                <h3 className="text-[24px] font-semibold text-[var(--color-on-surface)] mb-3">Nivelación para Química</h3>
                <p className="text-[var(--color-on-surface-variant)] flex-grow mb-8 leading-relaxed">
                  Curso de nivelación de 5 clases para que aprendas todo lo que tienes que saber antes de iniciar con tus clases de química e ir con una base sólida!
                </p>
                <div className="border-t border-[var(--color-outline-variant)]/30 pt-6 mt-auto">
                  <div className="flex items-end gap-2 mb-6">
                    <span className="text-[32px] font-bold text-[var(--color-primary)]">₡80.000</span>
                    <span className="text-[var(--color-on-surface-variant)] pb-1">/ curso completo</span>
                  </div>
                  <button onClick={() => setModalOpen(true)} className="block w-full text-center bg-[var(--color-primary-container)] text-white text-sm font-semibold tracking-widest uppercase py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md">
                    Inscribirse al Curso
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="py-20 relative bg-[var(--color-surface-container-low)]/50 overflow-hidden" id="testimonios">
          <div className="max-w-[100vw] mx-auto px-5">
            <div className="text-center mb-16">
              <h2 className="text-[40px] font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#5956e0] to-[#403ac7] inline-block">
                Lo que dice la gente
              </h2>
              <p className="text-lg text-[var(--color-on-surface-variant)]">Experiencias de estudiantes que han mejorado sus notas.</p>
            </div>
            <div className="relative">
              {/* Flechas — solo desktop */}
              <button
                onClick={() => scrollCarousel("left")}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-[var(--color-outline-variant)]/40 items-center justify-center text-[#5956e0] hover:bg-[#5956e0] hover:text-white transition-colors"
                aria-label="Anterior"
              >
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>

              {/* Carrusel */}
              <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto scroll-smooth py-4 scrollbar-hide snap-x snap-mandatory md:px-10 px-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="snap-center flex-shrink-0">
                    <TestimonialCard image={t.image} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollCarousel("right")}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 w-10 h-10 rounded-full bg-white shadow-md border border-[var(--color-outline-variant)]/40 items-center justify-center text-[#5956e0] hover:bg-[#5956e0] hover:text-white transition-colors"
                aria-label="Siguiente"
              >
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>

            {/* Hint de swipe — solo mobile */}
            <div className="flex md:hidden items-center justify-center gap-2 mt-4 text-[var(--color-outline)] text-sm animate-swipe-hint">
              <span className="material-symbols-outlined text-base">swipe</span>
              Desliza para ver más
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section className="py-20 relative" id="contacto">
          <div className="max-w-4xl mx-auto px-5">
            <div className="glass-panel rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-primary-container)]/10 -z-10" />
              <div className="w-20 h-20 bg-white/80 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-sm backdrop-blur-md">
                <span className="material-symbols-outlined text-4xl text-[var(--color-primary)]">chat_bubble</span>
              </div>
              <h2 className="text-[32px] md:text-[48px] font-semibold text-[var(--color-on-surface)] mb-6 leading-tight">
                ¿Listo para empezar?
              </h2>
              <p className="text-lg text-[var(--color-on-surface-variant)] mb-10 max-w-xl mx-auto leading-relaxed">
                Escríbeme por <strong>WhatsApp</strong> para consultar horarios disponibles, agendar tu primera clase o resolver cualquier duda que tengas sobre la metodología.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[var(--color-primary-container)] text-white text-base font-semibold tracking-widest uppercase px-10 py-5 rounded-full hover:shadow-xl hover:shadow-[var(--color-primary-container)]/30 transition-all hover:-translate-y-1 w-full sm:w-auto"
              >
                <WhatsAppIcon />
                Contáctame por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[var(--color-surface-container-low)] w-full py-12 border-t border-[var(--color-outline-variant)] shadow-sm relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-5 max-w-7xl mx-auto gap-8">
          <div className="text-[24px] text-[var(--color-primary)] font-bold">
            Química con Priscilla
          </div>
          <div className="flex gap-6 text-sm font-semibold tracking-widest uppercase text-[var(--color-on-surface-variant)]">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[var(--color-primary)] transition-colors">
              WhatsApp
            </a>
          </div>
          <div className="text-sm font-semibold tracking-widest uppercase text-[var(--color-on-surface-variant)] text-center md:text-right">
            © 2026 | Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
