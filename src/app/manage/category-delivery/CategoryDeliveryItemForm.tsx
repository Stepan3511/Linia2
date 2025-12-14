"use client";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { CategoryItemFormProps, ICategoryInput } from "@/types/category.types";

import styles from "./CategoryDeliveryList.module.scss";

export default function CategoryDeliveryItemForm({
  categoryItem,
  handleSubmit,
  action,
}: CategoryItemFormProps) {
  return (
    <Formik
      initialValues={{
        name: categoryItem ? categoryItem.name : "",
        position: categoryItem ? categoryItem.position : 0,
      }}
      enableReinitialize
      validationSchema={yup.object({
        name: yup.string().required("Название обязательно"),
        position: yup.number().required("Позиция обязательна"),
      })}
      onSubmit={(values: ICategoryInput) => handleSubmit(values)}
    >
      <Form className={styles.form}>
        <label htmlFor="name" className="mr-2">
          Название
        </label>
        <Field
          name="name"
          type="text"
          id="name"
          className={styles.form_field}
        />
        <ErrorMessage name="name" component="span" className="text-red-500" />
        <label htmlFor="name" className="mr-2">
          Порядок
        </label>
        <Field
          name="position"
          type="number"
          id="position"
          className={styles.form_field}
        />
        <ErrorMessage
          name="position"
          component="span"
          className="text-red-500"
        />
        <button className={styles.form_button}>{action}</button>
      </Form>
    </Formik>
  );
}
