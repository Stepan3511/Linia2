import { useQuery } from "@tanstack/react-query";
import { IStories } from "@/types/story.types";
import { storiesService } from "@/services/stories.service";

export const useGetStories = () => {
  return useQuery<IStories[]>({
    queryKey: ["get stories"],
    queryFn: async () => {
      const { data } = await storiesService.get();
      return data;
    },
  });
};
