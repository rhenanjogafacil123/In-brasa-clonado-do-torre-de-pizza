export type CategoryId = "destaques" | "batatas" | "pasteis" | "bebidas";
export type ProductVariant = { id: string; label: string; price: number };
export type ProductOptionGroup = {
  id: string;
  label: string;
  options: string[];
  min?: number;
  max?: number;
  hint?: string;
  /** Exibe o grupo apenas quando uma destas variantes estiver selecionada. */
  onlyVariantIds?: string[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Exclude<CategoryId, "destaques">;
  variants?: ProductVariant[];
  flavors?: string[];
  variantLabel?: string;
  customGroups?: ProductOptionGroup[];
  badge?: "Destaque" | "Promoção" | undefined;
  featured?: boolean;
};

export const categories: { id: CategoryId; label: string }[] = [
  { id: "batatas", label: "Batatas recheadas" },
  { id: "pasteis", label: "Pastéis" },
  { id: "bebidas", label: "Bebidas" },
];

export const potatoNotices = [
  "Pequena: 300g • Grande: 500g.",
  "Finalização grátis: cebolinha fresca, mussarela derretida e bacon.",
  "Batata palha à parte, grátis somente no strogonoff.",
];

export const pastelIngredients = [
  "Carne",
  "Frango",
  "Uva-passa",
  "Milho",
  "Ervilha",
  "Presunto",
  "Queijo",
  "Azeitona",
  "Cebola",
  "Tomate",
  "Cheddar",
  "Catupiry",
  "Bacon",
  "Calabresa",
];

const potatoFinishing = ["Mussarela derretida", "Cebolinha fresca", "Bacon"];

const flavors: [string, string, number, number][] = [
  ["strogonoff", "Strogonoff de frango", 19, 22.5],
  ["carne-cheddar", "Carne moída com cheddar", 20, 24],
  ["carne-catupiry", "Carne moída com catupiry", 20, 24],
  ["bacon-cheddar", "Bacon com cheddar", 17.5, 21.5],
  ["bacon-catupiry", "Bacon com catupiry", 17.5, 21.5],
  ["calabresa-cheddar", "Calabresa com cheddar", 16, 20],
  ["calabresa-catupiry", "Calabresa com catupiry", 16, 20],
];

export const products: Product[] = [
  ...flavors.map(([id, name, small, large]): Product => ({
    id: "batata-" + id,
    name,
    description:
      "Batata recheada com " +
      name.toLocaleLowerCase("pt-BR") +
      ". Finalização com mussarela, cebolinha e bacon.",
    price: small,
    image: "/bora-hero.png",
    category: "batatas",
    variantLabel: "tamanho",
    variants: [
      { id: "pequena", label: "Pequena • 300g", price: small },
      { id: "grande", label: "Grande • 500g", price: large },
    ],
    customGroups: [
      {
        id: "retirar",
        label: "Retirar ingredientes",
        options: potatoFinishing,
        min: 0,
        max: potatoFinishing.length,
        hint: "Retire o que preferir da finalização.",
      },
    ],
  })),
  {
    id: "pastel-montavel",
    name: "Monte seu pastel",
    description: "Pastel grande e crocante. Escolha de 1 a 7 ingredientes do seu jeito.",
    price: 18.99,
    image: "/bora-hero.png",
    category: "pasteis",
    customGroups: [
      {
        id: "recheios",
        label: "Ingredientes do pastel",
        options: pastelIngredients,
        min: 1,
        max: 7,
        hint: "Escolha até 7 opções. Todas inclusas no preço.",
      },
    ],
  },
  {
    id: "pastel-completo",
    name: "Pastel com tudo dentro",
    description: "Pastel grande com todas as 14 opções: " + pastelIngredients.join(", ") + ".",
    price: 24.99,
    image: "/bora-hero.png",
    category: "pasteis",
    customGroups: [
      {
        id: "retirar",
        label: "Retirar ingredientes",
        options: pastelIngredients,
        min: 0,
        max: pastelIngredients.length,
        hint: "Retire os ingredientes que você não quiser.",
      },
    ],
  },
  {
    id: "refrigerante-lata",
    name: "Refrigerante lata",
    description: "Para acompanhar seu pedido. Consulte os sabores disponíveis pelo WhatsApp.",
    price: 6.8,
    image: "/bora-drink.svg",
    category: "bebidas",
  },
  {
    id: "guaracamp",
    name: "Guaracamp",
    description: "Seu Guaracamp para acompanhar a batata ou o pastel.",
    price: 2.5,
    image: "/bora-drink.svg",
    category: "bebidas",
  },
];
