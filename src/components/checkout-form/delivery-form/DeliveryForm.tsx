"use client";

import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import CheckoutBanner from "../checkout-banner/CheckoutBanner";

import styles from "./DeliveryForm.module.scss";

interface DeliveryFormProps {
  onValidate: (isValid: boolean, values: any) => void;
}

registerLocale("ru", ru);

export default function DeliveryForm({ onValidate }: DeliveryFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isReadyImmediately, setIsReadyImmediately] = useState(true);

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        address: "",
        comment: "",
        paymentMethod: "cash", // Установка "наличные" по умолчанию
      }}
      validationSchema={yup.object({
        name: yup.string().required("Введите ваше имя"),
        phone: yup.string().required("Введите ваш телефон"), // Телефон как строка
        address: yup.string().required("Введите адрес"),
        comment: yup.string(),
      })}
      validateOnChange
      validateOnMount
      onSubmit={(values) => {
        console.log("Данные доставки:", {
          ...values,
          deliveryOption: isReadyImmediately
            ? "Сразу как будет готово"
            : selectedDate
            ? format(selectedDate, "dd.MM.yyyy, HH:mm")
            : null,
        });
      }}
    >
      {({ isValid, setFieldValue, values }) => {
        useEffect(() => {
          onValidate(isValid && (isReadyImmediately || selectedDate !== null), {
            ...values,
            deliveryOption: isReadyImmediately
              ? "Сразу как будет готово"
              : selectedDate
              ? format(selectedDate, "dd.MM.yyyy, HH:mm")
              : null,
          });
        }, [isValid, isReadyImmediately, selectedDate, values]);

        return (
          <Form className={styles.form}>
            <label htmlFor="name" className={styles.label}>
              Имя
            </label>
            <Field name="name" type="text" id="name" className={styles.input} />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />

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

            <CheckoutBanner />

            <label htmlFor="address" className={styles.label}>
              Адрес
            </label>
            <Field
              name="address"
              type="text"
              id="address"
              className={styles.input}
            />
            <ErrorMessage
              name="address"
              component="span"
              className={styles.error}
            />

            <label htmlFor="comment" className={styles.label}>
              Комментарий
            </label>
            <Field
              name="comment"
              type="text"
              id="comment"
              className={styles.input}
            />
            <ErrorMessage
              name="comment"
              component="span"
              className={styles.error}
            />

            <div className={styles.toggle_group}>
              <button
                type="button"
                className={`${styles.toggle_button} ${
                  isReadyImmediately ? styles.active : ""
                }`}
                onClick={() => {
                  setIsReadyImmediately(true);
                  setSelectedDate(null);
                }}
              >
                Сразу как будет готово
              </button>
              <button
                type="button"
                className={`${styles.toggle_button} ${
                  !isReadyImmediately ? styles.active : ""
                }`}
                onClick={() => setIsReadyImmediately(false)}
              >
                Выбрать дату и время
              </button>
            </div>

            {!isReadyImmediately && (
              <div className={styles.date_time_wrapper}>
                <label className={styles.label}>Выберите дату и время:</label>
                <div className={styles.date_time_error_wrapper}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                    }}
                    showTimeSelect
                    dateFormat="dd.MM.yyyy, HH:mm"
                    timeIntervals={15}
                    className={styles.input}
                    locale="ru"
                    minDate={new Date()}
                    timeCaption="Время"
                  />
                  {selectedDate === null && (
                    <span className={styles.error}>
                      Пожалуйста, выберите дату и время
                    </span>
                  )}
                </div>
              </div>
            )}

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
