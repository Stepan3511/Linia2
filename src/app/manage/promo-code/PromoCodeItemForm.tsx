"use client";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import {
  PromoCodeItemFormProps,
  IPromoCodeInput,
} from "@/types/promo-code.types";

import styles from "./PromoCodeList.module.scss";
import { normalizePromoCodeInput } from "@/lib/promo";
import { useGetDeliveryProducts } from "@/hooks/product-delivery/useGetDeliveryProducts";
import dynamic from "next/dynamic";

// Динамический импорт без SSR
const ProductMultiSelect = dynamic(() => import("./ProductMultiSelect"), {
  ssr: false,
});

export default function PromoCodeItemForm({
  promoCodeItem,
  handleSubmit,
  action,
}: PromoCodeItemFormProps) {
  const { data: products = [], isLoading } = useGetDeliveryProducts();

  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <Formik
      initialValues={{
        name: promoCodeItem?.name || "",
        minPrice: promoCodeItem?.minPrice || 0,
        productIds: promoCodeItem?.products?.map((p) => p.id) || [],
      }}
      enableReinitialize
      validationSchema={yup.object({
        name: yup.string().required("Заполнить обязательно"),
        minPrice: yup.string().required("Заполнить обязательно"),
        productIds: yup.array().of(yup.string()),
      })}
      onSubmit={(values: IPromoCodeInput) => handleSubmit(values)}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>
          <label htmlFor="name" className="mr-2 text-center">
            Название
            <br />
            <small>(отключены пробелы и заглавные буквы)</small>
            <br />
            <small>
              (Например: линиявкуса2025 или линия-вкуса-2025 и т.д.)
            </small>
          </label>
          <Field name="name">
            {({ field }: any) => (
              <input
                {...field}
                type="text"
                id="name"
                className={styles.form_field}
                onChange={(e) => {
                  const normalized = normalizePromoCodeInput(e.target.value);
                  setFieldValue("name", normalized);
                }}
              />
            )}
          </Field>
          <ErrorMessage name="name" component="span" className="text-red-500" />

          <label htmlFor="minPrice" className="mr-2">
            Минимальная сумма <small>(Например: 5000)</small>
          </label>
          <Field
            name="minPrice"
            type="text"
            id="minPrice"
            className={styles.form_field}
          />
          <ErrorMessage
            name="minPrice"
            component="span"
            className="text-red-500"
          />

          <label htmlFor="productIds" className="mr-2">
            Выберите товары <small>(можно несколько)</small>
          </label>
          {!isLoading && (
            <>
              {/* <ProductMultiSelect
                value={values.productIds}
                options={productOptions}
                onChange={(ids) => setFieldValue("productIds", ids)}
              /> */}
              <ProductMultiSelect
                value={values.productIds}
                options={productOptions}
                onChange={(ids) => setFieldValue("productIds", ids)}
              />
              <ErrorMessage
                name="productIds"
                component="span"
                className="text-red-500"
              />
            </>
          )}

          <button type="submit" className={styles.form_button}>
            {action}
          </button>
        </Form>
      )}
    </Formik>
  );
}
