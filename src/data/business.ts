/** Dados do negócio — edite aqui para atualizar o site inteiro. */
export const business = {
  name: "Torre de Pizza",
  tagline: "Pizzaria artesanal • Campo Grande – RJ",
  rating: 4.2,
  reviews: 265,
  city: "Campo Grande, Rio de Janeiro – RJ",
  address: "R. Domingos Alves Ribeiro, 20 — Campo Grande, Rio de Janeiro – RJ",
  hours: "Todos os dias, das 18h às 00h",
  phone: "+55 21 96990-2994",
  phoneHref: "tel:+5521969902994",
  whatsapp: "5521969902994",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=R.+Domingos+Alves+Ribeiro,+20,+Campo+Grande,+Rio+de+Janeiro,+RJ",
  services: ["Delivery", "Retirada", "Atendimento no local"],
} as const;

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
