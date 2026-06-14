"use client";

import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function AgendarModal({ isOpen, onClose }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [countdown, setCountdown] = useState(5);
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Countdown after success
  useEffect(() => {
    if (status !== "success") return;
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          onClose();
          setStatus("idle");
          return 5;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [status, onClose]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xeewvwzz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative glass-panel rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ background: "rgba(255,255,255,0.85)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-[var(--color-outline-variant)]/30">
          <div>
            <h2 className="text-2xl font-bold text-[#5956e0]">Agendar Clase</h2>
            <p className="text-sm text-[var(--color-on-surface-variant)] mt-1">
              Completa el formulario y te contactamos pronto.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--color-surface-container)] transition-colors text-[var(--color-on-surface-variant)]"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="p-8 text-center flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-green-600">check_circle</span>
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-on-surface)]">¡Mensaje enviado!</h3>
            <p className="text-[var(--color-on-surface-variant)] leading-relaxed">
              Priscilla recibirá tu solicitud y te contactará pronto para confirmar tu clase.
            </p>
            <p className="text-sm text-[var(--color-outline)] mt-2">
              Cerrando en <span className="font-bold text-[#5956e0]">{countdown}</span> segundos...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
            {/* Nombre */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-on-surface-variant)] block mb-1">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                name="nombre"
                type="text"
                required
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-white/70 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:border-[#5956e0] focus:ring-2 focus:ring-[#5956e0]/20 transition"
              />
            </div>

            {/* Teléfono y Correo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-on-surface-variant)] block mb-1">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  name="telefono"
                  type="tel"
                  required
                  placeholder="8888-8888"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-white/70 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:border-[#5956e0] focus:ring-2 focus:ring-[#5956e0]/20 transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-on-surface-variant)] block mb-1">
                  Correo <span className="text-red-500">*</span>
                </label>
                <input
                  name="correo"
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-white/70 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:border-[#5956e0] focus:ring-2 focus:ring-[#5956e0]/20 transition"
                />
              </div>
            </div>

            {/* Curso y Grado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-on-surface-variant)] block mb-1">
                  Tema deseado <span className="text-red-500">*</span>
                </label>
                <input
                  name="curso"
                  type="text"
                  required
                  placeholder="Ej: Química General, Orgánica..."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-white/70 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:border-[#5956e0] focus:ring-2 focus:ring-[#5956e0]/20 transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-on-surface-variant)] block mb-1">
                  Grado / Año <span className="text-red-500">*</span>
                </label>
                <input
                  name="grado"
                  type="text"
                  required
                  placeholder="Ej: 10°, 1er año UCR"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-white/70 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:border-[#5956e0] focus:ring-2 focus:ring-[#5956e0]/20 transition"
                />
              </div>
            </div>

            {/* Fecha y hora */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-on-surface-variant)] block mb-1">
                  Fecha deseada <span className="text-red-500">*</span>
                </label>
                <input
                  name="fecha"
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-white/70 text-[var(--color-on-surface)] focus:outline-none focus:border-[#5956e0] focus:ring-2 focus:ring-[#5956e0]/20 transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-on-surface-variant)] block mb-1">
                  Hora deseada <span className="text-red-500">*</span>
                </label>
                <input
                  name="hora"
                  type="time"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-white/70 text-[var(--color-on-surface)] focus:outline-none focus:border-[#5956e0] focus:ring-2 focus:ring-[#5956e0]/20 transition"
                />
              </div>
            </div>

            {/* Comentarios */}
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-on-surface-variant)] block mb-1">
                Comentarios adicionales
              </label>
              <textarea
                name="comentarios"
                maxLength={200}
                rows={3}
                placeholder="¿Algún tema específico o detalle que quieras mencionar?"
                className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline-variant)] bg-white/70 text-[var(--color-on-surface)] placeholder:text-[var(--color-outline)] focus:outline-none focus:border-[#5956e0] focus:ring-2 focus:ring-[#5956e0]/20 transition resize-none"
              />
              <p className="text-xs text-[var(--color-outline)] mt-1 text-right">Máx. 200 caracteres</p>
            </div>

            {/* Error */}
            {status === "error" && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                Hubo un problema al enviar. Intenta de nuevo o escríbenos por WhatsApp.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#5956e0] text-white font-semibold tracking-widest uppercase py-4 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-[#5956e0]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {status === "submitting" ? (
                <>
                  <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                  Enviando...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">send</span>
                  Enviar solicitud
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
