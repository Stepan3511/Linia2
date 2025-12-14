"use client";

import { MANAGE_URL } from "@/config/url.config";
import { useGetDeliveryProducts } from "@/hooks/product-delivery/useGetDeliveryProducts";
import { useDeleteDeliveryProduct } from "@/hooks/product-delivery/useDeleteDeliveryProduct";
import { useGetDeliveryCategories } from "@/hooks/category-delivery/useGetDeliveryCategories";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from "./ProductDeliveryList.module.scss";
import { ConfirmModal } from "@/components/confirm-modal/ConfirmModal";

export default function ProductDeliveryList() {
  const { push } = useRouter();

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError,
  } = useGetDeliveryProducts();

  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetDeliveryCategories();

  const { mutate: deleteProducts } = useDeleteDeliveryProduct();

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
          <span>Доставка - товары</span>
        </li>
      </ul>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Доставка - товары</h1>
        <div className={styles.actions}>
          <button
            className={styles.button}
            onClick={() => push(MANAGE_URL.productDeliveryCreate())}
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
              <option value="none">Без сортировки</option>
              <option value="nameAsc">По названию (А-Я)</option>
              <option value="nameDesc">По названию (Я-А)</option>
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
                      src={product.image || "/uploads/delivery/default.png"}
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
                  {((product.weight !== undefined && product.weight > 0) ||
                    (product.pieces !== undefined && product.pieces > 0)) && (
                    <div className={styles.details}>
                      {product.weight !== undefined && product.weight > 0 && (
                        <div>
                          <span>
                            <b>Вес:</b>
                          </span>
                          {product.weight}
                        </div>
                      )}
                      {product.pieces !== undefined && product.pieces > 0 && (
                        <div>
                          <span>
                            <b>шт.:</b>
                          </span>
                          {product.pieces}
                        </div>
                      )}
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
                        push(MANAGE_URL.productDeliveryEdit(product.id))
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
