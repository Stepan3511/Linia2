"use client";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import {
  HolidayTimeItemFormProps,
  IHolidayTimeInput,
} from "@/types/holiday-time.types";

import styles from "./HolidayTimeList.module.scss";

export default function HolidayTimeItemForm({
  holidayTimeItem,
  handleSubmit,
  action,
}: HolidayTimeItemFormProps) {
  return (
    <Formik
      initialValues={{
        from: holidayTimeItem ? holidayTimeItem.from : "",
        to: holidayTimeItem ? holidayTimeItem.to : "",
        message: holidayTimeItem ? holidayTimeItem.message : "",
      }}
      enableReinitialize
      validationSchema={yup.object({
        from: yup.string().required("Заполнить обязательно"),
        to: yup.string().required("Заполнить обязательно"),
        message: yup.string().required("Заполнить обязательно"),
      })}
      onSubmit={(values: IHolidayTimeInput) => handleSubmit(values)}
    >
      <Form className={styles.form}>
        <label htmlFor="from" className="mr-2">
          Показать сообщение <small>(указать в формате 2024-12-21)</small>
        </label>

        <Field
          name="from"
          type="text"
          id="from"
          className={styles.form_field}
        />
        <ErrorMessage name="from" component="span" className="text-red-500" />
        <label htmlFor="to" className="mr-2">
          Убрать сообщение <small>(указать в формате 2024-12-23)</small>
        </label>
        <Field name="to" type="text" id="to" className={styles.form_field} />
        <ErrorMessage name="to" component="span" className="text-red-500" />
        <label htmlFor="message" className="mr-2">
          Сообщение
        </label>
        <Field
          name="message"
          as="textarea"
          id="message"
          className={styles.form_field}
        />
        <ErrorMessage
          name="message"
          component="span"
          className="text-red-500"
        />
        <button className={styles.form_button}>{action}</button>
      </Form>
    </Formik>
  );
}
