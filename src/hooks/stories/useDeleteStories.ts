import { storiesService } from "@/services/stories.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteStories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => storiesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get stories"] });
      toast.success("Группа сторис удалена");
    },
    onError: () => {
      toast.error("Ошибка при удалении группы сторис");
    },
  });
};
