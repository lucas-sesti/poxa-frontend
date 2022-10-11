import styles from "./Sidebar.module.scss";
import { AdminSidebarMenu } from "utils/menu/admin-sidebar.menu";
import { colorBrandPrimaryMedium } from "styles/settings/styles";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "store/user/user.slice";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <div className={styles["c-sidebar"]}>
      <div
        onClick={() => {
          navigate("/admin");
        }}
        className={styles["c-sidebar__user"]}
      >
        <FiUser
          size={27}
          color={colorBrandPrimaryMedium}
          className={styles["c-sidebar__user-icon"]}
        />

        {user && (
          <p className={styles["c-sidebar__user-title"]}>{user.full_name}</p>
        )}
      </div>

      <ul className={styles["c-sidebar__menu"]}>
        {AdminSidebarMenu.map((menu) => {
          return (
            <Link
              to={menu.path}
              className={styles["c-sidebar__menu-item"]}
              key={menu.title + menu.path}
            >
              <p className={styles["c-sidebar__menu-item-title"]}>
                {menu.title}
              </p>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
