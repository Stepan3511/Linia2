import { PropsWithChildren } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";

import styles from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  handleClick: () => void;
}

export function ConfirmModalPromo({
  children,
  handleClick,
}: PropsWithChildren<ConfirmModalProps>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ВАЖНО!</AlertDialogTitle>
          <AlertDialogDescription>
            При удалении промокода, вы удалите историю его использования у
            клиентов. Используйте кнопку архиваровать:{" "}
            <span className="text-red-500">АРХИВИРОВАТЬ!</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Закрыть</AlertDialogCancel>
          <AlertDialogAction
            className={styles.delete}
            onClick={() => handleClick()}
          >
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
