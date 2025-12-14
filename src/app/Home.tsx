"use client";

import TopBar from "@/components/top-bar/TopBar";
import DeliveryList from "@/components/delivery-list/DeliveryList";
import { useGetDeliveryCategories } from "@/hooks/category-delivery/useGetDeliveryCategories";
import { useGetDeliveryProducts } from "@/hooks/product-delivery/useGetDeliveryProducts";
import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

import styles from "./Home.module.scss";
import Stories from "@/components/stories/Stories";
import DeliveryZones from "@/components/delivery-zones/DeliveryZones";
import dynamic from 'next/dynamic';

const AcceptCookies = dynamic(
  () => import('./Accept-cookies'),
  { ssr: false }
);

export default function Home() {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetDeliveryCategories();

  const { data: products = [], isLoading: isLoadingProducts } =
    useGetDeliveryProducts();

  return (
    <div className={styles.wrapper}>
      <Header />
      <TopBar categories={categories} />
      <Stories />
      <main className={styles.main}>
        {isLoadingCategories || isLoadingProducts ? (
          <h1 className={styles.loading}>Загрузка...</h1>
        ) : (
          <DeliveryList categories={categories} products={products} />
        )}
        <DeliveryZones />
      </main>
      <Footer />
      {typeof window !== 'undefined' && localStorage.getItem("cookiesAccepted") !== "true" && (
      <AcceptCookies />
    )}
    </div>
  );
}
