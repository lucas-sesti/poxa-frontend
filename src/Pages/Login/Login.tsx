import styles from "./Login.module.scss";
import imageLogin from "assets/login.svg";
import Input from "Components/Input/Input";
import { useEffect, useState } from "react";
import Button from "Components/Button/Button";
import { oauth } from "lib/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "services/user/user.service";
import { selectUser, setUser } from "store/user/user.slice";
import { showToast } from "utils/toaster/toaster.utils";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

  const onLogin = async () => {
    const token = await oauth.login(form.email, form.password);

    if (token) {
      const _user = await userService.getOne("me");
      dispatch(setUser(_user));
      showToast("Login realizado com sucesso!", "success");
      navigate("/ingressos");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/ingressos");
    }
  }, [user]);

  return (
    <div className={styles["c-login"]}>
      <img
        className={styles["c-login__image"]}
        src={imageLogin}
        alt="Ilustração de login"
      />

      <div className={styles["c-login__container"]}>
        <h1 className={styles["c-login__container-title"]}>Login</h1>

        <Input
          type="email"
          label="Email"
          value={form.email}
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />

        <Input
          type="password"
          label="Senha"
          value={form.password}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />

        <div className={styles["c-login__container-login"]}>
          <Button text="Entrar" onClick={onLogin} />
        </div>

        <div className={styles["c-login__container-register"]}>
          <div className={styles["c-login__container-register-divider"]}>
            <div
              className={styles["c-login__container-register-divider-line"]}
            ></div>
            <p className={styles["c-login__container-register-divider-text"]}>
              ou
            </p>
            <div
              className={styles["c-login__container-register-divider-line"]}
            ></div>
          </div>
          <p
            onClick={() => {
              navigate("/cadastro");
            }}
            className={styles["c-login__container-register-cta"]}
          >
            Novo no site?{" "}
            <span
              className={styles["c-login__container-register-cta--primary"]}
            >
              Cadastre-se
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
