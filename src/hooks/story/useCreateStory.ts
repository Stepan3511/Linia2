import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IStoryInput } from "@/types/story.types";

import toast from "react-hot-toast";
import { storyService } from "@/services/story.service";

export const useCreateStory = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IStoryInput) => storyService.createStory(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get story", groupId] });
      toast.success("Сторис добавлена");
    },
    onError: () => {
      toast.error("Ошибка при добавлении сторис");
    },
  });
};
