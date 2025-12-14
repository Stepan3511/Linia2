"use client";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import {
  ProductDeliveryItemFormProps,
  IProductDeliveryInput,
} from "@/types/product-delivery.types";
import { fileService } from "@/services/file.service";
import styles from "./ProductDeliveryList.module.scss";
import { translit } from "@/lib/translit";

export default function ProductDeliveryItemForm({
  productDeliveryItem,
  categories,
  handleSubmit,
  action,
}: ProductDeliveryItemFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    productDeliveryItem?.image || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async () => {
    if (!selectedFile) return null;

    const fileNameParts = selectedFile.name.split(".");
    const extension = fileNameParts.pop();
    const nameWithoutExtension = fileNameParts.join(".");
    const transliteratedName = translit(nameWithoutExtension).replace(
      /\s+/g,
      "_"
    );
    const newFileName = `${transliteratedName}.${extension}`;

    const formData = new FormData();
    formData.append("image", selectedFile, newFileName);

    try {
      const response = await fileService.upload(formData, "delivery");

      console.log("Ответ сервера после загрузки изображения:", response);

      if (response.data && response.data.url) {
        return response.data.url;
      } else {
        console.error(
          "Ошибка: сервер вернул некорректный ответ. Ожидался объект с полем 'url'.",
          response.data
        );
      }
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
    }
    return null;
  };

  const handleFormSubmit = async (values: IProductDeliveryInput) => {
    setIsSubmitting(true);

    try {
      let imageUrl = values.image;

      if (selectedFile) {
        const uploadedImageUrl = await handleImageUpload();
        if (uploadedImageUrl) {
          imageUrl = uploadedImageUrl;
        } else {
          console.error("Не удалось загрузить изображение.");
          setIsSubmitting(false);
          return;
        }
      }

      const updatedValues = { ...values, image: imageUrl };
      console.log("Отправляемые данные:", updatedValues);
      handleSubmit(updatedValues);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: productDeliveryItem ? productDeliveryItem.name : "",
        description: productDeliveryItem?.description || "",
        weight: productDeliveryItem?.weight || 0,
        pieces: productDeliveryItem?.pieces || 0,
        price: productDeliveryItem?.price || 0,
        image: productDeliveryItem?.image || "",
        categoryId: productDeliveryItem?.categoryId || "",
        cateringCart: productDeliveryItem?.cateringCart || false,
        deliveryCart: productDeliveryItem?.deliveryCart || false,
      }}
      enableReinitialize
      validationSchema={yup.object({
        name: yup.string().required("Название обязательно"),
        categoryId: yup.string().required("Категория обязательна"),
        weight: yup.number().typeError("Вес должен быть числом"),
        pieces: yup.number().typeError("Количество должен быть числом"),
        price: yup.number().typeError("Цена должен быть числом"),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <label htmlFor="name">Название</label>
          <Field
            name="name"
            type="text"
            id="name"
            className={styles.form_field}
          />
          <ErrorMessage name="name" component="span" className="text-red-500" />

          <label htmlFor="description">Описание</label>
          <Field
            name="description"
            as="textarea"
            id="description"
            className={styles.form_field}
          />
          <ErrorMessage
            name="description"
            component="span"
            className="text-red-500"
          />

          <label htmlFor="weight">Вес</label>
          <Field
            name="weight"
            type="number"
            id="weight"
            className={styles.form_field}
          />
          <ErrorMessage
            name="weight"
            component="span"
            className="text-red-500"
          />

          <label htmlFor="pieces">Количество</label>
          <Field
            name="pieces"
            type="number"
            id="pieces"
            className={styles.form_field}
          />
          <ErrorMessage
            name="pieces"
            component="span"
            className="text-red-500"
          />

          <label htmlFor="price">Цена</label>
          <Field
            name="price"
            type="number"
            id="price"
            className={styles.form_field}
          />
          <ErrorMessage
            name="price"
            component="span"
            className="text-red-500"
          />

          <label htmlFor="image">Изображение</label>
          <div className={styles.image_upload}>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Предпросмотр"
                className={styles.image_preview}
              />
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  const reader = new FileReader();
                  reader.onload = () =>
                    setImagePreview(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
              className={styles.form_field}
              disabled={isSubmitting}
            />
          </div>

          <label htmlFor="categoryId">Категория</label>
          <Field
            name="categoryId"
            as="select"
            id="categoryId"
            className={styles.form_field}
          >
            <option value="" disabled>
              Выберите категорию
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="categoryId"
            component="span"
            className="text-red-500"
          />

          <div className={styles.add_cart_wrapper}>
            <label className={styles.add_cart}>
              <Field type="checkbox" name="cateringCart" />
              Добавить в корзину Кейтеринг
            </label>
          </div>

          <div className={styles.add_cart_wrapper}>
            <label className={styles.add_cart}>
              <Field type="checkbox" name="deliveryCart" />
              Добавить в корзину Доставка
            </label>
          </div>

          <button
            type="submit"
            className={styles.form_button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : action}
          </button>
        </Form>
      )}
    </Formik>
  );
}
