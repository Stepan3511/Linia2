"use client";

import TopBar from "@/components/top-bar/TopBar";
import CateringList from "@/components/catering-list/CateringList";
import { useGetCateringCategories } from "@/hooks/category-catering/useGetCateringCategories";
import { useGetCateringProducts } from "@/hooks/product-catering/useGetCateringProducts";
import Header from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

import styles from "./Catering.module.scss";
import Stories from "@/components/stories/Stories";

export default function Catering() {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCateringCategories();

  const { data: products = [], isLoading: isLoadingProducts } =
    useGetCateringProducts();

  return (
    <div className={styles.wrapper}>
      <Header />
      <TopBar categories={categories} />
      <Stories />
      <main className={styles.main}>
        {isLoadingCategories || isLoadingProducts ? (
          <h1 className={styles.loading}>Загрузка...</h1>
        ) : (
          <CateringList categories={categories} products={products} />
        )}
      </main>
      <Footer />
    </div>
  );
}
