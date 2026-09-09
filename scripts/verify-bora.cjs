const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const localRequire = (name) => {
    if (!name.startsWith("@/")) return require(name);
    const base = path.join(root, "src", name.slice(2));
    return load(fs.existsSync(base + ".ts") ? base + ".ts" : base + ".tsx");
  };
  new Function("require", "module", "exports", code)(localRequire, module, module.exports);
  return module.exports;
}
const { products, categories, pastelIngredients } = load(path.join(root, "src/data/menu.ts"));
const { cartItemPrice, cartItemKey } = load(path.join(root, "src/hooks/useCart.tsx"));
const { orderMessage, whatsappLink } = load(path.join(root, "src/lib/whatsapp.ts"));
assert.deepEqual(
  categories.map((c) => c.id),
  ["batatas", "pasteis", "bebidas"],
);
assert.equal(products.length, 11);
assert.deepEqual(
  products.filter((p) => p.category === "batatas").map((p) => p.variants.map((v) => v.price)),
  [
    [19, 22.5],
    [20, 24],
    [20, 24],
    [17.5, 21.5],
    [17.5, 21.5],
    [16, 20],
    [16, 20],
  ],
);
const pastel = products.find((p) => p.id === "pastel-montavel");
assert.equal(pastel.customGroups[0].max, 7);
assert.equal(pastel.customGroups[0].min, 1);
assert.equal(pastelIngredients.length, 14);
assert.equal(pastel.price, 18.99);
assert.equal(products.find((p) => p.id === "pastel-completo").price, 24.99);
assert.deepEqual(
  products.filter((p) => p.category === "bebidas").map((p) => p.price),
  [6.8, 2.5],
);
const potato = products[0];
const items = [
  { product: potato, variant: potato.variants[1], qty: 1 },
  { product: pastel, flavor: "Ingredientes do pastel: Carne, Frango, Milho", qty: 1 },
];
const subtotal = items.reduce((sum, item) => sum + cartItemPrice(item) * item.qty, 0);
assert.equal(Math.round(subtotal * 100), 4149);
assert.notEqual(cartItemKey(potato, potato.variants[0]), cartItemKey(potato, potato.variants[1]));
const message = orderMessage(
  items,
  subtotal,
  "Pedido de teste",
  "Teste",
  "Rua de teste, 10",
  "Referência de teste",
  "PIX",
  null,
  "delivery",
  null,
  null,
);
assert.match(message, /BORA DE BATATA/);
assert.match(message, /Grande • 500g/);
assert.match(message, /Ingredientes do pastel: Carne, Frango, Milho/);
assert.match(message, /Total parcial \(sem frete\)/);
assert.match(message, /A combinar pelo WhatsApp/);
assert.doesNotMatch(message, /Torre|Refri 2L|Taxa de uso do site/);
assert.match(whatsappLink(message), /phone=5521990543204/);
assert.equal(new URL(whatsappLink(message)).searchParams.get("text"), message);
console.log(
  "PASS: 14 preços de batata, pastéis, bebidas, variantes, total e mensagem WhatsApp com frete pendente.",
);
