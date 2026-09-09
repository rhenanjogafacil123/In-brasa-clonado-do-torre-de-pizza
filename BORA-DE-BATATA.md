# Bora de Batata

Adaptação do repositório existente, preservando navegação, busca, categorias,
seleção de variantes, personalização, carrinho e pedido pelo WhatsApp.

O cardápio foi conferido nas imagens fornecidas: sete sabores de batata em
300g e 500g; pastel de até sete ingredientes por R$ 18,99; pastel completo
por R$ 24,99; refrigerante lata por R$ 6,80 e Guaracamp por R$ 2,50.

Contato: (21) 99054-3204. Somente delivery, a partir das 19h.
Endereço de saída e tarifa de entrega ainda não foram fornecidos. O checkout
envia o valor parcial dos produtos com frete explicitamente a combinar.
A taxa de uso de R$ 1,15 do template anterior não foi transferida à nova marca.

A publicação na Vercel foi adiada a pedido do usuário. O alias da Torre foi
retirado da configuração para evitar vincular a nova marca àquele endereço.

## Verificação

- `node scripts/verify-bora.cjs`: preços, opções, carrinho e mensagem WhatsApp.
- `node node_modules/typescript/bin/tsc --noEmit`
- `node node_modules/vite/bin/vite.js build`
- Testes de navegador: tamanho grande, adição ao carrinho, total de R$ 41,49
  (batata grande + pastel), limite de sete ingredientes e bloqueio de oitavo.
- Nenhum pedido real foi enviado.

## Imagens

`public/bora-hero.png` foi gerada com a ferramenta integrada ImageGen como
imagem ilustrativa, também usada nos cards. `public/bora-logo.svg` é uma
assinatura tipográfica; `public/bora-drink.svg` é uma ilustração genérica.

Prompt da Hero: “Create a photorealistic food advertising photograph for
Brazilian Bora de Batata delivery website hero. Wide landscape 1536x1024.
Black charcoal background, rustic dark wood table, warm golden side light.
Right half features a generous white ceramic bowl of Brazilian batata recheada
with creamy potato, melted cheddar, diced crispy bacon and fresh chives,
alongside a large golden crispy Brazilian pastel cut open showing beef and
cheese. Left half dark empty negative space for website text. Appetizing
realistic food texture, subtle steam, editorial premium photography. No text,
no lettering, no logo. This is an illustrative marketing image.”
