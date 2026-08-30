import { cartItemPrice, type CartItem } from "@/hooks/useCart";

type TrackArgs = {
  items: CartItem[];
  subtotal: number;
  notes?: string;
  paymentMethod?: string;
  cashAmount?: number | null;
};

function buildPayload({ items, subtotal, notes, paymentMethod, cashAmount }: TrackArgs) {
  return {
    clicked_at: new Date().toISOString(),
    items: items.map((item) => {
      const unit = cartItemPrice(item);
      const options = [item.variant?.label, item.flavor].filter(Boolean) as string[];
      return {
        product_id: item.product.id,
        product_name: item.product.name,
        category: (item.product as { category?: string }).category ?? null,
        variant_id: item.variant?.id ?? null,
        variant_label: item.variant?.label ?? null,
        flavor: item.flavor ?? null,
        options,
        extra_price: item.extraPrice ?? 0,
        qty: item.qty,
        unit_price: unit,
        line_total: Number((unit * item.qty).toFixed(2)),
      };
    }),
    items_count: items.reduce((sum, item) => sum + item.qty, 0),
    subtotal: Number(subtotal.toFixed(2)),
    payment_method: paymentMethod ?? null,
    cash_amount: cashAmount ?? null,
    notes: notes?.trim() ? notes.trim() : null,
    source: "whatsapp_checkout",
    page_url: typeof window === "undefined" ? null : window.location.href,
  };
}

/**
 * Registro discreto do clique final de "Finalizar no WhatsApp".
 * Usa fetch com keepalive direto no PostgREST para que a requisição
 * sobreviva à navegação/abertura do WhatsApp. Nunca bloqueia a UI
 * nem lança erro para o cliente.
 */
export function trackWhatsappOrderClick(args: TrackArgs): Promise<void> {
  try {
    const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
    const key = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"] as string | undefined;
    if (!url || !key) return Promise.resolve();

    const body = JSON.stringify(buildPayload(args));

    return fetch(`${url}/rest/v1/order_clicks`, {
      method: "POST",
      keepalive: true,
      headers: {
        "content-type": "application/json",
        apikey: key,
        Prefer: "return=minimal",
      },
      body,
    })
      .then((res) => {
        if (!res.ok) {
          console.warn("order tracking failed", res.status);
          try {
            navigator.sendBeacon?.(
              `${url}/rest/v1/order_clicks?apikey=${encodeURIComponent(key)}`,
              new Blob([body], { type: "application/json" }),
            );
          } catch {
            /* ignorado */
          }
        }
      })
      .catch(() => {
        /* rastreamento nunca deve quebrar o pedido */
      });
  } catch {
    return Promise.resolve();
  }
}
