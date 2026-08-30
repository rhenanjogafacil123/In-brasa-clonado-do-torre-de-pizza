import { brl, business } from "@/data/business";
import type { CartItem } from "@/hooks/useCart";

export function whatsappLink(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
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
    (i) => `• ${i.qty}x ${i.product.name} — ${brl(i.qty * i.product.price)}`,
  );

  const isCash = paymentMethod === "Dinheiro";
  const change = isCash && cashAmount !== null ? Math.max(0, cashAmount - subtotal) : null;

  return [
    `🍕 *NOVO PEDIDO — ${business.name.toUpperCase()}*`,
    "",
    "👤 *DADOS DO CLIENTE*",
    `🙋 *Nome:* ${customerName.trim()}`,
    `📍 *Endereço:* ${address.trim()}`,
    `💳 *Pagamento:* ${paymentMethod}`,
    ...(isCash && cashAmount !== null
      ? [`💵 *Vai pagar com:* ${brl(cashAmount)}`, `🔄 *Troco:* ${brl(change ?? 0)}`]
      : ["🔄 *Troco:* Não se aplica"]),
    "",
    "🛒 *ITENS DO PEDIDO*",
    ...lines,
    "",
    `💰 *Subtotal:* ${brl(subtotal)}`,
    `📝 *Observações:* ${notes.trim() || "Nenhuma"}`,
    "",
    "✅ Pedido enviado pelo cardápio digital.",
  ].join("\n");
}
