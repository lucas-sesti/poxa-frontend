import styles from "./Input.module.scss";
import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { hour } from "../../utils/masks/hour.mask";
import { dateMask } from "../../utils/masks/date.mask";
import { currencyMask } from "../../utils/masks/currency.mask";
import { cpfMask } from "../../utils/masks/cpf.mask";
import { phoneMask } from "../../utils/masks/phone.mask";
import { expirationDateMask } from "../../utils/masks/expirationDate.mask";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: "hour" | "date" | "currency" | "cpf" | "phone" | "expirationDate";
  prefix?: string;
  label?: string;
  value: string | undefined;
  id?: string;
  required?: boolean;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mercadoPagoData?: string;
}

export default function Input({
  label,
  value,
  type = "text",
  onChange,
  placeholder,
  required = false,
  mask,
  id,
  mercadoPagoData,
  onBlur,
  disabled = false,
}: Props) {
  const onActiveMask = useCallback(
    (e: any) => {
      switch (mask) {
        case "hour":
          hour(e);
          break;
        case "date":
          dateMask(e);
          break;
        case "currency":
          currencyMask(e);
          break;
        case "cpf":
          cpfMask(e);
          break;
        case "phone":
          phoneMask(e);
          break;
        case "expirationDate":
          expirationDateMask(e);
          break;
      }
    },
    [mask]
  );

  const [isFocused, setIsFocused] = useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div id={id} className={styles["c-input"]}>
      {(!placeholder || isFocused || !!value) && (
        <p
          onClick={() => {
            if (inputRef) {
              inputRef.current.focus();
            }
          }}
          className={classNames([
            styles["c-input__label"],
            {
              [styles["c-input__label--focused"]]: isFocused,
              [styles["c-input__label--top"]]: isFocused || !!value,
            },
          ])}
        >
          {label ?? placeholder} {required ? "*" : ""}
        </p>
      )}

      <input
        {...(!!mercadoPagoData && { "data-checkout": mercadoPagoData })}
        ref={inputRef}
        className={classNames([
          styles["c-input__field"],
          {
            [styles["c-input__field--focused"]]: isFocused,
          },
        ])}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          if (mask) {
            onActiveMask(event);
          }
          onChange(event);
        }}
        disabled={disabled}
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);

          if (onBlur) {
            onBlur(e);
          }
        }}
      />
    </div>
  );
}
