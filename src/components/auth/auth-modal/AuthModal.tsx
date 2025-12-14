"use client";

import React, { useState } from "react";
import styles from "./AuthModal.module.scss";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import OtpForm from "@/components/auth/otp-form.tsx/OtpForm";
import LoginForm from "@/components/auth/login-form/LoginForm";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [step, setStep] = useState<"otp" | "login">("otp");
  const [email, setEmail] = useState(""); // 🛠 локальное хранение email

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <button className={styles.modal_close} onClick={onClose}>
          <X />
        </button>

        {step === "otp" && (
          <>
            <h2 className={styles.modal_title}>Авторизация необходима</h2>
            <p className={styles.modal_subtitle}>Чтобы получить доступ к:</p>
            <ul className={styles.benefits_list}>
              <li>
                <CheckCircle className={styles.icon} /> Добавлению товаров в
                корзину
              </li>
              <li>
                <CheckCircle className={styles.icon} /> Применению промокодов
              </li>
              <li>
                <CheckCircle className={styles.icon} /> Накоплению бонусов
              </li>
              <li>
                <CheckCircle className={styles.icon} /> Персональным
                предложениям
              </li>
              <li>
                <CheckCircle className={styles.icon} /> Истории заказов
              </li>
            </ul>
            <OtpForm
              onSuccess={(emailValue: string) => {
                setEmail(emailValue); // ⬅ сохранить email в локальный стейт
                setStep("login"); // перейти на второй шаг
              }}
            />
          </>
        )}

        {step === "login" && (
          <>
            <h2 className={styles.modal_title}>Введите код</h2>
            <LoginForm email={email} /> {/* ⬅ передаем email в форму */}
          </>
        )}
      </div>
    </div>
  );
}
