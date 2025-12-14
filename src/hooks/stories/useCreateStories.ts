import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IStoriesInput } from "@/types/story.types";
import { storiesService } from "@/services/stories.service";
import toast from "react-hot-toast";
import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";

export const useCreateStories = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IStoriesInput) => storiesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get stories"] });
      toast.success("Группа сторис создана");
      push(MANAGE_URL.stories());
    },
    onError: () => {
      toast.error("Ошибка при создании группы сторис");
    },
  });
};
