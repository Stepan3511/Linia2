import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/services/order/order.service";
import { ICreateOrderInput } from "@/types/order.types";
import { toast } from "react-hot-toast";

export const useCreateOrder = () => {
  const { mutate: createOrder, isPending: isLoadingCreate } = useMutation({
    mutationKey: ["create order"],
    mutationFn: (data: ICreateOrderInput) => orderService.create(data),
    onSuccess: () => {
      toast.success("Заказ успешно оформлен!");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Ошибка при оформлении заказа"
      );
    },
  });

  return { createOrder, isLoadingCreate };
};
