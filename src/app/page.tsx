import type { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = {
  title: "«Линия вкуса» — Кейтеринг в Чите, доставка готовых блюд",
};

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}
