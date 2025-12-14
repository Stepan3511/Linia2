"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { IAuthAdminForm } from "@/types/admin-auth.types";

import styles from "./Auth.module.scss";
import AuthAdminFields from "./AuthAdminFields";
import { useAuthMutation } from "../../hooks/admin/useAuthMutation";

const Auth: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthAdminForm>({
    mode: "onChange",
  });

  const [isLoginForm, setIsLoginForm] = useState(true);

  const { mutate } = useAuthMutation(isLoginForm, reset);

  const onSubmit: SubmitHandler<IAuthAdminForm> = (data) => {
    mutate(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h1 className={styles.heading}>
          {isLoginForm ? "Войти в аккаунт" : "Регистрация"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <AuthAdminFields
            register={register}
            errors={errors}
            isLoginForm={isLoginForm}
          />
          <button className={styles.button}>
            {isLoginForm ? "Войти" : "Создать аккаунт"}
          </button>
        </form>
      </div>
      <div className={styles.right}>
        <Image
          src="/images/logo-white.svg"
          height={250}
          width={250}
          alt="Авторизация"
        />
      </div>
    </div>
  );
};

export default Auth;
