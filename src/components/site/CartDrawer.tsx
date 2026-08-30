import { useState } from "react";
import {
  AlertCircle,
  Banknote,
  CreditCard,
  MapPin,
  MessageSquareText,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { brl } from "@/data/business";
import { useCart } from "@/hooks/useCart";
import { orderMessage, whatsappLink } from "@/lib/whatsapp";

const paymentOptions = [
  { value: "PIX", label: "PIX", icon: CreditCard },
  { value: "Dinheiro", label: "Dinheiro", icon: Banknote },
  { value: "Cartão de crédito", label: "Crédito", icon: CreditCard },
  { value: "Cartão de débito", label: "Débito", icon: CreditCard },
] as const;

export function CartDrawer() {
  const { open, setOpen, items, subtotal, count, setQty, remove, notes, setNotes, clear } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  if (!open) return null;

  const parsedCash = cashAmount.trim() ? Number(cashAmount.replace(",", ".")) : Number.NaN;
  const validCashValue = Number.isFinite(parsedCash) ? parsedCash : null;
  const change = paymentMethod === "Dinheiro" && validCashValue !== null ? validCashValue - subtotal : null;

  const nameMissing = attemptedSubmit && !customerName.trim();
  const addressMissing = attemptedSubmit && !address.trim();
  const paymentMissing = attemptedSubmit && !paymentMethod;
  const cashMissing = attemptedSubmit && paymentMethod === "Dinheiro" && validCashValue === null;
  const cashInsufficient = paymentMethod === "Dinheiro" && validCashValue !== null && validCashValue < subtotal;

  const resetCheckout = () => {
    setCustomerName("");
    setAddress("");
    setPaymentMethod("");
    setCashAmount("");
    setAttemptedSubmit(false);
  };

  const finish = () => {
    setAttemptedSubmit(true);

    const missing: string[] = [];
    if (!customerName.trim()) missing.push("nome");
    if (!address.trim()) missing.push("endereço");
    if (!paymentMethod) missing.push("forma de pagamento");

    if (missing.length > 0) {
      window.alert(`Antes de finalizar, preencha: ${missing.join(", ")}.`);
      return;
    }

    if (paymentMethod === "Dinheiro") {
      if (validCashValue === null) {
        window.alert("Informe com quanto você vai pagar em dinheiro para calcular o troco.");
        return;
      }

      if (validCashValue < subtotal) {
        window.alert(`O valor informado precisa ser pelo menos ${brl(subtotal)}.`);
        return;
      }
    }

    if (!notes.trim()) {
      const continueWithoutNotes = window.confirm(
        "Você não adicionou observações ao pedido. Confira se precisa informar algo como: sem cebola, ponto de referência ou instrução de entrega. Deseja finalizar sem observações?",
      );
      if (!continueWithoutNotes) return;
    }

    window.open(
      whatsappLink(
        orderMessage(
          items,
          subtotal,
          notes,
          customerName,
          address,
          paymentMethod,
          paymentMethod === "Dinheiro" ? validCashValue : null,
        ),
      ),
      "_blank",
    );

    clear();
    resetCheckout();
    setOpen(false);
  };

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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Finalizar pedido</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">Confira e envie pelo WhatsApp</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {count} item(ns) no carrinho • campos com * são obrigatórios
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-primary transition hover:scale-105"
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
            <p className="mt-2 text-sm text-muted-foreground">Escolha uma pizza no cardápio e ela aparece aqui.</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Ver cardápio
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              <section>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">Seu pedido</h3>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{count} item(ns)</span>
                </div>

                <div className="space-y-3">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-soft">
                      <img src={product.image} alt={product.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-foreground">{product.name}</p>
                        <p className="text-sm font-medium text-primary">{brl(product.price)}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            className="grid h-8 w-8 place-items-center rounded-full bg-accent text-primary"
                            aria-label={`Diminuir quantidade de ${product.name}`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            className="grid h-8 w-8 place-items-center rounded-full bg-accent text-primary"
                            aria-label={`Aumentar quantidade de ${product.name}`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(product.id)}
                            className="ml-auto grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            aria-label={`Remover ${product.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-border bg-card p-4 shadow-soft">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-primary">
                    <UserRound className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">1. Dados para entrega</h3>
                    <p className="text-xs text-muted-foreground">Precisamos dessas informações para receber o pedido.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="customer-name" className="mb-1.5 block text-sm font-medium text-foreground">
                      Nome <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex.: João da Silva"
                      aria-invalid={nameMissing}
                      className={`w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-4 focus:ring-primary/10 ${
                        nameMissing ? "border-destructive ring-2 ring-destructive/10" : "border-border"
                      }`}
                    />
                    {nameMissing && <p className="mt-1.5 text-xs font-medium text-destructive">Informe seu nome para continuar.</p>}
                  </div>

                  <div>
                    <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-foreground">
                      Endereço <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
                      <textarea
                        id="address"
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Rua, número, complemento e bairro"
                        aria-invalid={addressMissing}
                        className={`w-full resize-none rounded-2xl border bg-background py-3 pl-11 pr-4 text-sm outline-none transition focus:ring-4 focus:ring-primary/10 ${
                          addressMissing ? "border-destructive ring-2 ring-destructive/10" : "border-border"
                        }`}
                      />
                    </div>
                    {addressMissing && <p className="mt-1.5 text-xs font-medium text-destructive">Informe o endereço para entrega.</p>}
                  </div>
                </div>
              </section>

              <section className={`rounded-3xl border bg-card p-4 shadow-soft ${paymentMissing ? "border-destructive" : "border-border"}`}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-primary">
                    <CreditCard className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      2. Forma de pagamento <span className="text-destructive">*</span>
                    </h3>
                    <p className="text-xs text-muted-foreground">Escolha como deseja pagar.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {paymentOptions.map(({ value, label, icon: Icon }) => {
                    const selected = paymentMethod === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setPaymentMethod(value);
                          if (value !== "Dinheiro") setCashAmount("");
                        }}
                        aria-pressed={selected}
                        className={`flex min-h-14 items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                          selected
                            ? "border-primary bg-primary text-primary-foreground shadow-soft"
                            : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-accent/50"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    );
                  })}
                </div>

                {paymentMissing && <p className="mt-2 text-xs font-medium text-destructive">Selecione uma forma de pagamento.</p>}

                {paymentMethod === "Dinheiro" && (
                  <div className={`mt-4 rounded-2xl border p-4 ${cashInsufficient || cashMissing ? "border-destructive bg-destructive/5" : "border-primary/20 bg-accent/40"}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-primary" />
                      <label htmlFor="cash-amount" className="text-sm font-semibold text-foreground">
                        Vai pagar com quanto? <span className="text-destructive">*</span>
                      </label>
                    </div>
                    <input
                      id="cash-amount"
                      type="text"
                      inputMode="decimal"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      placeholder={`Ex.: ${Math.ceil(subtotal / 10) * 10},00`}
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                    />
                    {change !== null && change >= 0 && (
                      <div className="mt-3 flex items-center justify-between rounded-xl bg-background px-3 py-2">
                        <span className="text-xs text-muted-foreground">Troco calculado</span>
                        <span className="font-semibold text-primary">{brl(change)}</span>
                      </div>
                    )}
                    {cashMissing && <p className="mt-2 text-xs font-medium text-destructive">Informe o valor que será entregue ao motoboy.</p>}
                    {cashInsufficient && (
                      <p className="mt-2 text-xs font-medium text-destructive">O valor precisa ser pelo menos {brl(subtotal)}.</p>
                    )}
                  </div>
                )}
              </section>

              <section className="rounded-3xl border border-primary/20 bg-accent/30 p-4">
                <div className="mb-3 flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-background text-primary">
                    <MessageSquareText className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-foreground">3. Observações</h3>
                      <span className="rounded-full bg-background px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">Opcional</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Confira se precisa avisar algo sobre o pedido ou a entrega.
                    </p>
                  </div>
                </div>

                <textarea
                  id="obs"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex.: sem cebola, tirar azeitona, tocar o interfone, ponto de referência..."
                  className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                />

                {!notes.trim() && (
                  <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p>Você pode deixar vazio. Antes de enviar, só vamos lembrar você de conferir se esqueceu alguma instrução.</p>
                  </div>
                )}
              </section>
            </div>

            <footer className="border-t border-border bg-card px-5 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Total do pedido</p>
                  <p className="text-xs text-muted-foreground">Entrega e confirmação pelo WhatsApp</p>
                </div>
                <span className="font-display text-3xl font-semibold text-primary">{brl(subtotal)}</span>
              </div>

              <button
                type="button"
                onClick={finish}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-4 text-base font-semibold text-gold-foreground shadow-gold transition hover:-translate-y-0.5"
              >
                Finalizar no WhatsApp
              </button>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">Se faltar algum dado obrigatório, o pedido não será enviado.</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
