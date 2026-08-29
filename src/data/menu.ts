export type CategoryId = "destaques" | "pizzas" | "combos" | "bebidas" | "sobremesas" | "outros";
export type Product = { id:string; name:string; description:string; price:number; oldPrice?:number; image:string; category:Exclude<CategoryId,"destaques">; badge?:"Mais pedido"|"Favorita da casa"|"Promoção"; featured?:boolean };

const base="https://pizza-prime-digital.lovable.app/assets/";
export const categories:{id:CategoryId;label:string}[]=[
 {id:"destaques",label:"Destaques"},{id:"pizzas",label:"Pizzas"},{id:"combos",label:"Combos"},{id:"bebidas",label:"Bebidas"},{id:"sobremesas",label:"Sobremesas"},{id:"outros",label:"Outros"},
];
export const products:Product[]=[
 {id:"calabresa",name:"Calabresa Artesanal",description:"Molho de tomate italiano, mussarela, calabresa fatiada e cebola caramelizada.",price:62.9,image:base+"pizza-calabresa-B_tJUryw.jpg",category:"pizzas",badge:"Mais pedido",featured:true},
 {id:"margherita",name:"Margherita da Casa",description:"Mussarela de búfala, tomate San Marzano e manjericão fresco.",price:59.9,image:base+"pizza-margherita-C28jY11B.jpg",category:"pizzas",badge:"Favorita da casa",featured:true},
 {id:"portuguesa",name:"Portuguesa Completa",description:"Presunto, ovo, azeitonas pretas, cebola e ervilha sobre mussarela.",price:66.9,image:"https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=85",category:"pizzas"},
 {id:"quatro-queijos",name:"Quatro Queijos",description:"Mussarela, provolone, gorgonzola e parmesão gratinados na pedra.",price:69.9,image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",category:"pizzas"},
 {id:"combo-familia",name:"Combo Família",description:"2 pizzas grandes + refrigerante 2L + porção de pão de alho.",price:119.9,oldPrice:149.9,image:base+"combo-familia-BiNCYrSJ.jpg",category:"combos",badge:"Promoção",featured:true},
 {id:"combo-casal",name:"Combo Casal",description:"1 pizza grande + 1 pizza doce broto + 2 refrigerantes lata.",price:89.9,oldPrice:104.9,image:base+"combo-familia-BiNCYrSJ.jpg",category:"combos"},
 {id:"refri-2l",name:"Refrigerante 2L",description:"Cola, guaraná ou laranja. Sempre bem gelado.",price:14.9,image:"https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=700&q=85",category:"bebidas"},
 {id:"refri-lata",name:"Refrigerante Lata",description:"350ml gelado, escolha o sabor na observação do pedido.",price:7.5,image:"https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=700&q=85",category:"bebidas"},
 {id:"pizza-chocolate",name:"Chocolate com Morango",description:"Chocolate meio amargo derretido com morangos frescos e hortelã.",price:54.9,image:base+"pizza-chocolate-us3AiGCD.jpg",category:"sobremesas",badge:"Favorita da casa",featured:true},
 {id:"pao-de-alho",name:"Pão de Alho Gratinado",description:"Porção com 6 unidades, alho artesanal e mussarela derretida.",price:24.9,image:base+"combo-familia-BiNCYrSJ.jpg",category:"outros"},
];
