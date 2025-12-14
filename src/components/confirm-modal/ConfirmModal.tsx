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

export function ConfirmModal({
  children,
  handleClick,
}: PropsWithChildren<ConfirmModalProps>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя будет отменить.
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
