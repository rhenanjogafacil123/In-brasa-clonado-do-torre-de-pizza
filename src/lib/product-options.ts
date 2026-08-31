import type { Product, ProductOptionGroup } from "@/data/menu";

export type UiOptionGroup = ProductOptionGroup & {
  prices?: Record<string, number>;
};

const normalizePattyWording = (text: string) =>
  text
    .replace(/hambúrgueres de carne/gi, "discos de carne bovina")
    .replace(/hambúrguer de carne/gi, "disco de carne bovina")
    .replace(/hambúrgueres de frango/gi, "discos de frango")
    .replace(/hambúrguer de frango/gi, "disco de frango");

const comboDescriptions: Record<string, string> = {
  "torre-feliz": "1 Cheeseburguer (pão, disco de carne bovina e queijo) + batata + refrigerante 250 ml.",
  "combo-bom-demais": "2 Torre Mas Que Bem (2 discos de carne bovina, alface, queijo, ovo, provolone, molho especial, bacon e pão com gergelim) + Kuat + batata com bacon e Cheddar.",
  "combo-original": "2 X-Torre (disco de carne bovina, alface, queijo, ovo, presunto, molho especial, bacon, calabresa e pão com gergelim) + Kuat + batata com bacon e Cheddar.",
  "combo-super-picanha": "2 Torre Picanha (4 discos de carne bovina, alface, 3 queijos, molho especial, cebola, picles, bacon e pão com gergelim) + Kuat + batata com bacon e Cheddar.",
  "promocao-super-casado": "2 Promoção Casado (2 discos de carne bovina, 1 fatia de queijo Cheddar, bacon, cebola, picles, alface e pão com gergelim) + Antarctica 1L + batata com bacon e Cheddar.",
  "super-combo-double": "4 Big California (2 discos de carne bovina, alface, 2 queijos, molho especial, cebola, picles, bacon, calabresa e pão com gergelim) + Kuat + batata com bacon e Cheddar.",
  "super-combo-cheesburguer": "8 Cheeseburguer (pão, disco de carne bovina e queijo) + Kuat + batata com bacon e Cheddar.",
};

export function displayProductDescription(product: Product) {
  const baseDescription = normalizePattyWording(comboDescriptions[product.id] ?? product.description);

  if (product.category === "pizzas") {
    return `${baseDescription} Grande (40 cm) acompanha refrigerante 2L Kuat ou Convenção.`;
  }

  return baseDescription;
}

const pizzaExtras: UiOptionGroup = {
  id: "adicionais-pizza",
  label: "Adicionar complementos",
  options: ["Catupiry", "Cheddar", "Catupiry Premium", "Cheddar Premium", "Cream Cheese Premium"],
  min: 0,
  max: 5,
  hint: "Escolha se quiser",
  prices: {
    Catupiry: 6,
    Cheddar: 6,
    "Catupiry Premium": 8,
    "Cheddar Premium": 8,
    "Cream Cheese Premium": 8,
  },
};

const pizzaFreeDrink: UiOptionGroup = {
  id: "refri-gratis",
  label: "Refrigerante 2L (incluso)",
  options: ["Kuat", "Convenção"],
  min: 1,
  max: 1,
  hint: "Incluso na pizza Grande (40 cm) — escolha 1 opção",
  onlyVariantIds: ["grande"],
};

const pizzaCreamChoice: UiOptionGroup = {
  id: "creme-pizza",
  label: "Escolha Catupiry ou Cheddar",
  options: ["Catupiry", "Cheddar"],
  min: 1,
  max: 1,
  hint: "Escolha 1 opção",
};

const subCheeseChoice: UiOptionGroup = {
  id: "queijo-sub",
  label: "Escolha o queijo",
  options: ["Cheddar", "Mussarela"],
  min: 1,
  max: 1,
  hint: "Escolha 1 opção",
};

const chickenPortionChoice: UiOptionGroup = {
  id: "tipo-frango",
  label: "Escolha o frango",
  options: ["Frango a passarinho", "Drumet empanado"],
  min: 1,
  max: 1,
  hint: "Escolha 1 opção",
};

const burgerComboExtra: UiOptionGroup = {
  id: "monte-combo",
  label: "Quer transformar em combo?",
  options: ["Coca-Cola lata + batata-frita"],
  min: 0,
  max: 1,
  hint: "Opcional",
  prices: {
    "Coca-Cola lata + batata-frita": 10,
  },
};

const pastelCheeseChoice: UiOptionGroup = {
  id: "escolha-cremoso",
  label: "Escolha Catupiry ou Cheddar",
  options: ["Catupiry", "Cheddar"],
  min: 1,
  max: 1,
  hint: "Escolha 1 opção",
};

const pastelChoiceIds = new Set(["pastel-lombo", "pastel-frango", "pastel-palmito"]);
const subChoiceIds = new Set(["sub-torre-carne", "sub-torre-frango"]);
const sweetPizzaIds = new Set(["pizza-banana", "pizza-romeu-julieta", "pizza-chocolate"]);

export function productOptionGroups(product: Product): UiOptionGroup[] {
  const existingGroups: UiOptionGroup[] = (product.customGroups ?? []).map((group) => ({
    ...group,
    options: group.options.map(normalizePattyWording),
  }));

  const groups: UiOptionGroup[] = [];

  if (product.id === "pizza-frango-catupiry-cheddar") groups.push(pizzaCreamChoice);
  if (subChoiceIds.has(product.id)) groups.push(subCheeseChoice);
  if (product.id === "batata-frango") groups.push(chickenPortionChoice);
  if (pastelChoiceIds.has(product.id)) groups.push(pastelCheeseChoice);

  groups.push(...existingGroups);

  if (product.category === "pizzas") groups.push(pizzaFreeDrink);
  if (product.category === "pizzas" && !sweetPizzaIds.has(product.id)) groups.push(pizzaExtras);
  if (product.category === "hamburgueres") groups.push(burgerComboExtra);

  return groups;
}

export function optionPrice(group: UiOptionGroup, option: string) {
  return group.prices?.[option] ?? 0;
}
