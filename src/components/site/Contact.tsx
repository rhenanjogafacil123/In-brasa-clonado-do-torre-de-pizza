import { business } from "@/data/business";
export function Contact() {
  return (
    <section id="contato" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-[2rem] border border-gold/30 bg-[#25211c] p-8 text-[#f5e6c8] sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[.25em] text-[#f4b400]">Bora pedir?</p>
        <h2 className="mt-3 text-3xl font-bold">Seu jantar merece esse recheio.</h2>
        <p className="mt-4">{business.hours} • Somente delivery</p>
        <p className="mt-2 text-sm">
          Consulte a área de atendimento e a taxa de entrega pelo WhatsApp.
        </p>
        <a
          href={"https://wa.me/" + business.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-full bg-[#f4b400] px-6 py-3 font-bold text-[#1a1a1a]"
        >
          Fale com a gente • {business.phone}
        </a>
      </div>
    </section>
  );
}
