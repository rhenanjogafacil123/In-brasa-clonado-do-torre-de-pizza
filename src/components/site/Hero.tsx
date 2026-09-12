import { useState } from "react";
import {
  ArrowDown,
  Bike,
  Clock,
  Code2,
  Info,
  Instagram,
  MessageCircle,
  Navigation,
  X,
} from "lucide-react";
import { business } from "@/data/business";

const developerWhatsappMessage =
  "Olá, Rhenan! Vi seu trabalho e quero atrair mais clientes. Tenho interesse em criação de site, Instagram, Google Meu Negócio e tráfego pago com Meta Ads e Google Ads. Pode me explicar como funciona e os valores?";
const developerWhatsappUrl = `https://wa.me/5521973152056?text=${encodeURIComponent(developerWhatsappMessage)}`;

function WhatsappIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.4 11.6a8.4 8.4 0 0 1-12.5 7.35L3 20.5l1.5-4.75A8.4 8.4 0 1 1 20.4 11.6Z" />
      <path d="M8.15 8.1c.35-.42.72-.27.9-.02l1.05 1.48c.18.25.13.58-.08.8l-.62.65c-.18.2-.2.48-.04.7.7.96 1.58 1.76 2.6 2.37.23.14.51.1.69-.1l.6-.7c.2-.23.53-.3.8-.14l1.58.93c.28.17.38.52.23.8-.4.75-1.1 1.45-1.95 1.62-1.44.29-3.7-.87-5.45-2.57-1.78-1.74-2.96-4-2.72-5.45.13-.82.7-1.74 1.41-2.37Z" />
    </svg>
  );
}

function InformationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de mais informações sobre a Bora de Batata.",
  );
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;
  const instagramAvailable = Boolean(business.instagramUrl);
  const mapsAvailable = Boolean(business.mapsUrl);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Fechar informações"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="information-title"
        className="animate-rise relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] border border-border bg-card p-5 text-card-foreground shadow-lift sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Contato e localização
            </p>
            <h2
              id="information-title"
              className="mt-2 font-display text-2xl font-semibold text-foreground"
            >
              Informações
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Fale com a Bora de Batata pelo WhatsApp e consulte os canais da loja.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition hover:border-primary/40 hover:bg-accent/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-foreground">WhatsApp</span>
              <span className="block truncate text-sm text-muted-foreground">{business.phone}</span>
            </span>
            <span className="text-xs font-semibold text-primary">Abrir</span>
          </a>

          {instagramAvailable ? (
            <a
              href={business.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition hover:border-primary/40 hover:bg-accent/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
                <Instagram className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">Instagram</span>
                <span className="block truncate text-sm text-muted-foreground">
                  {business.instagram}
                </span>
              </span>
              <span className="text-xs font-semibold text-primary">Abrir</span>
            </a>
          ) : (
            <div
              aria-disabled="true"
              className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 opacity-60"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
                <Instagram className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">Instagram</span>
                <span className="block truncate text-sm text-muted-foreground">
                  Perfil ainda não informado
                </span>
              </span>
              <span className="text-xs font-semibold text-muted-foreground">Indisponível</span>
            </div>
          )}

          {mapsAvailable ? (
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition hover:border-primary/40 hover:bg-accent/40"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
                <Navigation className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">Como chegar</span>
                <span className="block truncate text-sm text-muted-foreground">
                  Abrir rota no Google Maps
                </span>
              </span>
              <span className="text-xs font-semibold text-primary">Rota</span>
            </a>
          ) : (
            <div
              aria-disabled="true"
              className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 opacity-60"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-primary">
                <Navigation className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">Como chegar</span>
                <span className="block truncate text-sm text-muted-foreground">
                  Localização ainda não informada
                </span>
              </span>
              <span className="text-xs font-semibold text-muted-foreground">Indisponível</span>
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#25D366]/35 bg-[#25D366]/10 px-3.5 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white">
                <WhatsappIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#159447]">
                  Desenvolvedor do site
                </p>
                <p className="flex items-center gap-1 truncate text-sm font-semibold text-foreground">
                  <span>Rhenan</span>
                  <Code2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                </p>
              </div>
            </div>

            <a
              href={developerWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com Rhenan pelo WhatsApp no número (21) 97315-2056"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              <WhatsappIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [informationOpen, setInformationOpen] = useState(false);

  return (
    <section id="topo" className="bora-hero relative isolate overflow-hidden bg-[#1a1a1a]">
      <style>{`
        @media (max-width: 640px) {
          .bora-hero-image {
            object-position: 72% center !important;
            filter: brightness(1.1) contrast(1.08) saturate(1.12);
          }
        }
      `}</style>
      <img
        src="/bora-hero.png"
        alt="Batata recheada e pastel sobre madeira — imagem ilustrativa"
        fetchPriority="high"
        decoding="async"
        className="bora-hero-image absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 hidden sm:block bora-hero-shade" />
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,14,12,0.2) 0%, rgba(15,14,12,0.48) 38%, rgba(21,19,16,0.82) 100%)",
        }}
      />
      <div className="relative mx-auto flex min-h-[90svh] max-w-6xl items-center px-4 pb-20 pt-36 sm:px-6">
        <div
          className="animate-rise max-w-xl text-[#fff5df]"
          style={{ textShadow: "0 2px 14px rgba(0,0,0,0.38)" }}
        >
          <p className="mb-5 text-xs font-bold uppercase tracking-[.28em] text-[#f4b400]">
            Bora de Batata • Delivery
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.06] sm:text-7xl">
            Fome de
            <br />
            algo <span className="brush block text-[#f4b400]">bem recheado?</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#f5e6c8]/90 sm:text-lg">
            Batata cremosa, recheio caprichado e pastel crocante do seu jeito. Sabor de verdade em
            cada mordida.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#f5e6c8]">
            <span className="flex items-center gap-2">
              <Bike size={17} />
              Somente delivery
            </span>
            <span className="flex items-center gap-2">
              <Clock size={17} />A partir das 19h
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#cardapio"
              className="inline-flex items-center gap-3 rounded-full bg-[#f4b400] px-7 py-4 font-bold text-[#1a1a1a] shadow-gold"
            >
              Bora ver o cardápio <ArrowDown size={18} />
            </a>
            <button
              type="button"
              onClick={() => setInformationOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-4 font-semibold text-white"
            >
              <Info size={18} />
              Informações
            </button>
          </div>
        </div>
      </div>
      <p className="absolute bottom-5 right-6 text-[10px] text-white/60">Imagem ilustrativa</p>

      <InformationModal open={informationOpen} onClose={() => setInformationOpen(false)} />
    </section>
  );
}
