import { brl, business } from "@/data/business";
import { cartItemPrice, type CartItem } from "@/hooks/useCart";

const MAX_WHATSAPP_MESSAGE_LENGTH = 8000;

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

function stripControlCharacters(value: string) {
  return Array.from(value, (character) => {
    const code = character.codePointAt(0) ?? 0;
    return code <= 0x1f || code === 0x7f ? " " : character;
  }).join("");
}

function safeText(value: string, maxLength: number) {
  return stripControlCharacters(value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function whatsappLink(message: string) {
  const boundedMessage = message.slice(0, MAX_WHATSAPP_MESSAGE_LENGTH);
  return `https://api.whatsapp.com/send?phone=${business.whatsapp}&text=${encodeURIComponent(boundedMessage)}`;
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
  const safeCustomerName = safeText(customerName, 100);
  const safeAddress = safeText(address, 300);
  const safeNotes = safeText(notes, 500);
  const safePaymentMethod = safeText(paymentMethod, 50);

  const lines = items.slice(0, 40).map((item) => {
    const options = [item.variant?.label, item.flavor].filter(Boolean);
    const option = options.length > 0 ? ` — ${options.join(" — ")}` : "";
    return `• ${item.qty}x ${item.product.name}${option} — ${brl(item.qty * cartItemPrice(item))}`;
  });

  const safeCashAmount =
    cashAmount !== null && Number.isFinite(cashAmount) && cashAmount >= 0 && cashAmount <= 1_000_000
      ? cashAmount
      : null;
  const isCash = safePaymentMethod === "Dinheiro";
  const change = isCash && safeCashAmount !== null ? Math.max(0, safeCashAmount - subtotal) : null;

  return [
    `${emoji.pizza} *NOVO PEDIDO — ${business.name.toUpperCase()}*`,
    "",
    `${emoji.person} *DADOS DO CLIENTE*`,
    `${emoji.name} *Nome:* ${safeCustomerName}`,
    `${emoji.pin} *Endereço:* ${safeAddress}`,
    `${emoji.card} *Pagamento:* ${safePaymentMethod}`,
    ...(isCash && safeCashAmount !== null
      ? [
          `${emoji.cash} *Vai pagar com:* ${brl(safeCashAmount)}`,
          `${emoji.change} *Troco:* ${brl(change ?? 0)}`,
        ]
      : [`${emoji.change} *Troco:* Não se aplica`]),
    "",
    `${emoji.cart} *ITENS DO PEDIDO*`,
    ...lines,
    "",
    `${emoji.money} *Subtotal:* ${brl(subtotal)}`,
    `${emoji.note} *Observações:* ${safeNotes || "Nenhuma"}`,
    "",
    `${emoji.check} Pedido enviado pelo cardápio digital.`,
  ].join("\n");
}
