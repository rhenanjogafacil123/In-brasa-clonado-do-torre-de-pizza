import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Plus, X } from "lucide-react";
import { brl } from "@/data/business";
import type { Product } from "@/data/menu";
import { useCart } from "@/hooks/useCart";
import { productImage, productWithImage } from "@/lib/product-image";
import { cn } from "@/lib/utils";

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const { add } = useCart();
  const hasFlavors = Boolean(product.flavors?.length);
  const [added, setAdded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [flavor, setFlavor] = useState("");
  const [variantId, setVariantId] = useState(hasFlavors ? "" : product.variants?.[0]?.id ?? "");

  const selectedVariant = useMemo(
    () => product.variants?.find((variant) => variant.id === variantId),
    [product.variants, variantId],
  );

  const displayedPrice = selectedVariant?.price ?? product.price;
  const displayImage = productImage(product);
  const isCustomImage = displayImage.startsWith("/menu/");
  const longDescription = product.description.length > 68;
  const canAddCustom = (!product.variants?.length || Boolean(selectedVariant)) && Boolean(flavor);

  const showAddedFeedback = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const handleAdd = () => {
    if (hasFlavors) {
      setCustomizing(true);
      return;
    }

    add(productWithImage(product), selectedVariant);
    showAddedFeedback();
  };

  const confirmCustomization = () => {
    if (!canAddCustom) return;

    add(productWithImage(product), selectedVariant, flavor);
    setCustomizing(false);
    setFlavor("");
    setVariantId("");
    showAddedFeedback();
  };

  const customizer =
    customizing && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
            <button
              type="button"
              aria-label="Fechar personalização"
              onClick={() => setCustomizing(false)}
              className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Personalizar ${product.name}`}
              className="relative z-10 max-h-[88svh] w-full overflow-y-auto rounded-t-[2rem] bg-background p-5 shadow-lift sm:max-w-lg sm:rounded-[2rem] sm:p-6"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Personalize seu pedido</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Escolha o tamanho e depois 1 sabor.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomizing(false)}
                  aria-label="Fechar"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {product.variants && product.variants.length > 0 && (
                <section>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">1. Escolha o tamanho</p>
                    {!selectedVariant && <span className="text-xs font-medium text-destructive">Obrigatório</span>}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setVariantId(variant.id)}
                        className={cn(
                          "rounded-2xl border px-2 py-3 text-center text-xs font-semibold transition",
                          variant.id === variantId
                            ? "border-primary bg-primary text-primary-foreground shadow-soft"
                            : "border-border bg-card text-foreground hover:border-primary/30",
                        )}
                      >
                        <span className="block">{variant.label}</span>
                        <span className="mt-1 block text-[11px] opacity-80">{brl(variant.price)}</span>
                      </button>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">2. Escolha o sabor</p>
                  {!flavor && <span className="text-xs font-medium text-destructive">Obrigatório</span>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.flavors?.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFlavor(item)}
                      className={cn(
                        "min-h-11 rounded-2xl border px-3 py-2.5 text-sm font-semibold transition",
                        flavor === item
                          ? "border-primary bg-accent text-primary shadow-soft"
                          : "border-border bg-card text-foreground/80 hover:border-primary/30",
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>

              <div className="mt-6 rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Sua escolha</p>
                    <p className="truncate text-sm font-semibold text-foreground">
                      {selectedVariant?.label ?? "Escolha o tamanho"}
                      {flavor ? ` • ${flavor}` : " • Escolha o sabor"}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-xl font-semibold text-primary">{brl(displayedPrice)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={confirmCustomization}
                disabled={!canAddCustom}
                className={cn(
                  "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-semibold transition",
                  canAddCustom
                    ? "bg-gradient-primary text-primary-foreground shadow-soft"
                    : "cursor-not-allowed bg-muted text-muted-foreground opacity-70",
                )}
              >
                <Plus className="h-4 w-4" />
                Adicionar ao carrinho
              </button>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <article
        className={cn(
          "group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
          featured && "border-gold/50",
        )}
      >
        <div className={cn("relative aspect-square overflow-hidden", isCustomImage && "bg-black")}>
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            className={cn(
              "h-full w-full",
              isCustomImage
                ? "object-contain"
                : "object-cover transition-transform duration-700 group-hover:scale-105",
            )}
          />
          {product.badge && (
            <span
              className={cn(
                "absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-soft",
                product.badge === "Promoção"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-gradient-gold text-gold-foreground",
              )}
            >
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-foreground">{product.name}</h3>
          <p className={cn("mt-1.5 text-sm leading-relaxed text-muted-foreground", !expanded && "line-clamp-2")}>
            {product.description}
          </p>
          {longDescription && (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-1 self-start text-xs font-semibold text-secondary hover:underline"
            >
              {expanded ? "ver menos" : "ver mais"}
            </button>
          )}

          {product.variants && product.variants.length > 0 && !hasFlavors && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Escolha uma opção</p>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setVariantId(variant.id)}
                    className={cn(
                      "rounded-2xl border px-2 py-2 text-center text-xs font-semibold transition",
                      variant.id === variantId
                        ? "border-primary bg-accent text-primary"
                        : "border-border bg-background text-foreground/75 hover:border-primary/30",
                    )}
                  >
                    <span className="block">{variant.label}</span>
                    <span className="mt-0.5 block text-[11px]">{brl(variant.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasFlavors && (
            <div className="mt-4 rounded-2xl border border-primary/15 bg-accent/40 px-3 py-2.5 text-xs text-foreground/80">
              <span className="font-semibold text-primary">Personalizável:</span> escolha tamanho + sabor antes de adicionar.
            </div>
          )}

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <div>
              {product.variants && !hasFlavors && <span className="block text-[11px] text-muted-foreground">Opção selecionada</span>}
              {hasFlavors && <span className="block text-[11px] text-muted-foreground">A partir de</span>}
              <span className="font-display text-2xl font-semibold text-primary">{brl(displayedPrice)}</span>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold shadow-soft",
                added ? "bg-success text-success-foreground" : "bg-gradient-primary text-primary-foreground",
              )}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />Adicionado
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />{hasFlavors ? "Escolher opções" : "Adicionar"}
                </>
              )}
            </button>
          </div>
        </div>
      </article>
      {customizer}
    </>
  );
}
