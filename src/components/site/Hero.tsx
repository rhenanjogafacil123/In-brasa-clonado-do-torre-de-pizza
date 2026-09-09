import { Bike, Clock, ArrowDown, MessageCircle } from "lucide-react";
import { business } from "@/data/business";
export function Hero() {
  return (
    <section id="topo" className="bora-hero relative isolate overflow-hidden bg-[#1a1a1a]">
      <img
        src="/bora-hero.png"
        alt="Batata recheada e pastel sobre madeira — imagem ilustrativa"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bora-hero-shade" />
      <div className="relative mx-auto flex min-h-[90svh] max-w-6xl items-center px-4 pb-20 pt-36 sm:px-6">
        <div className="animate-rise max-w-xl text-[#fff5df]">
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
            <a
              href={"https://wa.me/" + business.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-4 font-semibold text-white"
            >
              <MessageCircle size={18} />
              Informações
            </a>
          </div>
        </div>
      </div>
      <p className="absolute bottom-5 right-6 text-[10px] text-white/60">Imagem ilustrativa</p>
    </section>
  );
}
