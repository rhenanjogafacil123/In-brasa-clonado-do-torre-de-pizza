import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { brl } from "@/data/business";
import { cartItemPrice, useCart } from "@/hooks/useCart";

export function CartDrawer() {
  const { open, setOpen, items, subtotal, count, setQty, remove } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Fechar carrinho"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-foreground/55 backdrop-blur-sm"
      />

      <aside className="animate-rise absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-background shadow-lift">
        <header className="border-b border-border bg-card px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Seu carrinho</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">Confira seus itens</h2>
              <p className="mt-1 text-xs text-muted-foreground">{count} item(ns) no carrinho</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="mb-5 grid h-20 w-20 place-items-center rounded-3xl bg-accent">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </span>
            <p className="font-display text-lg font-semibold text-foreground">Seu carrinho está vazio.</p>
            <p className="mt-2 text-sm text-muted-foreground">Escolha um item no cardápio para começar.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Itens selecionados</h3>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{count} item(ns)</span>
              </div>

              <div className="space-y-3">
                {items.map((item) => {
                  const { product, qty, variant, flavor, key } = item;
                  return (
                    <div key={key} className="flex gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-soft">
                      <img src={product.image} alt={product.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-foreground">{product.name}</p>
                        {(variant || flavor) && (
                          <p className="text-xs font-medium text-secondary">
                            {[variant?.label, flavor].filter(Boolean).join(" • ")}
                          </p>
                        )}
                        <p className="text-sm font-medium text-primary">{brl(cartItemPrice(item))}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQty(key, qty - 1)}
                            className="grid h-8 w-8 place-items-center rounded-full bg-accent text-primary"
                            aria-label={`Diminuir quantidade de ${product.name}`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(key, qty + 1)}
                            className="grid h-8 w-8 place-items-center rounded-full bg-accent text-primary"
                            aria-label={`Aumentar quantidade de ${product.name}`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(key)}
                            className="ml-auto grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            aria-label={`Remover ${product.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <footer className="border-t border-border bg-card px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-2xl font-semibold text-primary">{brl(subtotal)}</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full rounded-full bg-gradient-gold py-4 text-base font-semibold text-gold-foreground shadow-gold"
              >
                Continuar escolhendo
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
