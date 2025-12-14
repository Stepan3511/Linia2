import { storyService } from "@/services/story.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export const useDeleteStory = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => storyService.deleteStory(groupId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get stories", "get story", groupId],
      });
      toast.success("Сторис удалена");
    },
    onError: () => {
      toast.error("Ошибка при удалении сторис");
    },
  });
};
