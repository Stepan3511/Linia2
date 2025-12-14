import { API_URL } from "@/config/api.config";
import { IStoryInput } from "@/types/story.types";
import { axiosWithAuth } from "@/api/interceptors";

class StoryService {
  async createStory(groupId: string, data: IStoryInput) {
    return axiosWithAuth.post<string>(
      API_URL.stories(`/${groupId}/story`),
      data
    );
  }

  async updateStory(groupId: string, storyId: string, data: IStoryInput) {
    return axiosWithAuth.patch<string>(
      API_URL.stories(`/${groupId}/story/${storyId}`),
      data
    );
  }

  async deleteStory(groupId: string, id: string) {
    return axiosWithAuth.delete<string>(
      API_URL.stories(`/${groupId}/story/${id}`)
    );
  }
}

export const storyService = new StoryService();
