"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./PromoCodeInput.module.scss";

import { useGetUser } from "@/hooks/auth/useGetUser";
import toast from "react-hot-toast";
import { IPromoCode } from "@/types/promo-code.types";
import { useGetPromoCode } from "@/hooks/promo-code/useGetPromoCode";
import { useOrderHistory } from "@/hooks/order/useOrderHistory";
import { usePromoStore } from "@/store/promoStore";

interface PromoCodeInputProps {
  totalAmount: number;
  onApply: (promo: IPromoCode) => void;
}

export default function PromoCodeInput({
  totalAmount,
  onApply,
}: PromoCodeInputProps) {
  const [promoInput, setPromoInput] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  const { data: promoCodes = [] } = useGetPromoCode();
  const { orders = [] } = useOrderHistory();
  const { user } = useGetUser();

  const { promoCode, setPromoCode } = usePromoStore();

  useEffect(() => {
    if (promoCode) {
      onApply(promoCode);
    }
  }, [promoCode, onApply]);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) {
      setPromoError("Введите промокод");
      return;
    }

    const foundPromo = promoCodes.find(
      (promo) => promo.name?.toLowerCase() === promoInput.toLowerCase()
    );

    if (!foundPromo) {
      setPromoError("Промокод не найден");
      return;
    }

    const alreadyUsed = orders.some(
      (order) => order.promoCode?.id === foundPromo.id
    );

    if (alreadyUsed) {
      setPromoError("Вы уже использовали этот промокод");
      return;
    }

    if (foundPromo.minPrice && totalAmount < Number(foundPromo.minPrice)) {
      setPromoError(
        `Минимальная сумма для применения: ${foundPromo.minPrice} ₽`
      );
      return;
    }

    setPromoCode(foundPromo);
    setPromoError(null);
    onApply(foundPromo);
    toast.success("Промокод применён");
  };

  const hasGifts =
    promoCode &&
    Array.isArray(promoCode.products) &&
    promoCode.products.length > 0;

  return (
    <div className={styles.promo_wrapper}>
      <button
        onClick={() => setShowPromoInput(!showPromoInput)}
        className={styles.toggle_promo}
      >
        Ввести промокод
      </button>

      {showPromoInput && (
        <div className={styles.promo_input_block}>
          <input
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            className={styles.promo_input}
            placeholder="Промокод"
            disabled={!!promoCode}
          />
          <button
            onClick={handleApplyPromo}
            className={styles.promo_apply_button}
            disabled={!!promoCode}
          >
            Применить
          </button>
        </div>
      )}

      {hasGifts && (
        <div className={styles.promo_success}>
          <div className={styles.promo_success_header}>
            <img
              src={promoCode.products[0]?.image || "/uploads/default.png"}
              alt="Подарок"
              className={styles.promo_image}
            />
            <span>
              Подарок: {promoCode.products.map((p) => p.name).join(", ")}
            </span>
            <button
              onClick={() => {
                setPromoCode(null);
                setPromoInput("");
                toast("Промокод удалён", { icon: "❌" });
              }}
              className={styles.remove_button}
              aria-label="Удалить промокод"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {promoError && <p className={styles.promo_error}>{promoError}</p>}
    </div>
  );
}
