import { orderService } from "@/services/order/order.service";
import { useQuery } from "@tanstack/react-query";

export const useOrderHistory = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderHistory"],
    queryFn: () => orderService.getHistory(),
  });

  return { orders, isLoading, error };
};
