import type { Product, ProductOptionGroup } from "@/data/menu";
export type UiOptionGroup = ProductOptionGroup & { prices?: Record<string, number> };
export const displayProductDescription = (product: Product) => product.description;
export const productOptionGroups = (product: Product): UiOptionGroup[] =>
  product.customGroups ?? [];
export const optionPrice = (group: UiOptionGroup, option: string) => group.prices?.[option] ?? 0;
