"use client";

import React from "react";
import { useGetBanner } from "@/hooks/banner/useGetBanner";
import Image from "next/image";
import Link from "next/link";

import styles from "./CheckoutBanner.module.scss";

export default function CheckoutBanner() {
  const { data: banner, isLoading } = useGetBanner();
  console.log(banner);
  if (isLoading || !banner || !banner.isActive || !banner.imageUrl) {
    return null;
  }

  const BannerContent = () => (
    <div className={styles.banner_container}>

      <div className={styles.banner_image}>
        <Image
          src={banner.imageUrl}
          alt="Акция"
          fill
          sizes="100%"
          className={styles.image}
          priority
        />
      </div>
    </div>
  );

  return banner.linkUrl ? (
    <div>
      <p>Мы участвуем в Народной премии и ваш голос очень поможет нам.</p>
      <p>
        Нажмите на изображение ниже, оставьте свой голос в номинациях: <br />
        <strong>Банкетный зал «Сезон» — гастропространство года</strong><br />
        <strong>«Линия вкуса» — команда года</strong><br />
        Затем отправьте скриншот подтверждения участия на WhatsApp по номеру <a href="https://wa.me/79248053355" target="_blank">+7 924 805 33 55</a>.<br />
        <br />
        В благодарность вы получите подарок к своему заказу!
      </p>
      <Link href={banner.linkUrl} className={styles.banner_link}>
        <BannerContent />
      </Link>
    </div>
  ) : (
    <div>
      <p>Мы участвуем в Народной премии и ваш голос очень поможет нам.</p>
      <p>
        Нажмите на изображение ниже, оставьте свой голос в номинациях: <br />
        <strong>Банкетный зал «Сезон» — гастропространство года</strong><br />
        <strong>«Линия вкуса» — команда года</strong><br />
        Затем отправьте скриншот подтверждения участия на WhatsApp по номеру <a href="https://wa.me/79248053355" target="_blank">+7 924 805 33 55</a>.<br />
        <br />
        В благодарность вы получите подарок к своему заказу!
      </p>
      <BannerContent />
    </div>
  );
}
