import { business } from "@/data/business";
export function Info() {
  return (
    <section className="px-4 py-8 text-center">
      <p>{business.hours}</p>
      <p>{business.phone} • Somente delivery</p>
    </section>
  );
}
