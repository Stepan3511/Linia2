"use client";

import { useState } from "react";
import { useOtpMutation } from "@/hooks/auth/useOtpMutation";
import { Button } from "@/components/ui/button";

type OtpFormProps = {
  onSuccess: (email: string) => void;
};

export default function OtpForm({ onSuccess }: OtpFormProps) {
  const [email, setEmail] = useState("");
  const { sendOtp, isLoadingOtp } = useOtpMutation();

  const handleSubmit = () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !/\S+@\S+\.\S+/.test(normalizedEmail)) {
      alert("Введите корректный email");
      return;
    }

    sendOtp({ email: normalizedEmail }, () => {
      onSuccess(normalizedEmail);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className="border px-2 py-1 rounded-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@example.ru"
      />
      <Button onClick={handleSubmit} disabled={isLoadingOtp}>
        {isLoadingOtp ? "Отправка..." : "Продолжить"}
      </Button>
    </div>
  );
}
