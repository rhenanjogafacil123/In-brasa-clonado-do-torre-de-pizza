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
  "pizza-mussarela": "/menu/pizza-mussarela.png",
  "pizza-presunto": "/menu/pizza-presunto.png",
  "pizza-frango-catupiry-cheddar": "/menu/pizza-frango-catupiry-cheddar.png",
  "pizza-frango-caipira": "/menu/pizza-frango-caipira.png",
  "pizza-atum": "/menu/pizza-atum.png",
  "pizza-palmito": "/menu/pizza-palmito.png",
  "pizza-lombo": "/menu/pizza-lombo.png",
  "pizza-salame": "/menu/pizza-salame.png",
  "calzone-4-queijos": "/menu/calzone-4-queijos.png",
  "calzone-di-napoli": "/menu/calzone-di-napoli.png",
  "calzone-governa": "/menu/calzone-governa.png",
  "calzone-palmares": "/menu/calzone-palmares.png",
  "calzone-ascoly": "/menu/calzone-ascoly.png",
  "calzone-chambacon": "/menu/calzone-chambacon.png",
  "calzone-sertas": "/menu/calzone-sertas.png",
  "torre-picanha": "/menu/torre-picanha.png",
};

export function productImage(product: Pick<Product, "id" | "image">) {
  return productImages[product.id] ?? product.image;
}

export function productWithImage(product: Product): Product {
  const image = productImage(product);
  return image === product.image ? product : { ...product, image };
}
