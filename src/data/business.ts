/** Dados do negócio — edite aqui para atualizar o site inteiro. */
export const business = {
  name: "Torre de Pizza",
  tagline: "Pizzaria artesanal • Campo Grande – RJ",
  rating: 4.2,
  reviews: 265,
  city: "Campo Grande, Rio de Janeiro – RJ",
  address: "R. Domingos Alves Ribeiro, 28 — Campo Grande, Rio de Janeiro – RJ",
  hours: "Todos os dias, das 18h às 00h",
  phone: "+55 21 96990-2994",
  phoneHref: "tel:+5521969902994",
  whatsapp: "5521969902994",
  instagram: "@torredepizzacg",
  instagramUrl: "https://www.instagram.com/torredepizzacg/",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=R.+Domingos+Alves+Ribeiro,+28,+Campo+Grande,+Rio+de+Janeiro,+RJ",
  services: ["Delivery", "Retirada", "Atendimento no local"],
  deliveryPricing: {
    /**
     * Regra de taxa por distância.
     * Exemplo: se a loja cobrar R$ 1 a cada 1,5 km, use amount: 1 e everyKm: 1.5.
     * Enquanto amount for null, a distância é calculada, mas nenhuma taxa é cobrada.
     */
    amount: null as number | null,
    everyKm: 1,
    calculation: "blocks" as "blocks" | "proportional",
    minimumFee: 0,
    maximumDistanceKm: null as number | null,
  },
} as const;

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
