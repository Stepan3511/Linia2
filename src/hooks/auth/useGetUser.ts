import { userService } from "@/services/auth/user.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => userService.getUserProfile(),
  });

  return { user, isLoading, error };
};
