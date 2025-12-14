"use client";

import { IBannerImagePreview } from "@/types/banner.types";
import Image from "next/image";
import styles from "./Banner.module.scss";

export default function BannerImagePreview({
  imageUrl,
  alt = "Баннер",
}: IBannerImagePreview) {
  return (
    <div className={styles.image_preview_container}>
      <div className={styles.image_preview}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            style={{ objectFit: "cover" }}
            className={styles.preview_image}
          />
        ) : (
          <div className={styles.no_image}>
            <span>Изображение не выбрано</span>
          </div>
        )}
      </div>
    </div>
  );
}
