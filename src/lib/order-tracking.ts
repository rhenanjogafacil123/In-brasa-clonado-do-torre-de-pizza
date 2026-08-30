import { supabase } from "@/integrations/supabase/client";
import { cartItemPrice, type CartItem } from "@/hooks/useCart";

type TrackArgs = {
  items: CartItem[];
  subtotal: number;
  notes?: string;
  paymentMethod?: string;
  cashAmount?: number | null;
};

/**
 * Registro discreto do clique final de "Finalizar no WhatsApp".
 * Não bloqueia a UI e nunca lança erro para o cliente.
 */
export function trackWhatsappOrderClick({ items, subtotal, notes, paymentMethod, cashAmount }: TrackArgs) {
  try {
    const payload = {
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

    void supabase
      .from("order_clicks")
      .insert(payload)
      .then(({ error }) => {
        if (error) console.warn("order tracking failed", error.message);
      });
  } catch {
    /* rastreamento nunca deve quebrar o pedido */
  }
}
