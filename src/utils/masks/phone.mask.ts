import React from "react";

export function addPhoneMask(value: string) {
  if (!value.match(/^\((\d{2})\)\s(\d{5})-(\d{4})$/)) {
    value = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  }

  return value;
}

export function phoneMask(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 15;
  let value = e.currentTarget.value;

  if (!value.match(/^\((\d{2})\)\s(\d{5})-(\d{4})$/)) {
    value = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");

    e.currentTarget.value = value;
  }
  return e;
}
