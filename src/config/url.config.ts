export const APP_URL = process.env.APP_URL;

export const PUBLIC_URL = {
  root: (url = "") => `${url ? url : ""}`,
  home: () => PUBLIC_URL.root("/"),
  // Оформление заказа
  checkout: () => PUBLIC_URL.root("/checkout"),

  // Спасибо
  thanks: () => PUBLIC_URL.root("/thanks"),
  admin: () => PUBLIC_URL.root("/admin"),

  // вход
  login: () => PUBLIC_URL.root("/auth/login"),
  otp: () => PUBLIC_URL.root("/auth/otp"),
  dashboard: () => PUBLIC_URL.root("/dashboard"),

  //Кейтеринг
  catering: () => PUBLIC_URL.root("/catering"),
};

export const MANAGE_URL = {
  root: (url = "") => `/manage${url ? url : ""}`,

  // Доставка - Категории
  categoryDeliveryCreate: () => MANAGE_URL.root("/category-delivery/create"),
  categoryDeliveryEdit: (id = "") =>
    MANAGE_URL.root(`/category-delivery/edit/${id}`),
  categoryDelivery: () => MANAGE_URL.root("/category-delivery"),

  // Доставка - Продукты
  productDeliveryCreate: () => MANAGE_URL.root("/product-delivery/create"),
  productDeliveryEdit: (id = "") =>
    MANAGE_URL.root(`/product-delivery/edit/${id}`),
  productDelivery: () => MANAGE_URL.root("/product-delivery"),

  // Кейтеринг - Категории
  categoryCateringCreate: () => MANAGE_URL.root("/category-catering/create"),
  categoryCateringEdit: (id = "") =>
    MANAGE_URL.root(`/category-catering/edit/${id}`),
  categoryCatering: () => MANAGE_URL.root("/category-catering"),

  // Кейтеринг - Продукты
  productCateringCreate: () => MANAGE_URL.root("/product-catering/create"),
  productCateringEdit: (id = "") =>
    MANAGE_URL.root(`/product-catering/edit/${id}`),
  productCatering: () => MANAGE_URL.root("/product-catering"),

  // Сторисы
  storiesCreate: () => MANAGE_URL.root("/stories/create"),
  storiesEdit: (id = "") => MANAGE_URL.root(`/stories/edit/${id}`),
  stories: () => MANAGE_URL.root("/stories"),

  // Расписание
  workTimeCreate: () => MANAGE_URL.root("/work-time/create"),
  workTimeEdit: (id = "") => MANAGE_URL.root(`/work-time/edit/${id}`),
  workTime: () => MANAGE_URL.root("/work-time"),

  // Выходные
  holidayTimeCreate: () => MANAGE_URL.root("/holiday-time/create"),
  holidayTimeEdit: (id = "") => MANAGE_URL.root(`/holiday-time/edit/${id}`),
  holidayTime: () => MANAGE_URL.root("/holiday-time"),

  // Промокоды
  promoCodeCreate: () => MANAGE_URL.root("/promo-code/create"),
  promoCodeEdit: (id = "") => MANAGE_URL.root(`/promo-code/edit/${id}`),
  promoCode: () => MANAGE_URL.root("/promo-code"),

  // Клиенты
  clients: () => MANAGE_URL.root("/clients"),
  // Баннер
  bannerEdit: () => MANAGE_URL.root(`/banner/edit`),
  banner: () => MANAGE_URL.root("/banner"),
};
