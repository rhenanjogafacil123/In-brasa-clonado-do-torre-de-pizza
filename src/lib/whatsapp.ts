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
) {
  const code = `TP-${Date.now().toString().slice(-5)}`;
  const lines = items.map(
    (i) => `• ${i.qty}x ${i.product.name} — ${brl(i.qty * i.product.price)}`,
  );

  return [
    `🍕 *NOVO PEDIDO — ${business.name.toUpperCase()}*`,
    `🧾 *Pedido:* ${code}`,
    "",
    "👤 *DADOS DO CLIENTE*",
    `🙋 *Nome:* ${customerName.trim()}`,
    `📍 *Endereço:* ${address.trim()}`,
    `💳 *Pagamento:* ${paymentMethod}`,
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
