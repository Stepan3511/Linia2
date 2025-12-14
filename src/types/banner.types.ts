export interface IBanner {
  id: string;
  isActive: boolean;
  imageUrl: string; // URL загруженного изображения
  linkUrl?: string; // Опциональная ссылка для баннера
}

export interface IBannerInput {
  isActive: boolean;
  linkUrl?: string;
}

export interface BannerItemFormProps {
  action: string;
  bannerItem: IBanner | undefined;
  handleSubmit: (values: IBannerInput) => void;
}

export interface IBannerImageUpload {
  file: File;
  onUploadProgress?: (progress: number) => void;
}

export interface IBannerImagePreview {
  imageUrl: string;
  alt?: string;
}
