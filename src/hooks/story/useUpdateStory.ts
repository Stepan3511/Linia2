import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IStoryInput } from "@/types/story.types";

import toast from "react-hot-toast";
import { storyService } from "@/services/story.service";

export const useUpdateStory = (groupId: string, storyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IStoryInput) =>
      storyService.updateStory(groupId, storyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get story", groupId] });
      toast.success("Сторис обновлена");
    },
    onError: () => {
      toast.error("Ошибка при обновлении сторис");
    },
  });
};
