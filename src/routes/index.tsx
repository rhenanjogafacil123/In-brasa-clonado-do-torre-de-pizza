import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/hooks/useCart";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Featured } from "@/components/site/Featured";
import { MenuSection } from "@/components/site/MenuSection";
import { About } from "@/components/site/About";
import { Info } from "@/components/site/Info";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { MobileCartBar } from "@/components/site/MobileCartBar";
const title="Torre de Pizza | Pizzaria artesanal em Campo Grande – RJ";
const description="Cardápio digital da Torre de Pizza: pizzas artesanais no forno a lenha, combos e sobremesas. Delivery, retirada e atendimento no local em Campo Grande – RJ.";
export const Route=createFileRoute("/")({head:()=>({meta:[{title},{name:"description",content:description},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"restaurant"},{name:"twitter:card",content:"summary_large_image"}]}),component:Index});
function Index(){return <CartProvider><Header/><main><Hero/><Featured/><MenuSection/><About/><Info/><Contact/></main><Footer/><CartDrawer/><MobileCartBar/></CartProvider>}
