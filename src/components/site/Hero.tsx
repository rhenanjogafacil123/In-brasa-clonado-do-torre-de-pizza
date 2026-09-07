import { useState } from "react";
import {
  Bike,
  Clock,
  Code2,
  Info,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  ShoppingBag,
  Star,
  Store,
  X,
} from "lucide-react";
import { business } from "@/data/business";

const heroImg = "/hero-pizza.webp";
const serviceIcons = [Bike, ShoppingBag, Store];

const developerWhatsappMessage =
  "Olá, Rhenan! Vi o site que você desenvolveu para a Torre de Pizza e gostaria de conversarmos sobre um design baseado na identidade visual da minha empresa gratuitamente, e já conversarmos sobre o preço. Sem compromisso, enrolação e perda de tempo!";
const developerWhatsappUrl = `https://wa.me/5521973152056?text=${encodeURIComponent(developerWhatsappMessage)}`;

function InformationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de mais informações sobre a Torre de Pizza.",
  );
  const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;

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
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Contato e localização</p>
            <h2 id="information-title" className="mt-2 font-display text-2xl font-semibold text-foreground">
              Informações
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Fale com a Torre de Pizza, acesse o Instagram ou abra a rota direto no Google Maps.
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
              <span className="block truncate text-sm text-muted-foreground">{business.instagram}</span>
            </span>
            <span className="text-xs font-semibold text-primary">Abrir</span>
          </a>

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
              <span className="block truncate text-sm text-muted-foreground">Abrir rota no Google Maps</span>
            </span>
            <span className="text-xs font-semibold text-primary">Rota</span>
          </a>
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#25D366]/35 bg-[#25D366]/10 px-3.5 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#25D366] text-white">
                <MessageCircle className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#159447]">Desenvolvedor do site</p>
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
              <MessageCircle className="h-3.5 w-3.5" />
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
    <section id="topo" className="relative isolate min-h-[106svh] overflow-hidden">
      <img
        src={heroImg}
        alt="Pizza artesanal da Torre de Pizza"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="relative mx-auto flex min-h-[106svh] max-w-6xl flex-col justify-end px-4 pb-[144px] pt-32 sm:px-6 md:pb-[168px]">
        <div className="animate-rise max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-gold/40 bg-primary-foreground/10 backdrop-blur">
              <img src="/logo.webp" alt={business.name} className="h-full w-full object-cover" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-primary-foreground">{business.name}</p>
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Sabor e tradição • desde sempre</p>
            </div>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-primary-foreground sm:text-6xl">
            Sabor de verdade
            <span className="block text-gold">em cada fatia.</span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Massa artesanal, ingredientes frescos e aquele sabor que transforma qualquer noite em Campo Grande.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/85">
            <span className="flex items-center gap-1.5 font-semibold text-gold">
              <Star className="h-4 w-4 fill-current" />
              {business.rating.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}
              <span className="font-normal text-primary-foreground/70">({business.reviews} avaliações)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold" />
              {business.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold" />
              {business.hours}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {business.services.map((service, index) => {
              const Icon = serviceIcons[index] ?? Bike;
              return (
                <span
                  key={service}
                  className="flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur"
                >
                  <Icon className="h-3.5 w-3.5 text-gold" />
                  {service}
                </span>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#cardapio"
              className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-8 py-4 text-base font-semibold text-gold-foreground shadow-gold"
            >
              Ver cardápio
            </a>
            <button
              type="button"
              onClick={() => setInformationOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-4 text-base font-semibold text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/15"
            >
              <Info className="h-5 w-5" />
              Informações
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-fade" />
      <InformationModal open={informationOpen} onClose={() => setInformationOpen(false)} />
    </section>
  );
}
