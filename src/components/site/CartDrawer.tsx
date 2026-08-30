import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { brl } from "@/data/business";
import { useCart } from "@/hooks/useCart";
import { orderMessage, whatsappLink } from "@/lib/whatsapp";

export function CartDrawer() {
  const { open, setOpen, items, subtotal, count, setQty, remove, notes, setNotes, clear } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  if (!open) return null;

  const finish = () => {
    if (!customerName.trim() || !address.trim() || !paymentMethod) {
      window.alert("Preencha seu nome, endereço e forma de pagamento antes de finalizar o pedido.");
      return;
    }

    window.open(
      whatsappLink(orderMessage(items, subtotal, notes, customerName, address, paymentMethod)),
      "_blank",
    );
    clear();
    setCustomerName("");
    setAddress("");
    setPaymentMethod("");
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Fechar carrinho"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
      />

      <aside className="animate-rise absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-lift">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">Seu pedido</h2>
            <p className="text-xs text-muted-foreground">
              {count > 0 ? `${count} item(ns) selecionado(s)` : "Monte sua combinação"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            className="grid h-10 w-10 place-items-center rounded-full bg-accent text-primary"
          >
            <X className="h-5 w-5" />
          </button>
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
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-soft">
                  <img src={product.image} alt={product.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-foreground">{product.name}</p>
                    <p className="text-sm text-primary">{brl(product.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty(product.id, qty - 1)}
                        className="grid h-8 w-8 place-items-center rounded-full bg-accent text-primary"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(product.id, qty + 1)}
                        className="grid h-8 w-8 place-items-center rounded-full bg-accent text-primary"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="ml-auto grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Dados para entrega</p>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="customer-name" className="mb-1.5 block text-sm font-medium text-foreground">Nome</label>
                    <input
                      id="customer-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-foreground">Endereço</label>
                    <textarea
                      id="address"
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua, número, complemento e bairro"
                      className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                    />
                  </div>

                  <div>
                    <label htmlFor="payment" className="mb-1.5 block text-sm font-medium text-foreground">Forma de pagamento</label>
                    <select
                      id="payment"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                    >
                      <option value="">Selecione...</option>
                      <option value="PIX">PIX</option>
                      <option value="Dinheiro">Dinheiro</option>
                      <option value="Cartão de crédito">Cartão de crédito</option>
                      <option value="Cartão de débito">Cartão de débito</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="obs" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">Observações</label>
                <textarea
                  id="obs"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex.: sem cebola, entregar no portão..."
                  className="w-full rounded-2xl border border-border bg-card p-4 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>

            <footer className="border-t border-border bg-card px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl font-semibold text-primary">{brl(subtotal)}</span>
              </div>
              <button
                type="button"
                onClick={finish}
                className="w-full rounded-full bg-gradient-gold py-4 text-base font-semibold text-gold-foreground shadow-gold"
              >
                Finalizar no WhatsApp
              </button>
              <p className="mt-2 text-center text-xs text-muted-foreground">Preencha seus dados e confirme tudo pelo WhatsApp.</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
