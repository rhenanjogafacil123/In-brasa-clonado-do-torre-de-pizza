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
  const hasCustomGroups = Boolean(product.customGroups?.length);
  const isCustomizable = hasFlavors || hasCustomGroups;
  const variantLabel = product.variantLabel ?? "opção";
  const [added, setAdded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [flavor, setFlavor] = useState("");
  const [groupSelections, setGroupSelections] = useState<Record<string, string[]>>({});
  const [variantId, setVariantId] = useState(isCustomizable ? "" : product.variants?.[0]?.id ?? "");

  const selectedVariant = useMemo(
    () => product.variants?.find((variant) => variant.id === variantId),
    [product.variants, variantId],
  );

  const displayedPrice = selectedVariant?.price ?? product.price;
  const displayImage = productImage(product);
  const isCustomImage = displayImage.startsWith("/menu/");
  const longDescription = product.description.length > 68;
  const customGroupsValid =
    product.customGroups?.every((group) => (groupSelections[group.id]?.length ?? 0) >= (group.min ?? 0)) ?? true;
  const canAddCustom =
    (!product.variants?.length || Boolean(selectedVariant)) && (!hasFlavors || Boolean(flavor)) && customGroupsValid;

  const showAddedFeedback = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const handleAdd = () => {
    if (isCustomizable) {
      setCustomizing(true);
      return;
    }

    add(productWithImage(product), selectedVariant);
    showAddedFeedback();
  };

  const toggleGroupOption = (groupId: string, option: string, max = 1) => {
    setGroupSelections((current) => {
      const selected = current[groupId] ?? [];
      if (selected.includes(option)) {
        return { ...current, [groupId]: selected.filter((item) => item !== option) };
      }
      if (max === 1) return { ...current, [groupId]: [option] };
      if (selected.length >= max) return current;
      return { ...current, [groupId]: [...selected, option] };
    });
  };

  const selectedCustomDetails = [
    flavor || "",
    ...(product.customGroups ?? []).flatMap((group) => {
      const selected = groupSelections[group.id] ?? [];
      return selected.length > 0 ? [`${group.label}: ${selected.join(", ")}`] : [];
    }),
  ].filter(Boolean);

  const resetCustomization = () => {
    setFlavor("");
    setGroupSelections({});
    setVariantId("");
  };

  const closeCustomization = () => {
    setCustomizing(false);
    resetCustomization();
  };

  const confirmCustomization = () => {
    if (!canAddCustom) return;

    add(productWithImage(product), selectedVariant, selectedCustomDetails.join(" • ") || undefined);
    setCustomizing(false);
    resetCustomization();
    showAddedFeedback();
  };

  const customizer =
    customizing && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
            <button
              type="button"
              aria-label="Fechar personalização"
              onClick={closeCustomization}
              className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Personalizar ${product.name}`}
              className="relative z-10 flex h-[94svh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-background shadow-lift sm:h-auto sm:max-h-[90svh] sm:max-w-xl sm:rounded-[2rem]"
            >
              <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-4 sm:px-5">
                <div className={cn("h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-muted", isCustomImage && "bg-black")}>
                  <img
                    src={displayImage}
                    alt={product.name}
                    className={cn("h-full w-full", isCustomImage ? "object-contain" : "object-cover")}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">Personalize seu pedido</p>
                  <h3 className="truncate font-display text-xl font-semibold text-foreground">{product.name}</h3>
                  <p className="mt-0.5 font-display text-lg font-semibold text-primary">{brl(displayedPrice)}</p>
                </div>
                <button
                  type="button"
                  onClick={closeCustomization}
                  aria-label="Fechar"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto bg-muted/25">
                {product.variants && product.variants.length > 0 && (
                  <section className="border-b border-border bg-background px-4 py-5 sm:px-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-semibold text-foreground">Escolha o {variantLabel}</h4>
                        <p className="mt-0.5 text-sm text-muted-foreground">Escolha 1 opção</p>
                      </div>
                      <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">Obrigatório</span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-border bg-card">
                      {product.variants.map((variant, index) => {
                        const checked = variant.id === variantId;
                        return (
                          <button
                            key={variant.id}
                            type="button"
                            onClick={() => setVariantId(variant.id)}
                            className={cn(
                              "flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left transition",
                              index > 0 && "border-t border-border",
                              checked && "bg-accent/55",
                            )}
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground">{variant.label}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">{brl(variant.price)}</p>
                            </div>
                            <span
                              className={cn(
                                "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition",
                                checked ? "border-primary bg-primary" : "border-muted-foreground/35 bg-background",
                              )}
                            >
                              {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}

                {hasFlavors && (
                  <section className="border-b border-border bg-background px-4 py-5 sm:px-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-semibold text-foreground">Escolha o sabor</h4>
                        <p className="mt-0.5 text-sm text-muted-foreground">Escolha 1 opção</p>
                      </div>
                      <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">Obrigatório</span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-border bg-card">
                      {product.flavors?.map((item, index) => {
                        const checked = flavor === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setFlavor(item)}
                            className={cn(
                              "flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left transition",
                              index > 0 && "border-t border-border",
                              checked && "bg-accent/55",
                            )}
                          >
                            <p className="text-sm font-semibold text-foreground">{item}</p>
                            <span
                              className={cn(
                                "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition",
                                checked ? "border-primary bg-primary" : "border-muted-foreground/35 bg-background",
                              )}
                            >
                              {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}

                {product.customGroups?.map((group) => {
                  const selected = groupSelections[group.id] ?? [];
                  const min = group.min ?? 0;
                  const max = group.max ?? 1;
                  const isRemoval = group.id === "retirar";
                  const singleChoice = max === 1;
                  const statusLabel = min > 0 ? "Obrigatório" : "Opcional";
                  const helpText = isRemoval
                    ? "Selecione os ingredientes que deseja retirar (opcional)"
                    : group.hint ?? (singleChoice ? "Escolha até 1 opção" : `Escolha até ${max} opções`);

                  return (
                    <section key={group.id} className="border-b border-border bg-background px-4 py-5 sm:px-5">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-base font-semibold text-foreground">
                            {isRemoval ? "O que você quer retirar?" : group.label}
                          </h4>
                          <p className="mt-0.5 text-sm text-muted-foreground">{helpText}</p>
                        </div>
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-xs font-semibold",
                            min > 0
                              ? "bg-destructive/10 text-destructive"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {statusLabel}
                        </span>
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-border bg-card">
                        {group.options.map((option, index) => {
                          const checked = selected.includes(option);
                          const limitReached = !checked && max > 1 && selected.length >= max;

                          return (
                            <button
                              key={option}
                              type="button"
                              disabled={limitReached}
                              onClick={() => toggleGroupOption(group.id, option, max)}
                              className={cn(
                                "flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left transition",
                                index > 0 && "border-t border-border",
                                checked && (isRemoval ? "bg-destructive/8" : "bg-accent/55"),
                                limitReached && "cursor-not-allowed opacity-45",
                              )}
                            >
                              <div className="min-w-0">
                                <p className={cn("text-sm font-semibold", checked && isRemoval ? "text-destructive" : "text-foreground")}>
                                  {option}
                                </p>
                                {checked && isRemoval && <p className="mt-0.5 text-xs font-medium text-destructive/80">Será retirado</p>}
                              </div>

                              {singleChoice ? (
                                <span
                                  className={cn(
                                    "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition",
                                    checked ? "border-primary bg-primary" : "border-muted-foreground/35 bg-background",
                                  )}
                                >
                                  {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />}
                                </span>
                              ) : (
                                <span
                                  className={cn(
                                    "grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 transition",
                                    checked
                                      ? isRemoval
                                        ? "border-destructive bg-destructive text-destructive-foreground"
                                        : "border-primary bg-primary text-primary-foreground"
                                      : "border-muted-foreground/35 bg-background",
                                  )}
                                >
                                  {checked && <Check className="h-4 w-4" />}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>

              <div className="border-t border-border bg-background p-4 sm:p-5">
                <button
                  type="button"
                  onClick={confirmCustomization}
                  disabled={!canAddCustom}
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold transition",
                    canAddCustom
                      ? "bg-gradient-primary text-primary-foreground shadow-soft"
                      : "cursor-not-allowed bg-muted text-muted-foreground opacity-70",
                  )}
                >
                  <Plus className="h-4 w-4" />
                  Adicionar • {brl(displayedPrice)}
                </button>
              </div>
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

          {product.variants && product.variants.length > 0 && !isCustomizable && (
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
              {product.variants && !isCustomizable && <span className="block text-[11px] text-muted-foreground">Opção selecionada</span>}
              {isCustomizable && <span className="block text-[11px] text-muted-foreground">A partir de</span>}
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
                  <Plus className="h-4 w-4" />{isCustomizable ? "Escolher opções" : "Adicionar"}
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
