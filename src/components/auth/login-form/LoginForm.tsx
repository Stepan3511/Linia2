"use client";

import { useState } from "react";
import { Button } from "@/components/auth/button";
import { useEmailStore } from "@/store/emailStore";
import { useLoginMutation } from "@/hooks/auth/useLoginMutation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
type LoginFormProps = {
  email: string;
};

export default function LoginForm({ email }: LoginFormProps) {
  const { login, isLoadingLogin } = useLoginMutation();
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    if (otp.length === 6) {
      login({ email: email.toLowerCase(), otp: Number(otp) });
    } else {
      alert("Введите корректный 6-значный OTP");
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="text-black border h-8 flex items-center justify-center rounded-sm bg-gray-200 w-[100%] max-w-[256px]">
        {email}
      </div>

      <InputOTP maxLength={6} onChange={setOtp}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <span className="text-[#333] text-[12px]">
        Если письмо не пришло, проверьте папку «Спам»
      </span>
      <Button onClick={handleSubmit} disabled={isLoadingLogin}>
        {isLoadingLogin ? "Загрузка..." : "Продолжить"}
      </Button>
    </div>
  );
}
