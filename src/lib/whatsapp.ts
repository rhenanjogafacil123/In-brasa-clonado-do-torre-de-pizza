import { brl, business } from "@/data/business";
import { cartItemPrice, type CartItem } from "@/hooks/useCart";

const emoji = {
  pizza: String.fromCodePoint(0x1f355),
  person: String.fromCodePoint(0x1f464),
  name: String.fromCodePoint(0x1f64b),
  pin: String.fromCodePoint(0x1f4cd),
  card: String.fromCodePoint(0x1f4b3),
  cash: String.fromCodePoint(0x1f4b5),
  change: String.fromCodePoint(0x1f504),
  cart: String.fromCodePoint(0x1f6d2),
  money: String.fromCodePoint(0x1f4b0),
  note: String.fromCodePoint(0x1f4dd),
  check: String.fromCodePoint(0x2705),
} as const;

export function whatsappLink(message: string) {
  return `https://api.whatsapp.com/send?phone=${business.whatsapp}&text=${encodeURIComponent(message)}`;
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
  const lines = items.map((item) => {
    const option = item.variant ? ` (${item.variant.label})` : "";
    return `• ${item.qty}x ${item.product.name}${option} — ${brl(item.qty * cartItemPrice(item))}`;
  });

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
      ? [`${emoji.cash} *Vai pagar com:* ${brl(cashAmount)}`, `${emoji.change} *Troco:* ${brl(change ?? 0)}`]
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
