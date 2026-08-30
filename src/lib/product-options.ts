import type { Product, ProductOptionGroup } from "@/data/menu";

export type UiOptionGroup = ProductOptionGroup & {
  prices?: Record<string, number>;
};

const comboDescriptions: Record<string, string> = {
  "torre-feliz": "1 Cheeseburguer (pão, hambúrguer de carne e queijo) + batata + refrigerante 250 ml.",
  "combo-bom-demais": "2 Torre Mas Que Bem (2 hambúrgueres de carne, alface, queijo, ovo, provolone, molho especial, bacon e pão com gergelim) + Kuat + batata com bacon e Cheddar.",
  "combo-original": "2 X-Torre (hambúrguer de carne, alface, queijo, ovo, presunto, molho especial, bacon, calabresa e pão com gergelim) + Kuat + batata com bacon e Cheddar.",
  "combo-super-picanha": "2 Torre Picanha (4 hambúrgueres de carne, alface, 3 queijos, molho especial, cebola, picles, bacon e pão com gergelim) + Kuat + batata com bacon e Cheddar.",
  "promocao-super-casado": "2 Promoção Casado (2 hambúrgueres de carne, 1 fatia de queijo Cheddar, bacon, cebola, picles, alface e pão com gergelim) + Antarctica 1L + batata com bacon e Cheddar.",
  "super-combo-double": "4 Big California (2 hambúrgueres de carne, alface, 2 queijos, molho especial, cebola, picles, bacon, calabresa e pão com gergelim) + Kuat + batata com bacon e Cheddar.",
  "super-combo-cheesburguer": "8 Cheeseburguer (pão, hambúrguer de carne e queijo) + Kuat + batata com bacon e Cheddar.",
};

export function displayProductDescription(product: Product) {
  return comboDescriptions[product.id] ?? product.description;
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
  label: "Escolha 1 opção",
  options: ["Catupiry", "Cheddar"],
  min: 1,
  max: 1,
  hint: "Obrigatório",
};

const pastelChoiceIds = new Set(["pastel-lombo", "pastel-frango", "pastel-palmito"]);

export function productOptionGroups(product: Product): UiOptionGroup[] {
  const groups: UiOptionGroup[] = [...(product.customGroups ?? [])];

  if (product.category === "pizzas") groups.push(pizzaExtras);
  if (product.category === "hamburgueres") groups.push(burgerComboExtra);
  if (pastelChoiceIds.has(product.id)) groups.push(pastelCheeseChoice);

  return groups;
}

export function optionPrice(group: UiOptionGroup, option: string) {
  return group.prices?.[option] ?? 0;
}
