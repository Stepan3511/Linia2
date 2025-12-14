"use client";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { WorkTimeItemFormProps, IWorkTimeInput } from "@/types/work-time.types";

import styles from "./WorkTimeList.module.scss";

export default function WorkTimeItemForm({
  workTimeItem,
  handleSubmit,
  action,
}: WorkTimeItemFormProps) {
  return (
    <Formik
      initialValues={{
        from: workTimeItem ? workTimeItem.from : "",
        to: workTimeItem ? workTimeItem.to : "",
        message: workTimeItem ? workTimeItem.message : "",
      }}
      enableReinitialize
      validationSchema={yup.object({
        from: yup.string().required("Заполнить обязательно"),
        to: yup.string().required("Заполнить обязательно"),
        message: yup.string().required("Заполнить обязательно"),
      })}
      onSubmit={(values: IWorkTimeInput) => handleSubmit(values)}
    >
      <Form className={styles.form}>
        <label htmlFor="from" className="mr-2">
          Начало <small>(указать в формате 10:00)</small>
        </label>
        <Field
          name="from"
          type="text"
          id="from"
          className={styles.form_field}
        />
        <ErrorMessage name="from" component="span" className="text-red-500" />

        <label htmlFor="to" className="mr-2">
          Конец <small>(указать в формате 22:00)</small>
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
