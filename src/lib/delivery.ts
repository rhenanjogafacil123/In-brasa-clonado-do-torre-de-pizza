import { business } from "@/data/business";

export type DeliveryQuote = {
  distanceKm: number;
  fee: number | null;
};

type Coordinates = {
  lat: number;
  lon: number;
};

let lastGeocodeRequestAt = 0;
let cachedStoreCoordinates: Coordinates | null = null;

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function waitForGeocoderSlot() {
  const elapsed = Date.now() - lastGeocodeRequestAt;
  const minimumInterval = 1100;
  if (elapsed < minimumInterval) await wait(minimumInterval - elapsed);
  lastGeocodeRequestAt = Date.now();
}

async function geocodeAddress(value: string): Promise<Coordinates> {
  await waitForGeocoderSlot();

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "br");
  url.searchParams.set("q", value);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "Accept-Language": "pt-BR,pt;q=0.9",
    },
  });

  if (!response.ok) throw new Error("Não foi possível consultar o endereço agora.");

  const results = (await response.json()) as Array<{ lat?: string; lon?: string }>;
  const result = results[0];
  const lat = Number(result?.lat);
  const lon = Number(result?.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    throw new Error("Não encontramos esse endereço. Confira rua, número e bairro.");
  }

  return { lat, lon };
}

async function getStoreCoordinates() {
  if (cachedStoreCoordinates) return cachedStoreCoordinates;
  cachedStoreCoordinates = await geocodeAddress(`${business.address}, Brasil`);
  return cachedStoreCoordinates;
}

async function getDrivingDistanceKm(origin: Coordinates, destination: Coordinates) {
  const coordinates = `${origin.lon},${origin.lat};${destination.lon},${destination.lat}`;
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=false&alternatives=false&steps=false`;
  const response = await fetch(url);

  if (!response.ok) throw new Error("Não foi possível calcular a rota agora.");

  const data = (await response.json()) as {
    code?: string;
    routes?: Array<{ distance?: number }>;
  };
  const distanceMeters = Number(data.routes?.[0]?.distance);

  if (data.code !== "Ok" || !Number.isFinite(distanceMeters)) {
    throw new Error("Não foi possível calcular uma rota para esse endereço.");
  }

  return Math.round((distanceMeters / 1000) * 10) / 10;
}

export function calculateDeliveryFee(distanceKm: number) {
  const pricing = business.deliveryPricing;
  if (pricing.amount === null) return null;
  if (!Number.isFinite(distanceKm) || distanceKm < 0) return null;

  const everyKm = Math.max(pricing.everyKm, 0.1);
  const rawFee =
    pricing.calculation === "blocks"
      ? Math.ceil(distanceKm / everyKm) * pricing.amount
      : (distanceKm / everyKm) * pricing.amount;

  const fee = Math.max(pricing.minimumFee, rawFee);
  return Math.round(fee * 100) / 100;
}

export async function getDeliveryQuote(customerAddress: string): Promise<DeliveryQuote> {
  const cleanAddress = customerAddress.trim();
  if (!cleanAddress) throw new Error("Informe o endereço para calcular a entrega.");

  const origin = await getStoreCoordinates();
  const destination = await geocodeAddress(`${cleanAddress}, ${business.city}, Brasil`);
  const distanceKm = await getDrivingDistanceKm(origin, destination);

  const maximumDistance = business.deliveryPricing.maximumDistanceKm;
  if (maximumDistance !== null && distanceKm > maximumDistance) {
    throw new Error(`O endereço está fora do raio de entrega de ${maximumDistance} km.`);
  }

  return {
    distanceKm,
    fee: calculateDeliveryFee(distanceKm),
  };
}
