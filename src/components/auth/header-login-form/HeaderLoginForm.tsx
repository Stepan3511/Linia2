import { LogIn, LogOut, User } from "lucide-react";
import styles from "./HeaderLoginForm.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthModalStore } from "@/store/authModalStore";
import { useGetUser } from "@/hooks/auth/useGetUser";
import { useLogoutMutation } from "@/hooks/auth/useLogoutMutation";

export default function HeaderLoginForm() {
  const { user, isLoading } = useGetUser();
  const { logout, isLoadingLogout } = useLogoutMutation();
  const { openModal } = useAuthModalStore();

  if (isLoading) return null;

  if (!user) {
    return (
      <button className={styles.login_button} onClick={openModal}>
        Вход
        <LogIn size={16} className={styles.logout_button_icon} />
      </button>
    );
  }

  return (
    <div className={styles.auth_buttons}>
      <Link href="/dashboard">
        <button className={styles.login_button}>
          Личный кабинет
          <User size={16} className={styles.logout_button_icon} />
        </button>
      </Link>
      <button
        className={styles.login_button}
        onClick={() => logout()}
        disabled={isLoadingLogout}
      >
        {isLoadingLogout ? "Выходим..." : "Выход"}
        <LogOut size={16} className={styles.logout_button_icon} />
      </button>
    </div>
  );
}
