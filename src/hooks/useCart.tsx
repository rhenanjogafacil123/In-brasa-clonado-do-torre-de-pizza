import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product, ProductVariant } from "@/data/menu";

export type CartItem = {
  product: Product;
  qty: number;
  variant?: ProductVariant;
  key: string;
};

type CartContext = {
  items: CartItem[];
  count: number;
  subtotal: number;
  notes: string;
  setNotes: (v: string) => void;
  add: (product: Product, variant?: ProductVariant) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartContext | null>(null);

export const cartItemPrice = (item: Pick<CartItem, "product" | "variant">) =>
  item.variant?.price ?? item.product.price;

export const cartItemKey = (product: Product, variant?: ProductVariant) =>
  `${product.id}::${variant?.id ?? "default"}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);

  const value = useMemo<CartContext>(() => {
    const setQty = (key: string, qty: number) =>
      setItems((prev) =>
        qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
      );

    return {
      items,
      notes,
      setNotes,
      open,
      setOpen,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      subtotal: items.reduce((sum, item) => sum + item.qty * cartItemPrice(item), 0),
      add: (product, variant) =>
        setItems((prev) => {
          const key = cartItemKey(product, variant);
          const found = prev.find((i) => i.key === key);
          return found
            ? prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
            : [...prev, { product, variant, key, qty: 1 }];
        }),
      remove: (key) => setItems((prev) => prev.filter((i) => i.key !== key)),
      setQty,
      clear: () => {
        setItems([]);
        setNotes("");
      },
    };
  }, [items, notes, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart deve ser usado dentro de CartProvider");
  return ctx;
}
