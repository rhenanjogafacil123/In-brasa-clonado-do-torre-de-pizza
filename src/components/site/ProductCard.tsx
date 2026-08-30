import { useMemo, useState } from "react";
import { Check, Plus } from "lucide-react";
import { brl } from "@/data/business";
import type { Product } from "@/data/menu";
import { useCart } from "@/hooks/useCart";
import { productImage, productWithImage } from "@/lib/product-image";
import { cn } from "@/lib/utils";

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id ?? "");

  const selectedVariant = useMemo(
    () => product.variants?.find((variant) => variant.id === variantId),
    [product.variants, variantId],
  );

  const displayedPrice = selectedVariant?.price ?? product.price;
  const displayImage = productImage(product);
  const longDescription = product.description.length > 68;

  const handleAdd = () => {
    add(productWithImage(product), selectedVariant);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        featured && "border-gold/50",
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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

        {product.variants && product.variants.length > 0 && (
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

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            {product.variants && <span className="block text-[11px] text-muted-foreground">Opção selecionada</span>}
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
                <Plus className="h-4 w-4" />Adicionar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
