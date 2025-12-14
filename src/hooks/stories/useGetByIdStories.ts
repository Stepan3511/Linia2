import { useQuery } from "@tanstack/react-query";
import { IStories } from "@/types/story.types";
import { storiesService } from "@/services/stories.service";

export const useGetByIdStories = (id: string) => {
  return useQuery<IStories>({
    queryKey: ["get stories", id],
    queryFn: async () => {
      const { data } = await storiesService.getById(id);
      return data;
    },
    enabled: !!id, // Запрос выполняется только если есть ID
  });
};
