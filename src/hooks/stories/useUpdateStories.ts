import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IStoriesInput } from "@/types/story.types";

import toast from "react-hot-toast";
import { storiesService } from "@/services/stories.service";
import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";

export const useUpdateStories = (id: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IStoriesInput) => storiesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get stories"] });
      queryClient.invalidateQueries({ queryKey: ["get stories", id] });

      toast.success("Группа сторис обновлена");
      push(MANAGE_URL.stories());
    },
    onError: () => {
      toast.error("Ошибка при обновлении группы сторис");
    },
  });
};
