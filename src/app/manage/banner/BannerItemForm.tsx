"use client";

import React, { useState, useRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { BannerItemFormProps, IBannerInput } from "@/types/banner.types";
import { useUploadBannerImage } from "@/hooks/banner/useUploadBannerImage";
import BannerImagePreview from "./BannerImagePreview";

import styles from "./Banner.module.scss";

export default function BannerItemForm({
  bannerItem,
  handleSubmit,
  action,
}: BannerItemFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(bannerItem?.imageUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { mutate: uploadImage } = useUploadBannerImage(
    (imageUrl) => {
      setPreviewUrl(imageUrl);
      setIsUploading(false);
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Создаем временный URL для предпросмотра
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);

    // Устанавливаем состояние загрузки
    setIsUploading(true);

    // Загружаем файл на сервер
    const formData = new FormData();
    formData.append("file", file);
    uploadImage(formData);

    // Очищаем временный URL при размонтировании
    return () => URL.revokeObjectURL(tempUrl);
  };

  const handleFormSubmit = (values: IBannerInput) => {
    handleSubmit({
      ...values,
      // Если есть previewUrl, который отличается от исходного imageUrl, добавляем его
      ...(previewUrl && previewUrl !== bannerItem?.imageUrl && { imageUrl: previewUrl }),
    });
  };

  return (
    <Formik
      initialValues={{
        isActive: bannerItem ? bannerItem.isActive : false,
        linkUrl: bannerItem ? bannerItem.linkUrl || "" : "",
      }}
      enableReinitialize
      validationSchema={yup.object({
        isActive: yup.boolean(),
        linkUrl: yup.string().url("Введите корректный URL").nullable(),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>
          <div className={styles.image_upload_section}>
            <h3>Изображение баннера</h3>
            <div className={styles.image_upload_container}>
              <BannerImagePreview imageUrl={previewUrl} />
              <div className={styles.upload_controls}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className={styles.file_input}
                  id="banner-image"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={styles.upload_button}
                  disabled={isUploading}
                >
                  {isUploading ? "Загрузка..." : "Выбрать изображение"}
                </button>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={() => setPreviewUrl("")}
                    className={styles.clear_button}
                  >
                    Удалить изображение
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.form_section}>
            <label htmlFor="linkUrl" className={styles.form_label}>
              Ссылка (опционально)
            </label>
            <Field
              name="linkUrl"
              type="text"
              id="linkUrl"
              placeholder="https://example.com"
              className={styles.form_field}
            />
            <ErrorMessage name="linkUrl" component="span" className={styles.error_message} />
            <p className={styles.field_hint}>Укажите URL, на который будет вести баннер при клике</p>
          </div>
          
          <div className={styles.checkbox_container}>
            <label htmlFor="isActive" className={styles.checkbox_label}>
              Активировать баннер
            </label>
            <Field
              name="isActive"
              type="checkbox"
              id="isActive"
              className={styles.checkbox}
              checked={values.isActive}
              onChange={() => setFieldValue("isActive", !values.isActive)}
            />
          </div>
          
          <button type="submit" className={styles.form_button} disabled={isUploading}>
            {action}
          </button>
        </Form>
      )}
    </Formik>
  );
}
