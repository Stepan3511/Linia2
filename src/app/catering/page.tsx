import type { Metadata } from "next";
import Catering from "./Catering";

export const metadata: Metadata = {
  title: "«Линия вкуса» — Кейтеринг в Чите, доставка готовых блюд",
};

export default function HomePage() {
  return (
    <div>
      <Catering />
    </div>
  );
}
