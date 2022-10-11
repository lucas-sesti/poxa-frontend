import styles from "./Register.module.scss";
import imageLogin from "assets/login.svg";
import Input from "Components/Input/Input";
import React, { useEffect, useState } from "react";
import Button from "Components/Button/Button";
import { oauth } from "lib/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "services/user/user.service";
import { selectUser, setUser } from "store/user/user.slice";
import { showToast } from "utils/toaster/toaster.utils";
import { useNavigate } from "react-router-dom";
import { UserParams } from "../../models/user";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [form, setForm] = useState<UserParams>({});

  const setUserForm = (key: string, value: string) => {
    const newForm: any = { ...form };

    newForm[key] = value;

    setForm(newForm);
  };

  const onRegister = async () => {
    await userService.createUser(form);
    const token = await oauth.login(form.email, form.password);

    if (token) {
      const _user = await userService.getOne("me");
      dispatch(setUser(_user));
      showToast("Oba! Cadastro realizado com sucesso!", "success");
      navigate("/ingressos");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/ingressos");
    }
  }, [user]);

  return (
    <div className={styles["c-register"]}>
      <img
        className={styles["c-register__image"]}
        src={imageLogin}
        alt="Ilustração de cadastro"
      />

      <div className={styles["c-register__container"]}>
        <h1 className={styles["c-register__container-title"]}>Cadastrar</h1>

        <Input
          label="Nome completo"
          value={form.full_name || ""}
          onChange={(e) => {
            setUserForm("full_name", e.target.value);
          }}
        />

        <Input
          mask="cpf"
          placeholder="000.000.000-00"
          label="CPF"
          value={form.cpf ?? ""}
          onChange={(e) => {
            setUserForm("cpf", e.target.value);
          }}
        />

        <Input
          type="email"
          label="Email"
          value={form.email ?? ""}
          onChange={(e) => {
            setUserForm("email", e.target.value);
          }}
        />

        <Input
          mask="phone"
          label="Telefone"
          placeholder="(00) 00000-0000"
          value={form.phone ?? ""}
          onChange={(e) => {
            setUserForm("phone", e.target.value);
          }}
        />

        <Input
          type="password"
          label="Senha"
          value={form.password ?? ""}
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />

        <div className={styles["c-register__container-register"]}>
          <Button text="Entrar" onClick={onRegister} />
        </div>

        <div className={styles["c-register__container-register"]}>
          <div className={styles["c-register__container-register-divider"]}>
            <div
              className={styles["c-register__container-register-divider-line"]}
            ></div>
            <p
              className={styles["c-register__container-register-divider-text"]}
            >
              ou
            </p>
            <div
              className={styles["c-register__container-register-divider-line"]}
            ></div>
          </div>
          <p
            onClick={() => {
              navigate("/login");
            }}
            className={styles["c-register__container-register-cta"]}
          >
            Já possui uma conta?{" "}
            <span
              className={styles["c-register__container-register-cta--primary"]}
            >
              Logar
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
