import type { Product } from "@/data/menu";

const productImages: Record<string, string> = {
  "torre-feliz": "/menu/torre-feliz-q95.webp",
  "combo-bom-demais": "/menu/combo-bom-demais-q95.webp",
  "combo-original": "/menu/combo-original-q95.webp",
  "combo-super-picanha": "/menu/combo-super-picanha.webp",
  "promocao-casado": "/menu/promo-casado.webp",
  "promocao-super-casado": "/menu/promo-super-casado.webp",
  "super-combo-double": "/menu/super-combo-double.webp",
  "super-combo-cheesburguer": "/menu/super-combo-cheeseburguer.webp",
};

export function productImage(product: Pick<Product, "id" | "image">) {
  return productImages[product.id] ?? product.image;
}

export function productWithImage(product: Product): Product {
  const image = productImage(product);
  return image === product.image ? product : { ...product, image };
}
