import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Обивка",
  description: "Каталог тканей и материалов Scanddy готовится.",
};

export default function ObivkaPage() {
  return (
    <section className="container stub">
      <p className="eyebrow">Раздел в работе</p>
      <h1 className="stub__title">Обивка</h1>
      <p className="stub__text">Готовим каталог тканей и материалов</p>
      <Link className="arrow-link" href="/#collection">
        Вернуться к коллекции
        <Arrow />
      </Link>
    </section>
  );
}
