import type { Product } from "@/data/menu";
export const productImage = (product: Pick<Product, "id" | "image">) => product.image;
export const productWithImage = (product: Product) => product;
