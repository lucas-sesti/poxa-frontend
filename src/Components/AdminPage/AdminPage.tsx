import styles from "./AdminPage.module.scss";
import Sidebar from "Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className={styles["c-admin-page"]}>
      <Sidebar />

      <div className={styles["c-admin-page__content"]}>
        <Outlet />
      </div>
    </div>
  );
}
