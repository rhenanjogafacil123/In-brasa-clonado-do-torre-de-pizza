import { brl, business } from "@/data/business";
import type { CartItem } from "@/hooks/useCart";
export function whatsappLink(message:string){return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;}
export function orderMessage(items:CartItem[],subtotal:number,notes:string){const code=`TP-${Date.now().toString().slice(-5)}`;const lines=items.map(i=>`• ${i.qty}x ${i.product.name} — ${brl(i.qty*i.product.price)}`);return [`*Novo pedido — ${business.name}*`,`Pedido: ${code}`,"",...lines,"",`*Subtotal:* ${brl(subtotal)}`,notes.trim()?`*Observações:* ${notes.trim()}`:"*Observações:* —","","Enviado pelo cardápio digital."].join("\n");}
