import { Heart, Sparkles, Bike } from "lucide-react";
const pillars = [
  {
    icon: Sparkles,
    title: "Recheio que dá vontade",
    text: "Sete sabores de batata, em porções de 300g e 500g.",
  },
  {
    icon: Heart,
    title: "Pastel do seu jeito",
    text: "Monte com até 7 ingredientes ou escolha todas as opções.",
  },
  { icon: Bike, title: "Da nossa cozinha para você", text: "Somente delivery, a partir das 19h." },
];
export function About() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <img
          src="/bora-hero.png"
          alt="Batata recheada e pastel — imagem ilustrativa"
          loading="lazy"
          className="aspect-square w-full rounded-[2rem] object-cover object-right"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-[.28em] text-secondary">
            Bora de Batata
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Recheada de sabor.
            <br />
            <span className="brush text-primary">Feita pra você.</span>
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Uma batata quentinha, um pastel bem crocante e aquele recheio que faz a diferença.
            Escolha seu favorito e deixe o resto com a gente.
          </p>
          <div className="mt-8 space-y-5">
            {pillars.map((p) => (
              <div key={p.title} className="flex gap-4">
                <p.icon className="shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
