"use client";

import { MANAGE_URL } from "@/config/url.config";
import { useGetCateringProducts } from "@/hooks/product-catering/useGetCateringProducts";
import { useDeleteCateringProduct } from "@/hooks/product-catering/useDeleteCateringProduct";
import { useGetCateringCategories } from "@/hooks/category-catering/useGetCateringCategories";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmModal } from "@/components/confirm-modal/ConfirmModal";
import styles from "./ProductCateringList.module.scss";

export default function ProductCateringList() {
  const { push } = useRouter();

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError,
  } = useGetCateringProducts();

  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCateringCategories();

  const { mutate: deleteProducts } = useDeleteCateringProduct();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortType, setSortType] = useState<string>("none");
  const [showCollectionsFirst, setShowCollectionsFirst] = useState(false);

  const getCategoryName = (categoryId: string | undefined): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Без категории";
  };

  const filteredProducts = selectedCategory
    ? products?.filter((product) => product.categoryId === selectedCategory)
    : products;

  const [sortByWeight, setSortByWeight] = useState<string>("none");
  const [sortByMinOrder, setSortByMinOrder] = useState<string>("none");

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (showCollectionsFirst) {
      const aInCart = a.cateringCart || a.deliveryCart;
      const bInCart = b.cateringCart || b.deliveryCart;

      if (aInCart && !bInCart) return -1;
      if (!aInCart && bInCart) return 1;
    }

    if (sortType === "nameAsc") {
      return a.name.localeCompare(b.name);
    } else if (sortType === "nameDesc") {
      return b.name.localeCompare(a.name);
    }

    if (sortByWeight === "weightAsc") {
      return (a.weight || 0) - (b.weight || 0);
    } else if (sortByWeight === "weightDesc") {
      return (b.weight || 0) - (a.weight || 0);
    }

    // Сортировка по минимальному заказу
    if (sortByMinOrder === "minOrderAsc") {
      return (a.minOrder || 0) - (b.minOrder || 0);
    } else if (sortByMinOrder === "minOrderDesc") {
      return (b.minOrder || 0) - (a.minOrder || 0);
    }
    return 0;
  });

  return (
    <div className={styles.container}>
      <ul className={styles.breadcrum_list}>
        <li className={styles.breadcrum_link}>
          <a href="/">
            <span>Главная</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li className={styles.breadcrum_link}>
          <a href="/manage">
            <span>Панель управления</span>
          </a>
        </li>
        <span className={styles.breadcrum_arrow}>&gt;</span>
        <li>
          <span>Кейтеринг - товары</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Кейтеринг - товары</h1>
        <div className={styles.actions}>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.productCateringCreate())}
          >
            Добавить товар
          </button>
          <div className={styles.filters}>
            <select
              id="categoryId"
              className={styles.select}
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">Все категории</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              id="sortType"
              className={styles.select}
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="none">Без сортировки (А-Я)</option>
              <option value="nameAsc">Название (А-Я)</option>
              <option value="nameDesc">Название (Я-А)</option>
            </select>

            <select
              id="sortByWeight"
              className={styles.select}
              value={sortByWeight}
              onChange={(e) => setSortByWeight(e.target.value)}
            >
              <option value="none">Без сортировки (вес)</option>
              <option value="weightAsc">Вес (по возрастанию)</option>
              <option value="weightDesc">Вес (по убыванию)</option>
            </select>

            <select
              id="sortByMinOrder"
              className={styles.select}
              value={sortByMinOrder}
              onChange={(e) => setSortByMinOrder(e.target.value)}
            >
              <option value="none">Без сортировки (мин. заказ)</option>
              <option value="minOrderAsc">Мин. заказ (по возрастанию)</option>
              <option value="minOrderDesc">Мин. заказ (по убыванию)</option>
            </select>
            <select
              id="showCollectionsFirst"
              className={styles.select}
              value={showCollectionsFirst ? "yes" : "no"}
              onChange={(e) =>
                setShowCollectionsFirst(e.target.value === "yes")
              }
            >
              <option value="no">Обычный порядок</option>
              <option value="yes">Сначала подборки</option>
            </select>
          </div>
        </div>

        {isLoadingProducts || isLoadingCategories ? (
          <h1>Загрузка...</h1>
        ) : isError ? (
          <h1>Ошибка загрузки</h1>
        ) : (
          <ul className={styles.list}>
            {sortedProducts.map((product) => (
              <li className={styles.item} key={product.id}>
                <div className={styles.info_wrapper}>
                  <div className={styles.image_wrapper}>
                    <img
                      className={styles.image}
                      src={product.image || "/uploads/catering/default.png"}
                      alt={product.name || "Изображение недоступно"}
                    />
                  </div>

                  <div className={styles.info_title}>
                    <span>
                      <b>Название:</b>
                    </span>
                    {product.name}
                  </div>

                  {product.description && (
                    <div className={styles.info}>
                      <span>
                        <b>Описание:</b>
                      </span>
                      {product.description}
                    </div>
                  )}
                </div>

                <div className={styles.details_wrapper}>
                  {(product.cateringCart || product.deliveryCart) && (
                    <div className={styles.details}>
                      <span>
                        <b>Подборка:</b>
                      </span>
                      <span className={styles.details_add_card}>
                        {product.cateringCart && " Кейтеринг"}
                        {product.cateringCart && product.deliveryCart && ","}
                        {product.deliveryCart && " Доставка"}
                      </span>
                    </div>
                  )}
                  <div className={styles.details}>
                    <span>
                      <b>Категория:</b>
                    </span>
                    {getCategoryName(product.categoryId)}
                  </div>

                  {product.weight !== undefined && product.weight > 0 && (
                    <div className={styles.details}>
                      <span>
                        <b>Вес:</b>
                      </span>
                      {product.weight}
                    </div>
                  )}

                  {product.minOrder && (
                    <div className={styles.details}>
                      <span>
                        <b>Мин. заказ:</b>
                      </span>
                      {product.minOrder}
                    </div>
                  )}

                  <div className={styles.details}>
                    <span>
                      <b>Цена:</b>
                    </span>
                    {product.price}
                  </div>
                  <div className={styles.buttons}>
                    <button
                      className={styles.button}
                      onClick={() =>
                        push(MANAGE_URL.productCateringEdit(product.id))
                      }
                    >
                      Редактировать
                    </button>
                    <ConfirmModal
                      handleClick={() => deleteProducts(product.id)}
                    >
                      <button className={styles.button}>Удалить</button>
                    </ConfirmModal>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
