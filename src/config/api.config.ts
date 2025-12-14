export const SERVER_URL = process.env.SERVER_URL;

export const API_URL = {
  root: (url = "") => `${SERVER_URL}${url ? url : ""}`,

  categoryDelivery: (url = "") => API_URL.root(`/category-delivery${url}`),
  productDelivery: (url = "") => API_URL.root(`/delivery${url}`),

  categoryCatering: (url = "") => API_URL.root(`/category-catering${url}`),
  productCatering: (url = "") => API_URL.root(`/catering${url}`),

  file: (url = "") => API_URL.root(`/file${url}`),
  fileStories: (url = "") => API_URL.root(`/file-stories${url}`),

  stories: (url = "") => API_URL.root(`/stories${url}`),

  admin: (url = "") => API_URL.root(`/admin${url}`),
  users: (url = "") => API_URL.root(`/users${url}`),

  workTime: (url = "") => API_URL.root(`/work-time${url}`),

  clients: (url = "") => API_URL.root(`/client-user${url}`),

  holidayTime: (url = "") => API_URL.root(`/holiday-time${url}`),

  promoCode: (url = "") => API_URL.root(`/promo-code${url}`),

  clientAuth: (url = "") => API_URL.root(`/client-auth${url}`),

  clientUser: (url = "") => API_URL.root(`/client-user${url}`),

  order: (url = "") => API_URL.root(`/order${url}`),

  banner: (url = "") => API_URL.root(`/banner${url}`),
};
