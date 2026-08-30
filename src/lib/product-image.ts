import type { Product } from "@/data/menu";

const productImages: Record<string, string> = {
  "torre-feliz": "/menu/torre-feliz.png",
  "combo-bom-demais": "/menu/combo-bom-demais.png",
  "combo-original": "/menu/combo-original.png",
  "combo-super-picanha": "/menu/combo-super-picanha.png",
  "promocao-casado": "/menu/promocao-casado.png",
  "promocao-super-casado": "/menu/promocao-super-casado.png",
  "super-combo-double": "/menu/super-combo-double.png",
  "super-combo-cheesburguer": "/menu/super-combo-cheeseburguer.png",
  "pizza-calabresa": "/menu/pizza-calabresa.png",
  "torre-picanha": "/menu/torre-picanha.png",
};

export function productImage(product: Pick<Product, "id" | "image">) {
  return productImages[product.id] ?? product.image;
}

export function productWithImage(product: Product): Product {
  const image = productImage(product);
  return image === product.image ? product : { ...product, image };
}
