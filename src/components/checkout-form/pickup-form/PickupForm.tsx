"use client";

import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import CheckoutBanner from "../checkout-banner/CheckoutBanner";

import styles from "./PickupForm.module.scss";

interface PickupFormProps {
  onValidate: (isValid: boolean, values: any) => void;
}

export default function PickupForm({ onValidate }: PickupFormProps) {
  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        paymentMethod: "cash",
      }}
      validationSchema={yup.object({
        name: yup.string().required("Введите ваше имя"),
        phone: yup.string().required("Введите ваш телефон"),
      })}
      validateOnChange
      validateOnMount
      onSubmit={(values) => {
        console.log("Данные самовывоза:", values);
      }}
    >
      {({ isValid, values, setFieldValue }) => {
        useEffect(() => {
          onValidate(isValid, values);
        }, [isValid, values]);

        return (
          <Form className={styles.form}>
            <span>
              <b>Наш адрес:</b> г. Чита, ул. Бабушкина, 104
            </span>

            <label htmlFor="name" className={styles.label}>
              Имя
            </label>
            <Field name="name" type="text" id="name" className={styles.input} />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />

            <CheckoutBanner />

            <label htmlFor="phone" className={styles.label}>
              Телефон
            </label>
            <Field
              name="phone"
              type="tel"
              id="phone"
              className={styles.input}
            />
            <ErrorMessage
              name="phone"
              component="span"
              className={styles.error}
            />

            <h3 className={styles.label}>Вариант оплаты</h3>
            <div className={styles.toggle_group}>
              <button
                type="button"
                className={`${styles.toggle_button} ${
                  values.paymentMethod === "cash" ? styles.active : ""
                }`}
                onClick={() => setFieldValue("paymentMethod", "cash")}
              >
                Наличные
              </button>
              <button
                type="button"
                className={`${styles.toggle_button} ${
                  values.paymentMethod === "card" ? styles.active : ""
                }`}
                onClick={() => setFieldValue("paymentMethod", "card")}
              >
                Картой
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
