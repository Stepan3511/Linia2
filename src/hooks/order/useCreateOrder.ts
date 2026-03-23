import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/services/order/order.service";
import { ICreateOrderInput } from "@/types/order.types";

export const useCreateOrder = () => {
  const { mutate: createOrder, isPending: isLoadingCreate } = useMutation({
    mutationKey: ["create order"],
    mutationFn: (data: ICreateOrderInput) => orderService.create(data),
  });

  return { createOrder, isLoadingCreate };
};
