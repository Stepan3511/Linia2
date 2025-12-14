"use client";

import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { IStoriesInput } from "@/types/story.types";
import { fileStoriesService } from "@/services/file-stories.service";

import styles from "./StoriesList.module.scss";
import { translit } from "@/lib/translit";
import { ConfirmModal } from "@/components/confirm-modal/ConfirmModal";
import { useDeleteStory } from "@/hooks/story/useDeleteStory";

export default function StoriesForm({
  storiesGroup,
  handleSubmit,
  action,
}: {
  storiesGroup?: IStoriesInput;
  handleSubmit: (data: IStoriesInput) => void;
  action: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (file: File) => {
    try {
      const fileNameParts = file.name.split(".");
      const extension = fileNameParts.pop();
      const nameWithoutExtension = fileNameParts.join(".");
      const transliteratedName = translit(nameWithoutExtension).replace(
        /\s+/g,
        "_"
      );
      const newFileName = `${transliteratedName}.${extension}`;

      const formData = new FormData();
      formData.append("image", file, newFileName);

      const response = await fileStoriesService.upload(formData, "stories");
      return response.data.url;
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
      return null;
    }
  };

  const { mutate: deleteStory } = useDeleteStory(storiesGroup?.id || "");

  return (
    <Formik
      initialValues={{
        name: storiesGroup?.name || "",
        description: storiesGroup?.description || "",
        stories: storiesGroup?.stories || [],
      }}
      validationSchema={yup.object({
        name: yup.string().required("Название обязательно"),
        stories: yup
          .array()
          .of(
            yup.object({
              image: yup
                .mixed()
                .required("Изображение обязательно")
                .test(
                  "is-file-or-url",
                  "Некорректное изображение",
                  (value) => typeof value === "string" || value instanceof File
                ),
            })
          )
          .min(1, "Необходимо добавить хотя бы одну сторис"),
      })}
      onSubmit={async (values) => {
        setIsSubmitting(true);

        try {
          const updatedStories = await Promise.all(
            values.stories.map(async (story) => {
              if (story.image && typeof story.image !== "string") {
                const uploadedImage = await handleImageUpload(
                  story.image as File
                );
                if (!uploadedImage) {
                  throw new Error("Не удалось загрузить изображение");
                }
                return { ...story, image: uploadedImage };
              }
              return story;
            })
          );

          handleSubmit({ ...values, stories: updatedStories });
        } catch (error) {
          console.error("Ошибка при сохранении формы:", error);
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isValid, errors }) => (
        <Form className={styles.form}>
          <label htmlFor="name">Название группы</label>
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
            type="text"
            id="description"
            className={styles.form_field}
          />
          <ErrorMessage
            name="description"
            component="span"
            className="text-red-500"
          />

          <FieldArray
            name="stories"
            render={(arrayHelpers) => (
              <div className={styles.main_wrapper}>
                <button
                  type="button"
                  onClick={() => arrayHelpers.push({ image: "" })}
                  className={styles.add_button}
                >
                  Добавить сторис
                </button>

                <div className={styles.main_wrapper_row}>
                  {values.stories.map((story, index) => (
                    <div key={index} className={styles.story}>
                      <div className={styles.story_image_preview}>
                        {typeof story.image !== "string" ? (
                          <img
                            src={URL.createObjectURL(story.image as File)}
                            alt={`Предпросмотр ${index + 1}`}
                            className={styles.image_preview}
                          />
                        ) : (
                          story.image && (
                            <img
                              src={story.image}
                              alt={`Предпросмотр ${index + 1}`}
                              className={styles.image_preview}
                            />
                          )
                        )}
                      </div>

                      <ConfirmModal
                        handleClick={async () => {
                          deleteStory(story.id, {
                            onSuccess: () => {
                              arrayHelpers.remove(index);
                            },
                          });
                        }}
                      >
                        <button className={styles.button}>Удалить</button>
                      </ConfirmModal>
                    </div>
                  ))}
                </div>

                {values.stories.some((story) => story.image === "") && (
                  <div className={styles.file_input_wrapper}>
                    <label htmlFor="newStoryImage">Выберите изображение:</label>
                    <input
                      type="file"
                      id="newStoryImage"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          const indexToUpdate = values.stories.findIndex(
                            (story) => story.image === ""
                          );
                          if (indexToUpdate !== -1) {
                            setFieldValue(
                              `stories[${indexToUpdate}].image`,
                              file
                            );
                          }
                        }
                      }}
                      className={styles.form_field}
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>
            )}
          />

          {errors.stories && (
            <div className="text-red-500">
              {typeof errors.stories === "string"
                ? errors.stories
                : "Ошибка в добавленных сторис"}
            </div>
          )}

          <button
            type="submit"
            className={styles.form_button}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Отправка..." : action}
          </button>
        </Form>
      )}
    </Formik>
  );
}
