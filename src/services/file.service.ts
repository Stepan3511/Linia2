import { API_URL } from "@/config/api.config";
import { IFile } from "@/types/file.types";
import { axiosWithAuth } from "@/api/interceptors";

class FileService {
  async upload(file: FormData, folder?: string) {
    return axiosWithAuth.post<IFile>(API_URL.file(), file, {
      params: { folder },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export const fileService = new FileService();
