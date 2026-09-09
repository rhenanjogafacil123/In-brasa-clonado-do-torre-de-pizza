/** Informações confirmadas no cardápio Bora de Batata. */
export const business = {
  name: "Bora de Batata",
  tagline: "Batatas recheadas & pastéis",
  rating: 0,
  reviews: 0,
  city: "Delivery",
  address: "",
  hours: "Delivery a partir das 19h",
  phone: "(21) 99054-3204",
  phoneHref: "tel:+5521990543204",
  whatsapp: "5521990543204",
  instagram: "",
  instagramUrl: "",
  mapsUrl: "",
  services: ["Somente delivery"],
  siteUsageFee: 0,
  deliveryPricing: {
    amount: null as number | null,
    everyKm: 1.5,
    calculation: "blocks" as "blocks" | "proportional",
    minimumFee: 0,
    maximumDistanceKm: null as number | null,
  },
} as const;
export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
