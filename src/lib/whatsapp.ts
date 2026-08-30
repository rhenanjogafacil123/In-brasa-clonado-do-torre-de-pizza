import { brl, business } from "@/data/business";
import type { CartItem } from "@/hooks/useCart";

const emoji = {
  pizza: "\u{1F355}",
  person: "\u{1F464}",
  name: "\u{1F64B}",
  pin: "\u{1F4CD}",
  card: "\u{1F4B3}",
  cash: "\u{1F4B5}",
  change: "\u{1F504}",
  cart: "\u{1F6D2}",
  money: "\u{1F4B0}",
  note: "\u{1F4DD}",
  check: "\u2705",
} as const;

export function whatsappLink(message: string) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${business.whatsapp}?${params.toString()}`;
}

export function orderMessage(
  items: CartItem[],
  subtotal: number,
  notes: string,
  customerName: string,
  address: string,
  paymentMethod: string,
  cashAmount: number | null,
) {
  const lines = items.map(
    (i) => `\u2022 ${i.qty}x ${i.product.name} — ${brl(i.qty * i.product.price)}`,
  );

  const isCash = paymentMethod === "Dinheiro";
  const change = isCash && cashAmount !== null ? Math.max(0, cashAmount - subtotal) : null;

  return [
    `${emoji.pizza} *NOVO PEDIDO — ${business.name.toUpperCase()}*`,
    "",
    `${emoji.person} *DADOS DO CLIENTE*`,
    `${emoji.name} *Nome:* ${customerName.trim()}`,
    `${emoji.pin} *Endereço:* ${address.trim()}`,
    `${emoji.card} *Pagamento:* ${paymentMethod}`,
    ...(isCash && cashAmount !== null
      ? [
          `${emoji.cash} *Vai pagar com:* ${brl(cashAmount)}`,
          `${emoji.change} *Troco:* ${brl(change ?? 0)}`,
        ]
      : [`${emoji.change} *Troco:* Não se aplica`]),
    "",
    `${emoji.cart} *ITENS DO PEDIDO*`,
    ...lines,
    "",
    `${emoji.money} *Subtotal:* ${brl(subtotal)}`,
    `${emoji.note} *Observações:* ${notes.trim() || "Nenhuma"}`,
    "",
    `${emoji.check} Pedido enviado pelo cardápio digital.`,
  ].join("\n");
}
