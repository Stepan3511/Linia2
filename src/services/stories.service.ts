import { API_URL } from "@/config/api.config";
import { IStories, IStoriesInput } from "@/types/story.types";
import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

class StoriesService {
  async get() {
    return axiosClassic.get<IStories[]>(API_URL.stories());
  }

  async getById(id: string) {
    return axiosClassic.get<IStories>(API_URL.stories(`/${id}`));
  }

  async create(data: IStoriesInput) {
    return axiosWithAuth.post<string>(API_URL.stories(), data);
  }

  async update(id: string, data: IStoriesInput) {
    return axiosWithAuth.patch<string>(API_URL.stories(`/${id}`), data);
  }

  async delete(id: string) {
    return axiosWithAuth.delete<string>(API_URL.stories(`/${id}`));
  }
}

export const storiesService = new StoriesService();
